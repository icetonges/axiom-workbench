"use client";
import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkbench } from '@/store/useWorkbench';
// Changed this line to use the @ alias for the root
import { ReasoningNode, SkillNode } from '@/app/studio/components/CustomNodes';
// Added 'Search' to this import list to fix the second error
import { Play, Terminal, Activity, Database, ShieldCheck, Lock, AlertCircle, Search } from 'lucide-react';

export default function AeraProductionWorkbench() {
  const { nodes, edges, logs, isExecuting, onNodesChange, onEdgesChange, onConnect, runGraph } = useWorkbench();

  const nodeTypes = useMemo(() => ({
    reasoning: ReasoningNode,
    skill: SkillNode,
  }), []);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* LEFT NAV */}
      <nav className="w-16 border-r border-slate-800 flex flex-col items-center py-6 gap-8 bg-[#070e1e]">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">A</div>
        <div title="System Health" className="p-2 cursor-pointer hover:bg-slate-800 rounded-lg transition-all"><Activity size={20} className="text-emerald-500" /></div>
        <div title="Audit Vault" className="p-2 cursor-pointer hover:bg-slate-800 rounded-lg transition-all"><Lock size={20} className="text-slate-500" /></div>
        <div className="mt-auto pb-6"><Database size={20} className="text-slate-600" /></div>
      </nav>

      {/* COMPONENT LIBRARY */}
      <aside className="w-72 border-r border-slate-800 bg-[#070e1e]/80 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-black tracking-tighter text-white">FED-AXIOM <span className="text-blue-500 underline decoration-2 underline-offset-4">AERA</span></h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em] mt-2">Audit Recon Orchestrator</p>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ShieldCheck size={12}/> Federal Compliance Bricks
            </h3>
            <div className="space-y-2">
              <Brick icon={<Search size={14}/>} label="SF-133 Log Miner" />
              <Brick icon={<Database size={14}/>} label="GL/SL Cross-Check" />
            </div>
          </section>
        </div>

        <div className="mt-auto p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold text-blue-300">SYSTEM STATUS</span>
          </div>
          <p className="text-[11px] text-blue-200/70 leading-relaxed font-medium">Ready for automated reconciliation of appropriated funds.</p>
        </div>
      </aside>

      {/* CANVAS */}
      <main className="flex-1 relative bg-slate-950">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
          <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-slate-800 rounded-lg flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest">MCP SERVER: ACTIVE</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10">
          <button 
            disabled={isExecuting}
            onClick={runGraph}
            className={`flex items-center gap-3 px-8 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              isExecuting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/20 active:scale-95'
            }`}
          >
            <Play size={14} fill="currentColor" /> {isExecuting ? 'Reconciling...' : 'Execute Audit Run'}
          </button>
        </div>

        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Background color="#1e293b" gap={25} size={1} />
          <Controls className="!bg-slate-900 !border-slate-800 !fill-white" />
        </ReactFlow>
      </main>

      {/* TRACE INSPECTOR */}
      <aside className="w-[500px] border-l border-slate-800 bg-[#070e1e] flex flex-col">
        <div className="p-5 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-blue-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">A2A Trace Inspector</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">DEBUG_MODE_ON</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] space-y-4">
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50">
              <Database size={48} strokeWidth={1} className="mb-4" />
              <p className="text-center italic px-12">Connect an Agent Skill to a Reasoning Core and trigger the Audit Run to view handshakes.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="group p-4 bg-black border border-slate-800 rounded-lg hover:border-blue-500/40 transition-colors">
                <div className="flex justify-between mb-3">
                  <span className="text-blue-500 font-black tracking-tighter">[{log.timestamp}]</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${log.status === 'success' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-blue-600/20 text-blue-400'}`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-400">{log.source}</span>
                  <div className="flex-1 h-px bg-slate-800 group-hover:bg-blue-500/20 transition-all" />
                  <span className="text-blue-400 font-bold">{log.target}</span>
                </div>
                <pre className="bg-slate-900/50 p-3 rounded text-slate-300 overflow-x-auto text-[10px] leading-relaxed">
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

function Brick({ icon, label }: any) {
  return (
    <div className="group p-3 border border-slate-800 bg-slate-900/40 rounded-lg flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-slate-600 transition-all">
      <div className="text-slate-500 group-hover:text-blue-400 transition-colors">{icon}</div>
      <span className="text-[11px] font-bold text-slate-300">{label}</span>
    </div>
  );
}