import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppWindow, DollarSign, Download, Activity, Plus, Rocket, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import StatCard from '../components/StatCard';

const Home = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Current app idea in progress
  const currentAppIdea = {
    name: 'AI Image Enhancer',
    icon: '🖼️',
    status: 'Waiting for Confirmation',
    primaryKeyword: 'AI Photo Enhancer',
    revenue: '$200-500/month',
    step: 'Step 1 Complete - Market Research'
  };
  
  const hasData = false;
  const stats = {
    totalApps: 0,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 0,
  };

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
        <p className="text-gray-400">Monitor your Android apps performance</p>
      </div>

      {/* Current App in Progress */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl">
              {currentAppIdea.icon}
            </div>
            <div>
              <p className="text-indigo-400 text-sm font-medium">Current App in Progress</p>
              <h2 className="text-xl font-bold text-white">{currentAppIdea.name}</h2>
              <p className="text-gray-400 text-sm">{currentAppIdea.step}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Primary Keyword</p>
            <p className="text-white font-medium">{currentAppIdea.primaryKeyword}</p>
            <p className="text-green-400 font-medium mt-2">{currentAppIdea.revenue}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="badge-review">{currentAppIdea.status}</span>
        </div>
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400">Type "Confirmed" to proceed with building this app</span>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Apps"
              value={stats.totalApps}
              icon={AppWindow}
              change={0}
            />
            <StatCard
              title="Revenue (This Month)"
              value={stats.totalRevenue}
              icon={DollarSign}
              change={0}
              format="currency"
            />
            <StatCard
              title="Total Downloads"
              value={stats.totalDownloads}
              icon={Download}
              change={0}
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
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              <p>No revenue data available yet</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;