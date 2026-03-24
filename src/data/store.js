// Dashboard Data Store - Real Data Only
// This file stores actual app data - no simulations

export const dashboardData = {
  stats: {
    totalApps: 0,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 0,
    revenueChange: 0,
    downloadsChange: 0,
  },
  apps: [],
  reviewQueue: [],
  revenueChart: [],
  currentIdea: null,
};

// Initial empty state - will be populated with real data from API
export const initialData = {
  stats: {
    totalApps: 0,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 0,
    revenueChange: 0,
    downloadsChange: 0,
  },
  apps: [],
  reviewQueue: [],
  revenueChart: [],
  currentIdea: null,
  pendingUpdate: null,
};

// Analytics data - will be fetched from Firebase/Play Console API
export const analyticsData = {};

// Helper to check if dashboard has real data
export const hasRealData = () => {
  return dashboardData.apps.length > 0;
};

// Helper to get status badge class
export const getStatusBadge = (status) => {
  switch (status) {
    case 'Live':
      return 'badge-live';
    case 'In Review':
      return 'badge-review';
    case 'Updating':
      return 'badge-updating';
    default:
      return 'badge-live';
  }
};

// Format currency
export const formatCurrency = (value) => {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format number
export const formatNumber = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};