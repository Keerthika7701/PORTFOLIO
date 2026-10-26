import React, { useState, useEffect } from 'react';
import { CameraPreset, ActiveModelMode } from '../canvas/SceneManager';
import { FinishTheme } from '../canvas/DroneModel';
import { 
  Camera, 
  Layers, 
  Rotate3d, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Navigation, 
  Crosshair, 
  Box, 
  Disc,
  Eye,
  Sliders
} from 'lucide-react';

interface ControlDockProps {
  activeMode: ActiveModelMode;
  onModeChange: (mode: ActiveModelMode) => void;
  explodedValue: number;
  onExplodedChange: (value: number) => void;
  activeCamera: CameraPreset;
  onCameraChange: (preset: CameraPreset) => void;
  activeFinish: FinishTheme;
  onFinishChange: (finish: FinishTheme) => void;
  isFlightActive: boolean;
  onToggleFlight: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  activeMode,
  onModeChange,
  explodedValue,
  onExplodedChange,
  activeCamera,
  onCameraChange,
  activeFinish,
  onFinishChange,
  isFlightActive,
  onToggleFlight
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'inspect' | 'views' | 'materials'>('inspect');

  // Keyboard shortcut 'H' to toggle dock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const finishSwatches: { id: FinishTheme; label: string; color: string; border: string }[] = [
    { id: 'carbon', label: 'Carbon Stealth', color: '#161e2e', border: '#38bdf8' },
    { id: 'titanium', label: 'Titanium Gold', color: '#788191', border: '#f59e0b' },
    { id: 'cyberpunk', label: 'Cyber Rose', color: '#261238', border: '#f43f5e' },
    { id: 'arctic', label: 'Arctic Tech', color: '#cbd5e1', border: '#0284c7' }
  ];

  return (
    <div
      className="fixed z-30 transition-transform duration-300 ease-out"
      style={{
        bottom: '16px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isCollapsed ? 'calc(100% - 38px)' : '0'})`,
        maxWidth: 'min(940px, 94vw)',
        width: '100%'
      }}
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="glass-panel-solid px-4 py-1.5 rounded-t-xl text-xs font-mono font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
          title="Toggle Dock (Shortcut: H)"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Show 3D Lab Controls</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded ml-1">H</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Hide Controls</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded ml-1">H</span>
            </>
          )}
        </button>
      </div>

      {/* Main Control Panel (Solid rgba surface - no backdrop blur) */}
      <div className="glass-panel-solid rounded-2xl p-3 md:p-4 text-slate-200 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Left: Model Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => onModeChange('drone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'drone'
                  ? 'bg-sky-500 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Autonomous Drone</span>
            </button>
            <button
              onClick={() => onModeChange('neural')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'neural'
                  ? 'bg-sky-500 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>AI Neural Core</span>
            </button>
          </div>

          {/* Center Tabs for detailed controls */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('inspect')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'inspect' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3 h-3" />
              <span>Exploded View</span>
            </button>
            <button
              onClick={() => setActiveTab('views')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'views' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Camera Angles</span>
            </button>
            {activeMode === 'drone' && (
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'materials' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Finishes</span>
              </button>
            )}
          </div>

          {/* Right: Quick Flight Spin Toggle */}
          {activeMode === 'drone' && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onToggleFlight}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors border cursor-pointer ${
                  isFlightActive
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Disc className={`w-3.5 h-3.5 ${isFlightActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{isFlightActive ? 'Rotors: ACTIVE' : 'Rotors: IDLE'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Detail Contents */}
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          {activeTab === 'inspect' && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Exploded Separation:</span>
                <span className="text-sky-300 font-semibold">{Math.round(explodedValue * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedValue}
                onChange={(e) => onExplodedChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 shrink-0">
                <button
                  onClick={() => onExplodedChange(0)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Assembled
                </button>
                <button
                  onClick={() => onExplodedChange(1)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                >
                  Full Explode
                </button>
              </div>
            </div>
          )}

          {activeTab === 'views' && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400 font-mono text-[11px] mr-1">PRESETS:</span>
              <button
                onClick={() => onCameraChange('hero')}
                className={`px-3 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeCamera === 'hero'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Hero Cinematic</span>
              </button>
              <button
                onClick={() => onCameraChange('avionics')}
                className={`px-3 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeCamera === 'avionics'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Crosshair className="w-3 h-3" />
                <span>AI Vision & Avionics</span>
              </button>
              <button
                onClick={() => onCameraChange('payload')}
                className={`px-3 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeCamera === 'payload'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Box className="w-3 h-3" />
                <span>Payload Delivery Bay</span>
              </button>
              <button
                onClick={() => onCameraChange('topdown')}
                className={`px-3 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeCamera === 'topdown'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Navigation className="w-3 h-3" />
                <span>Top-Down GPS Radar</span>
              </button>
              <button
                onClick={() => onCameraChange('wide')}
                className={`px-3 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeCamera === 'wide'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Rotate3d className="w-3 h-3" />
                <span>Cosmic Wide View</span>
              </button>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-400 font-mono text-[11px]">SURFACE FINISH:</span>
              {finishSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => onFinishChange(swatch.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2 border transition-all cursor-pointer ${
                    activeFinish === swatch.id
                      ? 'border-sky-400 bg-sky-500/10 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: swatch.color, borderColor: swatch.border }}
                  />
                  <span>{swatch.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
