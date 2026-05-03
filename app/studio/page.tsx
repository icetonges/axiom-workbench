"use client";
import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkbench } from '@/store/useWorkbench';
import { ReasoningNode, SkillNode } from './components/CustomNodes';
import { Play, Terminal, Box } from 'lucide-react';

export default function AxiomStudio() {
  const { nodes, edges, logs, onNodesChange, onEdgesChange, onConnect, runGraph } = useWorkbench();

  const nodeTypes = useMemo(() => ({
    reasoning: ReasoningNode,
    skill: SkillNode,
  }), []);

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      
      {/* 1. LEFT PALETTE */}
      <aside className="w-64 border-r border-slate-800 bg-[#070e1e] p-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Library</h3>
        <div className="space-y-3">
          <div className="p-3 border border-slate-700 rounded text-xs flex items-center gap-2 hover:bg-slate-800 cursor-grab">
            <Box size={14} /> Generic Agent
          </div>
        </div>
      </aside>

      {/* 2. CENTER CANVAS */}
      <main className="flex-1 relative">
        <div className="absolute top-6 right-6 z-10">
          <button 
            onClick={runGraph}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            <Play size={14} fill="currentColor" /> EXECUTE WORKFLOW
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
          <Background color="#1e293b" gap={20} />
          <Controls />
        </ReactFlow>
      </main>

      {/* 3. RIGHT TRACE INSPECTOR */}
      <aside className="w-96 border-l border-slate-800 bg-[#070e1e] flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
          <Terminal size={16} className="text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-widest">Handshake Trace</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px]">
          {logs.map((log) => (
            <div key={log.id} className={`p-3 rounded border ${log.status === 'error' ? 'border-red-900/50 bg-red-950/20' : 'border-slate-800 bg-black'}`}>
              <div className="flex justify-between mb-1">
                <span className="text-blue-400">{log.source} ⮕ {log.target}</span>
                <span className={log.status === 'error' ? 'text-red-400' : 'text-emerald-400'}>{log.status.toUpperCase()}</span>
              </div>
              <pre className="text-slate-400 leading-tight">{JSON.stringify(log.payload, null, 2)}</pre>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}