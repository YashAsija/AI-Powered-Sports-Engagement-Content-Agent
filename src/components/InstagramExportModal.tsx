import React, { useState } from 'react';
import { SportsContentItem } from '../types';
import { calculateViralityScore } from '../lib/viralityScorer';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileText, 
  FileSpreadsheet, 
  Code, 
  Smartphone 
} from 'lucide-react';

interface InstagramExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SportsContentItem[];
  sport: string;
}

export const InstagramExportModal: React.FC<InstagramExportModalProps> = ({
  isOpen,
  onClose,
  items,
  sport,
}) => {
  const [activeTab, setActiveTab] = useState<'stickers' | 'captions' | 'csv' | 'json'>('stickers');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateStickerExportText = () => {
    return items.map((item, idx) => {
      let stickerPart = '';
      if (item.type === 'mcq') {
        stickerPart = `[QUIZ STICKER]\nQuestion: ${item.question}\nOption A: ${item.options[0]}\nOption B: ${item.options[1]}\nOption C: ${item.options[2]}\nOption D: ${item.options[3]}\nCorrect: ${item.correctAnswer}`;
      } else if (item.type === 'true_false') {
        stickerPart = `[TRUE/FALSE STICKER]\nStatement: "${item.statement}"\nOption 1: TRUE\nOption 2: FALSE\nCorrect: ${item.correctAnswer ? 'TRUE' : 'FALSE'}`;
      } else if (item.type === 'this_or_that_poll') {
        stickerPart = `[POLL STICKER]\nPrompt: ${item.prompt}\nOption 1: ${item.options[0]}\nOption 2: ${item.options[1]}`;
      } else if (item.type === 'fill_in_blank') {
        stickerPart = `[FILL IN BLANK]\nSentence: ${item.sentence}\nA: ${item.options[0]}\nB: ${item.options[1]}\nC: ${item.options[2]}\nD: ${item.options[3]}\nCorrect: ${item.correctAnswer}`;
      } else if (item.type === 'guess_the_number') {
        stickerPart = `[GUESS NUMBER]\nQuestion: ${item.question}\nTarget: ${item.targetNumber} ${item.unitLabel || ''}\nTolerance: ±${item.toleranceRange}`;
      }

      return `--- ITEM #${idx + 1} (${item.sport} - ${item.difficulty}) ---\n${item.instagramHook ? `Hook: "${item.instagramHook}"\n` : ''}${stickerPart}\nExplanation: ${item.explanation || 'Verified facts'}\n`;
    }).join('\n');
  };

  const generateCaptionExportText = () => {
    return items.map((item, idx) => {
      const hook = item.instagramHook || 'Test your sports knowledge below.';
      const hashtags = item.suggestedHashtags?.join(' ') || `#${item.sport.toLowerCase().replace(/[^a-z0-9]/g, '')} #SportsQuiz`;
      
      let body = '';
      if (item.type === 'mcq') {
        body = `${item.question}\n\nA) ${item.options[0]}\nB) ${item.options[1]}\nC) ${item.options[2]}\nD) ${item.options[3]}`;
      } else if (item.type === 'true_false') {
        body = `True or False?\n"${item.statement}"`;
      } else if (item.type === 'this_or_that_poll') {
        body = `FAN POLL\n${item.prompt}\n\n1. ${item.options[0]}\n2. ${item.options[1]}`;
      } else if (item.type === 'fill_in_blank') {
        body = `Fill in the blank:\n"${item.sentence}"`;
      } else if (item.type === 'guess_the_number') {
        body = `STAT CHALLENGE\n${item.question}`;
      }

      return `--- POST #${idx + 1} ---\n${hook}\n\n${body}\n\nDrop your answer below.\n\n${hashtags}\n`;
    }).join('\n');
  };

  const generateCSV = () => {
    const headers = ['ID', 'Sport', 'Type', 'Difficulty', 'ViralityScore', 'ViralityTier', 'Prompt_or_Question', 'Options', 'CorrectAnswer', 'Explanation', 'Hook', 'CitationSource'];
    const rows = items.map((item) => {
      const v = calculateViralityScore(item);
      const q = (item as any).question || (item as any).statement || (item as any).prompt || (item as any).sentence || '';
      const opts = (item as any).options ? (item as any).options.join(' | ') : '';
      const ans = String((item as any).correctAnswer ?? (item as any).targetNumber ?? 'Opinion');
      const exp = item.explanation || '';
      const hook = item.instagramHook || '';
      const source = item.citation?.sourceTitle || 'Grounded DB';

      return [
        item.id,
        item.sport,
        item.type,
        item.difficulty,
        v.overallScore,
        `"${v.tier}"`,
        `"${q.replace(/"/g, '""')}"`,
        `"${opts.replace(/"/g, '""')}"`,
        `"${ans.replace(/"/g, '""')}"`,
        `"${exp.replace(/"/g, '""')}"`,
        `"${hook.replace(/"/g, '""')}"`,
        `"${source.replace(/"/g, '""')}"`,
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  };

  const getExportContent = () => {
    if (activeTab === 'stickers') return generateStickerExportText();
    if (activeTab === 'captions') return generateCaptionExportText();
    if (activeTab === 'csv') return generateCSV();
    return JSON.stringify(items, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    let filename = `sports-batch-${sport.toLowerCase()}-${Date.now()}`;
    let mime = 'text/plain';

    if (activeTab === 'csv') {
      filename += '.csv';
      mime = 'text/csv';
    } else if (activeTab === 'json') {
      filename += '.json';
      mime = 'application/json';
    } else {
      filename += '.txt';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Export Content ({items.length} Items)
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Formatted for Instagram stickers, captions, or scheduling tools
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 pt-1.5 gap-2 text-xs font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('stickers')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'stickers' 
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Sticker Format</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('captions')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'captions' 
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Captions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'csv' 
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-t-lg border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'json' 
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 font-semibold' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 p-4 bg-slate-900 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed max-h-80 whitespace-pre-wrap">
          {getExportContent()}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
