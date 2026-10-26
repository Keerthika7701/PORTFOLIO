import React, { useState } from 'react';
import { 
  SKILL_CATEGORIES, 
  CERTIFICATIONS, 
  EDUCATION, 
  KEY_COMPETENCES, 
  LANGUAGES 
} from '../../data/portfolioData';
import { 
  BrainCircuit, 
  Code, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Languages as LangIcon,
  Sparkles,
  BarChart2
} from 'lucide-react';

export const SkillsRadar: React.FC = () => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(SKILL_CATEGORIES[0].title);

  return (
    <section id="skills" className="py-12 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Technical Capabilities & Credentials</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Skills Matrix, Education & Certifications
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          A comprehensive breakdown of algorithmic competencies, statistical foundations, machine learning libraries, and academic qualifications.
        </p>
      </div>

      {/* Skills Matrix Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
        {/* Left Tabs */}
        <div className="lg:col-span-4 space-y-2">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = cat.title === activeCategoryTab;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryTab(cat.title)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'glass-panel-solid border-sky-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div>
                  <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {cat.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{cat.description}</div>
                </div>
                <span className="text-xs font-mono text-sky-400 ml-2">
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Skills Bars */}
        <div className="lg:col-span-8">
          {SKILL_CATEGORIES.filter((c) => c.title === activeCategoryTab).map((cat) => (
            <div key={cat.title} className="glass-panel-dark rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Proficiency Index
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800"
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="font-mono text-sky-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-400 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Education Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Infosys Springboard Certifications */}
        <div className="glass-panel-dark rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Verified Certifications</h3>
              <span className="text-xs font-mono text-slate-400">Infosys Springboard Program</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {cert.date}
                    </span>
                  </div>
                  <div className="text-xs text-sky-400 font-medium mt-0.5">{cert.issuer}</div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education History */}
        <div className="glass-panel-dark rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Academic Education</h3>
              <span className="text-xs font-mono text-slate-400">Degree & Schooling Credentials</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white leading-snug">{edu.institution}</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                    {edu.score}
                  </span>
                </div>
                <div className="text-xs text-sky-400 font-medium mt-0.5">{edu.degree}</div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">{edu.period}</div>
                {edu.highlights && (
                  <ul className="mt-2 space-y-1">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-sky-400 text-xs">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Competences & Languages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel-dark rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-bold text-white">Core Professional Competences</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {KEY_COMPETENCES.map((comp) => (
              <div key={comp.name} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="text-xs font-bold text-sky-300 mb-0.5">{comp.name}</div>
                <div className="text-xs text-slate-400 leading-snug">{comp.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel-dark rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
            <LangIcon className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Languages</h3>
          </div>
          <div className="space-y-3">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white">{lang.name}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{lang.proficiency}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${lang.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
