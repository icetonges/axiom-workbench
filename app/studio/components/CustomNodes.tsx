import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Cpu, Zap, ShieldCheck, Search } from 'lucide-react';

export const ReasoningNode = memo(({ data }: any) => (
  <div className="px-6 py-4 shadow-2xl rounded-xl bg-slate-900 border-2 border-blue-500/50 min-w-[280px]">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
        <Cpu className="text-blue-400" size={24} />
      </div>
      <div>
        <div className="text-xs font-black text-blue-400 uppercase tracking-widest">{data.label}</div>
        <div className="text-lg font-bold text-white tracking-tight">{data.sublabel}</div>
      </div>
    </div>
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 border-2 border-slate-900" />
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 border-2 border-slate-900" />
  </div>
));

export const SkillNode = memo(({ data }: any) => (
  <div className="px-6 py-4 shadow-2xl rounded-xl bg-slate-900 border-2 border-emerald-500/50 min-w-[280px]">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
        {data.variant === 'miner' ? <Search className="text-emerald-400" size={24} /> : <Zap className="text-emerald-400" size={24} />}
      </div>
      <div>
        <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">Agent Skill</div>
        <div className="text-lg font-bold text-white tracking-tight">{data.label}</div>
      </div>
    </div>
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-500 border-2 border-slate-900" />
  </div>
));

ReasoningNode.displayName = 'ReasoningNode';
SkillNode.displayName = 'SkillNode';