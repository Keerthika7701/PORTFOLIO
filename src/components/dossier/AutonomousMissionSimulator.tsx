import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Navigation, 
  MapPin, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Box, 
  Radio, 
  X,
  Gauge
} from 'lucide-react';

interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lon: number;
  desc: string;
  status: 'pending' | 'active' | 'completed';
}

interface AutonomousMissionSimulatorProps {
  onClose?: () => void;
}

export const AutonomousMissionSimulator: React.FC<AutonomousMissionSimulatorProps> = ({ onClose }) => {
  const [missionState, setMissionState] = useState<'standby' | 'flying' | 'delivered' | 'completed'>('standby');
  const [currentWaypointIdx, setCurrentWaypointIdx] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  const waypoints: Waypoint[] = [
    {
      id: 'wp1',
      name: 'CIET Launch Pad (Base Station)',
      lat: 10.9385,
      lon: 76.9632,
      desc: 'Coimbatore Institute of Engineering and Technology campus runway',
      status: currentWaypointIdx > 0 ? 'completed' : currentWaypointIdx === 0 ? 'active' : 'pending'
    },
    {
      id: 'wp2',
      name: 'Waypoint Alpha (Kovaipudur Corridor)',
      lat: 10.9542,
      lon: 76.9610,
      desc: 'GPS coordinate corridor verification waypoint',
      status: currentWaypointIdx > 1 ? 'completed' : currentWaypointIdx === 1 ? 'active' : 'pending'
    },
    {
      id: 'wp3',
      name: 'Waypoint Beta (Coimbatore Tech Hub)',
      lat: 11.0012,
      lon: 76.9654,
      desc: 'Automated altitude alignment and target lock',
      status: currentWaypointIdx > 2 ? 'completed' : currentWaypointIdx === 2 ? 'active' : 'pending'
    },
    {
      id: 'wp4',
      name: 'SAEINDIA Target Delivery Zone',
      lat: 11.0168,
      lon: 76.9558,
      desc: 'Precision GPS drop zone for automated payload release',
      status: currentWaypointIdx >= 3 ? 'completed' : 'pending'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (missionState === 'flying') {
      interval = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 100) {
            setMissionState('delivered');
            setDeliveredCount((c) => c + 1);
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
            return 100;
          }
          const next = prev + 4;
          if (next >= 25 && next < 50) setCurrentWaypointIdx(1);
          else if (next >= 50 && next < 80) setCurrentWaypointIdx(2);
          else if (next >= 80) setCurrentWaypointIdx(3);

          setAltitude(15 + Math.sin(next * 0.1) * 2.5);
          setSpeed(12.4 + Math.cos(next * 0.1) * 1.2);
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [missionState]);

  const handleStartMission = () => {
    setMissionState('flying');
    setCurrentProgress(0);
    setCurrentWaypointIdx(0);
    setAltitude(14.5);
    setSpeed(12.8);
  };

  const handleResetMission = () => {
    setMissionState('standby');
    setCurrentProgress(0);
    setCurrentWaypointIdx(0);
    setAltitude(0);
    setSpeed(0);
  };

  const currentWp = waypoints[currentWaypointIdx] || waypoints[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80">
      <div className="glass-panel-dark max-w-2xl w-full rounded-2xl p-6 text-slate-100 shadow-2xl border border-slate-700 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                SAEINDIA Drone Challenge Demonstration
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-sky-400" />
              Autonomous Drone GPS Delivery Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Real-time latitude & longitude waypoint navigation workflow engineered by Sai Keerthika V.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Telemetry Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              <span>Altitude</span>
            </div>
            <div className="text-base font-bold font-mono text-sky-300">
              {altitude > 0 ? `${altitude.toFixed(1)} m` : 'GROUND'}
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ground Speed</span>
            </div>
            <div className="text-base font-bold font-mono text-emerald-300">
              {speed > 0 ? `${speed.toFixed(1)} m/s` : '0.0 m/s'}
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span>GPS Coordinates</span>
            </div>
            <div className="text-xs font-mono text-slate-200 truncate">
              {currentWp.lat.toFixed(4)}°N, {currentWp.lon.toFixed(4)}°E
            </div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-1">
              <Box className="w-3.5 h-3.5 text-purple-400" />
              <span>Payload Bay</span>
            </div>
            <div className="text-xs font-semibold font-mono text-purple-300">
              {missionState === 'delivered' ? 'RELEASED (100%)' : missionState === 'flying' ? 'ARMED FOR DROP' : 'LATCHED'}
            </div>
          </div>
        </div>

        {/* Flight Progress Bar */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">MISSION FLIGHT PATH COMPLETION</span>
            <span className="text-sky-400 font-bold">{currentProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Waypoints Sequence List */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            GPS Navigation Waypoint Sequence
          </div>
          {waypoints.map((wp, idx) => {
            const isDone = wp.status === 'completed';
            const isActive = wp.status === 'active' && missionState === 'flying';

            return (
              <div
                key={wp.id}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isActive
                    ? 'bg-sky-500/15 border-sky-500/50 shadow-sm'
                    : isDone
                    ? 'bg-slate-900/90 border-emerald-500/30'
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isActive ? (
                    <span className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center text-[10px] text-sky-400 font-mono font-bold">
                      {idx + 1}
                    </span>
                  ) : (
                    <MapPin className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">{wp.name}</h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {wp.lat}° N, {wp.lon}° E
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{wp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Controls */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            {missionState === 'delivered' ? (
              <span className="text-emerald-400 font-medium">
                Autonomous Payload Delivery Successful at SAEINDIA Challenge coordinates!
              </span>
            ) : missionState === 'flying' ? (
              <span className="text-sky-300 font-medium font-mono">
                Navigating via Autonomous Waypoints...
              </span>
            ) : (
              <span>Ready for GPS Autonomous Waypoint Mission launch.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {missionState === 'standby' ? (
              <button
                onClick={handleStartMission}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-sky-500/20"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Execute Mission</span>
              </button>
            ) : (
              <button
                onClick={handleResetMission}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Flight</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
