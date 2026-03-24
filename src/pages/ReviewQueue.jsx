import { useState } from 'react';
import { CheckCircle, XCircle, ExternalLink, Download, MessageSquare, Eye, Code, Package, GitBranch } from 'lucide-react';
import { sampleData } from '../data/store';

const ReviewQueue = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const reviewQueue = sampleData.reviewQueue;

  const getStepIcon = (step) => {
    if (step.includes('Code')) return <Code className="w-5 h-5" />;
    if (step.includes('Build')) return <Package className="w-5 h-5" />;
    if (step.includes('Listing') || step.includes('ASO')) return <Eye className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review Queue</h1>
          <p className="text-gray-400">Apps waiting for your approval to proceed</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-xl">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400 font-medium">{reviewQueue.length} Pending</span>
          </div>
        </div>
      </div>

      {reviewQueue.length === 0 ? (
        <div className="bg-[#1e1e1e] rounded-2xl p-12 border border-[#2a2a2a] text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">All Caught Up!</h2>
          <p className="text-gray-400">No apps pending review. Start a new app cycle to begin.</p>
          <button className="btn-primary mt-6">Start New App Cycle</button>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewQueue.map((app) => (
            <div
              key={app.id}
              className="bg-[#1e1e1e] rounded-2xl p-6 border border-[#2a2a2a] animate-fade-in"
            >
              {/* App Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-3xl">
                    {app.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{app.name}</h2>
                    <p className="text-gray-400 text-sm">{app.description}</p>
                    <span className="badge-review mt-2 inline-block">Ready for Review</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Step Progress */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Current Status</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                    {getStepIcon(app.step)}
                    <span className="text-sm font-medium">{app.step}</span>
                  </div>
                  <div className="flex-1 h-1 bg-[#252525] rounded-full">
                    <div className="h-full w-1/2 bg-indigo-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">ASO</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Deploy</span>
                  </div>
                </div>
              </div>

              {/* App Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs mb-1">Projected Revenue</p>
                  <p className="text-xl font-bold text-green-400">{app.projectedRevenue}</p>
                </div>
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs mb-1">Code Repository</p>
                  <a
                    href={app.codeRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm font-medium">View Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="bg-[#252525] rounded-xl p-4">
                  <p className="text-gray-400 text-xs mb-1">Download APK</p>
                  <a
                    href={app.apkLink}
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm font-medium">Download</span>
                  </a>
                </div>
              </div>

              {/* Screenshot Preview */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Screenshot Preview</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {app.screenshots.map((src, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-80 rounded-xl overflow-hidden border border-[#2a2a2a]"
                    >
                      <img
                        src={src}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#2a2a2a]">
                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setFeedbackMode(true);
                  }}
                  className="btn-secondary flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Request Changes
                </button>
                <div className="flex gap-4">
                  <button className="btn-secondary flex items-center gap-2 text-red-400 border-red-400/30 hover:bg-red-400/10">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button className="btn-primary flex items-center gap-2 bg-green-500 hover:bg-green-400">
                    <CheckCircle className="w-4 h-4" />
                    Confirm & Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackMode && selectedApp && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Request Changes</h2>
              <button
                onClick={() => setFeedbackMode(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">App: {selectedApp.name}</p>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Describe the changes you'd like to make
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="e.g., Change the UI color to blue, add a dark mode feature, fix the login bug..."
                className="input-field h-40 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setFeedbackMode(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedApp && !feedbackMode && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-8" onClick={() => setSelectedApp(null)}>
          <div className="bg-[#1e1e1e] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-3xl">
                  {selectedApp.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedApp.name}</h2>
                  <span className="badge-review">Ready for Review</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">App Information</h3>
                <div className="space-y-4">
                  <div className="bg-[#252525] rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Description</p>
                    <p className="text-white">{selectedApp.description}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Projected Revenue</p>
                    <p className="text-green-400 font-bold">{selectedApp.projectedRevenue}</p>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-4">
                    <p className="text-gray-400 text-xs mb-1">Current Step</p>
                    <p className="text-indigo-400">{selectedApp.step}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Links & Resources</h3>
                <div className="space-y-4">
                  <a
                    href={selectedApp.codeRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[#252525] rounded-xl hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <GitBranch className="w-5 h-5 text-white" />
                      <span className="text-white">View Source Code</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href={selectedApp.apkLink}
                    className="flex items-center justify-between p-4 bg-[#252525] rounded-xl hover:bg-[#2a2a2a] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-white" />
                      <span className="text-white">Download APK</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Screenshots</h3>
              <div className="flex gap-4 overflow-x-auto">
                {selectedApp.screenshots.map((src, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-56 h-96 rounded-xl overflow-hidden border border-[#2a2a2a]"
                  >
                    <img
                      src={src}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-[#2a2a2a]">
              <button
                onClick={() => {
                  setFeedbackMode(true);
                }}
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Request Changes
              </button>
              <button className="btn-primary flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400">
                <CheckCircle className="w-4 h-4" />
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;