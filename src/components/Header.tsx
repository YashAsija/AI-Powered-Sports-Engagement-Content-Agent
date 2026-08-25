import React from 'react';
import { 
  Trophy, 
  Database, 
  FileCode2, 
  Download,
  Share2,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  onGoHome?: () => void;
  onOpenDocs: () => void;
  onOpenVectorStore: () => void;
  onOpenExportModal: () => void;
  onOpenShareModal: () => void;
  totalBatchCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenDocs,
  onOpenVectorStore,
  onOpenExportModal,
  onOpenShareModal,
  totalBatchCount,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-2xs">
      <div className="w-full max-w-[1536px] mx-auto px-2.5 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Clean Title with Animated Icon */}
          <div 
            onClick={onGoHome}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <Trophy className="w-4 h-4 text-white drop-shadow-xs" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-white font-display bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 dark:from-white dark:via-slate-200 dark:to-orange-400 bg-clip-text text-transparent">
                  StapuBox
                </span>
                <span className="px-1.5 py-0.2 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider border border-orange-200/60 dark:border-orange-900/60">
                  STUDIO AI
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none hidden sm:inline">
                Sports Engagement Content Agent
              </span>
            </div>
          </div>

          {/* Minimal Status & Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Grounded</span>
            </div>

            <button
              id="header-btn-vector-store"
              type="button"
              onClick={onOpenVectorStore}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-all text-xs font-semibold inline-flex items-center gap-1.5 active:scale-95"
              title="ChromaDB Knowledge Base"
            >
              <Database className="w-4 h-4 text-orange-500" />
              <span className="hidden md:inline">Knowledge Base</span>
            </button>

            <button
              id="header-btn-architecture-docs"
              type="button"
              onClick={onOpenDocs}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-all text-xs font-semibold inline-flex items-center gap-1.5 active:scale-95"
              title="System Architecture & Schemas"
            >
              <FileCode2 className="w-4 h-4 text-blue-500" />
              <span className="hidden md:inline">Specs</span>
            </button>

            {totalBatchCount > 0 && (
              <>
                <button
                  id="header-btn-share-batch"
                  type="button"
                  onClick={onOpenShareModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50/90 hover:bg-orange-100 dark:bg-orange-950/50 dark:hover:bg-orange-900/60 border border-orange-200/80 dark:border-orange-900/60 rounded-xl transition-all shadow-xs active:scale-95"
                  title="Share Batch link or text digest"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                <button
                  id="header-btn-export-all"
                  type="button"
                  onClick={onOpenExportModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span> ({totalBatchCount})
                </button>
              </>
            )}

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />

            <button
              id="header-btn-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl transition-all active:scale-95"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};


