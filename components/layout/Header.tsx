'use client';

import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useStore';
import { UserDropdown } from '@/components/ui';
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { memo, useState } from 'react';

function HeaderComponent() {
  const { toggleSidebar, userRole, setUserRole } = useDashboardStore();
  const [hasNotifications] = useState(true);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden sm:block">
          Dashboard Overview
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm">
          <Shield className="w-4 h-4 text-blue-500" />
          <span className="text-gray-700 dark:text-gray-300 capitalize">{userRole}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        {/* User dropdown */}
        <UserDropdown
          trigger={
            <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  john@example.com
                </p>
              </div>
            </div>
          }
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              john@example.com
            </p>
          </div>
          
          {/* Role switcher */}
          <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
              Switch Role
            </p>
            <button
              onClick={() => setUserRole('admin')}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors',
                userRole === 'admin'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
            <button
              onClick={() => setUserRole('manager')}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-2 text-sm rounded-lg transition-colors',
                userRole === 'manager'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <User className="w-4 h-4" />
              Manager
            </button>
          </div>

          <div className="px-2 py-2">
            <a
              href="#"
              className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </a>
          </div>
        </UserDropdown>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
