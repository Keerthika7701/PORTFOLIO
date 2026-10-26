import React from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Sparkles, Zap } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface TourControllerHUDProps {
  currentStep: number;
  totalSteps: number;
  stepInfo: { title: string; desc: string };
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export const TourControllerHUD: React.FC<TourControllerHUDProps> = ({
  currentStep,
  totalSteps,
  stepInfo,
  onNext,
  onPrev,
  onExit
}) => {
  return (
    <div className="fixed top-18 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 pointer-events-auto">
      <div className="glass-panel-solid rounded-2xl p-4 text-slate-100 shadow-2xl border border-sky-500/40">
        
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Recruiter Guided 3D Space Tour</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400">
              {currentStep + 1} / {totalSteps}
            </span>
            <button
              onClick={() => {
                soundManager.playBlip(440);
                onExit();
              }}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Exit Tour"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Narrative Title & Desc */}
        <div className="mb-3">
          <h4 className="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>{stepInfo.title}</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mt-0.5 font-light">
            {stepInfo.desc}
          </p>
        </div>

        {/* Progress Dots & Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-sky-400'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playBlip(550);
                onPrev();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
            >
              <SkipBack className="w-3 h-3" />
              <span>Prev</span>
            </button>

            <button
              onClick={() => {
                soundManager.playBlip(650);
                onNext();
              }}
              className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
            >
              <span>Next Angle</span>
              <SkipForward className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
