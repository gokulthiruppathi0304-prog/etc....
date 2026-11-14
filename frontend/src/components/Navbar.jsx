import React from 'react';
import { Sparkles, RefreshCw, Cpu, Database, Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar({ 
  profile, 
  readinessScore, 
  storageNotice, 
  storageMode, 
  onResetDemo, 
  onTriggerPipeline, 
  isSyncing,
  mobileMenuOpen,
  setMobileMenuOpen 
}) {
  return (
    <header className="sticky top-0 z-30 bg-navy-900/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Mobile menu toggle & Brand title */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-navy-750 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-violet flex items-center justify-center shadow-glow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base lg:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  SKILLPATH AI
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                  v2.0
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-400 font-medium">
                Discover. Bridge gaps. Engineer your future.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Storage notice tooltip / pill */}
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-navy-800/80 border border-white/5 text-[11px] text-slate-400">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dev Store: <strong className="text-slate-200">In-Memory</strong></span>
          </div>

          {/* Target Career Quick Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg bg-navy-800/90 border border-brand-indigo/20 text-xs">
            <span className="text-slate-400">Target:</span>
            <span className="font-semibold text-brand-cyan truncate max-w-[150px] lg:max-w-none">
              {profile?.target_career || 'Full-Stack AI Engineer'}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-blue text-[10px] font-bold">
              {readinessScore || profile?.readiness_score || 58}%
            </span>
          </div>

          {/* Sync Orchestrator Button */}
          <button
            onClick={onTriggerPipeline}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-indigo/20 hover:bg-brand-indigo/30 text-brand-indigo border border-brand-indigo/30 transition shadow-glow-sm disabled:opacity-50"
            title="Execute coordinated 8-agent intelligence synthesis"
          >
            <Cpu className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'Orchestrating...' : 'Sync Agents'}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={onResetDemo}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-white/10 transition"
            title="Reset to default demo data for testing"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-violet to-brand-pink flex items-center justify-center font-bold text-xs text-white shadow-sm ring-2 ring-brand-violet/30">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
