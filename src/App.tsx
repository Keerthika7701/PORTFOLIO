import React, { useState, useRef, useCallback } from 'react';
import { PERSONAL_INFO } from './data/portfolioData';
import { ThreeCanvas } from './components/canvas/ThreeCanvas';
import { SceneManager, CameraPreset, ActiveModelMode, HotspotItem } from './components/canvas/SceneManager';
import { FinishTheme } from './components/canvas/DroneModel';
import { ControlDock } from './components/3d/ControlDock';
import { TelemetryOverlay } from './components/3d/TelemetryOverlay';
import { HotspotCard } from './components/3d/HotspotCard';
import { Header } from './components/navigation/Header';
import { RecruiterFastTrackModal } from './components/recruiter/RecruiterFastTrackModal';
import { TourControllerHUD } from './components/recruiter/TourControllerHUD';
import { AutonomousMissionSimulator } from './components/dossier/AutonomousMissionSimulator';
import { ExperienceTimeline } from './components/dossier/ExperienceTimeline';
import { ProjectsGallery } from './components/dossier/ProjectsGallery';
import { SkillsRadar } from './components/dossier/SkillsRadar';
import { ContactSection } from './components/dossier/ContactSection';
import { ResumeViewerModal } from './components/dossier/ResumeViewerModal';
import { soundManager } from './utils/soundEffects';
import { 
  Navigation, 
  FileText, 
  ChevronRight, 
  Download, 
  Sparkles, 
  GraduationCap, 
  Zap,
  Layers,
  Compass
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'3d-focus' | 'dossier'>('3d-focus');
  const [activeModel, setActiveModel] = useState<ActiveModelMode>('drone');
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [activeCam, setActiveCam] = useState<CameraPreset>('hero');
  const [activeFinish, setActiveFinish] = useState<FinishTheme>('carbon');
  const [isFlightOn, setIsFlightOn] = useState<boolean>(true);

  // Recruiter & 3D Interactive Features
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotItem | null>(null);

  // Recruiter Guided Tour State
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourStepInfo, setTourStepInfo] = useState({
    title: 'Executive Profile Overview',
    desc: 'Sai Keerthika V • B.Tech AI & Data Science (CGPA: 7.52/10) • Seeking AI/ML Engineering & Data Analyst roles'
  });

  // Other Modals
  const [isMissionSimOpen, setIsMissionSimOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Three.js Manager reference
  const managerRef = useRef<SceneManager | null>(null);

  const handleManagerReady = useCallback((manager: SceneManager) => {
    managerRef.current = manager;

    // Connect 3D Hotspot click callback
    manager.onHotspotClickCallback = (hs: HotspotItem) => {
      soundManager.playChime();
      setSelectedHotspot(hs);
    };

    // Connect Tour step callback
    manager.onTourStepChange = (step: number, info: { title: string; desc: string }) => {
      setTourStep(step);
      setTourStepInfo(info);
    };
  }, []);

  const handleModelChange = (mode: ActiveModelMode) => {
    soundManager.playBlip(600);
    setActiveModel(mode);
    managerRef.current?.setActiveModel(mode);
  };

  const handleExplodedChange = (val: number) => {
    setExplodedVal(val);
    managerRef.current?.setExplodedView(val);
  };

  const handleCameraChange = (cam: CameraPreset) => {
    soundManager.playBlip(520);
    setActiveCam(cam);
    managerRef.current?.setCameraPreset(cam);
  };

  const handleFinishChange = (finish: FinishTheme) => {
    soundManager.playBlip(680);
    setActiveFinish(finish);
    managerRef.current?.setFinishTheme(finish);
  };

  const handleToggleFlight = () => {
    soundManager.playBlip(440);
    const next = !isFlightOn;
    setIsFlightOn(next);
    managerRef.current?.setFlightMode(next);
  };

  const handleInspectIn3D = () => {
    soundManager.playWarp();
    setViewMode('3d-focus');
    setActiveModel('drone');
    managerRef.current?.setActiveModel('drone');
    managerRef.current?.setCameraPreset('hero');
  };

  // Recruiter Guided 3D Space Tour controls
  const handleStartTour = () => {
    soundManager.playWarp();
    setViewMode('3d-focus');
    setIsTourActive(true);
    managerRef.current?.startRecruiterTour();
  };

  const handleExitTour = () => {
    setIsTourActive(false);
    managerRef.current?.stopTour();
    managerRef.current?.setCameraPreset('hero');
  };

  const handleNextTourStep = () => {
    managerRef.current?.nextTourStep();
  };

  const handlePrevTourStep = () => {
    managerRef.current?.prevTourStep();
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 relative font-sans select-none">
      
      {/* Universal Top Header */}
      <Header
        currentView={viewMode}
        onViewChange={(v) => {
          setViewMode(v);
          if (v === 'dossier' && isTourActive) {
            handleExitTour();
          }
        }}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenRecruiterFastTrack={() => setIsRecruiterModalOpen(true)}
      />

      {/* 3D Scene Background Canvas - Mounted persistently in stable container */}
      <div className={`fixed inset-0 pt-14 z-0 ${viewMode === '3d-focus' ? 'pointer-events-auto' : 'pointer-events-none opacity-30'}`}>
        <ThreeCanvas onManagerReady={handleManagerReady} />
      </div>

      {/* Recruiter Guided Tour HUD (when active) */}
      {isTourActive && viewMode === '3d-focus' && (
        <TourControllerHUD
          currentStep={tourStep}
          totalSteps={5}
          stepInfo={tourStepInfo}
          onNext={handleNextTourStep}
          onPrev={handlePrevTourStep}
          onExit={handleExitTour}
        />
      )}

      {/* Selected 3D Hotspot Details Card */}
      {selectedHotspot && viewMode === '3d-focus' && (
        <HotspotCard
          hotspot={selectedHotspot}
          onClose={() => setSelectedHotspot(null)}
          onOpenMissionSim={() => setIsMissionSimOpen(true)}
          onOpenDossier={() => {
            setSelectedHotspot(null);
            setViewMode('dossier');
          }}
        />
      )}

      {/* VIEW MODE 1: 3D-FOCUS / LAB MODE */}
      {viewMode === '3d-focus' && (
        <div className="relative z-10 w-full min-h-screen pt-14 pointer-events-none flex flex-col justify-between">
          
          {/* Top Left: Live Telemetry */}
          <div className="p-4">
            <TelemetryOverlay
              activeMode={activeModel}
              onOpenMissionSim={() => setIsMissionSimOpen(true)}
            />
          </div>

          {/* Top Right: Recruiter Fast-Action Dock */}
          <div className="absolute top-18 right-4 z-20 pointer-events-auto max-w-xs hidden md:block">
            <div className="glass-panel-solid rounded-2xl p-4 text-xs text-slate-300 shadow-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white text-xs">Hiring Fast-Track</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                  IMMEDIATE HIRE
                </span>
              </div>

              <div>
                <div className="text-white font-bold text-sm leading-tight">{PERSONAL_INFO.name}</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  B.Tech AIDS • CGPA {PERSONAL_INFO.cgpa}
                </p>
                <div className="text-[10px] font-mono text-sky-400 mt-1">
                  SAEINDIA Drone Finalist • 5 Internships
                </div>
              </div>

              {/* Quick Tour & Resume Actions */}
              <div className="space-y-1.5 pt-1">
                {!isTourActive ? (
                  <button
                    onClick={handleStartTour}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Start 60s Recruiter 3D Tour</span>
                  </button>
                ) : (
                  <button
                    onClick={handleExitTour}
                    className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                  >
                    <span>Pause Tour / Manual Orbit</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setIsRecruiterModalOpen(true)}
                    className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 border border-slate-800 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>30s Summary</span>
                  </button>

                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-[11px] font-medium flex items-center justify-center gap-1 border border-slate-800 cursor-pointer"
                  >
                    <FileText className="w-3 h-3 text-sky-400" />
                    <span>Resume PDF</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setViewMode('dossier')}
                  className="text-sky-400 hover:text-sky-300 font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Dossier</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-slate-500">Coimbatore, TN</span>
              </div>
            </div>
          </div>

          {/* Floating Hint: Click on 3D Space Beacons */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden lg:block">
            <div className="glass-panel-solid px-3.5 py-1.5 rounded-full text-[11px] font-mono text-slate-300 border border-sky-500/20 shadow-lg flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Click any glowing 3D Space Beacon to inspect engineering subsystems</span>
            </div>
          </div>

          {/* Bottom Center: Collapsible 3D Control Dock */}
          <div className="pointer-events-auto">
            <ControlDock
              activeMode={activeModel}
              onModeChange={handleModelChange}
              explodedValue={explodedVal}
              onExplodedChange={handleExplodedChange}
              activeCamera={activeCam}
              onCameraChange={handleCameraChange}
              activeFinish={activeFinish}
              onFinishChange={handleFinishChange}
              isFlightActive={isFlightOn}
              onToggleFlight={handleToggleFlight}
            />
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL DOSSIER MODE */}
      {viewMode === 'dossier' && (
        <main className="relative z-10 w-full min-h-screen pt-20 px-4 md:px-8 max-w-7xl mx-auto select-text">
          
          {/* Hero Profile Banner */}
          <div className="glass-panel-dark rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>AI Engineer & Data Analyst</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Seeking Entry-Level Roles in AI/ML & Data</span>
                  </span>
                  <button
                    onClick={() => setIsRecruiterModalOpen(true)}
                    className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-500/20 cursor-pointer transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recruiter Fast-Track (30s)</span>
                  </button>
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {PERSONAL_INFO.name}
                </h1>

                <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light">
                  {PERSONAL_INFO.summary}
                </p>

                {/* Key Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">ACADEMICS</div>
                    <div className="text-xs font-bold text-white mt-0.5">Coimbatore Inst. of Tech</div>
                    <div className="text-[11px] text-emerald-400 font-mono">B.Tech AIDS • CGPA 7.52</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">PRACTICAL EXP</div>
                    <div className="text-xs font-bold text-white mt-0.5">5 Industry Internships</div>
                    <div className="text-[11px] text-sky-400 font-mono">GenAI, CV, NLP & Cloud</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">NATIONAL STAGE</div>
                    <div className="text-xs font-bold text-white mt-0.5">SAEINDIA Challenge</div>
                    <div className="text-[11px] text-amber-400 font-mono">Autonomous Drone Demo</div>
                  </div>
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={handleInspectIn3D}
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Launch 3D Space Lab</span>
                  </button>

                  <button
                    onClick={handleStartTour}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Start 60s Guided Tour</span>
                  </button>

                  <button
                    onClick={() => setIsMissionSimOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>GPS Waypoint Simulator</span>
                  </button>

                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Resume PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Mini Recruiter Dossier Box */}
              <div className="lg:col-span-4">
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400">Recruiter Cheat Sheet</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Primary Disciplines:</span>
                      <span className="text-white font-medium">AI/ML & Data Analytics</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Target Positions:</span>
                      <span className="text-sky-300 font-medium">AI Engineer, ML Engineer, Analyst</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Location:</span>
                      <span className="text-white font-medium">Coimbatore, Tamil Nadu</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Open To:</span>
                      <span className="text-emerald-400 font-medium">On-site, Hybrid & Remote</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Languages:</span>
                      <span className="text-white font-medium">Tamil, English, Telugu</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => setIsRecruiterModalOpen(true)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-amber-500/30"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open 30s ATS Recruiter Packet</span>
                    </button>

                    <button
                      onClick={handleInspectIn3D}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
                    >
                      <Layers className="w-3.5 h-3.5 text-sky-400" />
                      <span>Switch to 3D Exploded View</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Featured Projects Gallery */}
          <ProjectsGallery
            onSelectFlagship3D={handleInspectIn3D}
            onOpenMissionSim={() => setIsMissionSimOpen(true)}
          />

          {/* Professional Experience / Internships Timeline */}
          <ExperienceTimeline />

          {/* Technical Skills, Education & Certifications */}
          <SkillsRadar />

          {/* Contact Section */}
          <ContactSection />

          {/* Footer */}
          <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
            <p>© {new Date().getFullYear()} Sai Keerthika V. All rights reserved.</p>
            <p className="mt-1">Built with Three.js 3D Procedural Space, WebGL PBR & React.</p>
          </footer>

        </main>
      )}

      {/* Recruiter Fast-Track Modal */}
      <RecruiterFastTrackModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        onStart3DTour={handleStartTour}
      />

      {/* Interactive Drone Mission Simulator Modal */}
      {isMissionSimOpen && (
        <AutonomousMissionSimulator onClose={() => setIsMissionSimOpen(false)} />
      )}

      {/* Official Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
}
