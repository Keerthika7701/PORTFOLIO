import React, { useState } from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { 
  Rocket, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Award, 
  Navigation,
  Eye,
  MessageSquare,
  Music,
  Cloud
} from 'lucide-react';

interface ProjectsGalleryProps {
  onSelectFlagship3D: () => void;
  onOpenMissionSim: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onSelectFlagship3D,
  onOpenMissionSim
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Autonomous Systems',
    'Computer Vision & AI',
    'NLP & Chatbots',
    'Audio AI',
    'Cloud & GenAI'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Autonomous Systems':
        return <Navigation className="w-4 h-4 text-sky-400" />;
      case 'Computer Vision & AI':
        return <Eye className="w-4 h-4 text-emerald-400" />;
      case 'NLP & Chatbots':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'Audio AI':
        return <Music className="w-4 h-4 text-pink-400" />;
      case 'Cloud & GenAI':
        return <Cloud className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="projects" className="py-12 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
            <Rocket className="w-4 h-4" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Projects & AI System Demonstrations
          </h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 max-w-md">
          Applied solutions ranging from SAEINDIA drone automation with GPS navigation to real-time object detection and neural audio generation.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: Project) => {
          return (
            <div
              key={project.id}
              className={`glass-panel-dark rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                project.isFlagship
                  ? 'border-sky-500/60 shadow-xl shadow-sky-500/5 ring-1 ring-sky-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                  </div>
                  {project.presentedAt && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>SAEINDIA</span>
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-sky-400 font-medium mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="space-y-1.5 mb-5">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Metrics if available */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-4">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                        <div className="text-xs font-mono font-bold text-sky-300">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                {project.isFlagship && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={onOpenMissionSim}
                      className="w-full py-2 px-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>GPS Mission Sim</span>
                    </button>
                    <button
                      onClick={onSelectFlagship3D}
                      className="w-full py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect in 3D</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
