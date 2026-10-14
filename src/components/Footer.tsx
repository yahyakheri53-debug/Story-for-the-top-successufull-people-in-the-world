import React, { useState } from 'react';
import { Send, Check, Sparkles, BookOpen } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenContact: () => void;
  onSelectArticle: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenContact,
  onSelectArticle,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try {
        const subs = JSON.parse(localStorage.getItem('apex_minds_newsletter') || '[]');
        localStorage.setItem('apex_minds_newsletter', JSON.stringify([...subs, email]));
      } catch (e) {
        console.error(e);
      }
      setSubscribed(true);
      setEmail('');
    }
  };

  const topStudies = [
    { name: 'Steve Jobs: Relentless Focus', slug: 'steve-jobs' },
    { name: 'Marie Curie: The Anatomy of Grit', slug: 'marie-curie' },
    { name: 'Warren Buffett: Rational Compounding', slug: 'warren-buffett' },
    { name: 'Jensen Huang: High Pain Tolerance', slug: 'jensen-huang' },
  ];

  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40 text-stone-600 dark:text-stone-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              APEX MINDS
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-sm">
              An independent editorial chronicle examining the mental models, disciplined craft, and philosophical resilience of the world’s most consequential thinkers and builders.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>10 In-Depth Case Studies & Monograms</span>
            </div>
          </div>

          {/* Featured Case Studies (Clean Internal Links) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Featured Studies
            </h4>
            <ul className="space-y-2 text-xs">
              {topStudies.map((study) => (
                <li key={study.slug}>
                  <a
                    href={`/${study.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectArticle(study.slug);
                    }}
                    className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    {study.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {['Technology', 'Science', 'Strategy', 'Leadership', 'Arts & Culture'].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              The Weekly Dispatch
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Receive one deeply researched essay on exceptional minds and their decision architectures every Sunday morning.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are subscribed to Sunday dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-stone-900 dark:bg-amber-400 text-stone-100 dark:text-stone-950 text-xs font-medium hover:opacity-90 transition-opacity shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[10px] text-stone-400">
                  Zero spam. Unsubscribe with one click anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright & links */}
        <div className="mt-12 pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Apex Minds. Open editorial archive.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
            >
              Contact Desk
            </button>
            <span aria-hidden="true">·</span>
            <span>Fast & Minimalist</span>
            <span aria-hidden="true">·</span>
            <span>SEO Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
