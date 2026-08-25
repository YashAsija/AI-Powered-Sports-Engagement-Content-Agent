import React from 'react';
import { 
  X, 
  Layers, 
  Search, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Trophy
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Architecture & Grounding Pipeline
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Technical pipeline specifications for factual sports content generation
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Overview */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-1 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              <span>Multi-Format Generation</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-normal">
              Synthesizes 5 interactive engagement formats (MCQs, True/False, Polls, Fill-in-the-Blank, and Guess the Number) verified with dual grounding against hallucination.
            </p>
          </div>

          {/* Formats */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Supported Formats</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850">
                <div className="font-medium text-slate-800 dark:text-slate-200">1. Multiple Choice (MCQ)</div>
                <p className="text-[11px] text-slate-500 mt-0.5">4 options, 1 verified correct answer, explanation & hook.</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850">
                <div className="font-medium text-slate-800 dark:text-slate-200">2. True / False</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Sports statement testing common misconceptions.</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850">
                <div className="font-medium text-slate-800 dark:text-slate-200">3. Fan Poll</div>
                <p className="text-[11px] text-slate-500 mt-0.5">2-choice opinion debate with no right or wrong answer.</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850">
                <div className="font-medium text-slate-800 dark:text-slate-200">4. Fill in the Blank</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Sentence with blank token and 4 precise options.</p>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 sm:col-span-2">
                <div className="font-medium text-slate-800 dark:text-slate-200">5. Guess the Number</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Exact numeric target stat with tolerance range for slider stickers.</p>
              </div>
            </div>
          </div>

          {/* Dual Grounding Pipeline */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-2 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verification Pipeline</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-start gap-2.5">
                <Search className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">Google Search Grounding</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Real-time web search for current tournament stats, player transfers, and recent records with citations.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-start gap-2.5">
                <Database className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">Vector Knowledge Store</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Semantic vector store indexing historical world records, milestone statistics, and rulebooks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
