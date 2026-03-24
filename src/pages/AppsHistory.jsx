import { useState } from 'react';
import { Search, Filter, Star, Calendar, DollarSign, Download, ExternalLink } from 'lucide-react';
import { sampleData } from '../data/store';

const AppsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const apps = sampleData.apps;

  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return <span className="badge-live">Live</span>;
      case 'In Review':
        return <span className="badge-review">In Review</span>;
      case 'Updating':
        return <span className="badge-updating">Updating</span>;
      default:
        return <span className="badge-live">{status}</span>;
    }
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Apps History</h1>
          <p className="text-gray-400">All deployed apps with their current status and metrics</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Open in Play Console
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'live', 'in review', 'updating'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                filterStatus === status
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[#1e1e1e] text-gray-400 hover:text-white border border-[#2a2a2a]'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedApp(app)}
            className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] card-hover cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-3xl">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{app.name}</h3>
                  {getStatusBadge(app.status)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2a2a2a]">
              <div className="text-center">
                <p className="text-gray-500 text-xs mb-1">Revenue</p>
                <p className="font-bold text-green-400">${app.revenue.toFixed(0)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs mb-1">Downloads</p>
                <p className="font-bold text-white">{app.downloads.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs mb-1">Rating</p>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-white">{app.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {app.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* App Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setSelectedApp(null)}>
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-4xl">
                  {selectedApp.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                  {getStatusBadge(selectedApp.status)}
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-[#252525] rounded-xl p-4 text-center">
                <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <p className="text-gray-400 text-xs">Revenue</p>
                <p className="text-xl font-bold text-white">${selectedApp.revenue.toFixed(2)}</p>
              </div>
              <div className="bg-[#252525] rounded-xl p-4 text-center">
                <Download className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                <p className="text-gray-400 text-xs">Downloads</p>
                <p className="text-xl font-bold text-white">{selectedApp.downloads.toLocaleString()}</p>
              </div>
              <div className="bg-[#252525] rounded-xl p-4 text-center">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-400 text-xs">Rating</p>
                <p className="text-xl font-bold text-white">{selectedApp.rating}</p>
              </div>
              <div className="bg-[#252525] rounded-xl p-4 text-center">
                <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-xs">Updated</p>
                <p className="text-xl font-bold text-white">{selectedApp.lastUpdated}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="btn-primary flex-1">View Full Analytics</button>
              <button className="btn-secondary flex-1">Update App</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsHistory;