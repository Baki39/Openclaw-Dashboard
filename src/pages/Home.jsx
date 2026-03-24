import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppWindow, DollarSign, Download, Activity, Plus, Rocket, AlertCircle, CheckCircle, Sparkles, ChevronRight, Info, Code, Database, Shield } from 'lucide-react';
import StatCard from '../components/StatCard';
import appIdeas, { getAppById } from '../data/appIdeas';

const Home = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Current app idea in progress
  const currentAppIdea = null;
  
  const hasData = false;
  const stats = {
    totalApps: 0,
    totalRevenue: 0,
    totalDownloads: 0,
    activeApps: 0,
  };

  const handleSelectApp = (app) => {
    setSelectedApp(app);
    setShowDetails(true);
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Select an app idea to build or monitor your existing apps</p>
      </div>

      {/* App Ideas Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Available App Ideas</h2>
          <span className="text-gray-400 text-sm">{appIdeas.length} ideas available</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appIdeas.map((app) => (
            <button
              key={app.id}
              onClick={() => handleSelectApp(app)}
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

      {/* Empty State */}
      {!hasData ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400">Select an app above to see details, then type "Confirmed"</span>
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
        </>
      )}

      {/* App Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setShowDetails(false)}>
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedApp.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                  <p className="text-gray-400">{selectedApp.tagline}</p>
                  <span className="badge-review mt-2 inline-block">{selectedApp.category}</span>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Quick Stats */}
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

            {/* Technical Details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                Technical Implementation
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs">Language</p>
                  <p className="text-white font-medium">{selectedApp.techStack.language}</p>
                </div>
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs">Framework</p>
                  <p className="text-white font-medium">{selectedApp.techStack.framework}</p>
                </div>
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs">Min SDK</p>
                  <p className="text-white font-medium">Android {selectedApp.techStack.minSdk}</p>
                </div>
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs">Architecture</p>
                  <p className="text-white font-medium">{selectedApp.techStack.architecture}</p>
                </div>
              </div>
            </div>

            {/* API Integrations */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-400" />
                API Integrations
              </h3>
              <div className="space-y-3">
                {selectedApp.apiIntegrations.map((api, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${api.required ? 'bg-green-500/10 border-green-500/30' : 'bg-[#252525] border-[#2a2a2a]'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{api.name}</p>
                        <p className="text-gray-400 text-sm">{api.purpose}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${api.required ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {api.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApp.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Store Listing Preview */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Play Store Preview
              </h3>
              <div className="bg-[#252525] rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-gray-400 text-xs">Title (30 chars)</p>
                  <p className="text-white">{selectedApp.storeListing.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Short Description (80 chars)</p>
                  <p className="text-white">{selectedApp.storeListing.shortDescription}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Tags</p>
                  <p className="text-gray-300 text-sm">{selectedApp.storeListing.tags.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Monetization */}
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-gray-400 text-sm mb-1">Monetization Strategy</p>
              <p className="text-white font-medium">{selectedApp.monetization}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowDetails(false)}
                className="flex-1 btn-primary text-lg py-4 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Select This App
              </button>
              <button 
                onClick={() => setShowDetails(false)}
                className="px-6 py-4 bg-[#252525] text-gray-400 rounded-xl border border-[#2a2a2a] hover:text-white"
              >
                Close
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              After selecting, type "Confirmed" in chat to start building
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;