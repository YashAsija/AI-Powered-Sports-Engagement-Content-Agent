import React, { useState, useEffect, useMemo } from 'react';
import { SportsContentItem } from '../types';
import { getProTipForContent } from '../lib/proTipEngine';
import { 
  Smartphone, 
  Copy, 
  Check, 
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Target,
  Palette,
  Clock,
  Sparkles
} from 'lucide-react';

interface InstagramStorySimulatorProps {
  item: SportsContentItem | null;
  itemsList: SportsContentItem[];
  onSelectIndex: (idx: number) => void;
  currentIndex: number;
}

export const InstagramStorySimulator: React.FC<InstagramStorySimulatorProps> = ({
  item,
  itemsList,
  onSelectIndex,
  currentIndex,
}) => {
  const [copiedSticker, setCopiedSticker] = useState(false);
  const [testedAnswer, setTestedAnswer] = useState<string | null>(null);
  const [testedTf, setTestedTf] = useState<boolean | null>(null);
  const [testedPoll, setTestedPoll] = useState<number | null>(null);
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [sliderSubmitted, setSliderSubmitted] = useState(false);
  const [showProTipBox, setShowProTipBox] = useState(true);

  // Sync / Reset interactive states when the active item switches
  useEffect(() => {
    setTestedAnswer(null);
    setTestedTf(null);
    setTestedPoll(null);
    setSliderVal(50);
    setSliderSubmitted(false);
  }, [item?.id]);

  const proTip = useMemo(() => item ? getProTipForContent(item) : null, [item]);

  if (!item) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center min-h-[420px] transition-colors shadow-2xs">
        <Smartphone className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-3" />
        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
          Story Simulator
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          Select any content card to preview how it renders inside an Instagram Story frame with interactive stickers.
        </p>
      </div>
    );
  }

  const handleCopySticker = () => {
    let text = '';
    if (item.type === 'mcq') {
      text = `QUIZ STICKER:\nQ: ${item.question}\nA: ${item.options[0]}\nB: ${item.options[1]}\nC: ${item.options[2]}\nD: ${item.options[3]}\nCorrect: ${item.correctAnswer}`;
    } else if (item.type === 'true_false') {
      text = `TRUE/FALSE STICKER:\nStatement: "${item.statement}"\nOption 1: TRUE\nOption 2: FALSE\nCorrect: ${item.correctAnswer ? 'TRUE' : 'FALSE'}`;
    } else if (item.type === 'this_or_that_poll') {
      text = `POLL STICKER:\nPrompt: ${item.prompt}\nOption 1: ${item.options[0]}\nOption 2: ${item.options[1]}`;
    } else if (item.type === 'fill_in_blank') {
      text = `FILL IN THE BLANK:\nQuestion: ${item.sentence}\nA: ${item.options[0]}\nB: ${item.options[1]}\nC: ${item.options[2]}\nD: ${item.options[3]}\nCorrect: ${item.correctAnswer}`;
    } else if (item.type === 'guess_the_number') {
      text = `GUESS THE NUMBER:\nQuestion: ${item.question}\nTarget: ${item.targetNumber} ${item.unitLabel || ''}\nTolerance Range: ±${item.toleranceRange}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedSticker(true);
    setTimeout(() => setCopiedSticker(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 flex flex-col transition-colors shadow-2xs">
      {/* Top Header & Pagination */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Story Simulator
          </h3>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Card {currentIndex + 1} of {itemsList.length}
          </span>
        </div>

        {itemsList.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => onSelectIndex(currentIndex - 1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Previous Story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentIndex === itemsList.length - 1}
              onClick={() => onSelectIndex(currentIndex + 1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              title="Next Story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sleek Mobile Story Frame */}
      <div className="mx-auto w-full max-w-[280px] aspect-[9/16] rounded-[32px] bg-slate-950 p-3.5 shadow-2xl relative border-2 border-slate-800 flex flex-col overflow-hidden text-white">
        {/* Story Top Progress */}
        <div className="relative z-10 pt-1 px-1">
          <div className="flex items-center gap-1 mb-2.5">
            {itemsList.map((_, i) => (
              <div 
                key={i} 
                className={`h-0.5 flex-1 rounded-full ${
                  i <= currentIndex ? 'bg-white' : 'bg-white/30'
                }`} 
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-white/95 tracking-tight">@sports_engagement</span>
            <span className="text-orange-400 text-[10px] font-bold uppercase tracking-wider">{item.sport}</span>
          </div>
        </div>

        {/* Story Center Sticker */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-1 my-auto">
          {item.instagramHook && (
            <div className="mb-3 text-center">
              <span className="inline-block px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[10px] font-semibold text-orange-300 border border-orange-500/40 shadow-md">
                {item.instagramHook}
              </span>
            </div>
          )}

          {/* 1. MCQ */}
          {item.type === 'mcq' && (
            <div className="bg-white rounded-2xl p-3 text-slate-900 shadow-2xl">
              <div className="bg-orange-600 -mx-3 -mt-3 p-2.5 rounded-t-2xl text-white mb-2 shadow-xs">
                <p className="text-[11px] font-bold leading-snug">
                  {item.question}
                </p>
              </div>

              <div className="space-y-1.5">
                {item.options.map((opt, i) => {
                  const isSelected = testedAnswer === opt;
                  const isCorrect = opt === item.correctAnswer;
                  const hasAnswered = testedAnswer !== null;

                  let optClass = 'bg-slate-100 text-slate-800 hover:bg-slate-200';
                  if (hasAnswered) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-600 text-white font-bold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-600 text-white font-semibold';
                    }
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTestedAnswer(opt)}
                      className={`w-full flex items-center justify-between p-1.5 px-2.5 rounded-lg text-[10px] font-semibold transition-all text-left ${optClass}`}
                    >
                      <span className="truncate">{opt}</span>
                      {hasAnswered && isCorrect && <Check className="w-3 h-3 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. TRUE/FALSE */}
          {item.type === 'true_false' && (
            <div className="bg-white rounded-2xl p-3 text-slate-900 shadow-2xl text-center">
              <p className="text-xs font-bold leading-snug mb-2.5">
                "{item.statement}"
              </p>

              <div className="grid grid-cols-2 gap-1.5">
                {[true, false].map((val) => {
                  const label = val ? 'TRUE' : 'FALSE';
                  const isSelected = testedTf === val;
                  const isCorrect = val === item.correctAnswer;
                  const hasAnswered = testedTf !== null;

                  let btnStyle = 'bg-slate-100 text-slate-800 hover:bg-slate-200';
                  if (hasAnswered) {
                    if (isCorrect) btnStyle = 'bg-emerald-600 text-white font-bold';
                    else if (isSelected) btnStyle = 'bg-rose-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setTestedTf(val)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${btnStyle}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. POLL */}
          {item.type === 'this_or_that_poll' && (
            <div className="bg-white rounded-2xl p-3 text-slate-900 shadow-2xl">
              <h4 className="text-xs font-bold text-slate-900 mb-2 text-center">
                {item.prompt}
              </h4>

              <div className="space-y-1.5">
                {item.options.map((opt, i) => {
                  const isSelected = testedPoll === i;
                  const hasVoted = testedPoll !== null;
                  const pct = i === 0 ? 58 : 42;

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTestedPoll(i)}
                      className={`relative w-full overflow-hidden p-2 rounded-lg text-[10px] font-bold text-left transition-all ${
                        isSelected 
                          ? 'border border-purple-500 bg-purple-50 text-purple-950' 
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {hasVoted && (
                        <div 
                          className="absolute inset-0 bg-purple-300/40 transition-all duration-500" 
                          style={{ width: `${pct}%` }} 
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-between">
                        <span>{opt}</span>
                        {hasVoted && <span className="font-mono font-bold text-purple-900">{pct}%</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. FILL IN BLANK */}
          {item.type === 'fill_in_blank' && (
            <div className="bg-white rounded-2xl p-3 text-slate-900 shadow-2xl">
              <div className="bg-amber-600 -mx-3 -mt-3 p-2 rounded-t-2xl text-white mb-2 text-[10px] font-bold shadow-xs">
                {item.sentence}
              </div>

              <div className="grid grid-cols-2 gap-1">
                {item.options.map((opt, i) => {
                  const isSelected = testedAnswer === opt;
                  const isCorrect = opt === item.correctAnswer;
                  const hasAnswered = testedAnswer !== null;

                  let optClass = 'bg-slate-100 text-slate-800 hover:bg-slate-200';
                  if (hasAnswered) {
                    if (isCorrect) optClass = 'bg-emerald-600 text-white font-bold';
                    else if (isSelected) optClass = 'bg-rose-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTestedAnswer(opt)}
                      className={`p-1.5 rounded-lg text-[10px] font-bold text-center transition-all ${optClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. GUESS NUMBER */}
          {item.type === 'guess_the_number' && (
            <div className="bg-white rounded-2xl p-3 text-slate-900 shadow-2xl text-center">
              <p className="text-[11px] font-bold mb-2">
                {item.question}
              </p>

              <div className="bg-slate-100 rounded-lg p-2 mb-1.5">
                <div className="text-xs font-bold text-orange-600 font-mono">
                  {Math.round(sliderVal * (item.targetNumber * 1.5) / 100)} {item.unitLabel || ''}
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => {
                    setSliderVal(Number(e.target.value));
                    setSliderSubmitted(true);
                  }}
                  className="w-full accent-orange-500 my-1"
                />
              </div>

              {sliderSubmitted && (
                <div className="text-[9px] font-bold text-emerald-700">
                  Target: {item.targetNumber} {item.unitLabel || ''} (±{item.toleranceRange})
                </div>
              )}
            </div>
          )}
        </div>

        {/* Story Bottom text */}
        <div className="relative z-10 pb-1 text-center text-[10px] text-white/50 font-medium">
          Instagram Story Simulator
        </div>
      </div>

      {/* Contextual Reach Advice for Simulator */}
      {proTip && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={() => setShowProTipBox(!showProTipBox)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-md bg-amber-500 text-slate-950 shadow-2xs">
                <Lightbulb className="w-3 h-3 fill-current" />
              </div>
              <span className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400">
                Instagram Reach Advice
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              {showProTipBox ? 'Hide Tips' : 'Show Tips'}
            </span>
          </button>

          {showProTipBox && (
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold">
                <Target className="w-3 h-3 shrink-0" />
                <span>{proTip.stickerRecommendation.name}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed">
                {proTip.stickerRecommendation.description}
              </p>

              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold pt-1">
                <Palette className="w-3 h-3 shrink-0" />
                <span>Visual Contrast Tip</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[10px] leading-relaxed">
                {proTip.visualGuidance.backgroundAdvice}
              </p>

              <div className="bg-amber-100/60 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/60 dark:border-amber-800/40 text-[10px] text-amber-900 dark:text-amber-200 font-medium">
                ⚡ <strong>Algorithm Boost:</strong> {proTip.reachAlgorithmBoost.expectedMetricLift}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simulator Bottom Action */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleCopySticker}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors shadow-2xs cursor-pointer"
        >
          {copiedSticker ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sticker Text Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Sticker Format</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
