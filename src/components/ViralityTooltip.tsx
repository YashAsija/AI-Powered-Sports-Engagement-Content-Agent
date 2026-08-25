import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViralityScore } from '../types';
import { 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Brain, 
  Target, 
  Share2, 
  Zap, 
  Clock, 
  Info,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface ViralityTooltipProps {
  score: ViralityScore;
  focusMetric?: 'overall' | 'engagement' | 'trendRecency' | 'contentComplexity' | 'hookPower';
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const ViralityTooltip: React.FC<ViralityTooltipProps> = ({
  score,
  focusMetric = 'overall',
  children,
  position = 'top',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 120); // slight debounce for smooth UX
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute z-50 pointer-events-none w-72 sm:w-80 p-3.5 rounded-2xl bg-slate-950/95 dark:bg-slate-900/98 backdrop-blur-md text-white border border-slate-700/80 shadow-2xl ${getPositionClasses()}`}
          >
            {/* Header / Score Banner */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-orange-500/20 text-orange-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold text-slate-200">
                  Virality Breakdown
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-orange-400">
                  {score.overallScore}/100
                </span>
                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md border ${score.tierColor}`}>
                  {score.tier}
                </span>
              </div>
            </div>

            {/* Metric Rationales Breakdown */}
            <div className="space-y-2 text-left">
              {/* 1. Engagement Driver */}
              <div className={`p-2 rounded-xl border transition-colors ${
                focusMetric === 'engagement' || focusMetric === 'overall'
                  ? 'bg-slate-900/90 dark:bg-slate-800/80 border-purple-500/40'
                  : 'bg-transparent border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold text-purple-300 mb-0.5">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-purple-400" />
                    Format & Engagement Dynamics
                  </span>
                  <span className="text-purple-300">{score.breakdown.formatDynamics}/25 pts</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                  {score.rationales.engagement}
                </p>
              </div>

              {/* 2. Trend Recency & Topic Resonance */}
              <div className={`p-2 rounded-xl border transition-colors ${
                focusMetric === 'trendRecency' || focusMetric === 'overall'
                  ? 'bg-slate-900/90 dark:bg-slate-800/80 border-orange-500/40'
                  : 'bg-transparent border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold text-orange-300 mb-0.5">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    Trend Recency & Topic Resonance
                  </span>
                  <span className="text-orange-300">{score.breakdown.topicResonance}/25 pts</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                  {score.rationales.trendRecency}
                </p>
              </div>

              {/* 3. Content Complexity */}
              <div className={`p-2 rounded-xl border transition-colors ${
                focusMetric === 'contentComplexity' || focusMetric === 'overall'
                  ? 'bg-slate-900/90 dark:bg-slate-800/80 border-blue-500/40'
                  : 'bg-transparent border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-300 mb-0.5">
                  <span className="flex items-center gap-1">
                    <Brain className="w-3 h-3 text-blue-400" />
                    Content & Cognitive Complexity
                  </span>
                  <span className="text-blue-300">{score.breakdown.complexityBalance}/25 pts</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                  {score.rationales.contentComplexity}
                </p>
              </div>

              {/* 4. Hook Power */}
              {(focusMetric === 'hookPower' || focusMetric === 'overall') && (
                <div className="p-2 rounded-xl bg-slate-900/90 dark:bg-slate-800/80 border border-emerald-500/40">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-emerald-400" />
                      Thumb-Stopping Hook Power
                    </span>
                    <span className="text-emerald-300">{score.breakdown.hookPower}/25 pts</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    {score.rationales.hookPower}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Metrics Footer */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400">
              <span className="flex items-center gap-1">
                <Share2 className="w-2.5 h-2.5 text-purple-400" />
                {score.metrics.shareabilityPct}% Shareability
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                {score.metrics.completionRatePct}% Completion
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-blue-400" />
                ~{score.metrics.projectedDwellSeconds}s Dwell
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
