import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="contact" className="py-12 border-t border-slate-800/80 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
            <Mail className="w-4 h-4" />
            <span>Connect & Opportunities</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Get in Touch with Sai Keerthika
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          Actively seeking entry-level opportunities in AI/ML Engineering, Artificial Intelligence Development, and Data Analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-3">
          {/* Email */}
          <div className="glass-panel-dark p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Email</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-white hover:text-sky-300 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy email"
            >
              {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="glass-panel-dark p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Phone</span>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy phone"
            >
              {copiedField === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Location */}
          <div className="glass-panel-dark p-4 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Location</span>
              <span className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* LinkedIn & GitHub */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-dark p-4 rounded-xl border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between gap-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <Linkedin className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">CONNECT ↗</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white block">LinkedIn Profile</span>
                <span className="text-[11px] font-mono text-slate-400 truncate block">
                  sai-keerthika-v
                </span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel-dark p-4 rounded-xl border border-slate-800 hover:border-purple-500/50 flex flex-col justify-between gap-2 group transition-all"
            >
              <div className="flex items-center justify-between">
                <Github className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-400">REPOS ↗</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white block">GitHub Profile</span>
                <span className="text-[11px] font-mono text-slate-400 truncate block">
                  keerthika07
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Quick Direct Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel-dark rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <h3 className="text-base font-bold text-white">Send a Direct Message</h3>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. Sai Keerthika will respond promptly to your inquiry.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hiring Manager / Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Message / Opportunity Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hi Sai, we'd love to connect regarding an AI/ML Engineer or Data Analyst position..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    Dispatched to saikeerthika88@gmail.com
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
