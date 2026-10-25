import React from 'react';
import { HardHat, ShieldCheck, Github, ExternalLink, Activity } from 'lucide-react';

export default function Navbar({ backendOnline, openJsonModal }) {
  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 flex items-center justify-center">
          <HardHat className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-slate-100 text-base tracking-tight">Multimodal Construction Intelligence</h1>
            <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              v1.0 Pro
            </span>
          </div>
          <p className="text-xs text-slate-400">AI-Powered Decision Support & Site Analytics</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Connection status */}
        <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
          <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          <span className="text-slate-300 font-medium">
            {backendOnline ? 'FastAPI Backend Online' : 'Backend Connecting...'}
          </span>
        </div>

        {/* GitHub / Demo badges */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <a
          href="http://127.0.0.1:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition font-medium"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Swagger API Docs</span>
        </a>
      </div>
    </header>
  );
}
