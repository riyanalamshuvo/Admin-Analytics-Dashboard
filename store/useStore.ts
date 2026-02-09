import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DateRange, UserType, UserRole, DashboardData } from '@/types';
import { fetchDashboardData } from '@/data/mockData';

interface DashboardState {
  // UI State
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  userRole: UserRole;
  
  // Filter State
  dateRange: DateRange;
  userType: UserType;
  
  // Data State
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setUserRole: (role: UserRole) => void;
  setDateRange: (range: DateRange) => void;
  setUserType: (type: UserType) => void;
  fetchData: () => Promise<void>;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      // Initial UI State
      sidebarCollapsed: true,
      theme: 'light',
      userRole: 'admin',
      
      // Initial Filter State
      dateRange: '30days',
      userType: 'all',
      
      // Initial Data State
      dashboardData: null,
      isLoading: false,
      error: null,
      
      // Actions
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      
      setTheme: (theme) => set({ theme }),
      
      setUserRole: (role) => set({ userRole: role }),
      
      setDateRange: (range) => {
        set({ dateRange: range });
        get().fetchData();
      },
      
      setUserType: (type) => {
        set({ userType: type });
        get().fetchData();
      },
      
      fetchData: async () => {
        const { dateRange, userType } = get();
        set({ isLoading: true, error: null });
        
        try {
          const data = await fetchDashboardData(dateRange, userType);
          set({ dashboardData: data, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false 
          });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        userRole: state.userRole,
        dateRange: state.dateRange,
        userType: state.userType,
      }),
    }
  )
);
