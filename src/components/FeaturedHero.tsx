import React from 'react';
import { ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { Article } from '../data/articles';

interface FeaturedHeroProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
}) => {
  return (
    <section className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-12">
      <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs relative overflow-hidden">
        {/* Subtle accent corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-3xl">
          {/* Unboxed kicker */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
            <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 tracking-wider uppercase text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Lead Feature
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
          </div>

          <h2
            onClick={() => onSelectArticle(article.slug)}
            className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer leading-tight tracking-tight"
          >
            {article.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            {article.subtitle}
          </p>

          {/* Pull quote teaser */}
          {article.quotes[0] && (
            <div className="my-6 pl-4 border-l-2 border-amber-500/70 italic text-stone-700 dark:text-stone-300 text-sm sm:text-base font-serif">
              "{article.quotes[0].text}"
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onSelectArticle(article.slug)}
              className="px-5 py-2.5 rounded-lg bg-stone-900 dark:bg-amber-400 text-stone-100 dark:text-stone-950 font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Read Full Essay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(article.slug)}
              className={`px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                isBookmarked
                  ? 'border-amber-400 text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20'
                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved to Reading List' : 'Save for Later'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
