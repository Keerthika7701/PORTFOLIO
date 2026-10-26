import React, { useState } from 'react';
import { PERSONAL_INFO, INTERNSHIPS, PROJECTS, CERTIFICATIONS } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Download, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface RecruiterFastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart3DTour: () => void;
}

export const RecruiterFastTrackModal: React.FC<RecruiterFastTrackModalProps> = ({
  isOpen,
  onClose,
  onStart3DTour
}) => {
  const [copiedPacket, setCopiedPacket] = useState(false);

  if (!isOpen) return null;

  const handleCopyRecruiterPacket = () => {
    soundManager.playChime();
    const packet = `CANDIDATE PROFILE: SAI KEERTHIKA V
Role Target: AI / Machine Learning Engineer | Data Analyst
Location: Coimbatore, Tamil Nadu, India (Open to Remote / Relocation)
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

EDUCATION:
- Coimbatore Institute of Engineering and Technology
  B.Tech in Artificial Intelligence & Data Science (2023–Present) | CGPA: 7.52/10

KEY HIGHLIGHTS & DIFFERENTIATORS:
1. SAEINDIA Autonomous Drone Challenge: Developed GPS-guided autonomous drone delivery system using real-time lat/lon waypoint navigation and automated payload drop.
2. 5 Industry Internships:
   - Data Mites: Artificial Engineer Intern (Python, DL, NLP, CV, GenAI)
   - Code Alpha: AI Intern (Object Detection, Translation, Chatbot, Music Generation)
   - Code Binding: AI & ML Intern (Supervised/Unsupervised Learning & Evaluation)
   - Next Logic: Web Development Intern (HTML, CSS, JS Frontend)
   - IOC Training: AI/ML Cloud Deployment & MLOps
3. Certifications (Infosys Springboard): Python Fundamentals, Machine Learning, Computer Vision
4. Core Tech: Python, C/C++, R, Java, Scikit-learn, TensorFlow, Pandas, NumPy, MySQL, MongoDB, Statistics, Prompt Engineering, Generative AI.`;

    navigator.clipboard.writeText(packet);
    setCopiedPacket(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopiedPacket(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85">
      <div className="glass-panel-dark w-full max-w-4xl max-h-[92vh] rounded-2xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Recruiter 30-Second Fast-Track Dossier</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  IMMEDIATE HIRE READY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Curated executive summary engineered for Technical Recruiters & Hiring Managers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">DEGREE & CGPA</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">B.Tech AIDS • 7.52</div>
              <div className="text-[11px] text-slate-400">CIET (2023–Present)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">INDUSTRY ROLES</div>
              <div className="text-sm font-bold text-sky-400 mt-0.5">5 Internships</div>
              <div className="text-[11px] text-slate-400">AI, CV, NLP & Cloud</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">COMPETITIONS</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">SAEINDIA Finalist</div>
              <div className="text-[11px] text-slate-400">Autonomous GPS Drone</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">CERTIFICATIONS</div>
              <div className="text-sm font-bold text-purple-400 mt-0.5">Infosys Triple</div>
              <div className="text-[11px] text-slate-400">Python, ML, Vision</div>
            </div>
          </div>

          {/* Quick Fit Assessment */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 border border-sky-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h4 className="text-sm font-bold text-white">Why Hire Sai Keerthika V?</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Demonstrated Autonomous Systems:</strong> Built GPS-guided navigation and automated payload drop for drones with real-time telemetry.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Multi-Modal AI Experience:</strong> Real-time Object Detection, Language Translation, Conversational FAQ Chatbots, and Music Generation.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Strong Software Foundations:</strong> Fluent in Python, C, C++, R, Java, SQL, MongoDB, and modern web interfaces.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Accelerated Learning Curve:</strong> Already completed 5 industry internships alongside rigorous B.Tech coursework.</span>
              </li>
            </ul>
          </div>

          {/* Internships At-a-Glance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Internship Track Record (Chronological)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INTERNSHIPS.map((exp) => (
                <div key={exp.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs">{exp.company}</span>
                    <span className="text-[10px] font-mono text-sky-400">{exp.period}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium mb-1.5">{exp.role}</div>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Quick Actions */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onStart3DTour();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Launch 60s 3D Space Tour</span>
            </button>

            <button
              onClick={handleCopyRecruiterPacket}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            >
              {copiedPacket ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Packet Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ATS Recruiter Packet</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              download="SAI_KEERTHIKA_V_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume PDF</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Invitation%20-%20Sai%20Keerthika%20V`}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Send direct email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
