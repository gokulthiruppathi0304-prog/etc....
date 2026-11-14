import React, { useState } from 'react';
import { 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Filter,
  BarChart2,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function SkillGapAnalyzer({ 
  gaps, 
  chartComparison, 
  targetCareer, 
  readinessScore, 
  onNavigate,
  learningRecommendations 
}) {
  const [filterPriority, setFilterPriority] = useState('ALL');

  const filteredGaps = (gaps || []).filter(g => {
    if (filterPriority === 'ALL') return true;
    return g.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Target Benchmark: {targetCareer}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Skill Gap Analyzer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Calculated by the Skill Intelligence Agent comparing your competencies against industry expectations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-2 rounded-xl bg-navy-800 border border-white/10 text-xs">
            <span className="text-slate-400">Career Readiness: </span>
            <span className="font-extrabold text-brand-cyan text-sm">{readinessScore}%</span>
          </div>
        </div>
      </div>

      {/* Visual Skill Comparison Chart (Recharts BarChart) */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-brand-blue" />
            <h3 className="font-bold text-sm text-white">Current Competency vs Industry Benchmark</h3>
          </div>
          <span className="text-[11px] text-slate-400">Scale: 0 (Missing) to 100 (Mastered)</span>
        </div>

        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartComparison || []}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1A243F" vertical={false} />
              <XAxis dataKey="skill" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
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
              <Bar dataKey="current" name="Your Level" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="benchmark" name="Required Benchmark" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filter Gaps:</span>
          {['ALL', 'High', 'Medium'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterPriority === p 
                  ? 'bg-brand-violet text-white' 
                  : 'bg-navy-800 text-slate-400 hover:text-white'
              }`}
            >
              {p === 'ALL' ? 'All Gaps' : `${p} Priority`}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredGaps.length} of {gaps?.length || 0} gaps
        </span>
      </div>

      {/* Gaps List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGaps.map((gap, i) => (
          <div key={i} className="glass-panel-interactive p-5 rounded-2xl space-y-3 relative overflow-hidden">
            
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-base text-white">{gap.skill}</h4>
                <p className="text-xs text-brand-cyan font-semibold">{gap.gap_type}</p>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                gap.priority === 'High' 
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/25' 
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
              }`}>
                {gap.priority} Priority
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {gap.description}
            </p>

            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-navy-800/80 border border-white/5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Current Status</span>
                <span className="font-bold text-slate-200">
                  {gap.current_level} ({gap.status})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Required Benchmark</span>
                <span className="font-bold text-brand-violet">{gap.target_level}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <button
                onClick={() => onNavigate('assessment-lab')}
                className="text-xs font-bold text-brand-indigo hover:text-brand-violet flex items-center space-x-1"
              >
                <span>Take Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('roadmap')}
                className="text-xs font-medium text-slate-400 hover:text-white"
              >
                View in Roadmap
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Curated Learning Resources Section */}
      {learningRecommendations && learningRecommendations.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">
              Curated Free Resources (From Learning Recommendation Agent)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningRecommendations.flatMap(rec => rec.resources || []).slice(0, 6).map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-navy-800/90 hover:bg-navy-750 border border-white/5 hover:border-brand-indigo/30 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-brand-cyan font-bold uppercase mb-1">
                    <span>{res.type}</span>
                    <span className="text-slate-400">{res.time}</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-100 group-hover:text-brand-violet transition line-clamp-2">
                    {res.title}
                  </h5>
                </div>

                <div className="mt-2.5 flex items-center text-[11px] text-slate-400 group-hover:text-slate-200">
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
