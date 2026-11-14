import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Activity,
  ArrowRight,
  Zap
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

export default function DigitalTwin({ 
  profile, 
  readinessScore, 
  onNavigate,
  onTriggerPipeline,
  isSyncing 
}) {
  const currentSkills = profile?.current_skills || [];
  const assessedSkills = currentSkills.filter(s => s.status === 'ASSESSED');
  const estimatedSkills = currentSkills.filter(s => s.status !== 'ASSESSED');

  // Prepare radar data for competency clusters
  const radarData = [
    { subject: 'Languages & Core', A: assessedSkills.some(s => s.name === 'Python') ? 85 : 50, fullMark: 100 },
    { subject: 'API Architecture', A: assessedSkills.some(s => s.name === 'FastAPI') ? 80 : 35, fullMark: 100 },
    { subject: 'UI Engineering', A: assessedSkills.some(s => s.name === 'React') ? 80 : 40, fullMark: 100 },
    { subject: 'DevOps & Containers', A: assessedSkills.some(s => s.name === 'Docker') ? 85 : 30, fullMark: 100 },
    { subject: 'Data & SQL', A: assessedSkills.some(s => s.name === 'SQL') ? 75 : 45, fullMark: 100 },
    { subject: 'Version Control', A: assessedSkills.some(s => s.name === 'Git') ? 80 : 60, fullMark: 100 },
  ];

  const assessedPct = currentSkills.length > 0 
    ? Math.round((assessedSkills.length / currentSkills.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Real-time Competency Twin</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            AI Career Digital Twin
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            An evolving digital shadow quantifying your technical capabilities, distinguishing verified proofs from estimations.
          </p>
        </div>

        <button
          onClick={onTriggerPipeline}
          disabled={isSyncing}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white shadow-glow-sm transition disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Synchronizing...' : 'Resync Twin Matrix'}</span>
        </button>
      </div>

      {/* Main Grid: Twin Neural Avatar Card + Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Twin Status Card (1 Col) */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-brand-violet/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-indigo to-brand-violet flex items-center justify-center text-white shadow-glow-sm ring-2 ring-brand-violet/40">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{profile?.full_name || 'Alex Chen'}</h3>
                <p className="text-xs text-brand-cyan font-semibold">Twin ID: DT-2026-X89</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-800/80 border border-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Target Vector:</span>
                <span className="font-bold text-slate-200">{profile?.target_career}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Career Readiness:</span>
                <span className="font-bold text-brand-violet">{readinessScore}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Skills:</span>
                <span className="font-bold text-slate-200">{currentSkills.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Verification Ratio:</span>
                <span className="font-bold text-emerald-400">{assessedPct}% Assessed</span>
              </div>
            </div>

            {/* Verification Breakdown Pill Box */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Truth Verification Vector
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-lg font-black text-emerald-400">{assessedSkills.length}</div>
                  <div className="text-[10px] font-bold text-emerald-300">ASSESSED (Verified)</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-lg font-black text-amber-300">{estimatedSkills.length}</div>
                  <div className="text-[10px] font-bold text-amber-400">ESTIMATED (Self)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5">
            <button
              onClick={() => onNavigate('assessment-lab')}
              className="w-full py-2.5 px-3 rounded-xl bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>Convert Estimated Skills in Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Competency Radar Chart (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-brand-indigo" />
                <h3 className="font-bold text-sm text-white">Full-Stack Competency Footprint</h3>
              </div>
              <span className="text-xs text-slate-400">Assessed & Estimated Matrix</span>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#1A243F" />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#1A243F" />
                  <Radar name="Learner Vector" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Explanation Notice */}
          <div className="p-3 rounded-xl bg-navy-800/80 border border-white/5 flex items-center space-x-3 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Digital Twin Integrity:</strong> Skills verified through the AI Assessment Lab appear as <strong className="text-emerald-400">[ASSESSED]</strong> with calibrated confidence scores, whereas unverified inputs remain flagged as <strong className="text-amber-300">[ESTIMATED]</strong>.
            </span>
          </div>
        </div>

      </div>

      {/* Skills Breakdown Table */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-brand-cyan" />
          <span>Capability Matrix & Evidence Log</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-3 pl-2">Skill Name</th>
                <th className="pb-3">Declared Proficiency</th>
                <th className="pb-3">Verification Status</th>
                <th className="pb-3">Verified Score</th>
                <th className="pb-3 text-right pr-2">Lab Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentSkills.map((s, idx) => (
                <tr key={idx} className="hover:bg-navy-850/50 transition">
                  <td className="py-3 pl-2 font-bold text-white flex items-center space-x-2">
                    <span>{s.name}</span>
                  </td>
                  <td className="py-3 text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-navy-800 border border-white/5 font-medium">
                      {s.level}
                    </span>
                  </td>
                  <td className="py-3">
                    {s.status === 'ASSESSED' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>ASSESSED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5" />
                        <span>ESTIMATED</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 font-semibold">
                    {s.assessed_score !== null ? (
                      <span className="text-emerald-400">{s.assessed_score}% (Verified)</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button
                      onClick={() => onNavigate('assessment-lab')}
                      className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-brand-violet hover:text-white text-slate-300 text-[11px] font-semibold border border-white/5 transition"
                    >
                      {s.status === 'ASSESSED' ? 'Retake Test' : 'Verify in Lab'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
