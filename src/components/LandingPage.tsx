import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  BarChart3, 
  Instagram,
  CheckCircle2,
  Brain,
  SlidersHorizontal,
  Share2,
  Flame,
  Target,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStartNow: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartNow,
  theme,
  onToggleTheme,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 bg-mesh-light dark:bg-mesh-dark">
      {/* Header / Navigation Bar */}
      <header className="border-b border-slate-200/70 dark:border-slate-800/80 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl sticky top-0 z-40">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = '#'}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Trophy className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white font-display">
                StapuBox
              </span>
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest leading-none">
                AI Agent Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              id="btn-landing-start-now-nav"
              type="button"
              onClick={onStartNow}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 transition-all shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/60 border border-orange-200/80 dark:border-orange-900/60 text-orange-700 dark:text-orange-300 text-xs font-extrabold mb-6 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Real-time Live Web Search Grounded AI Content Studio</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.12] mb-6 font-display"
        >
          Transform Live Sports Trivia & Stats into{' '}
          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 bg-clip-text text-transparent">
            Viral Social Content
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8 font-medium"
        >
          StapuBox is an autonomous sports content engine. Specify your target sport and topic focus filter, and our agent uncovers verified live records, transforms facts into 5 interactive formats, and scores virality algorithmically.
        </motion.p>

        {/* Primary Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <button
            id="btn-landing-start-now-hero"
            type="button"
            onClick={onStartNow}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 transition-all shadow-xl shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
          >
            <span>Start Now — Launch AI Studio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Interactive Feature Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-2">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 transition-all hover:border-orange-500/40">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Live Search Grounding</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Uses real-time Google Search grounding to discover verified records, recent tournament drama, and lesser-known sports facts without hallucination or static presets.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 transition-all hover:border-purple-500/40">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">5 High-Engagement Formats</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Converts sports facts into ready-to-publish Instagram formats: MCQ Quizzes, True/False challenges, This-or-That Fan Debate Polls, Fill-in-Blanks & Stat Guessing.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 transition-all hover:border-emerald-500/40">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Predicted Virality Scorer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Analyzes algorithmic hook power, format dynamics, dwell time, and audience shareability with a real-time side-by-side card ranking analytics engine.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/70 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>© 2026 StapuBox AI Agent Studio. Built for high-engagement sports social agencies.</p>
      </footer>
    </div>
  );
};
