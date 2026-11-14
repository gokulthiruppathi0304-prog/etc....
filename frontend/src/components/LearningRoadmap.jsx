import React, { useState } from 'react';
import { 
  Milestone, 
  CheckSquare, 
  Square, 
  Clock, 
  FolderGit2, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  BookOpen
} from 'lucide-react';

export default function LearningRoadmap({ 
  roadmap, 
  onToggleTask, 
  targetCareer, 
  onNavigate 
}) {
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: true });

  const toggleWeek = (weekNum) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  };

  const modules = roadmap?.modules || [];
  const progressPct = roadmap?.overall_progress_percentage || 0;

  return (
    <div className="space-y-6">
      
      {/* Header & Progress Bar */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold mb-2">
              <Milestone className="w-3.5 h-3.5" />
              <span>Target: {targetCareer}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Adaptive Learning Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Curated by the Roadmap Agent with weekly milestones, practice tasks, and project deliverables.
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-2xl sm:text-3xl font-black text-brand-cyan">{progressPct}%</span>
            <span className="text-xs text-slate-400 block font-medium">Curriculum Completed</span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet h-full rounded-full transition-all duration-500" 
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => {
          const isExpanded = !!expandedWeeks[module.week_number];
          const completedCount = (module.tasks || []).filter(t => t.completed).length;
          const totalCount = (module.tasks || []).length;
          const isWeekComplete = totalCount > 0 && completedCount === totalCount;

          return (
            <div 
              key={module.week_number} 
              className={`glass-panel rounded-2xl overflow-hidden transition border ${
                module.is_revision 
                  ? 'border-amber-500/40 bg-amber-500/5' 
                  : isWeekComplete 
                  ? 'border-emerald-500/30' 
                  : 'border-white/10'
              }`}
            >
              {/* Module Header Bar */}
              <div 
                onClick={() => toggleWeek(module.week_number)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                    isWeekComplete 
                      ? 'bg-emerald-500 text-white' 
                      : module.is_revision 
                      ? 'bg-amber-500 text-navy-950 font-black' 
                      : 'bg-navy-800 text-brand-cyan border border-white/10'
                  }`}>
                    {isWeekComplete ? <CheckCircle2 className="w-5 h-5" /> : `W${module.week_number}`}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">
                        {module.skill_focus}
                      </span>
                      {module.is_revision && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Revision Recommended</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">{module.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pl-12 sm:pl-0">
                  <div className="text-right text-xs">
                    <span className="text-slate-300 font-semibold">{completedCount}/{totalCount} tasks</span>
                    <span className="text-slate-500 block text-[11px]">{module.estimated_hours}h estimated</span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Module Expanded Details */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-white/5 space-y-4">
                  
                  {/* Revision Alert banner */}
                  {module.is_revision && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                      <div>
                        <strong>Remediation Notice:</strong> {module.revision_reason || 'Performance on recent assessment indicates reviewing these concepts will solidify mastery.'}
                      </div>
                    </div>
                  )}

                  {/* Objective */}
                  <div className="p-3.5 rounded-xl bg-navy-800/60 border border-white/5 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Learning Objective
                    </span>
                    <p className="text-slate-200 leading-relaxed">{module.learning_objective}</p>
                  </div>

                  {/* Project & Practice Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-navy-800/40 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-brand-blue uppercase flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Practice Task</span>
                      </span>
                      <p className="text-slate-300">{module.practice_task}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-navy-800/40 border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-brand-violet uppercase flex items-center space-x-1">
                        <FolderGit2 className="w-3 h-3" />
                        <span>Milestone Project</span>
                      </span>
                      <p className="text-slate-300">{module.project_deliverable}</p>
                    </div>
                  </div>

                  {/* Interactive Tasks Checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Weekly Checklist
                    </span>

                    {(module.tasks || []).map((t) => (
                      <div 
                        key={t.id}
                        onClick={() => onToggleTask(module.week_number, t.id, !t.completed)}
                        className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition select-none ${
                          t.completed 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-300' 
                            : 'bg-navy-800/80 border-white/5 hover:border-brand-indigo/30 text-white'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {t.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 hover:text-brand-violet" />
                          )}
                        </div>

                        <div className="flex-1 space-y-0.5">
                          <p className={`text-xs font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {t.title}
                          </p>
                          <p className="text-[11px] text-slate-400">{t.description}</p>
                        </div>

                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-navy-750 text-slate-400 shrink-0 uppercase">
                          {t.task_type || 'task'}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
