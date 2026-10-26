import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundEffects';
import { 
  FileText, 
  Linkedin, 
  Github, 
  Layers, 
  Box, 
  Zap, 
  Volume2, 
  VolumeX,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentView: '3d-focus' | 'dossier';
  onViewChange: (view: '3d-focus' | 'dossier') => void;
  onOpenResumeModal: () => void;
  onOpenRecruiterFastTrack: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenResumeModal,
  onOpenRecruiterFastTrack
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) {
      soundManager.playBlip(700);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 border-b border-slate-800/80 px-4 py-2.5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Branding & Role */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0">
            SK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-extrabold text-white tracking-tight leading-none">
                {PERSONAL_INFO.name}
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                AVAILABLE FOR HIRE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block truncate mt-0.5">
              {PERSONAL_INFO.tagline}
            </p>
          </div>
        </div>

        {/* Center: Recruiter Fast-Track & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Recruiter Fast-Track Button */}
          <button
            onClick={() => {
              soundManager.playChime();
              onOpenRecruiterFastTrack();
            }}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Recruiter Fast-Track (30s)</span>
            <span className="sm:hidden">Recruiter</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                soundManager.playBlip(550);
                onViewChange('3d-focus');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === '3d-focus'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden md:inline">3D Space Lab</span>
              <span className="md:hidden">3D</span>
            </button>

            <button
              onClick={() => {
                soundManager.playBlip(600);
                onViewChange('dossier');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'dossier'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Dossier</span>
              <span className="md:hidden">Dossier</span>
            </button>
          </div>
        </div>

        {/* Right: Audio Toggle, Resume & Social Links */}
        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-slate-800 border-slate-700 text-sky-400 hover:text-sky-300'
            }`}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* View Resume Button */}
          <button
            onClick={() => {
              soundManager.playBlip(650);
              onOpenResumeModal();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Resume PDF</span>
            <span className="md:hidden">PDF</span>
          </button>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-colors hidden sm:flex"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-slate-700 transition-colors hidden sm:flex"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

      </div>
    </header>
  );
};
