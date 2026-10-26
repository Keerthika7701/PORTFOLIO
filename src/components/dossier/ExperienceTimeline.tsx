import React, { useState } from 'react';
import { INTERNSHIPS, Internship } from '../../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(INTERNSHIPS[0].id);
  const activeExp = INTERNSHIPS.find((exp) => exp.id === selectedId) || INTERNSHIPS[0];

  return (
    <section id="experience" className="py-12 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Professional Career Journey</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Internships & Applied Industry Experience
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          Hands-on technical roles spanning generative AI, real-time computer vision, conversational systems, machine learning engineering, and cloud deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Internship List / Tabs */}
        <div className="lg:col-span-5 space-y-2.5">
          {INTERNSHIPS.map((exp: Internship) => {
            const isSelected = exp.id === selectedId;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'glass-panel-solid border-sky-500/50 shadow-lg shadow-sky-500/5'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{exp.company}</span>
                    {exp.badge && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        exp.id === 'datamites'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                      }`}>
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-sky-400 font-medium">{exp.role}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 font-mono">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${
                  isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-7">
          <div className="glass-panel-dark rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Company & Role Focus
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeExp.company}</h3>
                <div className="text-sm text-sky-400 font-medium">{activeExp.role}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">TIMELINE</span>
                <span className="text-xs font-mono font-semibold text-slate-200 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                  {activeExp.period}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              {activeExp.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Key Deliverables & Responsibilities</span>
              </h4>
              <ul className="space-y-2.5">
                {activeExp.bulletPoints.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeExp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sky-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
