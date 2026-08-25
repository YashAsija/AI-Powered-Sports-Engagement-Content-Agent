import React, { useMemo } from 'react';
import { SportsContentItem } from '../types';
import { calculateViralityScore, calculateBatchViralitySummary } from '../lib/viralityScorer';
import { ViralityTooltip } from './ViralityTooltip';
import { 
  TrendingUp, 
  Flame, 
  Sparkles, 
  Share2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  ChevronRight,
  Info,
  Calendar,
  Lightbulb,
  Brain,
  Target
} from 'lucide-react';

interface ViralityDashboardProps {
  items: SportsContentItem[];
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
}

export const ViralityDashboard: React.FC<ViralityDashboardProps> = ({
  items,
  selectedIndex,
  onSelectIndex,
}) => {
  const activeItem = items[selectedIndex] || items[0] || null;

  const currentScore = useMemo(() => {
    if (!activeItem) return null;
    return calculateViralityScore(activeItem);
  }, [activeItem]);

  const batchSummary = useMemo(() => {
    return calculateBatchViralitySummary(items);
  }, [items]);

  const allScores = useMemo(() => {
    return items.map((it, idx) => ({
      item: it,
      idx,
      score: calculateViralityScore(it),
    }));
  }, [items]);

  if (!activeItem || items.length === 0 || !currentScore) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[420px] transition-colors shadow-2xs">
        <TrendingUp className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-3" />
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
          Virality Dashboard
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Generate content cards to analyze algorithmic reach, engagement factors, and audience dwell predictions.
        </p>
      </div>
    );
  }

  // Get score color styling helper
  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
    if (score >= 82) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800';
    if (score >= 72) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex flex-col transition-colors shadow-2xs space-y-4">
      {/* 1. Header & Batch Overview */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
            <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Predicted Virality & Batch Analytics
            </h3>
          </div>
          
          <ViralityTooltip score={currentScore} focusMetric="overall" position="bottom">
            <span className="cursor-help text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors inline-flex items-center gap-1">
              <span>Batch Avg:</span>
              <strong className="text-orange-600 dark:text-orange-400">{batchSummary.averageScore}/100</strong>
              <Info className="w-2.5 h-2.5 text-slate-400" />
            </span>
          </ViralityTooltip>
        </div>

        {/* Batch Quick Health Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center mt-2.5">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">High Velocity</div>
            <div className="text-xs font-black text-purple-600 dark:text-purple-400 mt-0.5">
              {batchSummary.viralOutliersCount} / {items.length} cards
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Top Card</div>
            <div className="text-xs font-black text-orange-600 dark:text-orange-400 mt-0.5">
              #{batchSummary.topItemIndex + 1} ({batchSummary.topScore} pts)
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Est. Dwell</div>
            <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              ~{currentScore.metrics.projectedDwellSeconds}s / view
            </div>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Grid: Predicted Virality Deep-Dive (Left) + Batch Cards Ranked (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Side: Active Card Virality Deep-Dive */}
        <div className="lg:col-span-7 xl:col-span-7 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Card #{selectedIndex + 1} Deep-Dive
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {activeItem.type.replace(/_/g, ' ')}
              </span>
            </div>

            <ViralityTooltip score={currentScore} focusMetric="overall" position="bottom">
              <span className={`cursor-help text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${currentScore.tierColor}`}>
                <span>{currentScore.tier}</span>
                <Info className="w-2.5 h-2.5 opacity-60" />
              </span>
            </ViralityTooltip>
          </div>

          {/* Score Gauge Block with Interactive Tooltip */}
          <div className="flex items-center gap-3.5 my-3">
            <ViralityTooltip score={currentScore} focusMetric="overall" position="right">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs cursor-help hover:border-orange-400 dark:hover:border-orange-500 transition-colors group">
                <div className="text-center">
                  <div className="text-lg font-black text-slate-900 dark:text-white leading-none group-hover:text-orange-500 transition-colors">
                    {currentScore.overallScore}
                  </div>
                  <div className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter mt-0.5">
                    / 100
                  </div>
                </div>
              </div>
            </ViralityTooltip>

            <div className="flex-1 space-y-1.5 text-xs">
              {/* Hook Power Mini Bar */}
              <ViralityTooltip score={currentScore} focusMetric="hookPower" position="left" className="w-full">
                <div className="w-full cursor-help hover:opacity-85 transition-opacity">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Target className="w-2.5 h-2.5 text-orange-500" />
                      <span>Hook Power</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{currentScore.breakdown.hookPower}/25</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentScore.breakdown.hookPower / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </ViralityTooltip>

              {/* Format Dynamics / Engagement Mini Bar */}
              <ViralityTooltip score={currentScore} focusMetric="engagement" position="left" className="w-full">
                <div className="w-full cursor-help hover:opacity-85 transition-opacity">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-purple-500" />
                      <span>Format & Tap Dynamics</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{currentScore.breakdown.formatDynamics}/25</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentScore.breakdown.formatDynamics / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </ViralityTooltip>

              {/* Cognitive Complexity Mini Bar */}
              <ViralityTooltip score={currentScore} focusMetric="contentComplexity" position="left" className="w-full">
                <div className="w-full cursor-help hover:opacity-85 transition-opacity">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Brain className="w-2.5 h-2.5 text-blue-500" />
                      <span>Content Complexity</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{currentScore.breakdown.complexityBalance}/25</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentScore.breakdown.complexityBalance / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </ViralityTooltip>

              {/* Trend Recency & Topic Resonance Mini Bar */}
              <ViralityTooltip score={currentScore} focusMetric="trendRecency" position="left" className="w-full">
                <div className="w-full cursor-help hover:opacity-85 transition-opacity">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 text-emerald-500" />
                      <span>Trend & Entity Recency</span>
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{currentScore.breakdown.topicResonance}/25</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentScore.breakdown.topicResonance / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </ViralityTooltip>
            </div>
          </div>

          {/* 4 Interaction Factor Badges */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px]">
            <ViralityTooltip score={currentScore} focusMetric="contentComplexity" position="top">
              <div className="cursor-help flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800 w-full hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <Share2 className="w-3 h-3 text-purple-500 shrink-0" />
                <span>Shareability: <strong className="text-slate-900 dark:text-white">{currentScore.metrics.shareabilityPct}%</strong></span>
              </div>
            </ViralityTooltip>

            <ViralityTooltip score={currentScore} focusMetric="engagement" position="top">
              <div className="cursor-help flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800 w-full hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>Completion: <strong className="text-slate-900 dark:text-white">{currentScore.metrics.completionRatePct}%</strong></span>
              </div>
            </ViralityTooltip>

            <ViralityTooltip score={currentScore} focusMetric="engagement" position="top">
              <div className="cursor-help flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800 w-full hover:border-orange-300 dark:hover:border-orange-700 transition-colors">
                <MessageSquare className="w-3 h-3 text-orange-500 shrink-0" />
                <span>Debate Level: <strong className="text-slate-900 dark:text-white">{currentScore.metrics.debatePotentialPct}%</strong></span>
              </div>
            </ViralityTooltip>

            <ViralityTooltip score={currentScore} focusMetric="engagement" position="top">
              <div className="cursor-help flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200/60 dark:border-slate-800 w-full hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <Clock className="w-3 h-3 text-blue-500 shrink-0" />
                <span>Avg. Dwell: <strong className="text-slate-900 dark:text-white">{currentScore.metrics.projectedDwellSeconds}s</strong></span>
              </div>
            </ViralityTooltip>
          </div>

          {/* Optimization Tip & Best Post Window */}
          <div className="mt-2.5 p-2 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/50 flex items-start gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <div className="text-[10px] text-orange-900 dark:text-orange-300 leading-tight">
              <strong className="font-bold">Pro Tip:</strong> {currentScore.improvementTip}
            </div>
          </div>
        </div>

        {/* Right Side: Batch Cards Ranked List (Beside Predicted Virality) */}
        <div className="lg:col-span-5 xl:col-span-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-orange-500" />
              <span>Batch Cards Ranked</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Click to select card
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-0.5 custom-scrollbar">
            {allScores.map(({ item, idx, score }) => {
              const isSelected = selectedIndex === idx;
              const qTitle = (item as any).question || (item as any).statement || (item as any).prompt || (item as any).sentence || '';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-orange-500/70 dark:border-orange-500/60 text-slate-900 dark:text-white shadow-xs ring-1 ring-orange-500/20'
                      : 'bg-white/80 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold truncate leading-tight">
                        {qTitle}
                      </p>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">
                        {item.type.replace(/_/g, ' ')} · {item.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <ViralityTooltip score={score} focusMetric="overall" position="left">
                      <span className={`cursor-help px-2 py-0.5 rounded-md text-[10px] font-black border transition-transform hover:scale-105 ${getScoreBadgeColor(score.overallScore)}`}>
                        {score.overallScore} pts
                      </span>
                    </ViralityTooltip>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
