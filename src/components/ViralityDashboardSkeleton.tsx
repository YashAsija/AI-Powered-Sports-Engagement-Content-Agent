import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

export const ViralityDashboardSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex flex-col transition-colors shadow-2xs space-y-4 overflow-hidden">
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-200/40 dark:via-slate-700/20 to-transparent pointer-events-none" />

      {/* Header & Batch Overview Skeleton */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
          
          <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
        </div>

        {/* Batch Quick Health Metrics Skeleton */}
        <div className="grid grid-cols-3 gap-1.5 text-center mt-2.5">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
            <div className="h-2.5 w-12 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-8 mx-auto bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
            <div className="h-2.5 w-14 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-8 mx-auto bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
            <div className="h-2.5 w-12 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-10 mx-auto bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Selected Card Score Big Gauge Skeleton */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/60 dark:to-slate-850/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-36 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
          </div>
          <div className="h-10 w-16 bg-orange-100 dark:bg-orange-950/60 rounded-xl animate-pulse" />
        </div>

        {/* Big Progress Bar */}
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden animate-pulse" />

        <div className="h-3 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Sub-Score Radar Factor Bars Skeleton */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-36 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        </div>

        {/* 4 Factor Bars */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-slate-300 dark:bg-slate-700 animate-pulse" />
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
              <div className="h-3 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Simulated Engagement Lift Card Skeleton */}
      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-amber-400/80 animate-pulse" />
          <div className="h-3.5 w-36 bg-amber-300/80 dark:bg-amber-800/60 rounded animate-pulse" />
        </div>
        <div className="h-3 w-full bg-amber-200/60 dark:bg-amber-900/40 rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-amber-200/60 dark:bg-amber-900/40 rounded animate-pulse" />
      </div>

      {/* Batch Cards Quick Navigator Skeleton */}
      <div className="space-y-1.5 pt-1">
        <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 animate-pulse flex flex-col items-center justify-center space-y-1">
              <div className="h-2 w-4 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-2.5 w-6 bg-slate-300 dark:bg-slate-600 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
