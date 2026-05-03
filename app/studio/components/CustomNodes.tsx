"use client";
import { Handle, Position } from 'reactflow';
import { Cpu, Zap, Database } from 'lucide-react';

const baseStyle = "bg-[#0f172a] border-2 rounded-lg p-4 min-w-[180px] shadow-2xl";

export const ReasoningNode = ({ data }: any) => (
  <div className={`${baseStyle} border-blue-500`}>
    <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />
    <div className="flex items-center gap-2 mb-2">
      <Cpu size={16} className="text-blue-400" />
      <span className="font-bold text-xs text-white">REASONING CORE</span>
    </div>
    <div className="text-[10px] text-blue-200 bg-blue-900/30 p-1 rounded font-mono">
      {data.model}
    </div>
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
  </div>
);

export const SkillNode = ({ data }: any) => (
  <div className={`${baseStyle} border-amber-500`}>
    <Handle type="target" position={Position.Top} className="w-2 h-2 bg-amber-500" />
    <div className="flex items-center gap-2 mb-2">
      <Zap size={16} className="text-amber-400" />
      <span className="font-bold text-xs text-white">AGENT SKILL</span>
    </div>
    <div className="text-[10px] text-amber-200 bg-amber-900/30 p-1 rounded font-mono">
      {data.function}
    </div>
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-amber-500" />
  </div>
);