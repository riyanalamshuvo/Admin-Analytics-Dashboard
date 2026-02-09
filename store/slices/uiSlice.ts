import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserRole } from '@/types';

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  userRole: UserRole;
}

// Load initial state from localStorage
const loadState = (): Partial<UIState> => {
  if (typeof window === 'undefined') return {};
  try {
    const serializedState = localStorage.getItem('dashboard-ui-state');
    if (serializedState === null) return {};
    return JSON.parse(serializedState);
  } catch {
    return {};
  }
};

const savedState = loadState();

const initialState: UIState = {
  sidebarCollapsed: savedState.sidebarCollapsed ?? true,
  theme: savedState.theme ?? 'light',
  userRole: savedState.userRole ?? 'admin',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      saveState(state);
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      saveState(state);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveState(state);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      saveState(state);
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
      saveState(state);
    },
  },
});

// Save state to localStorage
const saveState = (state: UIState) => {
  if (typeof window === 'undefined') return;
  try {
    const serializedState = JSON.stringify({
      sidebarCollapsed: state.sidebarCollapsed,
      theme: state.theme,
      userRole: state.userRole,
    });
    localStorage.setItem('dashboard-ui-state', serializedState);
  } catch {
    // Ignore write errors
  }
};

export const { toggleSidebar, setSidebarCollapsed, toggleTheme, setTheme, setUserRole } = uiSlice.actions;
export default uiSlice.reducer;
