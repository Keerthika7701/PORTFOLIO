import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Download, ExternalLink, FileText, X, Printer } from 'lucide-react';

interface ResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewerModal: React.FC<ResumeViewerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85">
      <div className="glass-panel-dark w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">
                SAI_KEERTHIKA_V_AI_Engineer_Intern.pdf
              </h3>
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                Data Analyst | Artificial Intelligence Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePath}
              download="SAI_KEERTHIKA_V_AI_Engineer_Intern.pdf"
              className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 hidden sm:flex"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-slate-950 relative">
          <iframe
            src={`${PERSONAL_INFO.resumePath}#toolbar=1&navpanes=0&scrollbar=1`}
            title="Sai Keerthika V Resume"
            className="w-full h-full border-none"
          />
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-5 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="font-mono text-[11px]">
            Coimbatore, Tamil Nadu • saikeerthika88@gmail.com • +91 9789746174
          </span>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Available for AI/ML & Data Analyst roles</span>
          </span>
        </div>

      </div>
    </div>
  );
};
