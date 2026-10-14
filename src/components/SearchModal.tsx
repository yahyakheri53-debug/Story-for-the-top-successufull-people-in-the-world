import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? articles.slice(0, 5)
    : articles.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.figure.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.sections.some(
            (s) =>
              s.questionHeading.toLowerCase().includes(q) ||
              s.quickAnswer.toLowerCase().includes(q) ||
              s.subsections.some((sub) =>
                sub.content.some((c) => c.toLowerCase().includes(q))
              )
          )
        );
      });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl overflow-hidden transition-all text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search thinkers, questions, or mental models... (e.g. 2x2 grid, CUDA, empathy)"
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 mr-2 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800/60">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400 dark:text-stone-500 text-sm">
              No matching thinkers or essays found for "{query}".
            </div>
          ) : (
            <>
              <div className="px-3 py-1.5 text-[11px] font-medium tracking-wider uppercase text-stone-400 dark:text-stone-500">
                {query ? `Found ${filtered.length} matches` : 'Featured Case Studies'}
              </div>
              {filtered.map((art) => (
                <button
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors flex items-start justify-between group cursor-pointer"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
                      <span className="font-medium text-amber-700 dark:text-amber-400">{art.figure}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.readingTime}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                      {art.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  </div>
                </button>
              ))}
            </>
          )}
        </div>

        <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-stone-400" />
            Clean URLs & Indexed Case Studies
          </span>
          <span className="hidden sm:inline">Press Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
