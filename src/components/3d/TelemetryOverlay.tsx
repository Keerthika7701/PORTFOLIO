import React from 'react';
import { Compass, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { ActiveModelMode } from '../canvas/SceneManager';

interface TelemetryOverlayProps {
  activeMode: ActiveModelMode;
  onOpenMissionSim: () => void;
}

export const TelemetryOverlay: React.FC<TelemetryOverlayProps> = ({
  activeMode,
  onOpenMissionSim
}) => {
  return (
    <div className="absolute top-4 left-4 z-20 pointer-events-auto max-w-sm">
      <div className="glass-panel-solid rounded-xl p-3 text-slate-200 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-300 uppercase">
              {activeMode === 'drone' ? 'Autonomous Drone Telemetry' : 'Neural Processing Node'}
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-sky-500/20">
            {activeMode === 'drone' ? 'GPS LOCK' : 'INFERENCE'}
          </span>
        </div>

        {activeMode === 'drone' ? (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>Coordinates:</span>
              </span>
              <span className="text-slate-200">11.0168° N, 76.9558° E</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>Location:</span>
              </span>
              <span className="text-slate-200">Coimbatore, Tamil Nadu</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Avionics AI:</span>
              </span>
              <span className="text-emerald-400">28ms Latency • Online</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>SAEINDIA Challenge:</span>
              </span>
              <span className="text-sky-300">Demonstrated</span>
            </div>

            <div className="pt-2 mt-1 border-t border-slate-800">
              <button
                onClick={onOpenMissionSim}
                className="w-full py-1.5 px-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 hover:text-white font-sans text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Launch Waypoint Mission Simulator</span>
                <span className="text-[10px] text-sky-400 font-mono">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span>Architecture:</span>
              <span className="text-slate-200">Transformer & CNN Matrix</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Domain:</span>
              <span className="text-sky-300">CV • NLP • GenAI</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Training Base:</span>
              <span className="text-emerald-400">Data Mites & Code Alpha</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Quantization:</span>
              <span className="text-slate-200">INT8 Fast Inference</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
