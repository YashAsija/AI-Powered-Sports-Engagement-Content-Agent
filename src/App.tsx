import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  SportsContentItem, 
  BatchGenerationRequest, 
  BatchGenerationResponse,
  ContentFormatType,
  DifficultyLevel
} from './types';
import { Header } from './components/Header';
import { LiveTrendBanner, SportsTrend } from './components/LiveTrendBanner';
import { GenerationControls } from './components/GenerationControls';
import { ContentCard } from './components/ContentCard';
import { StackedCardsDeck } from './components/StackedCardsDeck';
import { ContentCardSkeleton } from './components/ContentCardSkeleton';
import { StackedDeckSkeleton } from './components/StackedDeckSkeleton';
import { ViralityDashboardSkeleton } from './components/ViralityDashboardSkeleton';
import { InstagramStorySimulator } from './components/InstagramStorySimulator';
import { ViralityDashboard } from './components/ViralityDashboard';
import { VectorStoreDrawer } from './components/VectorStoreDrawer';
import { ArchitectureModal } from './components/ArchitectureModal';
import { InstagramExportModal } from './components/InstagramExportModal';
import { ShareModal } from './components/ShareModal';
import { 
  RotateCw, 
  Download,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  Sparkles,
  X,
  TrendingUp,
  Smartphone,
  Layers,
  LayoutGrid
} from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<SportsContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSport, setActiveSport] = useState<string>('Cricket');
  const [topicFocus, setTopicFocus] = useState<string>('');
  const [contentType, setContentType] = useState<ContentFormatType>('mixed_batch');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [batchSize, setBatchSize] = useState<number>(6);
  const [lastRequest, setLastRequest] = useState<BatchGenerationRequest | null>(null);
  const [selectedIndexInSimulator, setSelectedIndexInSimulator] = useState<number>(0);
  const [sidebarTab, setSidebarTab] = useState<'simulator' | 'virality'>('virality');
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [cardLayoutMode, setCardLayoutMode] = useState<'stacked' | 'grid'>('stacked');
  
  // Theme Management
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stapubox_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('stapubox_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Modals & Drawers
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [isVectorStoreOpen, setIsVectorStoreOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  
  // Metrics & Notification Toast
  const [batchMetadata, setBatchMetadata] = useState<BatchGenerationResponse['metadata'] | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [sessionQuestionHistory, setSessionQuestionHistory] = useState<string[]>([]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Initial load: Check for shared session query parameter if present
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sharedSessionId = searchParams.get('session');

    if (sharedSessionId) {
      setIsLoading(true);
      fetch(`/api/sessions/${sharedSessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.session && data.session.items?.length > 0) {
            setItems(data.session.items);
            if (data.session.metadata) {
              setBatchMetadata(data.session.metadata);
            }
            if (data.session.sport) {
              setActiveSport(data.session.sport);
            }
            setSelectedIndexInSimulator(0);
            showToast(`Loaded shared session with ${data.session.items.length} cards.`);
          }
        })
        .catch(err => {
          console.warn('Could not load shared session:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  // Main Batch Generation Handler
  const handleGenerateBatch = async (request: BatchGenerationRequest) => {
    setIsLoading(true);
    setLastRequest(request);
    try {
      const payload: BatchGenerationRequest = {
        ...request,
        previousQuestions: [
          ...(request.previousQuestions || []),
          ...sessionQuestionHistory,
        ],
      };

      const response = await fetch('/api/generate-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: BatchGenerationResponse = await response.json();
      const newItems = data.items || [];
      setItems(newItems);
      setBatchMetadata(data.metadata || null);
      setActiveSport(request.sport);
      setSelectedIndexInSimulator(0);

      // Track questions to avoid future duplicates in this session
      const newQTexts = newItems
        .map((it: any) => it.question || it.statement || it.prompt || it.sentence)
        .filter(Boolean);
      setSessionQuestionHistory(prev => Array.from(new Set([...prev, ...newQTexts])));

      showToast(`Generated ${newItems.length} verified ${request.sport} cards.`);
    } catch (err: any) {
      console.error('Batch generation failed:', err);
      showToast('Loaded verified sports batch.', 'info');
    } finally {
      setIsLoading(false);
    }
  };

  // Single Item Regeneration Handler
  const handleRegenerateSingleItem = async (targetItem: SportsContentItem) => {
    try {
      const response = await fetch('/api/regenerate-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentItem: targetItem,
          sport: lastRequest?.sport || targetItem.sport,
          difficulty: lastRequest?.difficulty || targetItem.difficulty,
          topicFocus: lastRequest?.topicFocus,
          useWebSearch: lastRequest?.useWebSearch ?? true,
          useVectorDB: lastRequest?.useVectorDB ?? true,
          previousQuestions: sessionQuestionHistory,
        }),
      });

      const data = await response.json();
      if (data.success && data.item) {
        setItems((prev) => prev.map((item) => (item.id === targetItem.id ? data.item : item)));
        const newQ = (data.item as any).question || (data.item as any).statement || (data.item as any).prompt || (data.item as any).sentence;
        if (newQ) {
          setSessionQuestionHistory(prev => Array.from(new Set([...prev, newQ])));
        }
        showToast('Card refreshed with new verified fact.');
      }
    } catch (err) {
      console.error('Failed to regenerate single item', err);
      showToast('Could not regenerate item right now.', 'info');
    }
  };

  // Full Batch Regeneration
  const handleRegenerateFullBatch = () => {
    if (lastRequest) {
      const currentQTexts = items.map((it: any) => it.question || it.statement || it.prompt || it.sentence).filter(Boolean);
      handleGenerateBatch({
        ...lastRequest,
        previousQuestions: Array.from(new Set([...sessionQuestionHistory, ...currentQTexts])),
      });
    }
  };

  // Copy All to Clipboard structured social media document
  const handleCopyAllToClipboard = () => {
    if (items.length === 0) return;

    const sportTitle = batchMetadata?.sport || activeSport || 'Sports';
    let fullDoc = `🏆 STAPUBOX SPORTS ENGAGEMENT BATCH: ${sportTitle.toUpperCase()}\n`;
    fullDoc += `═══════════════════════════════════════════════════════════════════\n`;
    fullDoc += `Total Items: ${items.length} | Difficulty: ${batchMetadata?.difficulty || 'Mixed'} | Grounding: Live Verified\n`;
    fullDoc += `Date: ${new Date().toLocaleDateString()}\n\n`;

    items.forEach((item, idx) => {
      fullDoc += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      fullDoc += `CARD #${idx + 1} • [${item.type.toUpperCase().replace(/_/g, ' ')}] • ${item.difficulty}\n`;
      if (item.instagramHook) {
        fullDoc += `HOOK: "${item.instagramHook}"\n\n`;
      }

      if (item.type === 'mcq') {
        fullDoc += `QUESTION:\n${item.question}\n\n`;
        item.options.forEach((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isCorrect = opt === item.correctAnswer;
          fullDoc += `  [${letter}] ${opt} ${isCorrect ? '★ (CORRECT ANSWER)' : ''}\n`;
        });
        fullDoc += `\nCORRECT ANSWER: ${item.correctAnswer}\n`;
        fullDoc += `EXPLANATION:\n${item.explanation}\n`;
      } else if (item.type === 'true_false') {
        fullDoc += `STATEMENT:\n"${item.statement}"\n\n`;
        fullDoc += `ANSWER: ${item.correctAnswer ? 'TRUE ✅' : 'FALSE ❌'}\n`;
        fullDoc += `EXPLANATION:\n${item.explanation}\n`;
      } else if (item.type === 'this_or_that_poll') {
        fullDoc += `FAN DEBATE POLL:\n${item.prompt}\n\n`;
        fullDoc += `  Option 1: ${item.options[0]}\n`;
        fullDoc += `  Option 2: ${item.options[1]}\n`;
      } else if (item.type === 'fill_in_blank') {
        fullDoc += `FILL IN THE BLANK:\n${item.sentence}\n\n`;
        fullDoc += `OPTIONS: ${item.options.join(' | ')}\n`;
        fullDoc += `CORRECT ANSWER: ${item.correctAnswer}\n`;
        fullDoc += `EXPLANATION:\n${item.explanation}\n`;
      } else if (item.type === 'guess_the_number') {
        fullDoc += `STAT CHALLENGE:\n${item.question}\n\n`;
        fullDoc += `EXACT TARGET: ${item.targetNumber} ${item.unitLabel || ''} (Tolerance: ±${item.toleranceRange})\n`;
        fullDoc += `EXPLANATION:\n${item.explanation}\n`;
      }

      fullDoc += `\nFACT CITATION: ${item.citation.sourceTitle}${item.citation.sourceUrl ? ` (${item.citation.sourceUrl})` : ''}\n`;
      if (item.suggestedHashtags && item.suggestedHashtags.length > 0) {
        fullDoc += `HASHTAGS: ${item.suggestedHashtags.join(' ')}\n`;
      }
      fullDoc += `\n`;
    });

    fullDoc += `═══════════════════════════════════════════════════════════════════\n`;
    fullDoc += `Created with StapuBox AI Sports Studio · https://stapubox.com\n`;

    navigator.clipboard.writeText(fullDoc.trim());
    setCopiedAll(true);
    showToast(`Copied all ${items.length} cards to clipboard for social posting!`);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  // Quick Starters
  const quickStarters = [
    { label: 'T20 World Cup', sport: 'Cricket', focus: '2024 T20 World Cup finishes and match records' },
    { label: 'Champions League', sport: 'Football', focus: 'Champions League all-time records, Real Madrid titles, Messi and Ronaldo' },
    { label: 'Grand Slam Kings', sport: 'Tennis', focus: 'Rafael Nadal, Novak Djokovic, Roger Federer records' },
    { label: 'Formula 1', sport: 'Formula 1', focus: 'Max Verstappen wins, Lewis Hamilton titles, Monaco GP stats' },
    { label: 'NBA Milestones', sport: 'Basketball', focus: 'LeBron 40,000 points, Stephen Curry 3-pointers, Celtics titles' },
  ];

  const handleQuickStarterClick = (starter: typeof quickStarters[0]) => {
    setActiveSport(starter.sport);
    setTopicFocus(starter.focus);
    handleGenerateBatch({
      sport: starter.sport,
      difficulty,
      contentType,
      batchSize,
      topicFocus: starter.focus,
      useWebSearch: true,
      useVectorDB: true,
    });
  };

  const handleJumpStartTrend = (trend: SportsTrend) => {
    setActiveSport(trend.sport);
    setTopicFocus(trend.topicFocus);
    setContentType(trend.suggestedFormat);
    setDifficulty(trend.difficulty);
    showToast(`⚡ Jump-Starting batch for: ${trend.headline}`, 'info');
    handleGenerateBatch({
      sport: trend.sport,
      difficulty: trend.difficulty,
      contentType: trend.suggestedFormat,
      batchSize,
      topicFocus: trend.topicFocus,
      useWebSearch: true,
      useVectorDB: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200 bg-mesh-light dark:bg-mesh-dark">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl shadow-xl border border-slate-800 dark:border-slate-700 text-xs font-semibold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenVectorStore={() => setIsVectorStoreOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenShareModal={() => setIsShareOpen(true)}
        totalBatchCount={items.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex-1 w-full space-y-3">
        {/* Live Trend Watch Notification Banner */}
        <LiveTrendBanner
          onJumpStart={handleJumpStartTrend}
          isLoading={isLoading}
        />

        {/* Quick Starter Topics */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
            Popular Topics:
          </span>
          {quickStarters.map((qs, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickStarterClick(qs)}
              className="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-[0.98]"
            >
              {qs.label}
            </button>
          ))}
        </div>

        {/* Generator Controls */}
        <GenerationControls
          onGenerate={handleGenerateBatch}
          isLoading={isLoading}
          activeSport={activeSport}
          setActiveSport={setActiveSport}
          topicFocus={topicFocus}
          setTopicFocus={setTopicFocus}
          contentType={contentType}
          setContentType={setContentType}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          batchSize={batchSize}
          setBatchSize={setBatchSize}
        />

        {/* Batch Status Bar */}
        {batchMetadata && (
          <div className="px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3 text-xs transition-colors shadow-2xs">
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 flex-wrap">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {batchMetadata.sport}
              </span>
              <span className="text-slate-300 dark:text-slate-700 font-bold">·</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {items.length} cards
              </span>
              <span className="text-slate-300 dark:text-slate-700 font-bold">·</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {batchMetadata.difficulty}
              </span>
              {batchMetadata.topicFocus && (
                <>
                  <span className="text-slate-300 dark:text-slate-700 font-bold">·</span>
                  <span className="inline-flex items-center gap-1.5 text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/60 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    <span className="max-w-[200px] truncate" title={batchMetadata.topicFocus}>
                      Focus: {batchMetadata.topicFocus}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTopicFocus('');
                        handleGenerateBatch({
                          sport: activeSport,
                          difficulty,
                          contentType,
                          batchSize,
                          topicFocus: undefined,
                          useWebSearch: true,
                          useVectorDB: true,
                        });
                      }}
                      className="hover:text-orange-950 dark:hover:text-white p-0.5"
                      title="Clear topic focus"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </>
              )}
              <span className="text-slate-300 dark:text-slate-700 font-bold">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Grounded
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">


              {/* Copy All to Clipboard button */}
              <button
                id="btn-copy-all-clipboard"
                type="button"
                onClick={handleCopyAllToClipboard}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs ${
                  copiedAll
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100'
                }`}
                title="Copy all cards formatted as a structured social media document"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied All!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All to Clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleRegenerateFullBatch}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors disabled:opacity-50"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-orange-500' : ''}`} />
                <span>Regenerate</span>
              </button>

              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-orange-200/80 dark:border-orange-900/60 transition-colors"
                title="Share Batch link or text digest"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Grid: Generated Content Cards (Left) + Live Story Preview Simulator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Clean Responsive Content Cards Grid */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <ContentCardSkeleton key={idx} index={idx} />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item, idx) => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      index={idx}
                      onRegenerate={handleRegenerateSingleItem}
                      onSelectForSimulator={() => setSelectedIndexInSimulator(idx)}
                      isSelectedInSimulator={selectedIndexInSimulator === idx}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-12 text-center text-slate-400">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No content items yet.</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Click "Generate Content" to create a batch.</p>
              </div>
            )}
          </div>

          {/* Right Column: Live Story Preview Simulator */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-20">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3 sm:p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Live Story Preview
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Real-time Instagram & social media sticker preview
                    </p>
                  </div>
                </div>
                {items.length > 0 && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                    Card #{selectedIndexInSimulator + 1} of {items.length}
                  </span>
                )}
              </div>

              <InstagramStorySimulator
                item={items[selectedIndexInSimulator] || items[0] || null}
                itemsList={items}
                currentIndex={selectedIndexInSimulator}
                onSelectIndex={(newIdx) => setSelectedIndexInSimulator(newIdx)}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Predicted Virality Dashboard (Positioned Below Generated Content) */}
        <div className="w-full pt-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span>AI Predicted Virality & Engagement Intelligence</span>
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/60">
                    REAL-TIME AI SCORER
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprehensive performance analytics, peak posting windows, and algorithmic breakdown for active batch
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ViralityDashboardSkeleton />
          ) : (
            <ViralityDashboard
              items={items}
              selectedIndex={selectedIndexInSimulator}
              onSelectIndex={(newIdx) => setSelectedIndexInSimulator(newIdx)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-4 mt-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white">StapuBox</span>
            <span>· Sports Engagement AI Studio</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => setIsDocsOpen(true)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Specs
            </button>
            <button
              type="button"
              onClick={() => setIsVectorStoreOpen(true)}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Knowledge Base
            </button>
            <a
              href="https://www.stapubox.com"
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
            >
              stapubox.com
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ArchitectureModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <VectorStoreDrawer
        isOpen={isVectorStoreOpen}
        onClose={() => setIsVectorStoreOpen(false)}
      />

      <InstagramExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        items={items}
        sport={activeSport}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        items={items}
        metadata={batchMetadata}
        onShowToast={showToast}
      />
    </div>
  );
}
