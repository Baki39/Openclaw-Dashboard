import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader, Play, Shield, Key, Database, FileText, Code, ExternalLink, Upload, Copy, RefreshCw, ChevronRight, ChevronDown, Users, BarChart3, DollarSign, Lock } from 'lucide-react';

const SetupWizard = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phases, setPhases] = useState([
    { id: 1, name: 'Dashboard Review & Test', status: 'completed', completed: true, description: 'Test all Dashboard features and fix any issues' },
    { id: 2, name: 'Google Play Developer API', status: 'completed', completed: true, description: 'Connect Play Console with Service Account' },
    { id: 3, name: 'Firebase + AdMob Setup', status: 'completed', completed: true, description: 'Create Firebase project and set up AdMob' },
    { id: 4, name: 'Security & Compliance', status: 'completed', completed: true, description: 'Privacy Policy, Terms, Keystore, Monetization' },
    { id: 5, name: 'Final Verification', status: 'completed', completed: true, description: 'End-to-end test and final confirmation' },
  ]);

  const [expandedPhase, setExpandedPhase] = useState(5);

  // Firebase Config
  const firebaseConfig = {
    projectId: 'baki-d76fe',
    projectNumber: '923984156352',
    appId: '1:923984156352:android:9c3e8fe1c3e832f5e8bf25',
    packageName: 'com.ultraclaw.apps'
  };

  // AdMob Config
  const admobConfig = {
    appId: 'ca-app-pub-1767270019317558~5119562017',
    bannerAdUnitId: 'ca-app-pub-1767270019317558/4976091781',
    interstitialAdUnitId: 'ca-app-pub-1767270019317558/4360880662'
  };

  // Play Console info
  const playConsoleInfo = {
    accountId: '5065031898401685118',
    developerName: 'BaxShop',
    status: 'Active'
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
          <span className="text-green-400 font-medium">{phases.filter(p => p.completed).length} / {phases.length} Complete</span>
        </div>
        <div className="h-3 bg-[#252525] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-indigo-500 rounded-full transition-all duration-500"
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
                {/* All Phases Complete - Final Summary */}
                {isAllComplete && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <h4 className="text-green-400 font-medium mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Complete System Configuration
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Firebase */}
                        <div className="p-3 bg-[#252525] rounded-lg">
                          <p className="text-gray-400 text-xs">Firebase Project</p>
                          <p className="text-white font-mono">{firebaseConfig.projectId}</p>
                        </div>
                        {/* AdMob */}
                        <div className="p-3 bg-[#252525] rounded-lg">
                          <p className="text-gray-400 text-xs">AdMob App ID</p>
                          <p className="text-white font-mono text-xs">{admobConfig.appId}</p>
                        </div>
                        {/* Play Console */}
                        <div className="p-3 bg-[#252525] rounded-lg">
                          <p className="text-gray-400 text-xs">Play Console</p>
                          <p className="text-white font-mono">{playConsoleInfo.developerName} ({playConsoleInfo.accountId})</p>
                        </div>
                        {/* Keystore */}
                        <div className="p-3 bg-[#252525] rounded-lg">
                          <p className="text-gray-400 text-xs">Android Keystore</p>
                          <p className="text-white">{keystoreInfo.alias}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <p className="text-gray-400 text-xs">Ad Unit IDs:</p>
                        <code className="block p-2 bg-[#1a1a1a] rounded text-green-400 text-xs">Banner: {admobConfig.bannerAdUnitId}</code>
                        <code className="block p-2 bg-[#1a1a1a] rounded text-green-400 text-xs">Interstitial: {admobConfig.interstitialAdUnitId}</code>
                      </div>
                    </div>

                    <div className="text-center py-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">🎉 All Systems Ready!</h3>
                      <p className="text-gray-400 mb-6 text-lg">UltraClaw God-Mode 2026 is fully configured and ready to create profitable Android apps!</p>
                      
                      <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl inline-block">
                        <p className="text-white font-bold text-xl">🚀 Type START in the chat to begin the first profitable app cycle!</p>
                      </div>
                    </div>
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