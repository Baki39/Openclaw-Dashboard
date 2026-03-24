import { useState } from 'react';
import { CheckCircle, Rocket, AlertCircle } from 'lucide-react';

const ReviewQueue = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  // Empty state - no apps in review queue
  const reviewQueue = [];

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review Queue</h1>
          <p className="text-gray-400">Apps waiting for your approval to proceed</p>
        </div>
      </div>

      {/* Empty State */}
      {reviewQueue.length === 0 ? (
        <div className="bg-[#1e1e1e] rounded-2xl p-12 border border-[#2a2a2a] text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-10 h-10 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Apps Pending Review</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            When UltraClaw builds a new app, it will appear here for your review 
            before being deployed to the Play Store.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400">Type START to create your first app</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Apps in queue would be rendered here */}
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
              <button className="btn-primary flex-1">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewQueue;