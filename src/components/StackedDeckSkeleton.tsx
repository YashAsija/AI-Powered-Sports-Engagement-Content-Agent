import React from 'react';
import { motion } from 'motion/react';
import { Layers, Sparkles } from 'lucide-react';

export const StackedDeckSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Top Deck Navigation Controls Skeleton */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-5 w-16 bg-orange-100 dark:bg-orange-950/40 rounded-full animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* 3D Stack Container Skeleton */}
      <div className="relative w-full min-h-[500px] sm:min-h-[520px] flex items-center justify-center">
        {/* Layer 3: Backmost card */}
        <motion.div
          animate={{ scale: [0.86, 0.88, 0.86], y: [34, 38, 34] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          className="absolute w-[88%] h-[440px] bg-slate-200/60 dark:bg-slate-850/60 rounded-2xl border border-slate-300/40 dark:border-slate-800/40 opacity-40 shadow-xs pointer-events-none"
        />

        {/* Layer 2: Middle card */}
        <motion.div
          animate={{ scale: [0.93, 0.95, 0.93], y: [16, 20, 16] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.2 }}
          className="absolute w-[94%] h-[460px] bg-slate-100 dark:bg-slate-850 rounded-2xl border border-slate-300/60 dark:border-slate-750 opacity-70 shadow-sm pointer-events-none"
        />

        {/* Layer 1: Front Active Card Skeleton */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.4 }}
          className="relative w-full max-w-[560px] min-h-[480px] bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-400/40 dark:border-orange-500/30 p-5 flex flex-col justify-between shadow-xl overflow-hidden"
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-200/50 dark:via-slate-700/30 to-transparent pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-orange-100 dark:bg-orange-950/60 rounded-full animate-pulse flex items-center px-2 gap-1.5">
                <Sparkles className="w-3 h-3 text-orange-500 animate-spin" />
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">Verifying...</span>
              </div>
              <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 bg-purple-100 dark:bg-purple-950/50 rounded-full animate-pulse" />
              <div className="h-7 w-7 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Center Content Placeholder */}
          <div className="space-y-3.5 my-auto py-2">
            <div className="h-4 w-32 bg-orange-200/60 dark:bg-orange-900/30 rounded animate-pulse" />
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
            <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />

            {/* Simulated Quiz / Poll Items */}
            <div className="space-y-2.5 pt-2">
              <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3.5 gap-2.5 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 font-bold" />
                <div className="h-3.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3.5 gap-2.5 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 font-bold" />
                <div className="h-3.5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
              <div className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3.5 gap-2.5 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 font-bold" />
                <div className="h-3.5 w-3/5 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>

            {/* Pro Tip Strip Skeleton */}
            <div className="h-9 w-full bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/60 dark:border-amber-900/50 flex items-center px-3 justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-400 rounded-md" />
                <div className="h-3 w-40 bg-amber-200 dark:bg-amber-800/80 rounded" />
              </div>
              <div className="h-3 w-16 bg-amber-300 dark:bg-amber-800 rounded" />
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="h-3.5 w-40 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-8 w-24 bg-orange-500/40 rounded-xl animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Pips & Swipe Hint Skeleton */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="w-6 h-2 bg-orange-500 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
