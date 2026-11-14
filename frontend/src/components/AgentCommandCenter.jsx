import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Code2, 
  RefreshCw, 
  Sparkles, 
  Play,
  Layers,
  ArrowRight,
  UserCheck,
  Compass,
  CheckSquare,
  BookOpen,
  Milestone,
  TrendingUp,
  Bot
} from 'lucide-react';

const ICON_MAP = {
  UserCheck,
  Activity,
  Compass,
  CheckSquare,
  BookOpen,
  Milestone,
  TrendingUp,
  Bot
};

export default function AgentCommandCenter({ 
  agents, 
  onTriggerPipeline, 
  isSyncing,
  lastReport 
}) {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Multi-Agent Swarm Orchestration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Agent Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time status, execution latency, and input/output payloads of all 8 specialized Python agents.
          </p>
        </div>

        <button
          onClick={onTriggerPipeline}
          disabled={isSyncing}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-blue to-brand-violet hover:from-brand-indigo hover:to-brand-purple text-white shadow-glow-md transition flex items-center space-x-2 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Executing Swarm...' : 'Run Full Multi-Agent Synthesis'}</span>
        </button>
      </div>

      {/* Orchestrator Executive Banner */}
      {lastReport && (
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-cyan space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Central AI Orchestrator Synthesis</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Pipeline Status: <strong className="text-emerald-400 font-bold">{lastReport.pipeline_status}</strong>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {lastReport.executive_summary}
          </p>
        </div>
      )}

      {/* Agents 8-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(agents || []).map((agent) => {
          const IconComponent = ICON_MAP[agent.icon] || Cpu;
          const isSelected = selectedAgent?.id === agent.id;

          return (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`glass-panel-interactive p-5 rounded-2xl cursor-pointer flex flex-col justify-between space-y-3 relative ${
                isSelected ? 'ring-2 ring-brand-violet shadow-glow-sm' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-navy-800 text-brand-cyan border border-white/10">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    agent.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    agent.status === 'RUNNING' ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30 animate-pulse' :
                    'bg-slate-700/50 text-slate-400'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-white">{agent.name}</h4>
                  <p className="text-[11px] text-brand-cyan font-semibold">{agent.role}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {agent.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{agent.execution_time_ms || 12}ms</span>
                </div>

                <button
                  type="button"
                  className="font-bold text-brand-violet hover:underline flex items-center space-x-1"
                >
                  <span>Inspect I/O</span>
                  <Code2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Modal / Payload Viewer */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="glass-panel p-6 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-4 border border-white/20">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-navy-800 text-brand-cyan border border-white/10">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-slate-400">
                    Mode: <strong className="text-brand-cyan">{selectedAgent.source_type}</strong> | Latency: <strong>{selectedAgent.execution_time_ms}ms</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="px-2.5 py-1 rounded-lg bg-navy-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Input Context Payload
                </span>
                <pre className="p-3.5 rounded-xl bg-navy-950 border border-white/5 text-[11px] text-brand-cyan overflow-x-auto font-mono">
                  {JSON.stringify(selectedAgent.input_payload || { status: "Awaiting next trigger" }, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Agent Output Intelligence
                </span>
                <pre className="p-3.5 rounded-xl bg-navy-950 border border-white/5 text-[11px] text-emerald-300 overflow-x-auto font-mono max-h-60 overflow-y-auto">
                  {JSON.stringify(selectedAgent.output_payload || { status: "Execution completed" }, null, 2)}
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
