import React from 'react';
import { Bookmark, ArrowUpRight } from 'lucide-react';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
}) => {
  return (
    <article
      onClick={() => onSelectArticle(article.slug)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-white dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
    >
      <div>
        {/* Unboxed editorial kicker */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold tracking-wide uppercase text-[11px] text-amber-700 dark:text-amber-400">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.slug);
            }}
            className={`p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
              isBookmarked
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
            aria-label={isBookmarked ? 'Remove from reading list' : 'Save to reading list'}
            title={isBookmarked ? 'Saved' : 'Save'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Figure */}
        <div className="mb-2">
          <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
            Case Study: {article.figure}
          </p>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors mt-1 leading-snug">
            {article.title}
          </h3>
        </div>

        {/* Subtitle / summary */}
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 mb-5">
          {article.subtitle}
        </p>
      </div>

      {/* Footer metadata */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <span>By {article.author.name}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
        </div>
        <span className="inline-flex items-center gap-1 font-medium text-stone-800 dark:text-stone-200 group-hover:translate-x-0.5 transition-transform">
          Read
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
