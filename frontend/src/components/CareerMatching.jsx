import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  Sparkles,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

export default function CareerMatching({ 
  careers, 
  currentProfile, 
  onSetTargetCareer, 
  disclaimer 
}) {
  const [comparingCareers, setComparingCareers] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (careerTitle) => {
    if (comparingCareers.includes(careerTitle)) {
      setComparingCareers(comparingCareers.filter(c => c !== careerTitle));
    } else {
      if (comparingCareers.length >= 2) {
        setComparingCareers([comparingCareers[1], careerTitle]);
      } else {
        setComparingCareers([...comparingCareers, careerTitle]);
      }
    }
  };

  const comparedCareerObjects = (careers || []).filter(c => comparingCareers.includes(c.career_title));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Multi-Domain Career Exploration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Career Matching & Suitability
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Synthesized by the Career Matching Agent based on your verified skills, declared background, and interests.
          </p>
        </div>

        {comparingCareers.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-brand-indigo hover:bg-brand-violet text-white shadow-glow-sm transition flex items-center space-x-1.5"
          >
            <Sliders className="w-4 h-4" />
            <span>Compare Selected ({comparingCareers.length}/2)</span>
          </button>
        )}
      </div>

      {/* Ethical Disclaimer Card */}
      <div className="p-4 rounded-xl bg-navy-800/80 border border-brand-violet/20 flex items-start space-x-3 text-xs text-slate-300">
        <ShieldAlert className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-white">Transparency & Ethics Notice:</span>
          <p className="text-slate-400 leading-relaxed">
            {disclaimer || "SkillPath AI provides educational exploration benchmarks based on open industry competencies. It does not promise employment or guaranteed career outcomes."}
          </p>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(careers || []).map((c, i) => {
          const isCurrentTarget = currentProfile?.target_career === c.career_title;
          const isSelectedForCompare = comparingCareers.includes(c.career_title);

          return (
            <div 
              key={i} 
              className={`glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between space-y-4 relative ${
                isCurrentTarget ? 'ring-2 ring-brand-violet shadow-glow-sm' : ''
              }`}
            >
              {isCurrentTarget && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet text-[10px] font-extrabold uppercase border border-brand-violet/30">
                  Current Target
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                    {c.domain}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-white">{c.career_title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.description}</p>
                </div>

                {/* Match Score Badge */}
                <div className="p-3 rounded-xl bg-navy-800/90 border border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Compatibility:</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-base font-extrabold text-brand-cyan">{c.match_score}%</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-blue">
                      {c.market_demand} Demand
                    </span>
                  </div>
                </div>

                {/* Agent Reasoning */}
                <div className="p-3 rounded-xl bg-navy-850 border border-white/5 text-xs text-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Matching Rationale
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-300">{c.match_reasoning}</p>
                </div>

                {/* Skills Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Possessed: {c.matched_skills?.join(', ') || 'None yet'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-rose-300 font-semibold text-[11px]">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Missing: {c.missing_skills?.join(', ') || 'All acquired'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCompare(c.career_title)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition ${
                      isSelectedForCompare 
                        ? 'bg-brand-indigo/30 border-brand-indigo text-white' 
                        : 'bg-navy-800 hover:bg-navy-750 border-white/10 text-slate-300'
                    }`}
                  >
                    {isSelectedForCompare ? '✓ In Compare' : '+ Compare'}
                  </button>

                  <button
                    onClick={() => onSetTargetCareer(c.career_title)}
                    disabled={isCurrentTarget}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1 ${
                      isCurrentTarget 
                        ? 'bg-navy-800 text-slate-500 cursor-default' 
                        : 'bg-brand-violet hover:bg-brand-violet/90 text-white shadow-sm'
                    }`}
                  >
                    {isCurrentTarget ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        <span>Active</span>
                      </>
                    ) : (
                      <span>Set as Target</span>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {showCompareModal && comparedCareerObjects.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-5 border border-white/20">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-lg text-white flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-brand-violet" />
                <span>Side-by-Side Career Pathway Comparison</span>
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg bg-navy-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comparedCareerObjects.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-navy-800 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-white">{c.career_title}</h4>
                    <span className="text-sm font-extrabold text-brand-cyan">{c.match_score}% Match</span>
                  </div>
                  <p className="text-xs text-slate-400">{c.description}</p>
                  
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Acquired Foundation</span>
                    <p className="text-emerald-400 font-semibold">{c.matched_skills?.join(', ') || 'None'}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Missing Skills to Learn</span>
                    <p className="text-rose-300 font-semibold">{c.missing_skills?.join(', ') || 'None'}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSetTargetCareer(c.career_title);
                      setShowCompareModal(false);
                    }}
                    className="w-full py-2 rounded-xl bg-brand-violet hover:bg-brand-violet/90 text-white font-bold text-xs transition"
                  >
                    Select as My Target Goal
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
