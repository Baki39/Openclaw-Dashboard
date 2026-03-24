import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppWindow, DollarSign, Download, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import { sampleData } from '../data/store';

const Home = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const stats = sampleData.stats;
  const revenueData = sampleData.revenueChart;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <p className="text-indigo-400 font-bold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your apps.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Apps"
          value={stats.totalApps}
          icon={AppWindow}
          change={8}
        />
        <StatCard
          title="Revenue (This Month)"
          value={stats.totalRevenue}
          icon={DollarSign}
          change={stats.revenueChange}
          format="currency"
        />
        <StatCard
          title="Total Downloads"
          value={stats.totalDownloads}
          icon={Download}
          change={stats.downloadsChange}
          format="compact"
        />
        <StatCard
          title="Active Apps"
          value={stats.activeApps}
          icon={Activity}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Revenue Trend</h2>
            <p className="text-gray-400 text-sm">Last 30 days</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-indigo-500 text-white'
                    : 'bg-[#252525] text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={(value) => value.split('-')[2]}
                axisLine={{ stroke: '#2a2a2a' }}
              />
              <YAxis
                tick={{ fill: '#666', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                axisLine={{ stroke: '#2a2a2a' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Apps */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white mb-4">Top Performing Apps</h2>
          <div className="space-y-4">
            {sampleData.apps.slice(0, 5).map((app, index) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-[#252525] hover:bg-[#2a2a2a] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <p className="font-medium text-white">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.downloads.toLocaleString()} downloads</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">${app.revenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">this month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-left flex items-center justify-between hover:opacity-90 transition-opacity">
              <span>🚀 Start New App Cycle</span>
              <span className="text-sm opacity-80">→</span>
            </button>
            <button className="w-full p-4 rounded-xl bg-[#252525] text-white font-medium text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
              <span>📱 Review Pending Apps</span>
              <span className="text-sm text-gray-400">{sampleData.reviewQueue.length} pending</span>
            </button>
            <button className="w-full p-4 rounded-xl bg-[#252525] text-white font-medium text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
              <span>🔄 Update Existing App</span>
              <span className="text-sm text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;