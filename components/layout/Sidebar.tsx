'use client';

import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useStore';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { memo } from 'react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#', current: true },
  { name: 'Users', icon: Users, href: '#', current: false },
  { name: 'Orders', icon: ShoppingCart, href: '#', current: false },
  { name: 'Analytics', icon: BarChart3, href: '#', current: false },
  { name: 'Settings', icon: Settings, href: '#', current: false },
];

const secondaryNavigation = [
  { name: 'Help', icon: HelpCircle, href: '#' },
  { name: 'Logout', icon: LogOut, href: '#' },
];

function SidebarComponent() {
  const { sidebarCollapsed, toggleSidebar, userRole } = useDashboardStore();

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50',
          'flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          'transition-all duration-300 ease-in-out',
          'w-64',
          // Mobile: hidden by default, shown when sidebarCollapsed is false (menu open)
          // Desktop: always visible, shrinks when collapsed
          sidebarCollapsed 
            ? '-translate-x-full lg:translate-x-0 lg:w-20' 
            : 'translate-x-0 lg:w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className={cn('flex items-center gap-3', sidebarCollapsed && 'lg:justify-center')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              A
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Analytics
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            // Filter routes based on role
            if (userRole === 'manager' && item.name === 'Settings') {
              return null;
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  item.current
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                  sidebarCollapsed && 'lg:justify-center lg:px-2'
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </a>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200',
                sidebarCollapsed && 'lg:justify-center lg:px-2'
              )}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.name}</span>}
            </a>
          ))}
        </div>

        {/* Collapse button - Desktop only */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center',
            'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full',
            'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors shadow-sm'
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>
    </>
  );
}

export const Sidebar = memo(SidebarComponent);
