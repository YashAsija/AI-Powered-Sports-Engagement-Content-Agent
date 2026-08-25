import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  Zap, 
  Volume2,
  X
} from 'lucide-react';
import { DifficultyLevel, ContentFormatType } from '../types';

export interface SportsTrend {
  id: string;
  sport: string;
  headline: string;
  topicFocus: string;
  suggestedFormat: ContentFormatType;
  difficulty: DifficultyLevel;
  urgency: 'BREAKING' | 'VIRAL SURGE' | 'MATCHDAY' | 'RECORD WATCH';
  engagementVelocity: string; // e.g. "+340% / hr"
  timestamp: string;
  summary: string;
  keyHashtag: string;
}

export const LIVE_SPORTS_TRENDS: SportsTrend[] = [
  {
    id: 'trend-1',
    sport: 'Cricket',
    headline: 'T20 World Cup Drama & Historic Super Overs',
    topicFocus: 'T20 World Cup Super Overs and thrilling final-over finishes',
    suggestedFormat: 'mixed_batch',
    difficulty: 'Medium',
    urgency: 'BREAKING',
    engagementVelocity: '+480% engagement',
    timestamp: 'Just now',
    summary: 'Iconic last-over thrillers, unforgettable death-bowling yorkers, and tournament record chases.',
    keyHashtag: '#T20WorldCup'
  },
  {
    id: 'trend-2',
    sport: 'Football',
    headline: 'Champions League Knockout Magic & Comebacks',
    topicFocus: 'UEFA Champions League historic comebacks, 90th-minute winners, and El Clasico rivalries',
    suggestedFormat: 'mixed_batch',
    difficulty: 'Hard',
    urgency: 'VIRAL SURGE',
    engagementVelocity: '+390% engagement',
    timestamp: '8m ago',
    summary: 'Remontadas, stoppage-time headers, and European football immortality moments.',
    keyHashtag: '#UCL'
  },
  {
    id: 'trend-3',
    sport: 'Tennis',
    headline: 'Grand Slam GOAT Milestones & Roland Garros Clay Dominance',
    topicFocus: 'Rafael Nadal 14 Roland Garros titles and Novak Djokovic 24 Grand Slams',
    suggestedFormat: 'mcq',
    difficulty: 'Hard',
    urgency: 'RECORD WATCH',
    engagementVelocity: '+275% engagement',
    timestamp: '14m ago',
    summary: 'The greatest statistics and tiebreak showdowns in Grand Slam tennis history.',
    keyHashtag: '#GrandSlam'
  },
  {
    id: 'trend-4',
    sport: 'Formula 1',
    headline: 'Monza Speed Traps & Verstappen Undefeated Records',
    topicFocus: 'Max Verstappen 19 wins in a season and legendary Monaco GP qualifying laps',
    suggestedFormat: 'guess_the_number',
    difficulty: 'Medium',
    urgency: 'MATCHDAY',
    engagementVelocity: '+310% engagement',
    timestamp: '22m ago',
    summary: 'Telemetry speed records, record pit-stop timings, and all-time pole position streaks.',
    keyHashtag: '#F1'
  },
  {
    id: 'trend-5',
    sport: 'Basketball',
    headline: 'LeBron 40,000 Points & Curry 3-Point Revolution',
    topicFocus: 'LeBron James all-time scoring milestone and Steph Curry single-season three-pointers',
    suggestedFormat: 'fill_in_blank',
    difficulty: 'Medium',
    urgency: 'VIRAL SURGE',
    engagementVelocity: '+415% engagement',
    timestamp: '35m ago',
    summary: 'NBA records that shattered modern basketball offensive analytics.',
    keyHashtag: '#NBATrivia'
  },
  {
    id: 'trend-6',
    sport: 'Athletics',
    headline: 'Usain Bolt 9.58s Sprint & Duplantis 6.25m World Record',
    topicFocus: 'Usain Bolt 100m world record and Mondo Duplantis historic pole vault heights',
    suggestedFormat: 'this_or_that_poll',
    difficulty: 'Easy',
    urgency: 'RECORD WATCH',
    engagementVelocity: '+290% engagement',
    timestamp: '42m ago',
    summary: 'The ultimate human biomechanics, sprint top speeds, and Olympic gold medal sweeps.',
    keyHashtag: '#Olympics'
  }
];

interface LiveTrendBannerProps {
  onJumpStart: (trend: SportsTrend) => void;
  isLoading: boolean;
}

export const LiveTrendBanner: React.FC<LiveTrendBannerProps> = ({
  onJumpStart,
  isLoading
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_SPORTS_TRENDS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  if (isDismissed) {
    return (
      <div className="mb-3.5 flex justify-end">
        <button
          type="button"
          onClick={() => setIsDismissed(false)}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 rounded-full border border-orange-200/70 dark:border-orange-900/60 hover:bg-orange-100 transition-colors"
        >
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Show Live Trend Watch</span>
        </button>
      </div>
    );
  }

  const currentTrend = LIVE_SPORTS_TRENDS[currentIndex];

  const getUrgencyBadge = (urgency: SportsTrend['urgency']) => {
    switch (urgency) {
      case 'BREAKING':
        return 'bg-red-500 text-white animate-pulse shadow-xs';
      case 'VIRAL SURGE':
        return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs';
      case 'RECORD WATCH':
        return 'bg-purple-600 text-white shadow-xs';
      case 'MATCHDAY':
        return 'bg-emerald-600 text-white shadow-xs';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-950 via-slate-900 to-neutral-950 text-white p-3 sm:p-4 mb-5 border border-orange-500/30 shadow-lg"
      onMouseEnter={() => setIsAutoCycling(false)}
      onMouseLeave={() => setIsAutoCycling(true)}
    >
      {/* Background Subtle Gradient Flares */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
        {/* Left Side: Live Indicator & Trend Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE TREND WATCH
            </span>

            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider ${getUrgencyBadge(currentTrend.urgency)}`}>
              {currentTrend.urgency}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
              <TrendingUp className="w-3 h-3" />
              <span>{currentTrend.engagementVelocity}</span>
            </span>

            <span className="text-slate-400 text-[10px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{currentTrend.timestamp}</span>
            </span>
          </div>

          {/* Animated Headline & Subtext */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrend.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-0.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-orange-400 text-xs tracking-wide">
                  [{currentTrend.sport}]
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-white truncate tracking-tight">
                  {currentTrend.headline}
                </h3>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-2xl font-normal">
                {currentTrend.summary}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Jump Start Batch Button & Controls */}
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
          {/* Trend Navigation Arrows */}
          <div className="flex items-center gap-1 bg-slate-800/70 p-1 rounded-xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + LIVE_SPORTS_TRENDS.length) % LIVE_SPORTS_TRENDS.length)}
              className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Previous trending topic"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-bold px-1 text-slate-300 select-none">
              {currentIndex + 1}/{LIVE_SPORTS_TRENDS.length}
            </span>
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % LIVE_SPORTS_TRENDS.length)}
              className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Next trending topic"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1-Click Jump Start Button */}
          <button
            id="btn-jump-start-trend"
            type="button"
            disabled={isLoading}
            onClick={() => onJumpStart(currentTrend)}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 transition-all shadow-md hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>Jump-Start Batch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
            title="Minimize Trend Watch"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
