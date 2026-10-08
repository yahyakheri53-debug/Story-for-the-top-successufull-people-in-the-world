import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Mail, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  timestamp: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Suggest a Thinker');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please share at least 10 characters in your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    setTimeout(() => {
      const newMessage: StoredMessage = {
        id: `MSG-${Date.now().toString(36).toUpperCase()}`,
        name: name.trim(),
        email: email.trim(),
        category,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem('apex_minds_contact_messages') || '[]');
        localStorage.setItem('apex_minds_contact_messages', JSON.stringify([newMessage, ...existing]));
      } catch (e) {
        console.error('Storage error', e);
      }

      setStatus('success');
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCategory('Suggest a Thinker');
    setMessage('');
    setErrors({});
    setStatus('idle');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-900 dark:text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Contact & Suggestions</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Editorial inquiries, thinker nominations, and feedback
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Message Dispatched
              </h4>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-sm mx-auto">
                Thank you, <span className="font-medium text-stone-800 dark:text-stone-200">{name}</span>. Your correspondence has been received by our editorial desk.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Send Another Note
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
                >
                  Return to Essays
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="e.g. Katherine Johnson"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-stone-50/50 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-stone-200 dark:border-stone-700 focus:ring-amber-500'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="you@domain.com"
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-stone-50/50 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-stone-200 dark:border-stone-700 focus:ring-amber-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Suggest a Thinker">Nominate a Successful Figure</option>
                  <option value="Editorial Feedback">Editorial Critique / Commentary</option>
                  <option value="Fact Correction">Biographical Source Correction</option>
                  <option value="General Inquiry">General Correspondence</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1 flex items-center justify-between">
                  <span>Message & Notes</span>
                  <span className="text-[11px] font-normal text-stone-400">
                    {message.length} characters
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Share your suggestion, perspective, or feedback on our case studies..."
                  className={`w-full px-3 py-2 text-sm rounded-lg border bg-stone-50/50 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 resize-none ${
                    errors.message
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-stone-200 dark:border-stone-700 focus:ring-amber-500'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Direct line to our editorial room
                </span>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-5 py-2.5 rounded-lg bg-stone-900 dark:bg-amber-500 text-stone-100 dark:text-stone-950 text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  {status === 'submitting' ? (
                    'Transmitting...'
                  ) : (
                    <>
                      <span>Transmit Note</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
