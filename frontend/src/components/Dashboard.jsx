import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Clock, 
  BookOpen, 
  Zap, 
  Award,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Dashboard({ 
  profile, 
  readinessScore, 
  roadmap, 
  gaps, 
  activities, 
  onNavigate,
  onTriggerPipeline,
  isSyncing 
}) {
  const currentSkills = profile?.current_skills || [];
  const assessedSkills = currentSkills.filter(s => s.status === 'ASSESSED');
  const estimatedSkills = currentSkills.filter(s => s.status !== 'ASSESSED');
  const targetCareer = profile?.target_career || 'Full-Stack AI Engineer';
  const progressPct = roadmap?.overall_progress_percentage || 0;

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-850 via-navy-800 to-navy-750 border border-white/10 p-6 lg:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Agent Career Evolution Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet bg-clip-text text-transparent">{profile?.full_name || 'Alex'}</span>!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your career evolution platform is synchronizing your skill matrix toward <strong className="text-brand-cyan">{targetCareer}</strong>. 
              {assessedSkills.length > 0 ? ` ${assessedSkills.length} skill(s) verified by AI Assessment Lab.` : ' Complete your first diagnostic assessment to verify competencies.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('assessment-lab')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-brand-indigo hover:to-brand-violet text-white shadow-glow-sm transition flex items-center space-x-2"
            >
              <span>Take Diagnostic Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-navy-800 hover:bg-navy-750 text-slate-200 border border-white/10 transition flex items-center space-x-1.5"
            >
              <span>View Roadmap</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Career Readiness */}
        <div className="glass-panel-interactive p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Career Readiness</span>
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{readinessScore}%</span>
            <span className="text-xs text-brand-cyan font-semibold">
              {readinessScore >= 75 ? 'Strong Match' : readinessScore >= 50 ? 'Developing Match' : 'Foundational'}
            </span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet h-full rounded-full transition-all duration-500" 
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Target benchmark: 85% for junior role</p>
        </div>

        {/* Metric 2: Roadmap Progress */}
        <div className="glass-panel-interactive p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Roadmap Progress</span>
            <div className="p-2 rounded-xl bg-brand-violet/10 text-brand-violet">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{progressPct}%</span>
            <span className="text-xs text-slate-400 font-medium">completed</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-violet to-brand-pink h-full rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">6 milestone weeks total</p>
        </div>

        {/* Metric 3: Skills Verified vs Estimated */}
        <div className="glass-panel-interactive p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skill Verification</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">{assessedSkills.length}</span>
            <span className="text-xs text-emerald-400 font-bold">Assessed</span>
            <span className="text-xs text-slate-500 font-medium">/ {currentSkills.length} total</span>
          </div>
          <div className="flex items-center space-x-2 mt-3 text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20">
              {assessedSkills.length} Verified
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20">
              {estimatedSkills.length} Estimated
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Verified in AI Assessment Lab</p>
        </div>

        {/* Metric 4: High Priority Gaps */}
        <div className="glass-panel-interactive p-5 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Skill Gaps</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {gaps?.filter(g => g.priority === 'High').length || 0}
            </span>
            <span className="text-xs text-amber-400 font-semibold">High Priority</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            {gaps?.length || 0} total gaps between current & target profile
          </p>
          <button 
            onClick={() => onNavigate('skill-gaps')} 
            className="text-[11px] text-brand-indigo font-bold hover:underline flex items-center space-x-1 mt-1.5"
          >
            <span>Analyze skill breakdown</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* 3. Main Split Section: Recommended Next Action + Digital Twin Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommended Next Action (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-brand-indigo/20 text-brand-indigo">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">Recommended Next Action</h3>
                <p className="text-xs text-slate-400">Synthesized by Progress Agent & Orchestrator</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-brand-cyan/15 text-brand-cyan text-[11px] font-bold border border-brand-cyan/20">
              High Impact
            </span>
          </div>

          <div className="p-4 rounded-xl bg-navy-800/80 border border-white/5 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold text-xs shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-100">
                  {gaps && gaps.length > 0 ? `Bridge ${gaps[0].skill} Proficiency Gap` : 'Start Week 1 Roadmap Tasks'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {gaps && gaps.length > 0 
                    ? `Your target role (${targetCareer}) heavily weights ${gaps[0].skill}. Complete the hands-on practice module or take the diagnostic quiz to earn an ASSESSED badge.`
                    : 'Work through the milestone tasks in your adaptive roadmap to boost overall career readiness.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
              <button
                onClick={() => onNavigate('assessment-lab')}
                className="px-3.5 py-2 rounded-lg bg-brand-violet hover:bg-brand-violet/90 text-white font-semibold text-xs transition flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Test {gaps && gaps[0] ? gaps[0].skill : 'Python'} in Lab</span>
              </button>
              <button
                onClick={() => onNavigate('roadmap')}
                className="px-3.5 py-2 rounded-lg bg-navy-750 hover:bg-navy-700 text-slate-200 font-semibold text-xs transition flex items-center space-x-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Roadmap Week 1</span>
              </button>
              <button
                onClick={() => onNavigate('mentor')}
                className="px-3.5 py-2 rounded-lg bg-transparent hover:bg-navy-750 text-slate-400 hover:text-white font-medium text-xs transition"
              >
                Ask Mentor for Advice
              </button>
            </div>
          </div>

          {/* Quick Skill Chips Preview */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Current Competency Vector
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-navy-800 border border-white/5 text-xs"
                >
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <span className="text-[10px] text-slate-400">({skill.level})</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    skill.status === 'ASSESSED' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/15 text-amber-300'
                  }`}>
                    {skill.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Log (1 Col) */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-cyan" />
                <h3 className="font-bold text-sm text-white">Recent Activity</h3>
              </div>
              <span className="text-[11px] text-slate-400">Live Telemetry</span>
            </div>

            <div className="space-y-3">
              {(activities || []).slice(0, 5).map((act, i) => (
                <div key={act.id || i} className="flex items-start space-x-3 text-xs">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    act.type === 'assessment' ? 'bg-brand-violet' :
                    act.type === 'roadmap' ? 'bg-brand-cyan' :
                    act.type === 'agents' ? 'bg-brand-blue' : 'bg-slate-400'
                  }`} />
                  <div className="flex-1 space-y-0.5">
                    <p className="font-semibold text-slate-200">{act.action}</p>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{act.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5">
            <button
              onClick={() => onNavigate('digital-twin')}
              className="w-full py-2 px-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 font-semibold text-xs border border-white/5 transition flex items-center justify-center space-x-1.5"
            >
              <span>Inspect AI Digital Twin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
