import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { SportsContentItem } from '../types';
import { ContentCard } from './ContentCard';
import { 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Smartphone, 
  ArrowRight, 
  Zap,
  Hand,
  Keyboard,
  Check,
  Share2
} from 'lucide-react';

interface StackedCardsDeckProps {
  items: SportsContentItem[];
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
  onRegenerateSingle: (item: SportsContentItem) => Promise<void>;
  onSelectForSimulator: (item: SportsContentItem) => void;
}

export const StackedCardsDeck: React.FC<StackedCardsDeckProps> = ({
  items,
  selectedIndex,
  onSelectIndex,
  onRegenerateSingle,
  onSelectForSimulator,
}) => {
  const [deckOrder, setDeckOrder] = useState<number[]>([]);
  const [isCycling, setIsCycling] = useState<boolean>(false);
  const [cycleDirection, setCycleDirection] = useState<'forward' | 'backward'>('forward');
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [showKeyboardHint, setShowKeyboardHint] = useState<boolean>(false);

  // Motion values for fluid drag responsiveness
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 0, 200], [-12, 0, 12]);
  const dragOpacity = useTransform(dragX, [-250, -120, 0, 120, 250], [0.3, 0.9, 1, 0.9, 0.3]);

  // Initialize and sync deckOrder when items change
  useEffect(() => {
    if (items.length === 0) {
      setDeckOrder([]);
      return;
    }
    
    setDeckOrder((prev) => {
      const validIndices = prev.filter((i) => i >= 0 && i < items.length);
      if (validIndices.length === items.length) {
        if (validIndices[0] === selectedIndex) {
          return prev;
        }
        const without = validIndices.filter((i) => i !== selectedIndex);
        return [selectedIndex, ...without];
      }
      const indices = Array.from({ length: items.length }, (_, i) => i);
      const rest = indices.filter((i) => i !== selectedIndex);
      return [selectedIndex, ...rest];
    });
  }, [items.length, selectedIndex]);

  const topIndex = deckOrder[0] ?? selectedIndex ?? 0;
  const topItem = items[topIndex];

  // Cycle Top Card to the Back (smooth forward transition)
  const handleCycleNext = useCallback(() => {
    if (items.length <= 1 || deckOrder.length <= 1 || isCycling) return;
    setCycleDirection('forward');
    setIsCycling(true);

    const [first, ...rest] = deckOrder;
    const newOrder = [...rest, first];
    const newTopIndex = newOrder[0];

    setTimeout(() => {
      setDeckOrder(newOrder);
      onSelectIndex(newTopIndex);
      setIsCycling(false);
      dragX.set(0);
    }, 280);
  }, [items.length, deckOrder, isCycling, onSelectIndex, dragX]);

  // Pull Card from Back to Front (smooth reverse transition)
  const handleCyclePrev = useCallback(() => {
    if (items.length <= 1 || deckOrder.length <= 1 || isCycling) return;
    setCycleDirection('backward');
    setIsCycling(true);

    const last = deckOrder[deckOrder.length - 1];
    const rest = deckOrder.slice(0, deckOrder.length - 1);
    const newOrder = [last, ...rest];
    const newTopIndex = newOrder[0];

    setTimeout(() => {
      setDeckOrder(newOrder);
      onSelectIndex(newTopIndex);
      setIsCycling(false);
      dragX.set(0);
    }, 280);
  }, [items.length, deckOrder, isCycling, onSelectIndex, dragX]);

  // Jump specific index directly to front
  const handleJumpToIndex = (targetIdx: number) => {
    if (targetIdx === topIndex || isCycling) return;
    const filtered = deckOrder.filter((idx) => idx !== targetIdx);
    const newOrder = [targetIdx, ...filtered];
    setDeckOrder(newOrder);
    onSelectIndex(targetIdx);
  };

  // Shuffle Deck
  const handleShuffle = () => {
    if (items.length <= 1 || isCycling) return;
    const shuffled = [...deckOrder].sort(() => Math.random() - 0.5);
    setDeckOrder(shuffled);
    onSelectIndex(shuffled[0]);
  };

  // Keyboard Navigation: Arrow Left/Right to cycle deck
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleCycleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleCyclePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCycleNext, handleCyclePrev]);

  if (items.length === 0 || deckOrder.length === 0) {
    return null;
  }

  // Handle Drag Gesture Release
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 90 || velocity > 450) {
      // Swiped right -> Cycle next
      handleCycleNext();
    } else if (offset < -90 || velocity < -450) {
      // Swiped left -> Cycle next
      handleCycleNext();
    } else {
      dragX.set(0);
    }
    setDragDirection(null);
  };

  // Stacking styling calculations for cards in deck
  const getStackStyle = (stackPosition: number) => {
    if (stackPosition === 0) {
      return {
        zIndex: 30,
        scale: 1,
        y: 0,
        rotate: 0,
        opacity: 1,
      };
    }
    if (stackPosition === 1) {
      return {
        zIndex: 20,
        scale: 0.95,
        y: 18,
        rotate: 1.2,
        opacity: 0.88,
      };
    }
    if (stackPosition === 2) {
      return {
        zIndex: 10,
        scale: 0.90,
        y: 34,
        rotate: -1.4,
        opacity: 0.65,
      };
    }
    return {
      zIndex: 5,
      scale: 0.85,
      y: 46,
      rotate: 0,
      opacity: 0,
    };
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Deck Controls Header */}
      <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left Side: Counter & Gestures Hint */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Interactive Stacked Deck
              </h4>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/60">
                Card {topIndex + 1} of {items.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Hand className="w-3 h-3 text-orange-500" />
              <span>Swipe card left/right or tap Next to cycle to back</span>
            </p>
          </div>
        </div>

        {/* Right Side: Controls & Pips */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Index Dots / Pips */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleJumpToIndex(idx)}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  topIndex === idx
                    ? 'w-5 h-2 bg-orange-500 shadow-xs'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                title={`Jump to Card #${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              id="btn-deck-prev-card"
              type="button"
              onClick={handleCyclePrev}
              disabled={items.length <= 1 || isCycling}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
              title="Previous card (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              id="btn-deck-shuffle"
              type="button"
              onClick={handleShuffle}
              disabled={items.length <= 1 || isCycling}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
              title="Shuffle card deck"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              id="btn-deck-next-card"
              type="button"
              onClick={handleCycleNext}
              disabled={items.length <= 1 || isCycling}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 cursor-pointer"
              title="Next card (Right Arrow / Space)"
            >
              <span>Next Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Swipe Cue Banner */}
      <div className="flex items-center justify-between px-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Active Front Card</span>
          <span className="text-slate-400 dark:text-slate-500">• (Interactive)</span>
        </span>
        
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
            <Keyboard className="w-2.5 h-2.5" />
            <span>Use ← / → keys</span>
          </span>
          <button
            type="button"
            onClick={handleCycleNext}
            className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer"
          >
            <span>Cycle to back</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3D Stacked Cards Deck Presentation Area */}
      <div className="relative min-h-[580px] sm:min-h-[540px] md:min-h-[520px] w-full pt-1 pb-16 flex justify-center perspective-[1200px] select-none">
        {/* Render visible top 3 cards in reverse order for correct visual z-indexing */}
        {deckOrder.slice(0, 3).reverse().map((itemIdx) => {
          const stackPosition = deckOrder.indexOf(itemIdx);
          const item = items[itemIdx];
          if (!item) return null;

          const isTop = stackPosition === 0;
          const style = getStackStyle(stackPosition);

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              drag={isTop ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.65}
              onDrag={(_, info) => {
                if (info.offset.x > 30) setDragDirection('right');
                else if (info.offset.x < -30) setDragDirection('left');
                else setDragDirection(null);
              }}
              onDragEnd={handleDragEnd}
              style={{
                x: isTop ? dragX : 0,
                rotate: isTop ? dragRotate : style.rotate,
                opacity: isTop ? (isCycling ? 0.3 : dragOpacity) : style.opacity,
                pointerEvents: isTop ? 'auto' : 'none',
              }}
              animate={
                isTop && isCycling
                  ? {
                      y: -80,
                      x: cycleDirection === 'forward' ? 180 : -180,
                      rotate: cycleDirection === 'forward' ? 16 : -16,
                      scale: 0.92,
                      opacity: 0.2,
                      zIndex: 35,
                      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                    }
                  : {
                      y: style.y,
                      scale: style.scale,
                      zIndex: style.zIndex,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 24,
                        mass: 0.8,
                      },
                    }
              }
              className="absolute top-0 w-full max-w-2xl origin-bottom touch-pan-y"
            >
              {/* Peek Trigger for background cards to bring them to front directly on click */}
              {!isTop && (
                <div 
                  onClick={() => handleJumpToIndex(itemIdx)}
                  className="absolute inset-0 z-40 cursor-pointer pointer-events-auto rounded-2xl bg-transparent hover:bg-orange-500/5 transition-colors"
                  title={`Click to bring Card #${itemIdx + 1} to front`}
                />
              )}

              {/* Visual Card Container with Layered Ambient Shadow */}
              <div className={`relative rounded-2xl transition-shadow duration-300 ${
                isTop 
                  ? 'shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/10' 
                  : 'shadow-lg ring-1 ring-slate-900/5 dark:ring-white/5 pointer-events-none'
              }`}>
                {/* Visual Drag Feedback Indicator (appears when dragging) */}
                {isTop && dragDirection && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute top-4 ${
                      dragDirection === 'right' ? 'right-4 bg-orange-500' : 'left-4 bg-blue-500'
                    } text-white text-xs font-black px-3 py-1 rounded-full shadow-lg z-50 pointer-events-none flex items-center gap-1`}
                  >
                    <span>Next Card</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                )}

                {/* Content Card Render */}
                <ContentCard
                  item={item}
                  index={itemIdx}
                  onRegenerate={onRegenerateSingle}
                  onSelectForSimulator={onSelectForSimulator}
                  isSelectedInSimulator={selectedIndex === itemIdx}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

