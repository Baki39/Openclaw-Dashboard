import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppWindow, DollarSign, Download, Activity, Plus, Rocket, AlertCircle, CheckCircle, Sparkles, ChevronRight, Info, Code, Database, Shield, GitBranch, ExternalLink } from 'lucide-react';
import StatCard from '../components/StatCard';
import appIdeas, { getAppById as getAppIdeaById } from '../data/appIdeas';
import { dashboardData, getStatusBadge, formatCurrency, formatNumber } from '../data/store';

const Home = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBuiltApp, setSelectedBuiltApp] = useState(null);
  
  const hasData = dashboardData.apps.length > 0;
  const stats = dashboardData.stats;

  const handleSelectAppIdea = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
    setSelectedBuiltApp(null);
  };

  const handleSelectBuiltApp = (app) => {
    setSelectedBuiltApp(app);
    setShowDetails(true);
    setSelectedApp(null);
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">
          {hasData 
            ? `${stats.totalApps} app(s) deployed • ${formatCurrency(stats.totalRevenue)} revenue • ${formatNumber(stats.totalDownloads)} downloads`
            : 'Select an app idea to build or monitor your existing apps'
          }
        </p>
      </div>

      {/* Deployed Apps Section */}
      {hasData && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">📱 Your Apps</h2>
            <span className="text-gray-400 text-sm">{dashboardData.apps.length} app(s)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {dashboardData.apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleSelectBuiltApp(app)}
                className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] ${
                  selectedBuiltApp?.id === app.id
                    ? 'bg-green-500/20 border-green-500'
                    : 'bg-[#1e1e1e] border-[#2a2a2a] hover:border-green-500/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{app.name}</h3>
                    <p className="text-gray-400 text-sm">{app.packageName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${getStatusBadge(app.status) === 'badge-live' ? 'bg-green-500/20 text-green-400' : getStatusBadge(app.status) === 'badge-updating' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* App Ideas Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">💡 Available App Ideas</h2>
          <span className="text-gray-400 text-sm">{appIdeas.length} ideas available</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appIdeas.map((app) => (
            <button
              key={app.id}
              onClick={() => handleSelectAppIdea(app)}
              className={`p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] ${
                selectedApp?.id === app.id
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'bg-[#1e1e1e] border-[#2a2a2a] hover:border-indigo-500/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{app.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{app.name}</h3>
                  <p className="text-gray-400 text-sm">{app.tagline}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">{app.searchVolume}</span>
                    <span className="text-xs text-green-400">{app.revenue}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid - Only show if we have data */}
      {hasData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Apps" value={stats.totalApps} icon={AppWindow} change={0} />
          <StatCard title="Revenue (This Month)" value={stats.totalRevenue} icon={DollarSign} change={0} format="currency" />
          <StatCard title="Total Downloads" value={stats.totalDownloads} icon={Download} change={0} format="compact" />
          <StatCard title="Active Apps" value={stats.activeApps} icon={Activity} />
        </div>
      )}

      {/* App Details Modal */}
      {showDetails && (selectedApp || selectedBuiltApp) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowDetails(false)}>
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {selectedApp ? (
              // App Idea Details
              <>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{selectedApp.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                      <p className="text-gray-400">{selectedApp.tagline}</p>
                      <span className="badge-review mt-2 inline-block">{selectedApp.category}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#252525] rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs">Search Volume</p>
                    <p className="text-white font-bold">{selectedApp.searchVolume}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs">Difficulty</p>
                    <p className="text-white font-bold">{selectedApp.difficulty}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs">Revenue</p>
                    <p className="text-green-400 font-bold">{selectedApp.revenue}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4 text-center">
                    <p className="text-gray-400 text-xs">Dev Time</p>
                    <p className="text-white font-bold">{selectedApp.developmentTime}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-400" /> Technical Implementation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#252525] rounded-xl p-4"><p className="text-gray-400 text-xs">Language</p><p className="text-white font-medium">{selectedApp.techStack.language}</p></div>
                    <div className="bg-[#252525] rounded-xl p-4"><p className="text-gray-400 text-xs">Framework</p><p className="text-white font-medium">{selectedApp.techStack.framework}</p></div>
                    <div className="bg-[#252525] rounded-xl p-4"><p className="text-gray-400 text-xs">Min SDK</p><p className="text-white font-medium">Android {selectedApp.techStack.minSdk}</p></div>
                    <div className="bg-[#252525] rounded-xl p-4"><p className="text-gray-400 text-xs">Architecture</p><p className="text-white font-medium">{selectedApp.techStack.architecture}</p></div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 btn-primary text-lg py-4 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Select & Build
                  </button>
                  <button onClick={() => setShowDetails(false)} className="px-6 py-4 bg-[#252525] text-gray-400 rounded-xl border border-[#2a2a2a] hover:text-white">Close</button>
                </div>
              </>
            ) : (
              // Built App Details
              <>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{selectedBuiltApp.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedBuiltApp.name}</h2>
                      <p className="text-gray-400">{selectedBuiltApp.packageName}</p>
                      <span className="badge-updating mt-2 inline-block">{selectedBuiltApp.status}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#252525] rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Downloads</p>
                    <p className="text-white font-bold">{formatNumber(selectedBuiltApp.downloads)}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Revenue</p>
                    <p className="text-green-400 font-bold">{formatCurrency(selectedBuiltApp.revenue)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a href={selectedBuiltApp.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-[#252525] rounded-xl hover:bg-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-5 h-5 text-white" />
                      <span className="text-white">View Source Code</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="flex-1 btn-primary text-lg py-4 flex items-center justify-center gap-2">
                    <Rocket className="w-5 h-5" /> Deploy to Play Store
                  </button>
                  <button onClick={() => setShowDetails(false)} className="px-6 py-4 bg-[#252525] text-gray-400 rounded-xl border border-[#2a2a2a] hover:text-white">Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;