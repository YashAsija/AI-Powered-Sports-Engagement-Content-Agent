import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  SportsContentItem 
} from '../types';
import { calculateViralityScore } from '../lib/viralityScorer';
import { ViralityTooltip } from './ViralityTooltip';
import { ProTipOverlay } from './ProTipOverlay';
import { getProTipForContent } from '../lib/proTipEngine';
import { 
  RotateCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Smartphone, 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  Info,
  Lightbulb,
  Sparkles
} from 'lucide-react';

interface ContentCardProps {
  item: SportsContentItem;
  index: number;
  onRegenerate: (item: SportsContentItem) => Promise<void>;
  onSelectForSimulator: (item: SportsContentItem) => void;
  isSelectedInSimulator: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  index,
  onRegenerate,
  onSelectForSimulator,
  isSelectedInSimulator,
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCitationDetails, setShowCitationDetails] = useState(false);
  const [showProTip, setShowProTip] = useState(false);

  // Interactive local states for in-card testing
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [tfSelection, setTfSelection] = useState<boolean | null>(null);
  const [pollVote, setPollVote] = useState<number | null>(null);
  const [guessInput, setGuessInput] = useState<string>('');
  const [guessSubmitted, setGuessSubmitted] = useState<boolean>(false);

  const handleSingleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      await onRegenerate(item);
    } finally {
      setIsRegenerating(false);
    }
  };

  const copyToClipboardInstagram = () => {
    let stickerSection = '';
    if (item.type === 'mcq') {
      stickerSection = `[QUIZ STICKER]\nQuestion: ${item.question}\nA: ${item.options[0]}\nB: ${item.options[1]}\nC: ${item.options[2]}\nD: ${item.options[3]}\nCorrect Answer: ${item.correctAnswer}`;
    } else if (item.type === 'true_false') {
      stickerSection = `[TRUE/FALSE STICKER]\nStatement: "${item.statement}"\nOption 1: TRUE\nOption 2: FALSE\nCorrect Answer: ${item.correctAnswer ? 'TRUE' : 'FALSE'}`;
    } else if (item.type === 'this_or_that_poll') {
      stickerSection = `[POLL STICKER]\nPrompt: ${item.prompt}\nOption 1: ${item.options[0]}\nOption 2: ${item.options[1]}\n(Fan Opinion Poll)`;
    } else if (item.type === 'fill_in_blank') {
      stickerSection = `[FILL IN THE BLANK QUIZ]\nQuestion: ${item.sentence}\nA: ${item.options[0]}\nB: ${item.options[1]}\nC: ${item.options[2]}\nD: ${item.options[3]}\nCorrect Answer: ${item.correctAnswer}`;
    } else if (item.type === 'guess_the_number') {
      stickerSection = `[STAT CHALLENGE / SLIDER]\nQuestion: ${item.question}\nTarget: ${item.targetNumber} ${item.unitLabel || ''}\nTolerance Range: ±${item.toleranceRange}`;
    }

    const hook = item.instagramHook ? `HOOK:\n${item.instagramHook}\n\n` : '';
    const explanation = item.explanation ? `EXPLANATION / SOURCE:\n${item.explanation}\n\n` : '';
    const hashtags = item.suggestedHashtags && item.suggestedHashtags.length > 0 ? `HASHTAGS:\n${item.suggestedHashtags.join(' ')}` : '';

    const fullBlock = `${stickerSection}\n\n${hook}${explanation}${hashtags}`.trim();
    navigator.clipboard.writeText(fullBlock);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const getFormatBadge = () => {
    switch (item.type) {
      case 'mcq':
        return { label: 'MCQ Quiz', color: 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800' };
      case 'true_false':
        return { label: 'True / False', color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800' };
      case 'this_or_that_poll':
        return { label: 'Fan Poll', color: 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-200 border-purple-200 dark:border-purple-800' };
      case 'fill_in_blank':
        return { label: 'Fill Blank', color: 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-200 border-amber-200 dark:border-amber-800' };
      case 'guess_the_number':
        return { label: 'Stat Guess', color: 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-200 border-rose-200 dark:border-rose-800' };
    }
  };

  const badge = getFormatBadge();
  const virality = useMemo(() => calculateViralityScore(item), [item]);
  const proTip = useMemo(() => getProTipForContent(item), [item]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ 
        duration: 0.42, 
        delay: Math.min(0.45, index * 0.075),
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={`relative bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
        isSelectedInSimulator 
          ? 'border-orange-500 ring-2 ring-orange-500/30 dark:ring-orange-500/40' 
          : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Pro Tip Overlay (Renders full contextual advice on top of card) */}
      <ProTipOverlay
        item={item}
        isOpen={showProTip}
        onClose={() => setShowProTip(false)}
        onSelectForSimulator={onSelectForSimulator}
      />

      {/* Top Header */}
      <div className="p-3 sm:p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-850/80">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
            #{index + 1}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            {item.difficulty}
          </span>
          <ViralityTooltip score={virality} focusMetric="overall" position="bottom">
            <span 
              className="cursor-help inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-100/80 hover:bg-orange-200/80 dark:bg-orange-950/60 dark:hover:bg-orange-900/60 text-orange-700 dark:text-orange-300 border border-orange-200/70 dark:border-orange-800/70 transition-colors"
            >
              <TrendingUp className="w-2.5 h-2.5 text-orange-500" />
              <span>{virality.overallScore}</span>
            </span>
          </ViralityTooltip>
        </div>

        <div className="flex items-center gap-1">
          {/* Pro Tip Overlay Trigger Button */}
          <button
            type="button"
            id={`btn-protip-trigger-${item.id}`}
            onClick={() => setShowProTip(!showProTip)}
            title="Open Pro Reach Tip for Instagram"
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              showProTip
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-amber-100/90 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-900/80 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800/80'
            }`}
          >
            <Lightbulb className="w-3 h-3 fill-current text-amber-600 dark:text-amber-400" />
            <span>Pro Tip</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectForSimulator(item)}
            title="Preview in Story Simulator"
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              isSelectedInSimulator 
                ? 'bg-orange-500 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isRegenerating}
            onClick={handleSingleRegenerate}
            title="Regenerate this item"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors disabled:opacity-40"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-orange-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area (Vertical Focus) */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Instagram Hook */}
        {item.instagramHook && (
          <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium italic border-l-2 border-orange-500 pl-2.5 leading-relaxed bg-orange-50/40 dark:bg-orange-950/20 py-1 rounded-r-md">
            "{item.instagramHook}"
          </p>
        )}

        {/* 1. MCQ FORMAT (Vertical Option Stack) */}
        {item.type === 'mcq' && (
          <div className="space-y-2.5 flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug">
              {item.question}
            </h3>

            <div className="flex flex-col gap-1.5 pt-1">
              {item.options.map((opt, optIdx) => {
                const letter = String.fromCharCode(65 + optIdx);
                const isSelected = selectedOption === opt;
                const isCorrect = opt === item.correctAnswer;
                const hasTested = selectedOption !== null;

                let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-750';
                if (hasTested) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 opacity-90';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`w-full flex items-center justify-between gap-2 p-2 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0 ${
                        hasTested && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}>
                        {letter}
                      </span>
                      <span className="truncate text-[11px] sm:text-xs font-medium">{opt}</span>
                    </div>
                    {hasTested && isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. TRUE / FALSE FORMAT */}
        {item.type === 'true_false' && (
          <div className="space-y-2.5 flex-1">
            <p className="text-slate-900 dark:text-white text-xs sm:text-[13px] font-semibold leading-snug">
              "{item.statement}"
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[true, false].map((val) => {
                const label = val ? 'TRUE' : 'FALSE';
                const isSelected = tfSelection === val;
                const isCorrect = val === item.correctAnswer;
                const hasTested = tfSelection !== null;

                let style = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-750';
                if (hasTested) {
                  if (isCorrect) {
                    style = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border-rose-400 dark:border-rose-700 font-bold';
                  }
                }

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setTfSelection(val)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${style}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. THIS-OR-THAT POLL FORMAT */}
        {item.type === 'this_or_that_poll' && (
          <div className="space-y-2.5 flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug">
              {item.prompt}
            </h3>

            <div className="flex flex-col gap-1.5 pt-1">
              {item.options.map((opt, optIdx) => {
                const isVoted = pollVote === optIdx;
                const hasVoted = pollVote !== null;
                const percentage = optIdx === 0 ? 58 : 42;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => setPollVote(optIdx)}
                    className={`relative overflow-hidden p-2 rounded-xl border text-xs font-bold text-left transition-all ${
                      isVoted
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-950 dark:text-purple-100'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    {hasVoted && (
                      <div 
                        className="absolute inset-0 bg-purple-200/50 dark:bg-purple-800/40 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="truncate text-[11px] sm:text-xs">{opt}</span>
                      {hasVoted && (
                        <span className="text-[10px] font-mono font-bold text-purple-900 dark:text-purple-300 ml-1">
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. FILL IN THE BLANK FORMAT */}
        {item.type === 'fill_in_blank' && (
          <div className="space-y-2.5 flex-1">
            <p className="text-slate-900 dark:text-white text-xs sm:text-[13px] font-semibold leading-relaxed">
              {item.sentence.split('_____').map((part, pIdx, arr) => (
                <React.Fragment key={pIdx}>
                  <span>{part}</span>
                  {pIdx < arr.length - 1 && (
                    <span className="inline-block px-1.5 py-0.5 mx-1 font-bold text-orange-950 dark:text-orange-200 bg-orange-100 dark:bg-orange-950/80 rounded-md text-[11px] border border-orange-200 dark:border-orange-800">
                      {selectedOption ? selectedOption : '_____'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </p>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {item.options.map((opt, optIdx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === item.correctAnswer;
                const hasTested = selectedOption !== null;

                let style = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-750';
                if (hasTested) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-medium';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-1.5 rounded-xl border text-[11px] text-center font-semibold truncate transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. GUESS THE NUMBER FORMAT */}
        {item.type === 'guess_the_number' && (
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-[13px] leading-snug">
                {item.question}
              </h3>
              <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 shrink-0 ml-1">
                ±{item.toleranceRange} {item.unitLabel || ''}
              </span>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="number"
                placeholder="Estimate..."
                value={guessInput}
                onChange={(e) => {
                  setGuessInput(e.target.value);
                  setGuessSubmitted(false);
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-1 focus:ring-orange-500 text-slate-900 dark:text-white font-medium"
              />
              <button
                type="button"
                onClick={() => setGuessSubmitted(true)}
                disabled={!guessInput}
                className="px-3 py-1.5 text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-40 shrink-0"
              >
                Check
              </button>
            </div>

            {guessSubmitted && (
              <div className="text-[11px] text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-lg flex items-center justify-between border border-slate-200/60 dark:border-slate-700">
                <span>Target: <strong>{item.targetNumber} {item.unitLabel || ''}</strong></span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.abs(Number(guessInput) - item.targetNumber) <= item.toleranceRange ? '✓ Within Tolerance' : `Diff: ${Math.abs(Number(guessInput) - item.targetNumber)}`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Contextual Pro Tip Highlight Strip */}
        <div 
          onClick={() => setShowProTip(true)}
          className="group cursor-pointer p-2 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-orange-500/15 border border-amber-300/60 dark:border-amber-700/60 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between gap-2 shadow-2xs"
          title="Click to open full Pro Reach Tip overlay"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="p-1 rounded-md bg-amber-500 text-slate-950 shrink-0 shadow-2xs">
              <Lightbulb className="w-2.5 h-2.5 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300">
                  Pro Tip:
                </span>
                <span className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate">
                  {proTip.stickerRecommendation.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>Overlay</span>
            <ChevronUp className="w-3 h-3 rotate-90" />
          </div>
        </div>

        {/* Compact Collapsible Details */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-semibold">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-0.5 transition-colors"
            >
              <span>Explain</span>
              {showExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              type="button"
              onClick={() => setShowCitationDetails(!showCitationDetails)}
              className="hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-0.5 truncate max-w-[140px] transition-colors"
            >
              <span className="truncate">Source</span>
              {showCitationDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showExplanation && item.explanation && (
            <div className="mt-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-[11px] leading-relaxed border border-slate-200/50 dark:border-slate-700">
              {item.explanation}
            </div>
          )}

          {showCitationDetails && (
            <div className="mt-2 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-200 space-y-1.5 text-[11px] border border-slate-200/50 dark:border-slate-700">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span className="truncate">{item.citation.sourceTitle}</span>
                {item.citation.sourceUrl && (
                  <a
                    href={item.citation.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-0.5 shrink-0 ml-1.5"
                  >
                    <span>Link</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              {item.citation.sourceSnippet && (
                <p className="text-[10px] text-slate-500 dark:text-slate-300 italic">"{item.citation.sourceSnippet}"</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Bar */}
      <div className="p-2.5 bg-slate-50/90 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <button
          type="button"
          id={`btn-copy-clipboard-${item.id}`}
          onClick={copyToClipboardInstagram}
          className={`w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            copiedFull 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100'
          }`}
        >
          {copiedFull ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied Story Format</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Card</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
