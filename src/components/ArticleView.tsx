import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  Volume2,
  VolumeX,
  Type,
  Clock,
  User,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';

interface ArticleViewProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onSelectArticle,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Scroll progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document title for SEO & tabs
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${article.title} – Apex Minds`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.title = prevTitle;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  // Audio Speech Synthesis
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.subtitle}. Key principles: ${article.keyPrinciples.join('. ')}. ${article.sections.map((s) => `${s.heading}. ${s.content.join(' ')}`).join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedArticles = article.relatedSlugs
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));

  const fontSizeClass = {
    normal: 'text-base sm:text-[17px] leading-relaxed',
    large: 'text-lg sm:text-[19px] leading-relaxed',
    xlarge: 'text-xl sm:text-[21px] leading-relaxed',
  }[fontSize];

  return (
    <article className="min-h-screen pb-20">
      {/* Top sticky scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-amber-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Navigation bar */}
      <div className="sticky top-0 z-30 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Essays</span>
          </button>

          {/* Reading utility controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Audio narration toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isSpeaking
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
              }`}
              title={isSpeaking ? 'Pause reading narration' : 'Listen to essay'}
              aria-label={isSpeaking ? 'Stop narration' : 'Listen to narration'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Playing' : 'Listen'}</span>
            </button>

            {/* Font size cycler */}
            <button
              type="button"
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xlarge');
                else setFontSize('normal');
              }}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors flex items-center gap-1"
              title={`Font size: ${fontSize}. Click to adjust.`}
              aria-label="Adjust font size"
            >
              <Type className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase">{fontSize.charAt(0)}</span>
            </button>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => onToggleBookmark(article.slug)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
              }`}
              title={isBookmarked ? 'Saved in reading list' : 'Save for later'}
              aria-label="Toggle bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share link button */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors relative"
              title="Copy essay link"
              aria-label="Share essay"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copied && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Editorial Metadata Header */}
        <header className="mb-10 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
            <span className="font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Focus: {article.figure}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readingTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.wordCount} words</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Byline */}
          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-900 dark:text-amber-300 font-serif font-bold">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-stone-100">
                  {article.author.name}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <time>{article.publishedDate}</time>
            </div>
          </div>
        </header>

        {/* Executive Summary & Mental Models Callout */}
        <section className="my-8 p-6 sm:p-7 rounded-xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>The Core Mental Models & Principles</span>
          </div>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mb-4 font-serif italic">
            "{article.summary}"
          </p>
          <ul className="space-y-2.5">
            {article.keyPrinciples.map((principle, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 mt-2 shrink-0" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Structured Sections */}
        <div className={`space-y-10 text-stone-800 dark:text-stone-200 font-sans ${fontSizeClass}`}>
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 first:border-t-0 first:pt-0">
                {section.heading}
              </h2>
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Interleaved Pull Quotes */}
              {article.quotes[idx] && (
                <figure className="my-8 py-4 px-6 border-l-3 border-amber-600 dark:border-amber-400 bg-amber-50/40 dark:bg-amber-950/20 rounded-r-lg">
                  <blockquote className="font-serif italic text-base sm:text-lg text-stone-900 dark:text-stone-100">
                    "{article.quotes[idx].text}"
                  </blockquote>
                  <figcaption className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-sans font-normal">
                    — {article.figure}, <span className="italic">{article.quotes[idx].context}</span>
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Actionable Lessons for Readers */}
        <section className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-4">
            <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Blueprint: How to Apply These Lessons Today</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {article.actionableTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              >
                <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 mb-1 block">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  {takeaway.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {takeaway.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Share & Bookmark Footer Callout */}
        <div className="mt-12 p-6 rounded-xl bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Found this case study valuable?
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Share it with fellow builders, founders, and scholars.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share URL'}</span>
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Deep dive on ${article.figure}: ${article.title}`
              )}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <span>Post to X</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Related Articles Navigation */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-10 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 mb-6">
              Further Biographical Inquiries
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all cursor-pointer group"
                >
                  <div className="text-xs text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-2">
                    <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase text-[10px]">
                      {rel.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{rel.readingTime}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                    {rel.subtitle}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-stone-800 dark:text-stone-200">
                    <span>Read Essay</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
