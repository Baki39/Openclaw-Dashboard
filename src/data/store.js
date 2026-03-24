// Dashboard Data - Real App Data
// This stores actual app data from builds

export const dashboardData = {
  stats: {
    totalApps: 1,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 1,
    revenueChange: 0,
    downloadsChange: 0,
  },
  apps: [
    {
      id: 1,
      name: "AI Image Enhancer",
      icon: "🖼️",
      status: "Built - Ready for Deploy",
      lastUpdated: "2026-03-24",
      revenue: 0,
      downloads: 0,
      rating: 0,
      packageName: "com.ultraclaw.imageenhancer",
      apkPath: "app/build/outputs/apk/debug/app-debug.apk",
      repoUrl: "https://github.com/Baki39/AI-Image-Enhancer"
    }
  ],
  reviewQueue: [],
  revenueChart: [],
};

// Get app by ID
export const getAppById = (id) => dashboardData.apps.find(app => app.id === id);

// Check if app is built
export const isAppBuilt = (id) => {
  const app = getAppById(id);
  return app && app.status.includes("Built");
};

// Format status badge
export const getStatusBadge = (status) => {
  if (status.includes("Live")) return "badge-live";
  if (status.includes("Review")) return "badge-review";
  if (status.includes("Built")) return "badge-updating";
  return "badge-live";
};

// Format currency
export const formatCurrency = (value) => `$${value.toFixed(2)}`;

// Format number
export const formatNumber = (value) => value >= 1000 ? `${(value/1000).toFixed(1)}K` : value.toLocaleString();