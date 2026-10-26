import React from 'react';
import { HotspotItem } from '../canvas/SceneManager';
import { X, Navigation, Eye, Box, Sparkles, ExternalLink } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface HotspotCardProps {
  hotspot: HotspotItem | null;
  onClose: () => void;
  onOpenMissionSim: () => void;
  onOpenDossier: () => void;
}

export const HotspotCard: React.FC<HotspotCardProps> = ({
  hotspot,
  onClose,
  onOpenMissionSim,
  onOpenDossier
}) => {
  if (!hotspot) return null;

  const getIcon = () => {
    switch (hotspot.id) {
      case 'hs-gps':
        return <Navigation className="w-5 h-5 text-sky-400" />;
      case 'hs-cv':
        return <Eye className="w-5 h-5 text-emerald-400" />;
      case 'hs-payload':
        return <Box className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 max-w-sm w-full pointer-events-auto">
      <div className="glass-panel-solid rounded-2xl p-5 text-slate-100 shadow-2xl border border-sky-500/40">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
              {getIcon()}
            </div>
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                {hotspot.category}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">
                {hotspot.title}
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playBlip(440);
              onClose();
            }}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle / Details */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {hotspot.subtitle}
        </p>

        {/* Contextual actions */}
        <div className="space-y-2">
          {hotspot.id === 'hs-gps' && (
            <button
              onClick={() => {
                soundManager.playChime();
                onOpenMissionSim();
              }}
              className="w-full py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Launch Waypoint Delivery Simulator</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playBlip(550);
              onOpenDossier();
            }}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span>View Full Technical Details in Dossier</span>
          </button>
        </div>

      </div>
    </div>
  );
};
