import React, { useState, useEffect } from 'react';
import { VectorFactDocument } from '../types';
import { 
  Database, 
  Search, 
  Plus, 
  X, 
  CheckCircle2
} from 'lucide-react';

interface VectorStoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VectorStoreDrawer: React.FC<VectorStoreDrawerProps> = ({ isOpen, onClose }) => {
  const [facts, setFacts] = useState<VectorFactDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchResults, setSearchResults] = useState<{ document: VectorFactDocument; score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // New Fact Form States
  const [newSport, setNewSport] = useState('Cricket');
  const [newCategory, setNewCategory] = useState<'records' | 'tournaments' | 'rules' | 'milestones' | 'biographies'>('records');
  const [newTitle, setNewTitle] = useState('');
  const [newSnippet, setNewSnippet] = useState('');
  const [newEra, setNewEra] = useState('Modern');
  const [newKeywords, setNewKeywords] = useState('');
  const [newSource, setNewSource] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchFacts();
    }
  }, [isOpen, selectedSport]);

  const fetchFacts = async () => {
    setIsLoading(true);
    try {
      const url = selectedSport !== 'All' 
        ? `/api/vector-db/facts?sport=${encodeURIComponent(selectedSport)}`
        : `/api/vector-db/facts`;
      const res = await fetch(url);
      const data = await res.json();
      setFacts(data.documents || []);
    } catch (err) {
      console.error('Failed to fetch vector documents', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVectorSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      fetchFacts();
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/vector-db/facts?q=${encodeURIComponent(searchQuery)}&sport=${encodeURIComponent(selectedSport)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error('Error querying vector db', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSnippet.trim()) return;

    try {
      const res = await fetch('/api/vector-db/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: newSport,
          category: newCategory,
          factTitle: newTitle.trim(),
          factSnippet: newSnippet.trim(),
          era: newEra.trim(),
          keywords: newKeywords.split(',').map(k => k.trim()).filter(Boolean),
          sourceReference: newSource.trim() || 'Verified Official Sports Archive'
        })
      });
      const data = await res.json();
      if (data.success) {
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
          setShowAddForm(false);
          setNewTitle('');
          setNewSnippet('');
          setNewKeywords('');
          fetchFacts();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to add document', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col overflow-hidden border-l border-slate-200/80 dark:border-slate-800">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                Knowledge Base (Vector Store)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grounding database for historical stats and verified records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 space-y-3">
          <form onSubmit={handleVectorSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search facts (e.g. 264 runs, Roland Garros)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-slate-400"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>

          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
              {['All', 'Cricket', 'Football', 'Tennis', 'Basketball', 'Badminton', 'Formula 1', 'Athletics & Olympics'].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => {
                    setSelectedSport(sp);
                    setSearchResults([]);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedSport === sp 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add Fact'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Add Fact Form */}
        {showAddForm && (
          <form onSubmit={handleAddFactSubmit} className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>Add Verified Record</span>
              {addSuccess && (
                <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Sport</label>
                <select
                  value={newSport}
                  onChange={(e) => setNewSport(e.target.value)}
                  className="w-full p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200"
                >
                  {['Cricket', 'Football', 'Tennis', 'Badminton', 'Basketball', 'Formula 1', 'Athletics & Olympics'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="records">Record</option>
                  <option value="tournaments">Tournament</option>
                  <option value="milestones">Milestone</option>
                  <option value="rules">Rule</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Fact Title</label>
              <input
                type="text"
                placeholder="e.g. Most Triple Centuries in Test Cricket"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Fact Snippet</label>
              <textarea
                rows={2}
                placeholder="Verified historical details..."
                value={newSnippet}
                onChange={(e) => setNewSnippet(e.target.value)}
                required
                className="w-full p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-xs"
            >
              Save Fact
            </button>
          </form>
        )}

        {/* Fact List / Search Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {searchResults.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Matches ({searchResults.length})
                </span>
                <button
                  type="button"
                  onClick={() => setSearchResults([])}
                  className="text-xs text-blue-600 dark:text-blue-400"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-2">
                {searchResults.map((res) => (
                  <div key={res.document.id} className="p-3 rounded-xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{res.document.factTitle}</span>
                      <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                        {(res.score * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-1.5">
                      {res.document.factSnippet}
                    </p>
                    <div className="text-[10px] text-slate-400">
                      {res.document.sport} · {res.document.sourceReference}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-500 mb-2">
                {facts.length} Indexed Documents
              </div>

              {facts.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-850">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">{doc.factTitle}</h4>
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {doc.sport}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-1.5">
                    {doc.factSnippet}
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Source: {doc.sourceReference}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
