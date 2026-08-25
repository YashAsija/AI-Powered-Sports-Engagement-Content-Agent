import React, { useState } from 'react';
import { 
  DifficultyLevel, 
  ContentFormatType, 
  BatchGenerationRequest 
} from '../types';
import { 
  ArrowRight,
  SlidersHorizontal,
  Search,
  Database,
  X,
  Tag
} from 'lucide-react';

interface GenerationControlsProps {
  onGenerate: (request: BatchGenerationRequest) => void;
  isLoading: boolean;
  activeSport: string;
  setActiveSport: (sport: string) => void;
  topicFocus?: string;
  setTopicFocus?: (focus: string) => void;
  contentType?: ContentFormatType;
  setContentType?: (type: ContentFormatType) => void;
  difficulty?: DifficultyLevel;
  setDifficulty?: (diff: DifficultyLevel) => void;
  batchSize?: number;
  setBatchSize?: (size: number) => void;
}

const PRESET_SPORTS = [
  'Cricket',
  'Football',
  'Tennis',
  'Badminton',
  'Basketball',
  'Formula 1',
  'Olympics',
  'Athletics',
];

const FORMAT_CHOICES: { id: ContentFormatType; label: string }[] = [
  { id: 'mixed_batch', label: 'Mixed Variety (Diverse Formats)' },
  { id: 'mcq', label: 'Multiple Choice (MCQ)' },
  { id: 'true_false', label: 'True / False Challenge' },
  { id: 'this_or_that_poll', label: 'This-or-That Fan Poll' },
  { id: 'fill_in_blank', label: 'Fill in the Blank' },
  { id: 'guess_the_number', label: 'Stat Challenge (Number Guess)' },
];

const SPORT_SUGGESTED_TOPICS: Record<string, string[]> = {
  Cricket: ['2024 T20 World Cup', 'Rohit Sharma 264', 'Virat Kohli 765', 'IPL Rivalries', 'Yuvraj 6 Sixes'],
  Football: ['Messi 91 Goals (2012)', 'Champions League Real Madrid', 'Arsenal Invincibles', 'El Clasico', 'Lewandowski 5 in 9'],
  Tennis: ['Nadal Roland Garros 14', 'Djokovic 24 Grand Slams', 'Federer Wimbledon', 'Steffi Graf Golden Slam'],
  Basketball: ['LeBron 40,000 Points', 'Kobe 81 Points', 'Jordan 6-0 Finals', 'Curry 3-Point Records'],
  'Formula 1': ['Max Verstappen 19 Wins', 'Ayrton Senna Monaco', 'Lewis Hamilton 7 Titles', 'Monza Speed Traps'],
  Badminton: ['Satwik 565 km/h Smash', 'Lin Dan Olympic Golds', 'PV Sindhu Medals'],
  Olympics: ['Usain Bolt 9.58s', 'Mondo Duplantis 6.25m', 'Michael Phelps 28 Medals'],
  Athletics: ['Usain Bolt 100m Sprint', 'World Record Decathlon', 'Marathon Sub-2 Hour'],
};

export const GenerationControls: React.FC<GenerationControlsProps> = ({
  onGenerate,
  isLoading,
  activeSport,
  setActiveSport,
  topicFocus: controlledTopicFocus,
  setTopicFocus: controlledSetTopicFocus,
  contentType: controlledContentType,
  setContentType: controlledSetContentType,
  difficulty: controlledDifficulty,
  setDifficulty: controlledSetDifficulty,
  batchSize: controlledBatchSize,
  setBatchSize: controlledSetBatchSize,
}) => {
  const [internalDifficulty, setInternalDifficulty] = useState<DifficultyLevel>('Medium');
  const [internalContentType, setInternalContentType] = useState<ContentFormatType>('mixed_batch');
  const [internalTopicFocus, setInternalTopicFocus] = useState<string>('');
  const [internalBatchSize, setInternalBatchSize] = useState<number>(6);
  
  const difficulty = controlledDifficulty ?? internalDifficulty;
  const setDifficulty = controlledSetDifficulty ?? setInternalDifficulty;

  const contentType = controlledContentType ?? internalContentType;
  const setContentType = controlledSetContentType ?? setInternalContentType;

  const topicFocus = controlledTopicFocus ?? internalTopicFocus;
  const setTopicFocus = controlledSetTopicFocus ?? setInternalTopicFocus;

  const batchSize = controlledBatchSize ?? internalBatchSize;
  const setBatchSize = controlledSetBatchSize ?? setInternalBatchSize;
  const [useWebSearch, setUseWebSearch] = useState<boolean>(true);
  const [useVectorDB, setUseVectorDB] = useState<boolean>(true);
  const [showGroundingSettings, setShowGroundingSettings] = useState<boolean>(false);

  const handleSelectSport = (sportName: string) => {
    setActiveSport(sportName);
  };

  const handleGenerateClick = () => {
    onGenerate({
      sport: activeSport,
      difficulty,
      contentType,
      batchSize,
      topicFocus: topicFocus.trim() || undefined,
      useWebSearch,
      useVectorDB,
    });
  };

  const currentSportSuggestions = SPORT_SUGGESTED_TOPICS[activeSport] || [];

  return (
    <div className="glass-panel rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3 sm:p-3.5 mb-2.5 shadow-xs transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      {/* 1. Sport Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2.5 border-b border-slate-100 dark:border-slate-800 scrollbar-none">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 shrink-0 uppercase tracking-wider text-[11px]">
          Sport:
        </span>
        {PRESET_SPORTS.map((s) => {
          const isSelected = activeSport.toLowerCase() === s.toLowerCase();
          return (
            <button
              key={s}
              id={`sport-btn-${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              type="button"
              onClick={() => handleSelectSport(s)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 select-none ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs ring-1 ring-slate-900/10 dark:ring-white/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-750 border border-transparent'
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* 2. Unified Input & Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-2">
        {/* Format Selector */}
        <div className="md:col-span-4">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Format
          </label>
          <div className="relative">
            <select
              id="select-content-format"
              value={contentType}
              onChange={(e) => setContentType(e.target.value as ContentFormatType)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer pr-8"
            >
              {FORMAT_CHOICES.map((f) => (
                <option key={f.id} value={f.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                  {f.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Topic Focus Filter with Clear button */}
        <div className="md:col-span-5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Topic Focus <span className="text-slate-400 dark:text-slate-400 font-normal lowercase">(filter)</span>
            </label>
            {topicFocus && (
              <button
                type="button"
                onClick={() => setTopicFocus('')}
                className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-0.5"
              >
                <X className="w-3 h-3" />
                <span>Clear filter</span>
              </button>
            )}
          </div>
          <div className="relative">
            <input
              id="input-topic-focus"
              type="text"
              placeholder="e.g. 2024 World Cup, Rohit Sharma, Champions League, Rivalries..."
              value={topicFocus}
              onChange={(e) => setTopicFocus(e.target.value)}
              className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all ${
                topicFocus ? 'border-orange-500/60 dark:border-orange-500/50 pr-8 bg-orange-50/20 dark:bg-orange-950/10' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {topicFocus && (
              <button
                type="button"
                onClick={() => setTopicFocus('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear topic focus"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Difficulty */}
        <div className="md:col-span-3">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Difficulty
          </label>
          <div className="relative">
            <select
              id="select-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none cursor-pointer pr-8"
            >
              <option value="Easy" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Easy (Casual Fan)</option>
              <option value="Medium" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Medium (Regular Fan)</option>
              <option value="Hard" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Hard (Die-hard Expert)</option>
              <option value="Mixed" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Mixed (Graduated Difficulty)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Topic Chips for Active Sport */}
      {currentSportSuggestions.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2 scrollbar-none text-[11px]">
          <span className="text-slate-600 dark:text-slate-300 font-semibold shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3 text-orange-500" />
            <span>Popular Topics:</span>
          </span>
          {currentSportSuggestions.map((sug) => {
            const isCurrent = topicFocus.toLowerCase() === sug.toLowerCase();
            return (
              <button
                key={sug}
                type="button"
                onClick={() => setTopicFocus(sug)}
                className={`px-2 py-0.5 rounded-lg font-medium transition-all shrink-0 select-none ${
                  isCurrent
                    ? 'bg-orange-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-100/70 dark:hover:bg-slate-700 hover:text-orange-700 dark:hover:text-orange-300 border border-slate-200/50 dark:border-slate-750'
                }`}
              >
                {sug}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Bottom Utility & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowGroundingSettings(!showGroundingSettings)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-orange-500" />
          <span>Grounding settings ({useWebSearch ? 'Google Search' : ''}{useWebSearch && useVectorDB ? ' + ' : ''}{useVectorDB ? 'Vector Store' : ''})</span>
        </button>

        <div className="flex items-center gap-2.5 justify-end">
          {/* Count Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
            {[5, 6].map((cnt) => (
              <button
                key={cnt}
                type="button"
                id={`btn-batch-size-${cnt}`}
                onClick={() => setBatchSize(cnt)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
                  batchSize === cnt
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cnt} items
              </button>
            ))}
          </div>

          {/* Primary Generate Button */}
          <button
            id="btn-generate-sports-batch"
            type="button"
            disabled={isLoading}
            onClick={handleGenerateClick}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs active:scale-[0.98] ${
              isLoading
                ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed text-slate-200'
                : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 shadow-orange-500/20'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating {activeSport} Batch...</span>
              </>
            ) : (
              <>
                <span>Generate Content</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Grounding Settings */}
      {showGroundingSettings && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-5 text-xs animate-in fade-in duration-150">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={useWebSearch}
              onChange={(e) => setUseWebSearch(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
            <Search className="w-3.5 h-3.5 text-orange-500" />
            <span>Live Web Grounding (Google Search)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-200 font-medium">
            <input
              type="checkbox"
              checked={useVectorDB}
              onChange={(e) => setUseVectorDB(e.target.checked)}
              className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
            />
            <Database className="w-3.5 h-3.5 text-orange-500" />
            <span>Vector Store (ChromaDB verified records)</span>
          </label>
        </div>
      )}
    </div>
  );
};
