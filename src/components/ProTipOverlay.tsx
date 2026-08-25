import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SportsContentItem } from '../types';
import { getProTipForContent, ProTipData } from '../lib/proTipEngine';
import { 
  Sparkles, 
  X, 
  Target, 
  Palette, 
  TrendingUp, 
  Clock, 
  Copy, 
  Check, 
  Smartphone, 
  Volume2, 
  Zap, 
  Layers,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

interface ProTipOverlayProps {
  item: SportsContentItem;
  isOpen: boolean;
  onClose: () => void;
  onSelectForSimulator?: (item: SportsContentItem) => void;
}

export const ProTipOverlay: React.FC<ProTipOverlayProps> = ({
  item,
  isOpen,
  onClose,
  onSelectForSimulator,
}) => {
  const [copiedSticker, setCopiedSticker] = useState<boolean>(false);
  const proTip: ProTipData = getProTipForContent(item);

  const handleCopySticker = () => {
    navigator.clipboard.writeText(proTip.stickerRecommendation.sampleText);
    setCopiedSticker(true);
    setTimeout(() => setCopiedSticker(false), 2200);
  };

  const handlePreviewInSimulator = () => {
    if (onSelectForSimulator) {
      onSelectForSimulator(item);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 rounded-2xl overflow-hidden backdrop-blur-md bg-slate-950/85 dark:bg-slate-950/90 text-white flex flex-col p-4 sm:p-5"
        >
          {/* Top Bar with Pro Tip Badge & Close */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md">
                <Lightbulb className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    Pro Reach Tip
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {proTip.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-tight mt-0.5">
                  {proTip.title}
                </h4>
              </div>
            </div>

            <button
              type="button"
              id={`btn-close-protip-${item.id}`}
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Pro Tip Overlay"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Contextual Advice Content */}
          <div className="flex-1 overflow-y-auto space-y-3.5 py-3 pr-1 text-xs custom-scrollbar">
            {/* Metric Lift Banner */}
            <div className="bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-purple-500/20 border border-orange-500/30 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 min-w-0">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-200 text-[11px] truncate">
                  Algorithm Impact:
                </span>
                <span className="text-[11px] text-white font-semibold truncate">
                  {proTip.reachAlgorithmBoost.expectedMetricLift}
                </span>
              </div>
            </div>

            {/* 1. Sticker Placement & Type */}
            <div className="bg-white/5 hover:bg-white/8 transition-colors rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-orange-400 font-bold text-xs">
                  <Target className="w-3.5 h-3.5" />
                  <span>Instagram Sticker Strategy</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {proTip.stickerRecommendation.name}
                </span>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">
                {proTip.stickerRecommendation.description}
              </p>

              <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>📍 Recommended Placement:</span>
                  <span className="text-orange-300 font-semibold">{proTip.stickerRecommendation.placement}</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  💡 {proTip.stickerRecommendation.idealZone}
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  id={`btn-copy-sticker-text-${item.id}`}
                  onClick={handleCopySticker}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[10px] font-bold transition-all cursor-pointer border border-white/10"
                >
                  {copiedSticker ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Sticker Text Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-orange-400" />
                      <span>Copy Sticker Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Visual Design & Contrast */}
            <div className="bg-white/5 hover:bg-white/8 transition-colors rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs">
                <Palette className="w-3.5 h-3.5" />
                <span>Visual Contrast & Aesthetics</span>
              </div>

              <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-slate-100">Background:</strong> {proTip.visualGuidance.backgroundAdvice}
                </li>
                <li>
                  <strong className="text-slate-100">Typography:</strong> {proTip.visualGuidance.typographyAdvice}
                </li>
                <li>
                  <strong className="text-slate-100">Anti-Glare:</strong> {proTip.visualGuidance.contrastTip}
                </li>
              </ul>
            </div>

            {/* 3. Algorithm Reach & Retention Loop */}
            <div className="bg-white/5 hover:bg-white/8 transition-colors rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Story Retention Loop</span>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                {proTip.reachAlgorithmBoost.retentionTactic}
              </p>

              <div className="text-[10px] text-emerald-300/90 font-medium bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40">
                🔄 {proTip.reachAlgorithmBoost.storyFlowTip}
              </div>
            </div>

            {/* 4. Posting Window & Sound */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                  <Clock className="w-3 h-3" />
                  <span>Best Posting Slot</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-snug">
                  {proTip.bestPostingWindow}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                <div className="flex items-center gap-1.5 text-pink-400 font-bold mb-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Soundbed</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-snug">
                  {proTip.soundOrMusicRecommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePreviewInSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer border border-white/10"
            >
              <Smartphone className="w-3.5 h-3.5 text-orange-400" />
              <span>Simulator</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Apply Tips</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
