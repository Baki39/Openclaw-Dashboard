import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppWindow, DollarSign, Download, Activity, Plus, Rocket, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

const Home = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Empty state - no real data yet
  const hasData = false;
  const stats = {
    totalApps: 0,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 0,
  };
  const revenueData = [];

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

      {/* Empty State or Stats */}
      {!hasData ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-12 h-12 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Apps Yet</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Start your first app cycle by typing "START" in the chat. 
            UltraClaw will find a profitable niche, build the app, and deploy it to Google Play.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400">Type START to begin</span>
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

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
              <h2 className="text-xl font-bold text-white mb-4">Top Performing Apps</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No apps deployed yet</p>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-left flex items-center justify-between hover:opacity-90 transition-opacity">
                  <span>🚀 Start New App Cycle</span>
                  <span className="text-sm opacity-80">→</span>
                </button>
                <button className="w-full p-4 rounded-xl bg-[#252525] text-white font-medium text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
                  <span>📱 Review Pending Apps</span>
                  <span className="text-sm text-gray-400">0 pending</span>
                </button>
                <button className="w-full p-4 rounded-xl bg-[#252525] text-white font-medium text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors">
                  <span>🔄 Update Existing App</span>
                  <span className="text-sm text-gray-400">→</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;