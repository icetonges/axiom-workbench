"use client";
import React, { useMemo, useEffect } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkbench } from '@/store/useWorkbench';
import { ReasoningNode, SkillNode } from './studio/components/CustomNodes';
import { Play, Terminal, ShieldCheck, Database,Activity, Lock } from 'lucide-react';

export default function AxiomIntegratedWorkbench() {
  const { nodes, edges, logs, onNodesChange, onEdgesChange, onConnect, runGraph } = useWorkbench();

  const nodeTypes = useMemo(() => ({
    reasoning: ReasoningNode,
    skill: SkillNode,
  }), []);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      
      {/* GLOBAL NAV: EXPERT IDENTITY */}
      <nav className="w-16 border-r border-slate-800 flex flex-col items-center py-6 gap-8 bg-[#070e1e]">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">A</div>
        <div title="AERA Monitor" className="cursor-help">
          <Activity className="text-blue-400" size={20} />
        </div>
        <ShieldCheck className="text-slate-500 hover:text-white cursor-pointer transition-colors" size={20} />
        <Lock className="text-slate-500 hover:text-white cursor-pointer transition-colors" size={20} />
        <div className="mt-auto pb-4">
          <Database className="text-slate-600" size={20} />
        </div>
      </nav>

      {/* LEFT PANEL: AERA COMPONENT LIBRARY */}
      <aside className="w-72 border-r border-slate-800 bg-[#070e1e]/50 backdrop-blur-xl p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-lg font-black tracking-tighter text-white">FED-AXIOM <span className="text-blue-500">AERA</span></h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Audit Reconciliation Agentic v1.0</p>
        </div>

        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Federal Audit Bricks</h3>
        <div className="space-y-3">
          <PaletteItem icon={<Terminal size={14}/>} label="Log Miner Agent" color="border-blue-500/30" />
          <PaletteItem icon={<ShieldCheck size={14}/>} label="Compliance Validator" color="border-emerald-500/30" />
          <PaletteItem icon={<Database size={14}/>} label="GL/SL Reconciler" color="border-amber-500/30" />
        </div>

        <div className="mt-auto p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
          <p className="text-[11px] text-blue-300 leading-relaxed italic">
            "Build your agentic pipeline to automate appropriated fund reconciliations."
          </p>
        </div>
      </aside>

      {/* MAIN ORCHESTRATION CANVAS */}
      <main className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]">
        <div className="absolute top-6 right-6 z-10 flex gap-4">
          <div className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-slate-300 tracking-tight">MCP SERVER: CONNECTED</span>
          </div>
          <button 
            onClick={runGraph}
            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 px-8 py-2.5 rounded-full text-xs font-black text-white transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95 uppercase"
          >
            <Play size={14} fill="white" /> Execute Audit Run
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#1e293b" gap={30} size={1} />
          <Controls className="!bg-slate-900 !border-slate-700 !fill-white" />
        </ReactFlow>
      </main>

      {/* RIGHT PANEL: A2A TRACE & SCHEMA VALIDATOR */}
      <aside className="w-[450px] border-l border-slate-800 bg-[#070e1e] flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-blue-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-300">A2A Trace Inspector</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-mono text-[10px]">
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 italic gap-2 text-center px-10">
              <Terminal size={32} strokeWidth={1} />
              <p>Awaiting AERA Execution... <br/> Connect a Reasoning Core to an Agent Skill to begin.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={`p-4 rounded border ${log.status === 'error' ? 'border-red-900/50 bg-red-950/10' : 'border-slate-800 bg-black'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-slate-500 text-[9px] uppercase tracking-tighter">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black ${log.status === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-black'}`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-blue-400 font-bold mb-2 tracking-tight">{log.source} ⮕ {log.target}</div>
                <pre className="text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(log.payload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

function PaletteItem({ icon, label, color }: any) {
  return (
    <div className={`p-3 border rounded-lg flex items-center gap-3 cursor-grab hover:bg-slate-800 hover:border-slate-400 transition-all bg-[#0f172a]/40 ${color}`}>
      <div className="text-slate-400">{icon}</div>
      <span className="text-[11px] font-semibold text-slate-200">{label}</span>
    </div>
  );
}