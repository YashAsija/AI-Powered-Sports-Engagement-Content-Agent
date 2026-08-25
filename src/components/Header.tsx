import React from 'react';
import { 
  Trophy, 
  Database, 
  FileCode2, 
  Download,
  Share2,
  Sun,
  Moon
} from 'lucide-react';

interface HeaderProps {
  onOpenDocs: () => void;
  onOpenVectorStore: () => void;
  onOpenExportModal: () => void;
  onOpenShareModal: () => void;
  totalBatchCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDocs,
  onOpenVectorStore,
  onOpenExportModal,
  onOpenShareModal,
  totalBatchCount,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Clean Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 dark:bg-orange-500 flex items-center justify-center text-white">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-display">
                StapuBox
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                Sports Engagement Studio
              </span>
            </div>
          </div>

          {/* Minimal Status & Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Grounded</span>
            </div>

            <button
              id="header-btn-vector-store"
              type="button"
              onClick={onOpenVectorStore}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 rounded-lg transition-colors text-xs font-medium inline-flex items-center gap-1.5"
              title="ChromaDB Knowledge Base"
            >
              <Database className="w-4 h-4" />
              <span className="hidden md:inline">Knowledge Base</span>
            </button>

            <button
              id="header-btn-architecture-docs"
              type="button"
              onClick={onOpenDocs}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 rounded-lg transition-colors text-xs font-medium inline-flex items-center gap-1.5"
              title="System Architecture & Schemas"
            >
              <FileCode2 className="w-4 h-4" />
              <span className="hidden md:inline">Specs</span>
            </button>

            {totalBatchCount > 0 && (
              <>
                <button
                  id="header-btn-share-batch"
                  type="button"
                  onClick={onOpenShareModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/50 border border-orange-200/80 dark:border-orange-900/60 rounded-lg transition-colors"
                  title="Share Batch link or text digest"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                <button
                  id="header-btn-export-all"
                  type="button"
                  onClick={onOpenExportModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span> ({totalBatchCount})
                </button>
              </>
            )}

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-0.5" />

            <button
              id="header-btn-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 rounded-lg transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


