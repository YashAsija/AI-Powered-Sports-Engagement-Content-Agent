import React from 'react';
import { motion } from 'motion/react';

interface ContentCardSkeletonProps {
  index?: number;
}

export const ContentCardSkeleton: React.FC<ContentCardSkeletonProps> = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-xs space-y-4"
    >
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-200/40 dark:via-slate-700/20 to-transparent pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {/* Format Badge */}
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
          {/* Sport / Difficulty Pill */}
          <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800/80 rounded-md animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          {/* Virality Pill Placeholder */}
          <div className="h-5 w-14 bg-orange-100/70 dark:bg-orange-950/40 rounded-full animate-pulse" />
          {/* Action Button */}
          <div className="h-6 w-6 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Instagram Hook / Header Placeholder */}
      <div className="space-y-2">
        <div className="h-3.5 w-28 bg-orange-200/60 dark:bg-orange-900/30 rounded-md animate-pulse" />
        {/* Main Question / Statement lines */}
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
        <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
      </div>

      {/* Interactive Options Placeholder (MCQ / Poll / Blank) */}
      <div className="space-y-2 py-1">
        <div className="h-9 w-full bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3 gap-2 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700/80 rounded" />
        </div>
        <div className="h-9 w-full bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3 gap-2 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700/80 rounded" />
        </div>
        <div className="h-9 w-full bg-slate-100 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center px-3 gap-2 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700" />
          <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700/80 rounded" />
        </div>
      </div>

      {/* Pro Tip Strip Skeleton */}
      <div className="h-8 w-full bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/40 dark:border-amber-900/30 flex items-center px-3 justify-between animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-amber-400/70 rounded" />
          <div className="h-2.5 w-36 bg-amber-200/80 dark:bg-amber-800/60 rounded" />
        </div>
        <div className="h-2.5 w-12 bg-amber-200/80 dark:bg-amber-800/60 rounded" />
      </div>

      {/* Bottom Citation & Actions */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/80 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
