import React, { useState } from 'react';
import { Search, Bookmark, Mail, Menu, X, Compass } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  bookmarkCount: number;
  showBookmarksOnly: boolean;
  onToggleBookmarksFilter: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenContact,
  bookmarkCount,
  showBookmarksOnly,
  onToggleBookmarksFilter,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    'All',
    'Technology',
    'Science',
    'Strategy',
    'Leadership',
    'Arts & Culture',
  ];

  return (
    <header className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner / Masthead */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-stone-200/60 dark:border-stone-800/60">
          {/* Logo / Title as clean crawlable Home link */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer group select-none flex items-baseline gap-2.5 focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              APEX MINDS
            </span>
            <span className="hidden md:inline text-xs text-stone-400 dark:text-stone-500 font-sans tracking-widest uppercase">
              The Architecture of Success
            </span>
          </a>

          {/* Action buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors border border-stone-200 dark:border-stone-800 cursor-pointer"
              aria-label="Search case studies"
            >
              <Search className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline text-[10px] bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks toggle */}
            <button
              type="button"
              onClick={onToggleBookmarksFilter}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
              }`}
              title="Saved reading list"
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Contact Trigger */}
            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              title="Contact & Nominations"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contact</span>
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Mobile burger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:hidden rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden sm:flex items-center space-x-1 py-2.5 overflow-x-auto text-xs" aria-label="Disciplines">
          <span className="text-stone-400 dark:text-stone-500 mr-2 flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold">
            <Compass className="w-3.5 h-3.5" />
            Disciplines:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat && !showBookmarksOnly;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onSelectCategory(cat);
                  onGoHome();
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors text-xs cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-200/80 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 dark:text-stone-500 px-2">
              Browse by Discipline
            </div>
            <div className="flex flex-wrap gap-1.5 px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    onGoHome();
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                    selectedCategory === cat && !showBookmarksOnly
                      ? 'bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100'
                      : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
