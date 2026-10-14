import React from 'react';
import { ArrowRight, Bookmark, Sparkles } from 'lucide-react';
import { Article } from '../data/articles';
import { ARTICLE_IMAGES } from '../assets/articleImages';

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
  const imageMeta = ARTICLE_IMAGES[article.imageKey] || ARTICLE_IMAGES['steve-jobs'];

  return (
    <section className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-12">
      <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs relative overflow-hidden">
        {/* Subtle accent corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {/* Unboxed kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
              <span className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 tracking-wider uppercase text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Lead Feature
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
              <a
                href={`/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(article.slug);
                }}
                className="hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
              >
                {article.title}
              </a>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {article.subtitle}
            </p>

            {/* Pull quote teaser */}
            {article.quotes[0] && (
              <div className="my-5 pl-4 border-l-2 border-amber-500/70 italic text-stone-700 dark:text-stone-300 text-sm sm:text-base font-serif">
                "{article.quotes[0].text}"
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(article.slug);
                }}
                className="px-5 py-2.5 rounded-lg bg-stone-900 dark:bg-amber-400 text-stone-100 dark:text-stone-950 font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-xs"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </a>

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

          {/* Lead Image Display with Descriptive Alt and Compression Check (<200KB) */}
          <div className="lg:col-span-5">
            <figure className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800/50 shadow-sm">
              <a
                href={`/${article.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectArticle(article.slug);
                }}
                className="block"
                tabIndex={-1}
              >
                <img
                  src={imageMeta.svgDataUri}
                  alt={imageMeta.alt}
                  width={600}
                  height={375}
                  className="w-full h-auto object-cover hover:scale-102 transition-transform duration-300"
                  loading="eager"
                />
              </a>
              <figcaption className="p-2.5 bg-stone-50 dark:bg-stone-950 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                <span className="truncate mr-2">{imageMeta.caption}</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 shrink-0">
                  {imageMeta.fileSizeKb} KB (&lt;200KB)
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
