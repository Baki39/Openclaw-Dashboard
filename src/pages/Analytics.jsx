import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, DollarSign, Star, AlertTriangle, Users, TrendingUp, Calendar } from 'lucide-react';
import { sampleData, analyticsData } from '../data/store';

const Analytics = () => {
  const [selectedAppId, setSelectedAppId] = useState(1);
  const [timeRange, setTimeRange] = useState('7d');

  const selectedApp = sampleData.apps.find((app) => app.id === selectedAppId) || sampleData.apps[0];
  const analytics = analyticsData[selectedAppId] || analyticsData[1];

  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  const ratingData = Object.entries(analytics.ratings.distribution).map(([key, value]) => ({
    name: `${key} Star`,
    value,
    fill: COLORS[5 - parseInt(key)],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <p className="text-indigo-400 font-bold">
            {payload[0].dataKey === 'downloads' ? '' : '$'}
            {payload[0].value}
            {payload[0].dataKey === 'downloads' ? ' downloads' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Detailed metrics for your apps</p>
        </div>
        <select
          value={selectedAppId}
          onChange={(e) => setSelectedAppId(parseInt(e.target.value))}
          className="input-field w-64"
        >
          {sampleData.apps.filter(app => app.status === 'Live').map((app) => (
            <option key={app.id} value={app.id}>
              {app.icon} {app.name}
            </option>
          ))}
        </select>
      </div>

      {/* App Overview */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-3xl">
              {selectedApp.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{selectedApp.name}</h2>
              <span className="badge-live">Live</span>
            </div>
          </div>
          <div className="flex gap-4">
            {['7d', '30d', '90d', '1y'].map((range) => (
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-gray-400">Downloads</span>
          </div>
          <p className="text-3xl font-bold text-white">{selectedApp.downloads.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-2">↑ 12.5% from last month</p>
        </div>

        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-gray-400">Revenue</span>
          </div>
          <p className="text-3xl font-bold text-white">${selectedApp.revenue.toFixed(2)}</p>
          <p className="text-green-400 text-sm mt-2">↑ 8.3% from last month</p>
        </div>

        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-gray-400">Rating</span>
          </div>
          <p className="text-3xl font-bold text-white">{analytics.ratings.average}</p>
          <p className="text-gray-400 text-sm mt-2">{analytics.ratings.total} reviews</p>
        </div>

        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-gray-400">Crash Rate</span>
          </div>
          <p className="text-3xl font-bold text-white">{analytics.crashes.free}%</p>
          <p className="text-gray-400 text-sm mt-2">Below threshold</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Downloads & Revenue */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Daily Performance</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.daily}>
                <defs>
                  <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => v.split('-')[2]} />
                <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="downloads" stroke="#6366f1" fill="url(#downloadGradient)" />
                <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revenueGradient2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Monthly Trend</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="downloads" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Rating Distribution */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Rating Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {ratingData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-gray-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Retention */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Retention Rates</h3>
          <div className="space-y-4">
            {[
              { label: 'Day 1', value: analytics.retention.day1, color: '#6366f1' },
              { label: 'Day 7', value: analytics.retention.day7, color: '#818cf8' },
              { label: 'Day 30', value: analytics.retention.day30, color: '#a5b4fc' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#252525] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Recent Reviews</h3>
          <div className="space-y-3">
            {analytics.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="p-3 bg-[#252525] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{review.user}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;