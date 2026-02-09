import type { DashboardData, DateRange, UserType } from '@/types';

// Base data for full 12 months
const fullRevenueData = [
  { month: 'Jan', revenue: 4200, previousRevenue: 3800 },
  { month: 'Feb', revenue: 3800, previousRevenue: 3500 },
  { month: 'Mar', revenue: 5100, previousRevenue: 4200 },
  { month: 'Apr', revenue: 4700, previousRevenue: 4100 },
  { month: 'May', revenue: 5300, previousRevenue: 4800 },
  { month: 'Jun', revenue: 4900, previousRevenue: 4500 },
  { month: 'Jul', revenue: 5600, previousRevenue: 5000 },
  { month: 'Aug', revenue: 6200, previousRevenue: 5400 },
  { month: 'Sep', revenue: 5800, previousRevenue: 5200 },
  { month: 'Oct', revenue: 6500, previousRevenue: 5800 },
  { month: 'Nov', revenue: 7100, previousRevenue: 6200 },
  { month: 'Dec', revenue: 7800, previousRevenue: 6800 },
];

const fullOrderData = [
  { month: 'Jan', orders: 245 },
  { month: 'Feb', orders: 228 },
  { month: 'Mar', orders: 302 },
  { month: 'Apr', orders: 278 },
  { month: 'May', orders: 315 },
  { month: 'Jun', orders: 289 },
  { month: 'Jul', orders: 342 },
  { month: 'Aug', orders: 378 },
  { month: 'Sep', orders: 356 },
  { month: 'Oct', orders: 398 },
  { month: 'Nov', orders: 425 },
  { month: 'Dec', orders: 467 },
];

const userDistributionBase = [
  { name: 'Free Users', value: 650, color: '#3b82f6' },
  { name: 'Premium Users', value: 420, color: '#8b5cf6' },
  { name: 'Enterprise Users', value: 175, color: '#10b981' },
];

const trafficSourcesBase = [
  { name: 'Organic', value: 45, color: '#3b82f6' },
  { name: 'Paid', value: 25, color: '#f59e0b' },
  { name: 'Social', value: 18, color: '#ec4899' },
  { name: 'Referral', value: 12, color: '#10b981' },
];

// Stats variations based on filters
const statsVariations = {
  '7days': {
    all: {
      totalRevenue: 12450,
      totalUsers: 245,
      totalOrders: 78,
      conversionRate: 3.8,
      revenueChange: 8.2,
      usersChange: 5.4,
      ordersChange: 12.1,
      conversionChange: -0.5,
    },
    free: {
      totalRevenue: 3200,
      totalUsers: 156,
      totalOrders: 28,
      conversionRate: 2.1,
      revenueChange: 4.2,
      usersChange: 8.4,
      ordersChange: 6.1,
      conversionChange: -1.2,
    },
    premium: {
      totalRevenue: 6800,
      totalUsers: 64,
      totalOrders: 38,
      conversionRate: 5.8,
      revenueChange: 12.5,
      usersChange: 3.2,
      ordersChange: 15.3,
      conversionChange: 0.8,
    },
    enterprise: {
      totalRevenue: 2450,
      totalUsers: 25,
      totalOrders: 12,
      conversionRate: 8.2,
      revenueChange: 6.8,
      usersChange: 2.1,
      ordersChange: 10.5,
      conversionChange: 1.2,
    },
  },
  '30days': {
    all: {
      totalRevenue: 54230,
      totalUsers: 1245,
      totalOrders: 342,
      conversionRate: 4.3,
      revenueChange: 12.5,
      usersChange: 8.1,
      ordersChange: 15.3,
      conversionChange: 2.1,
    },
    free: {
      totalRevenue: 14500,
      totalUsers: 650,
      totalOrders: 120,
      conversionRate: 2.8,
      revenueChange: 6.2,
      usersChange: 12.4,
      ordersChange: 8.5,
      conversionChange: -0.8,
    },
    premium: {
      totalRevenue: 28200,
      totalUsers: 420,
      totalOrders: 165,
      conversionRate: 6.2,
      revenueChange: 18.5,
      usersChange: 5.8,
      ordersChange: 22.1,
      conversionChange: 3.5,
    },
    enterprise: {
      totalRevenue: 11530,
      totalUsers: 175,
      totalOrders: 57,
      conversionRate: 9.8,
      revenueChange: 10.2,
      usersChange: 3.5,
      ordersChange: 12.8,
      conversionChange: 2.8,
    },
  },
  '12months': {
    all: {
      totalRevenue: 678500,
      totalUsers: 15680,
      totalOrders: 4523,
      conversionRate: 4.8,
      revenueChange: 24.5,
      usersChange: 32.1,
      ordersChange: 28.3,
      conversionChange: 5.2,
    },
    free: {
      totalRevenue: 185200,
      totalUsers: 8450,
      totalOrders: 1580,
      conversionRate: 3.2,
      revenueChange: 18.2,
      usersChange: 42.5,
      ordersChange: 22.1,
      conversionChange: 2.1,
    },
    premium: {
      totalRevenue: 352800,
      totalUsers: 5230,
      totalOrders: 2180,
      conversionRate: 6.8,
      revenueChange: 32.5,
      usersChange: 24.8,
      ordersChange: 35.2,
      conversionChange: 6.8,
    },
    enterprise: {
      totalRevenue: 140500,
      totalUsers: 2000,
      totalOrders: 763,
      conversionRate: 11.2,
      revenueChange: 22.1,
      usersChange: 18.5,
      ordersChange: 25.8,
      conversionChange: 4.5,
    },
  },
};

// Helper function to get data based on date range
const getDataByDateRange = (dateRange: DateRange) => {
  switch (dateRange) {
    case '7days':
      return {
        revenueData: fullRevenueData.slice(-1).map((d, i) => ({
          ...d,
          month: `Day ${i + 1}`,
        })),
        orderData: fullOrderData.slice(-1).map((d, i) => ({
          ...d,
          month: `Day ${i + 1}`,
        })),
      };
    case '30days':
      return {
        revenueData: fullRevenueData.slice(-4),
        orderData: fullOrderData.slice(-4),
      };
    case '12months':
    default:
      return {
        revenueData: fullRevenueData,
        orderData: fullOrderData,
      };
  }
};

// Helper function to get user distribution based on user type
const getUserDistribution = (userType: UserType) => {
  if (userType === 'all') {
    return userDistributionBase;
  }
  const typeMap: Record<string, string> = {
    free: 'Free Users',
    premium: 'Premium Users',
    enterprise: 'Enterprise Users',
  };
  return userDistributionBase.filter((d) => d.name === typeMap[userType]);
};

// Main function to get dashboard data based on filters
export const getDashboardData = (
  dateRange: DateRange,
  userType: UserType
): DashboardData => {
  const { revenueData, orderData } = getDataByDateRange(dateRange);
  const stats = statsVariations[dateRange][userType];
  const userDistribution = getUserDistribution(userType);

  // Modify revenue and order data based on user type multiplier
  const userTypeMultiplier: Record<UserType, number> = {
    all: 1,
    free: 0.35,
    premium: 0.45,
    enterprise: 0.2,
  };

  const multiplier = userTypeMultiplier[userType];
  const adjustedRevenueData = revenueData.map((d) => ({
    ...d,
    revenue: Math.round(d.revenue * multiplier),
    previousRevenue: d.previousRevenue
      ? Math.round(d.previousRevenue * multiplier)
      : undefined,
  }));

  const adjustedOrderData = orderData.map((d) => ({
    ...d,
    orders: Math.round(d.orders * multiplier),
  }));

  return {
    stats,
    revenueData: adjustedRevenueData,
    orderData: adjustedOrderData,
    userDistribution,
    trafficSources: trafficSourcesBase,
  };
};

// Simulate API delay
export const fetchDashboardData = async (
  dateRange: DateRange,
  userType: UserType
): Promise<DashboardData> => {
  // Simulate network delay (500-1500ms)
  const delay = Math.random() * 1000 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate occasional errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch dashboard data. Please try again.');
  }

  return getDashboardData(dateRange, userType);
};

// Export to CSV functionality
export const exportToCSV = (data: DashboardData, filename: string) => {
  const rows = [
    ['Metric', 'Value', 'Change (%)'],
    ['Total Revenue', `$${data.stats.totalRevenue.toLocaleString()}`, `${data.stats.revenueChange}%`],
    ['Total Users', data.stats.totalUsers.toString(), `${data.stats.usersChange}%`],
    ['Total Orders', data.stats.totalOrders.toString(), `${data.stats.ordersChange}%`],
    ['Conversion Rate', `${data.stats.conversionRate}%`, `${data.stats.conversionChange}%`],
    [],
    ['Month', 'Revenue'],
    ...data.revenueData.map((d) => [d.month, `$${d.revenue.toLocaleString()}`]),
    [],
    ['Month', 'Orders'],
    ...data.orderData.map((d) => [d.month, d.orders.toString()]),
    [],
    ['User Type', 'Count'],
    ...data.userDistribution.map((d) => [d.name, d.value.toString()]),
  ];

  const csvContent = rows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
