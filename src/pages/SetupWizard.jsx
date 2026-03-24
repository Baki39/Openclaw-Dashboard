import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader, Play, Shield, Key, Database, FileText, Code, ExternalLink, Upload, Copy, RefreshCw, ChevronRight, ChevronDown, Users, BarChart3, DollarSign, Lock, Rocket, Sparkles } from 'lucide-react';

const SetupWizard = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phases, setPhases] = useState([
    { id: 1, name: 'Dashboard Review & Test', status: 'completed', completed: true, description: 'Test all Dashboard features and fix any issues' },
    { id: 2, name: 'Google Play Developer API', status: 'completed', completed: true, description: 'Connect Play Console with Service Account' },
    { id: 3, name: 'Firebase + AdMob Setup', status: 'completed', completed: true, description: 'Create Firebase project and set up AdMob' },
    { id: 4, name: 'Security & Compliance', status: 'completed', completed: true, description: 'Privacy Policy, Terms, Keystore, Monetization' },
    { id: 5, name: 'Final Verification', status: 'completed', completed: true, description: 'End-to-end test and final confirmation' },
  ]);

  const [expandedPhase, setExpandedPhase] = useState(null);

  // App Idea Data
  const appIdea = {
    name: 'AI Image Enhancer',
    icon: '🖼️',
    primaryKeyword: 'AI Photo Enhancer',
    searchVolume: '15,000+/month',
    difficulty: 'Low-Medium (32/100)',
    revenue: '$200-500/month',
    developmentTime: '5-6 days',
    status: 'Waiting for Confirmation',
    features: [
      'AI-powered photo enhancement',
      'One-tap quality boost',
      'Blur removal',
      'Resolution upscaling',
      'Before/After comparison',
      'Save & Share functionality',
      'AdMob integration'
    ],
    monetization: 'Free (AdMob) + Premium ($2.99)'
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
                {isAllComplete && phase.id === 5 && (
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">🎉 Setup Complete!</h3>
                      <p className="text-gray-400 mb-4">UltraClaw is ready to create your first profitable app</p>
                    </div>

                    {/* App Idea Card */}
                    <div className="bg-[#252525] rounded-2xl p-6 border border-indigo-500/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{appIdea.icon}</div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{appIdea.name}</h4>
                            <span className="badge-review">{appIdea.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <p className="text-gray-500 text-xs">Primary Keyword</p>
                          <p className="text-white font-medium">{appIdea.primaryKeyword}</p>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <p className="text-gray-500 text-xs">Search Volume</p>
                          <p className="text-white font-medium">{appIdea.searchVolume}</p>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <p className="text-gray-500 text-xs">Difficulty</p>
                          <p className="text-white font-medium">{appIdea.difficulty}</p>
                        </div>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <p className="text-gray-500 text-xs">Revenue</p>
                          <p className="text-green-400 font-medium">{appIdea.revenue}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-2">Key Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {appIdea.features.slice(0, 5).map((f, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                              {f}
                            </span>
                          ))}
                          <span className="px-3 py-1 bg-gray-700 text-gray-400 rounded-full text-xs">
                            +{appIdea.features.length - 5} more
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
                        <div>
                          <p className="text-white font-medium">Monetization Strategy</p>
                          <p className="text-gray-400 text-sm">{appIdea.monetization}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">Development Time</p>
                          <p className="text-indigo-400 font-medium">{appIdea.developmentTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button className="flex-1 btn-primary text-lg py-4 flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Confirm & Start Building
                      </button>
                      <button className="px-6 py-4 bg-[#252525] text-gray-400 rounded-xl border border-[#2a2a2a] hover:text-white">
                        Request Changes
                      </button>
                    </div>

                    <p className="text-center text-gray-500 text-sm">
                      Type "Confirmed" in chat to proceed, or request modifications to this app idea
                    </p>
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