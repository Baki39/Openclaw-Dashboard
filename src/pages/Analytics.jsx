import { useState } from 'react';
import { Rocket, AlertCircle } from 'lucide-react';

const Analytics = () => {
  const [selectedAppId, setSelectedAppId] = useState(null);

  // Empty state - no real apps yet
  const hasApps = false;
  const apps = [];

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed metrics for your apps</p>
      </div>

      {/* Empty State */}
      {!hasApps ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-12 h-12 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Apps to Analyze</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Once you deploy your first app, you'll be able to see detailed analytics 
            including downloads, revenue, ratings, reviews, retention, and more.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400">Type START to deploy your first app</span>
          </div>
        </div>
      ) : (
        <>
          {/* App Selector */}
          <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] mb-8">
            <select
              value={selectedAppId || ''}
              onChange={(e) => setSelectedAppId(parseInt(e.target.value))}
              className="input-field w-64"
            >
              <option value="">Select an app</option>
              {apps.filter(app => app.status === 'Live').map((app) => (
                <option key={app.id} value={app.id}>
                  {app.icon} {app.name}
                </option>
              ))}
            </select>
          </div>

          {/* Analytics Content would go here when apps exist */}
        </>
      )}
    </div>
  );
};

export default Analytics;