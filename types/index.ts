// Dashboard Types

export type DateRange = '7days' | '30days' | '12months';
export type UserType = 'all' | 'free' | 'premium' | 'enterprise';
export type UserRole = 'admin' | 'manager';

export interface KPIData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  previousRevenue?: number;
}

export interface OrderData {
  month: string;
  orders: number;
}

export interface UserDistribution {
  name: string;
  value: number;
  color: string;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  totalOrders: number;
  conversionRate: number;
  revenueChange: number;
  usersChange: number;
  ordersChange: number;
  conversionChange: number;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueData: RevenueData[];
  orderData: OrderData[];
  userDistribution: UserDistribution[];
  trafficSources: TrafficSource[];
}

export interface FilterState {
  dateRange: DateRange;
  userType: UserType;
}
