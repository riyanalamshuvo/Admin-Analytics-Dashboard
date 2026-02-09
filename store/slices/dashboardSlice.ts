import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { DateRange, UserType, DashboardData } from '@/types';
import { dashboardApi } from '@/lib/api';

interface DashboardState {
  dateRange: DateRange;
  userType: UserType;
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}

// Load initial filter state from localStorage
const loadFilterState = (): { dateRange: DateRange; userType: UserType } => {
  if (typeof window === 'undefined') {
    return { dateRange: '30days', userType: 'all' };
  }
  try {
    const serializedState = localStorage.getItem('dashboard-filter-state');
    if (serializedState === null) {
      return { dateRange: '30days', userType: 'all' };
    }
    return JSON.parse(serializedState);
  } catch {
    return { dateRange: '30days', userType: 'all' };
  }
};

const savedFilters = loadFilterState();

const initialState: DashboardState = {
  dateRange: savedFilters.dateRange,
  userType: savedFilters.userType,
  dashboardData: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async ({ dateRange, userType }: { dateRange: DateRange; userType: UserType }, { rejectWithValue }) => {
    try {
      const data = await dashboardApi.getDashboardData(dateRange, userType);
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch dashboard data'
      );
    }
  }
);

// Save filter state to localStorage
const saveFilterState = (dateRange: DateRange, userType: UserType) => {
  if (typeof window === 'undefined') return;
  try {
    const serializedState = JSON.stringify({ dateRange, userType });
    localStorage.setItem('dashboard-filter-state', serializedState);
  } catch {
    // Ignore write errors
  }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
      saveFilterState(state.dateRange, state.userType);
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
      saveFilterState(state.dateRange, state.userType);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setDateRange, setUserType, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
