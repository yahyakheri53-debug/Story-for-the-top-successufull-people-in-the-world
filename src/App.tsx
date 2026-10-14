/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FeaturedHero } from './components/FeaturedHero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { ARTICLES, Article } from './data/articles';
import { Bookmark, Sparkles, Filter, X } from 'lucide-react';

const HOME_SEO_TITLE = "Apex Minds: 10 Success Habits of History's Greatest Leaders"; // 59 chars
const HOME_SEO_DESCRIPTION = "Explore the 10 proven success principles of history's top achievers. Master focus, resilience, and mental models from legendary pioneers. Read the blueprints now."; // 160 chars

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_minds_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('apex_minds_bookmarks');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Clean HTML5 URL routing without # symbols or random IDs
  const [activeSlug, setActiveSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '');
      if (cleanPath && ARTICLES.some((a) => a.slug === cleanPath)) {
        return cleanPath;
      }
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('apex_minds_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('apex_minds_theme', 'light');
    }
  }, [isDark]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('apex_minds_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle Home page SEO title and description when activeSlug is null
  useEffect(() => {
    if (!activeSlug) {
      document.title = HOME_SEO_TITLE;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', HOME_SEO_DESCRIPTION);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', HOME_SEO_TITLE);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', HOME_SEO_DESCRIPTION);
    }
  }, [activeSlug]);

  // Sync clean browser pathname navigation with popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '');
      if (cleanPath && ARTICLES.some((a) => a.slug === cleanPath)) {
        setActiveSlug(cleanPath);
      } else {
        setActiveSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const toggleBookmark = (slug: string) => {
    setBookmarks((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Clean navigation with HTML5 History API (no # symbols)
  const handleSelectArticle = (slug: string) => {
    setActiveSlug(slug);
    window.history.pushState({ slug }, '', `/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveSlug(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered articles list
  const filteredArticles = ARTICLES.filter((art) => {
    if (showBookmarksOnly && !bookmarks.includes(art.slug)) {
      return false;
    }
    if (selectedCategory !== 'All' && art.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const activeArticle = activeSlug
    ? ARTICLES.find((a) => a.slug === activeSlug)
    : null;

  const leadFeaturedArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-950 dark:selection:bg-amber-900/60 dark:selection:text-amber-100">
      {/* Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowBookmarksOnly(false);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        bookmarkCount={bookmarks.length}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarksFilter={() => {
          setShowBookmarksOnly((prev) => !prev);
          handleBackToHome();
        }}
        onGoHome={handleBackToHome}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            isBookmarked={bookmarks.includes(activeArticle.slug)}
            onToggleBookmark={toggleBookmark}
            onBack={handleBackToHome}
            onSelectArticle={handleSelectArticle}
          />
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
            {/* RULE 3: Exactly ONE H1 per page: The Main Topic */}
            <div className="mb-10 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="font-semibold uppercase tracking-wider text-[11px] text-amber-700 dark:text-amber-400">
                  Biographical Case Studies
                </span>
                <span aria-hidden="true">·</span>
                <span>10 Monograms on Exceptional Minds</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
                The Anatomy of Remarkable Lives: 10 Success Blueprints
              </h1>
              <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
                Deconstructing how history and the modern world’s most consequential inventors, leaders, scientists, and investors made decisions, endured failure, and bent reality.
              </p>
            </div>

            {/* If browsing normally without filters, display Featured Hero */}
            {selectedCategory === 'All' && !showBookmarksOnly && (
              <FeaturedHero
                article={leadFeaturedArticle}
                isBookmarked={bookmarks.includes(leadFeaturedArticle.slug)}
                onToggleBookmark={toggleBookmark}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {/* Filter Bar / Status Indicator */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
              <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  Showing {filteredArticles.length} of {ARTICLES.length} essays
                </span>
                {(selectedCategory !== 'All' || showBookmarksOnly) && (
                  <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium ml-2">
                    ({showBookmarksOnly ? 'Saved Articles' : selectedCategory})
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('All');
                        setShowBookmarksOnly(false);
                      }}
                      className="hover:text-stone-900 dark:hover:text-stone-100 p-0.5 rounded cursor-pointer"
                      title="Clear filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>

              {bookmarks.length > 0 && !showBookmarksOnly && (
                <button
                  type="button"
                  onClick={() => setShowBookmarksOnly(true)}
                  className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>View your {bookmarks.length} saved reading list</span>
                </button>
              )}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white dark:bg-stone-900/40 rounded-xl border border-stone-200 dark:border-stone-800">
                <Bookmark className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200">
                  No essays found in this view
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                  {showBookmarksOnly
                    ? "You haven't bookmarked any essays yet. Click the bookmark icon on any card to save it."
                    : 'Try selecting a different discipline or reset filters.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    setShowBookmarksOnly(false);
                  }}
                  className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:opacity-90 cursor-pointer"
                >
                  Show All 10 Essays
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isBookmarked={bookmarks.includes(article.slug)}
                    onToggleBookmark={toggleBookmark}
                    onSelectArticle={handleSelectArticle}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowBookmarksOnly(false);
          handleBackToHome();
        }}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectArticle={handleSelectArticle}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      {/* Contact & Nominations Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
