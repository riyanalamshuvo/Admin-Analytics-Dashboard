'use client';

import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);
  const theme = useAppSelector((state) => state.ui.theme);

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar />
      
      <div className={cn(
        'flex flex-col flex-1 min-w-0 transition-all duration-300',
       
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      )}>
        <Header />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
