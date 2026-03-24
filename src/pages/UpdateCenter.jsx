import { useState } from 'react';
import { RefreshCw, Search, MessageSquare, Package, ExternalLink, GitBranch } from 'lucide-react';
import { sampleData } from '../data/store';

const UpdateCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatePrompt, setUpdatePrompt] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const apps = sampleData.apps;

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateRequest = () => {
    if (!selectedApp || !updatePrompt.trim()) return;
    setIsUpdating(true);
    // In real implementation, this would trigger the update workflow
    setTimeout(() => {
      setIsUpdating(false);
      setSelectedApp(null);
      setUpdatePrompt('');
    }, 2000);
  };

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Update Center</h1>
        <p className="text-gray-400">Select an app and describe the changes you want to make</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* App Selection */}
        <div>
          <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a]">
            <h2 className="text-xl font-bold text-white mb-4">Select App to Update</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Apps List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 text-left transition-all ${
                    selectedApp?.id === app.id
                      ? 'bg-indigo-500/20 border-2 border-indigo-500'
                      : 'bg-[#252525] border-2 border-transparent hover:border-[#2a2a2a]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white">{app.name}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <p className="text-gray-500 text-sm">Last updated: {app.lastUpdated}</p>
                  </div>
                  {selectedApp?.id === app.id && (
                    <RefreshCw className="w-5 h-5 text-indigo-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Update Request Form */}
        <div>
          <div className={`bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] ${!selectedApp ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold text-white mb-4">Describe Your Update</h2>
            
            {selectedApp ? (
              <div className="space-y-6">
                {/* Selected App Info */}
                <div className="p-4 bg-[#252525] rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-xl">
                      {selectedApp.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{selectedApp.name}</h3>
                      <p className="text-gray-500 text-sm">ID: {selectedApp.id}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <p className="text-sm text-gray-400 mb-3">Quick Actions (click to auto-fill)</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Add dark mode',
                      'Fix bug in login',
                      'Update UI colors',
                      'Add new feature',
                      'Improve performance',
                      'Add analytics',
                    ].map((action) => (
                      <button
                        key={action}
                        onClick={() => setUpdatePrompt(action)}
                        className="px-3 py-1.5 bg-[#252525] rounded-lg text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Update Prompt *
                  </label>
                  <textarea
                    value={updatePrompt}
                    onChange={(e) => setUpdatePrompt(e.target.value)}
                    placeholder="Describe the changes you want to make in detail. For example:&#10;- Change the primary color to blue&#10;- Add a dark mode toggle in settings&#10;- Fix the crash when opening the profile page&#10;- Add a new feature for exporting data"
                    className="input-field h-48 resize-none"
                  />
                </div>

                {/* Example Prompts */}
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <h4 className="text-sm font-medium text-indigo-400 mb-2">💡 Example Prompts</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• "Change the app theme to dark mode with purple accents"</li>
                    <li>• "Add a new feature: PDF export for reports"</li>
                    <li>• "Fix the login bug that occurs on Android 14"</li>
                    <li>• "Add Google Analytics tracking for all screens"</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleUpdateRequest}
                  disabled={!updatePrompt.trim() || isUpdating}
                  className={`w-full btn-primary flex items-center justify-center gap-2 ${
                    !updatePrompt.trim() || isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing Update...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      Submit Update Request
                    </>
                  )}
                </button>

                {isUpdating && (
                  <div className="mt-4 p-4 bg-[#252525] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                      <span className="text-white font-medium">Processing Update Request</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>✓ Analyzing current codebase</p>
                      <p>→ Applying changes: {updatePrompt}</p>
                      <p className="text-gray-500">○ Building and testing</p>
                      <p className="text-gray-500">○ Updating dashboard</p>
                      <p className="text-gray-500">○ Ready for review</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#252525] flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400">Select an app from the list to start an update</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCenter;