import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader, Play, Shield, Key, Database, FileText, Code, ExternalLink, Upload, Copy, RefreshCw, ChevronRight, ChevronDown, Users, BarChart3, DollarSign, Lock } from 'lucide-react';

const SetupWizard = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phases, setPhases] = useState([
    { id: 1, name: 'Dashboard Review & Test', status: 'completed', completed: true, description: 'Test all Dashboard features and fix any issues' },
    { id: 2, name: 'Google Play Developer API', status: 'pending', completed: false, description: 'Connect Play Console with Service Account' },
    { id: 3, name: 'Firebase + AdMob Setup', status: 'in_progress', completed: false, description: 'Create Firebase project and set up AdMob' },
    { id: 4, name: 'Security & Compliance', status: 'completed', completed: true, description: 'Privacy Policy, Terms, Keystore, Monetization' },
    { id: 5, name: 'Final Verification', status: 'pending', completed: false, description: 'End-to-end test and final confirmation' },
  ]);

  const [expandedPhase, setExpandedPhase] = useState(3);

  // Firebase Config (from browser automation)
  const firebaseConfig = {
    projectId: 'baki-d76fe',
    projectNumber: '923984156352',
    appId: '1:923984156352:android:9c3e8fe1c3e832f5e8bf25',
    packageName: 'com.ultraclaw.apps',
    appNickname: 'UltraClaw Apps'
  };

  // Keystore info
  const keystoreInfo = {
    alias: 'ultraclaw',
    location: '~/ultraclaw.keystore',
    status: 'Created'
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in_progress':
        return <Loader className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const isAllComplete = phases.every(p => p.completed);

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🚀 Initial Setup Wizard</h1>
        <p className="text-gray-400">Complete all setup phases to prepare UltraClaw for autonomous app creation</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Setup Progress</h2>
          <span className="text-indigo-400 font-medium">{phases.filter(p => p.completed).length} / {phases.length} Complete</span>
        </div>
        <div className="h-3 bg-[#252525] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${(phases.filter(p => p.completed).length / phases.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <div
            key={phase.id}
            className="bg-[#1e1e1e] rounded-2xl border border-[#2a2a2a] overflow-hidden"
          >
            {/* Phase Header */}
            <button
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-[#252525] transition-colors"
            >
              <div className="flex items-center gap-4">
                {getStatusIcon(phase.status)}
                <div className="text-left">
                  <h3 className={`font-bold ${phase.completed ? 'text-green-400' : 'text-white'}`}>{phase.name}</h3>
                  <p className="text-gray-400 text-sm">{phase.description}</p>
                </div>
              </div>
              {expandedPhase === phase.id ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Phase Content */}
            {expandedPhase === phase.id && (
              <div className="p-6 border-t border-[#2a2a2a]">
                {/* Phase 1: Dashboard Test - Complete */}
                {phase.id === 1 && (
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">All Dashboard Tests Passed</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">Overview, Apps History, Analytics, Review Queue, Update Center - all working!</p>
                    </div>
                  </div>
                )}

                {/* Phase 2: Google Play API */}
                {phase.id === 2 && (
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                      <h4 className="text-yellow-400 font-medium mb-2">⚠️ Needs Your Help</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        To connect Google Play Console, you need to create a Service Account.
                      </p>
                      <div className="space-y-2 text-sm text-gray-400">
                        <p>1. Go to <a href="https://play.google.com/console" target="_blank" className="text-indigo-400">Google Play Console</a></p>
                        <p>2. Settings → Developer account → API access</p>
                        <p>3. Create Service Account (or use existing)</p>
                        <p>4. Download JSON key file</p>
                        <p>5. Upload JSON in this dashboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg cursor-pointer hover:bg-[#252525]">
                        <Upload className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">Upload Service Account JSON</span>
                        <input type="file" accept=".json" className="hidden" />
                      </label>
                    </div>
                  </div>
                )}

                {/* Phase 3: Firebase + AdMob */}
                {phase.id === 3 && (
                  <div className="space-y-4">
                    {/* Firebase Config */}
                    <div className="p-4 bg-[#252525] rounded-xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-orange-400" />
                        Firebase Configuration
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Project ID</p>
                          <p className="text-white font-mono">{firebaseConfig.projectId}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">App ID</p>
                          <p className="text-white font-mono text-xs">{firebaseConfig.appId}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Package Name</p>
                          <p className="text-white font-mono">{firebaseConfig.packageName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">App Nickname</p>
                          <p className="text-white">{firebaseConfig.appNickname}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm">⬇️ Download google-services.json from Firebase Console → Project Settings → Your Apps → Download</p>
                      </div>
                    </div>

                    {/* AdMob Config */}
                    <div className="p-4 bg-[#252525] rounded-xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        AdMob Configuration
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="AdMob App ID (ca-app-pub-xxx...)"
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Banner Ad Unit ID"
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Interstitial Ad Unit ID"
                          className="input-field"
                        />
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-yellow-400 text-sm">1. Go to <a href="https://apps.admob.com" target="_blank" className="underline">AdMob</a></p>
                          <p className="text-yellow-400 text-sm">2. Create App → Add your app</p>
                          <p className="text-yellow-400 text-sm">3. Create Ad Units → Get IDs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phase 4: Security - Complete */}
                {phase.id === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                          <Lock className="w-5 h-5" />
                          Android Keystore
                        </h4>
                        <p className="text-gray-400 text-sm">Alias: {keystoreInfo.alias}</p>
                        <p className="text-gray-500 text-xs">Location: {keystoreInfo.location}</p>
                      </div>
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Monetization
                        </h4>
                        <p className="text-white">Free + AdMob</p>
                        <p className="text-gray-500 text-xs">Banner + Interstitial ads enabled</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#252525] rounded-xl">
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        Legal Documents
                      </h4>
                      <p className="text-gray-400 text-sm">Generated: PRIVACY_POLICY.md, TERMS_OF_SERVICE.md</p>
                      <p className="text-gray-500 text-xs">Upload to a public URL (e.g., GitHub Pages) for Play Store</p>
                    </div>
                  </div>
                )}

                {/* Phase 5: Final Verification */}
                {phase.id === 5 && (
                  <div className="space-y-4">
                    {!isAllComplete ? (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Loader className="w-10 h-10 text-blue-400 animate-spin" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Setup In Progress</h3>
                        <p className="text-gray-400">Complete the previous phases to run final verification.</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">All Setup Complete!</h3>
                        <p className="text-gray-400 mb-6">Your UltraClaw is ready for autonomous app creation.</p>
                        <button className="btn-primary text-lg px-8 py-3">
                          🚀 Ready to Start
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetupWizard;