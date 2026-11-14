import React from 'react';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BarChart2, 
  Activity,
  Layers,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function ProgressAnalytics({ 
  progressData, 
  readinessScore, 
  targetCareer,
  profile 
}) {
  const overview = progressData?.overview || {};
  const weeklyBreakdown = progressData?.weekly_breakdown || [];
  const assessmentHistory = progressData?.assessment_history || [];

  const measuredPoints = overview.measured_data_points_count || 1;
  const estimatedPoints = overview.estimated_data_points_count || 3;
  const totalPoints = measuredPoints + estimatedPoints;
  const measuredPct = Math.round((measuredPoints / totalPoints) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progress & Telemetry Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Progress Analytics & Proofs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Separating measured, test-verified achievements from heuristic estimates.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-2 rounded-xl bg-navy-800 border border-white/10 text-xs">
            <span className="text-slate-400">Target Role: </span>
            <span className="font-extrabold text-white">{targetCareer}</span>
          </div>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Task Velocity
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">
              {overview.task_completion_percentage || 0}%
            </span>
            <span className="text-xs text-slate-400">
              ({overview.completed_tasks || 0}/{overview.total_tasks || 0} tasks)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Active roadmap completion</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Exam Competency Avg
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-brand-cyan">
              {overview.average_assessment_score || 0}%
            </span>
            <span className="text-xs text-emerald-400 font-semibold">Verified</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">AI Assessment Lab scores</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Measurement Rigor
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-emerald-400">
              {measuredPct}%
            </span>
            <span className="text-xs text-slate-400">Measured</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{estimatedPoints} estimated data points</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Remediation Status
          </span>
          <div className="flex items-baseline space-x-2">
            <span className={`text-2xl font-extrabold ${overview.needs_revision ? 'text-amber-400' : 'text-emerald-400'}`}>
              {overview.needs_revision ? 'Revision Flagged' : 'Optimal Path'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {overview.struggling_skills?.length > 0 ? `${overview.struggling_skills.join(', ')} flagged` : 'No bottlenecks detected'}
          </p>
        </div>

      </div>

      {/* Weekly Completion BarChart */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-brand-cyan" />
            <h3 className="font-bold text-sm text-white">Roadmap Milestone Task Breakdown</h3>
          </div>
          <span className="text-xs text-slate-400">Completed vs Total Tasks Per Week</span>
        </div>

        <div className="w-full h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyBreakdown}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1A243F" vertical={false} />
              <XAxis dataKey="week" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0E1424', 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '0.75rem', 
                  color: '#fff',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="completed" name="Completed Tasks" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total Tasks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Measured Assessment History Table */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Verified Assessment Records</h3>
          </div>
          <span className="text-xs text-slate-400">Diagnostic Logs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-3 pl-2">Skill Subject</th>
                <th className="pb-3">Score Achieved</th>
                <th className="pb-3">Verification Tier</th>
                <th className="pb-3">Date Evaluated</th>
                <th className="pb-3 pr-2">Agent Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assessmentHistory.map((hist, idx) => (
                <tr key={idx} className="hover:bg-navy-850/50 transition">
                  <td className="py-3 pl-2 font-bold text-white">{hist.skill}</td>
                  <td className="py-3 font-extrabold text-sm">
                    <span className={hist.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}>
                      {hist.score}%
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      hist.passed 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                    }`}>
                      {hist.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">{hist.date}</td>
                  <td className="py-3 text-slate-300 pr-2 line-clamp-1 text-[11px]">
                    {hist.notes || 'Verified through diagnostic quiz.'}
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
