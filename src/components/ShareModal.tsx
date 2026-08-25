import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Link2, 
  FileText, 
  Sparkles, 
  MessageSquare, 
  Instagram, 
  Loader2,
  ExternalLink,
  Download
} from 'lucide-react';
import { SportsContentItem, BatchGenerationResponse } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SportsContentItem[];
  metadata: BatchGenerationResponse['metadata'] | null;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

type SummaryTab = 'link' | 'slack' | 'instagram' | 'plain';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  items,
  metadata,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<SummaryTab>('link');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const sportName = metadata?.sport || items[0]?.sport || 'Sports';

  // Automatically generate unique session ID when modal opens if items exist
  useEffect(() => {
    if (isOpen && items.length > 0 && !sessionId) {
      handleCreateSessionLink();
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  const handleCreateSessionLink = async () => {
    setIsGeneratingLink(true);
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: sportName,
          items,
          metadata,
          title: `${sportName} Content Batch (${items.length} items)`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
      }
    } catch (err) {
      console.error('Failed to create session link:', err);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const shareUrl = sessionId 
    ? `${window.location.origin}${window.location.pathname}?session=${sessionId}#/studio`
    : `${window.location.origin}${window.location.pathname}#/studio`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    onShowToast('Session link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Generate Slack / Markdown Digest
  const generateSlackDigest = (): string => {
    let text = `🏆 *StapuBox Sports Engagement Batch: ${sportName.toUpperCase()}*\n`;
    text += `📊 *Total Items:* ${items.length} | *Difficulty:* ${metadata?.difficulty || 'Mixed'} | *Verified Fact Check:* Grounded\n\n`;

    items.forEach((item, idx) => {
      text += `*#${idx + 1} [${item.type.toUpperCase().replace(/_/g, ' ')}] - ${item.difficulty}*\n`;
      if (item.instagramHook) {
        text += `> _"${item.instagramHook}"_\n`;
      }

      if (item.type === 'mcq') {
        text += `❓ *Q:* ${item.question}\n`;
        item.options.forEach((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isCorrect = opt === item.correctAnswer;
          text += `   ${letter}) ${opt} ${isCorrect ? '✅ (Correct)' : ''}\n`;
        });
        text += `💡 *Explanation:* ${item.explanation}\n`;
      } else if (item.type === 'true_false') {
        text += `❓ *Statement:* "${item.statement}"\n`;
        text += `👉 *Answer:* ${item.correctAnswer ? 'TRUE ✅' : 'FALSE ❌'}\n`;
        text += `💡 *Explanation:* ${item.explanation}\n`;
      } else if (item.type === 'this_or_that_poll') {
        text += `🔥 *Fan Debate:* ${item.prompt}\n`;
        text += `   Option A: ${item.options[0]}\n`;
        text += `   Option B: ${item.options[1]}\n`;
      } else if (item.type === 'fill_in_blank') {
        text += `✏️ *Fill in Blank:* ${item.sentence}\n`;
        text += `👉 *Correct:* ${item.correctAnswer}\n`;
        text += `💡 *Explanation:* ${item.explanation}\n`;
      } else if (item.type === 'guess_the_number') {
        text += `🎯 *Stat Challenge:* ${item.question}\n`;
        text += `👉 *Exact Target:* ${item.targetNumber} ${item.unitLabel || ''} (±${item.toleranceRange})\n`;
        text += `💡 *Explanation:* ${item.explanation}\n`;
      }

      text += `🔍 *Source:* ${item.citation.sourceTitle}${item.citation.sourceUrl ? ` (<${item.citation.sourceUrl}|Link>)` : ''}\n\n`;
    });

    text += `Generated via StapuBox AI Sports Studio · ${new Date().toLocaleDateString()}`;
    return text;
  };

  // Generate Instagram Story Posting Plan
  const generateInstagramPlan = (): string => {
    let text = `📱 INSTAGRAM STORY PRODUCTION PLAN (${sportName.toUpperCase()})\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    items.forEach((item, idx) => {
      text += `STORY #${idx + 1} • ${item.type.toUpperCase().replace(/_/g, ' ')}\n`;
      text += `Hook: "${item.instagramHook || 'Test your sports IQ!'}"\n\n`;

      if (item.type === 'mcq') {
        text += `Interactive Sticker: Instagram Quiz Sticker\n`;
        text += `Question: ${item.question}\n`;
        text += `Options:\n`;
        item.options.forEach((opt, i) => {
          text += `  [${String.fromCharCode(65 + i)}] ${opt} ${opt === item.correctAnswer ? '★ (CORRECT)' : ''}\n`;
        });
      } else if (item.type === 'true_false') {
        text += `Interactive Sticker: Instagram Poll Sticker (TRUE / FALSE)\n`;
        text += `Statement: "${item.statement}"\n`;
        text += `Correct: ${item.correctAnswer ? 'TRUE' : 'FALSE'}\n`;
      } else if (item.type === 'this_or_that_poll') {
        text += `Interactive Sticker: Instagram 2-Choice Poll Sticker\n`;
        text += `Debate: ${item.prompt}\n`;
        text += `Option 1: ${item.options[0]}\n`;
        text += `Option 2: ${item.options[1]}\n`;
      } else if (item.type === 'fill_in_blank') {
        text += `Interactive Sticker: Question Box or Quiz Sticker\n`;
        text += `Sentence: ${item.sentence}\n`;
        text += `Answer: ${item.correctAnswer}\n`;
      } else if (item.type === 'guess_the_number') {
        text += `Interactive Sticker: Instagram Emoji Slider or Question Box\n`;
        text += `Prompt: ${item.question}\n`;
        text += `Target: ${item.targetNumber} ${item.unitLabel || ''}\n`;
      }

      text += `\nVerification Note: ${item.citation.sourceTitle}\n`;
      if (item.suggestedHashtags?.length) {
        text += `Hashtags: ${item.suggestedHashtags.join(' ')}\n`;
      }
      text += `\n──────────────────────────────────────────\n\n`;
    });

    return text;
  };

  // Generate Concise Plain Text
  const generatePlainText = (): string => {
    let text = `${sportName} Sports Trivia Batch (${items.length} items):\n\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. `;
      if (item.type === 'mcq') {
        text += `${item.question}\n   Answer: ${item.correctAnswer}\n`;
      } else if (item.type === 'true_false') {
        text += `"${item.statement}" -> ${item.correctAnswer ? 'TRUE' : 'FALSE'}\n`;
      } else if (item.type === 'this_or_that_poll') {
        text += `${item.prompt} (${item.options.join(' vs ')})\n`;
      } else if (item.type === 'fill_in_blank') {
        text += `${item.sentence} -> Answer: ${item.correctAnswer}\n`;
      } else if (item.type === 'guess_the_number') {
        text += `${item.question} -> Target: ${item.targetNumber} ${item.unitLabel || ''}\n`;
      }
      text += `   Source: ${item.citation.sourceTitle}\n\n`;
    });
    return text;
  };

  const getCurrentSummaryText = (): string => {
    if (activeTab === 'slack') return generateSlackDigest();
    if (activeTab === 'instagram') return generateInstagramPlan();
    if (activeTab === 'plain') return generatePlainText();
    return shareUrl;
  };

  const handleCopySummary = () => {
    const content = getCurrentSummaryText();
    navigator.clipboard.writeText(content);
    setCopiedSummary(true);
    onShowToast('Summary text copied to clipboard!');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadSummary = () => {
    const content = getCurrentSummaryText();
    const extension = activeTab === 'slack' ? 'md' : 'txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stapubox-${sportName.toLowerCase()}-batch-${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast(`Downloaded batch summary.`);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `StapuBox ${sportName} Sports Content Batch`,
          text: `Check out this verified ${sportName} sports engagement batch on StapuBox:`,
          url: shareUrl,
        });
      } catch (err) {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Share Batch with Team
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate a live session link or formatted editorial summary for {sportName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-5 pt-3 pb-0 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'link'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Session Link</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'slack'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Slack / Markdown Digest</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('instagram')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'instagram'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram Story Plan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plain')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'plain'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Bullets</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-900 dark:text-orange-300">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>Permanent Interactive Session Link</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Anyone with this link can view, test, and preview this exact {items.length}-card verified sports batch in the Instagram simulator.
                </p>
              </div>

              {/* Link Input Bar */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  Unique Batch URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={isGeneratingLink ? 'Generating unique session link...' : shareUrl}
                      className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-800 dark:text-slate-200 select-all"
                    />
                    {isGeneratingLink && (
                      <Loader2 className="w-3.5 h-3.5 text-orange-500 animate-spin absolute right-2.5 top-2.5" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    disabled={isGeneratingLink}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      copiedLink
                        ? 'bg-emerald-600 text-white'
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
                    }`}
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 pt-1">
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-orange-500" />
                    <span>System Share</span>
                  </button>
                )}

                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Open in New Tab</span>
                </a>
              </div>

              {/* Batch Breakdown Preview */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Session Metadata
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>Sport: <strong>{sportName}</strong></span>
                  <span>Items: <strong>{items.length} cards</strong></span>
                  <span>Fact Verification: <strong>Live Grounded</strong></span>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'link' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {activeTab === 'slack' && 'Formatted for Slack channels, Discord, or Markdown docs.'}
                  {activeTab === 'instagram' && 'Ready-to-use story deck sequence for social media managers.'}
                  {activeTab === 'plain' && 'Clean bulleted list for WhatsApp or direct messaging.'}
                </span>
                <span className="font-mono text-[11px]">
                  {items.length} items
                </span>
              </div>

              {/* Textarea preview */}
              <div className="relative">
                <textarea
                  readOnly
                  rows={11}
                  value={getCurrentSummaryText()}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-750 rounded-xl font-mono text-slate-800 dark:text-slate-200 focus:outline-none select-all leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadSummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download file</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    copiedSummary
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                  }`}
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>StapuBox Sports Engagement Engine</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
