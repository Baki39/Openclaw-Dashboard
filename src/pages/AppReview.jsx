import { useState } from 'react';
import { CheckCircle, XCircle, Edit3, Save, Code, Database, Shield, Package, ChevronRight, Send, GitBranch, ExternalLink } from 'lucide-react';

const AppReview = () => {
  const [editMode, setEditMode] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastEdit, setLastEdit] = useState('');

  // Current app being reviewed
  const app = {
    id: 1,
    name: 'AI Image Enhancer',
    icon: '🖼️',
    tagline: 'Enhance blurry photos with AI power',
    category: 'Photography',
    status: 'Ready for Review',
    
    // GitHub
    repoUrl: 'https://github.com/Baki39/AI-Image-Enhancer',
    
    // Tech Stack
    techStack: {
      language: 'Kotlin',
      framework: 'Jetpack Compose',
      minSdk: 24,
      targetSdk: 34,
      architecture: 'MVVM + Clean Architecture',
    },
    
    // API Integrations
    apiIntegrations: [
      { name: 'Google ML Kit', purpose: 'Image labeling & face detection', required: true },
      { name: 'Firebase Analytics', purpose: 'Track user behavior', required: true },
      { name: 'AdMob', purpose: 'Banner + Interstitial ads', required: true },
    ],
    
    // Features
    features: [
      'AI-powered photo enhancement',
      'One-tap quality boost',
      'Blur removal',
      'Resolution upscaling',
      'Before/After comparison',
      'Save & Share functionality',
      'Batch processing (Premium)',
    ],
    
    // Store Listing
    storeListing: {
      title: 'AI Image Enhancer - Photo Quality Booster',
      shortDescription: 'Enhance blurry photos with advanced AI technology',
      fullDescription: 'Transform your photos with AI-powered enhancement. Fix blur, upscale resolution, and make old photos crystal clear. Perfect for social media, printing, and memories.',
      tags: ['photo enhancer', 'ai photo', 'image quality', 'blur remover', 'photo editor'],
    },
    
    // Monetization
    monetization: 'Free (AdMob) + Premium ($2.99)',
    
    // Metrics
    projectedRevenue: '$200-500/month',
    developmentTime: '5-6 days',
  };

  const handleEditSubmit = () => {
    if (!editPrompt.trim()) return;
    setIsProcessing(true);
    setLastEdit(editPrompt);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setEditMode(false);
      setEditPrompt('');
    }, 1500);
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="badge-review">{app.status}</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-2">Review Your App</h1>
        <p className="text-gray-400">Review the generated app code and configuration</p>
      </div>

      {/* App Overview Card */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-500/30 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{app.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-white">{app.name}</h2>
              <p className="text-gray-400">{app.tagline}</p>
              <span className="badge-live mt-2 inline-block">{app.category}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Projected Revenue</p>
            <p className="text-2xl font-bold text-green-400">{app.projectedRevenue}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1e1e1e] rounded-xl p-4 text-center border border-[#2a2a2a]">
          <p className="text-gray-400 text-xs">Language</p>
          <p className="text-white font-bold">{app.techStack.language}</p>
        </div>
        <div className="bg-[#1e1e1e] rounded-xl p-4 text-center border border-[#2a2a2a]">
          <p className="text-gray-400 text-xs">Framework</p>
          <p className="text-white font-bold">Compose</p>
        </div>
        <div className="bg-[#1e1e1e] rounded-xl p-4 text-center border border-[#2a2a2a]">
          <p className="text-gray-400 text-xs">Min SDK</p>
          <p className="text-white font-bold">Android {app.techStack.minSdk}</p>
        </div>
        <div className="bg-[#1e1e1e] rounded-xl p-4 text-center border border-[#2a2a2a]">
          <p className="text-gray-400 text-xs">Dev Time</p>
          <p className="text-white font-bold">{app.developmentTime}</p>
        </div>
      </div>

      {/* Last Edit Notice */}
      {lastEdit && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-400 text-sm font-medium">📝 Last Edit Request:</p>
          <p className="text-white mt-1">{lastEdit}</p>
          <p className="text-gray-400 text-xs mt-2">Changes have been applied to the code.</p>
        </div>
      )}

      {/* Main Content - Scrollable */}
      <div className="space-y-6 mb-24">
        {/* GitHub Repository */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            Source Code
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">GitHub Repository</p>
              <a 
                href={app.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-2"
              >
                {app.repoUrl}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <a 
              href={app.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              View Code
            </a>
          </div>
        </div>

        {/* API Integrations */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-400" />
            API Integrations
          </h3>
          <div className="space-y-3">
            {app.apiIntegrations.map((api, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border ${
                  api.required 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-[#252525] border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{api.name}</p>
                    <p className="text-gray-400 text-sm">{api.purpose}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    api.required 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {api.required ? 'Required' : 'Optional'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">App Features</h3>
          <div className="flex flex-wrap gap-2">
            {app.features.map((feature, index) => (
              <span 
                key={index} 
                className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Store Listing Preview */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Play Store Preview
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-xs mb-1">Title (30 chars)</p>
              <p className="text-white">{app.storeListing.title}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Short Description (80 chars)</p>
              <p className="text-white">{app.storeListing.shortDescription}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Full Description</p>
              <p className="text-gray-300 text-sm">{app.storeListing.fullDescription}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Tags</p>
              <p className="text-gray-300 text-sm">{app.storeListing.tags.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Monetization */}
        <div className="bg-[#1e1e1e] rounded-xl p-6 border border-[#2a2a2a]">
          <h3 className="text-lg font-bold text-white mb-4">Monetization Strategy</h3>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-white font-medium">{app.monetization}</p>
          </div>
        </div>
      </div>

      {/* Edit Mode - Prompt Input */}
      {editMode && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-yellow-400" />
              Edit App Request
            </h2>
            
            <p className="text-gray-400 mb-4">
              Describe what changes you want to make to the app. Be specific!
            </p>
            
            <textarea
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              placeholder="Example: 
- Change the primary color to blue
- Add a dark mode toggle in settings
- Fix the crash when selecting images
- Add a new feature for batch processing
- Change the app name to 'Super Photo Enhancer'"
              className="input-field h-48 resize-none mb-6"
            />
            
            <div className="flex gap-4">
              <button 
                onClick={() => setEditMode(false)}
                className="btn-secondary flex-1"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                onClick={handleEditSubmit}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
                disabled={!editPrompt.trim() || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-[#1e1e1e] border-t border-[#2a2a2a] p-4 z-40">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button 
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-xl border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
          >
            <Edit3 className="w-5 h-5 text-yellow-400" />
            <span>Edit App</span>
          </button>
          
          <div className="text-gray-400 text-sm">
            {lastEdit && <span className="mr-4">Last edit applied ✓</span>}
            Review and confirm to proceed to Step 3
          </div>
          
          <button className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-400 transition-colors text-lg font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Confirmed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppReview;