import { create } from 'zustand';
import { 
  Connection, Edge, EdgeChange, Node, NodeChange, 
  addEdge, OnNodesChange, OnEdgesChange, OnConnect, applyNodeChanges, applyEdgeChanges 
} from 'reactflow';

export interface AuditPacket {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  status: 'pending' | 'success' | 'error';
  payload: any;
}

interface WorkbenchState {
  nodes: Node[];
  edges: Edge[];
  logs: AuditPacket[];
  isExecuting: boolean;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addLog: (log: AuditPacket) => void;
  runGraph: () => Promise<void>;
}

const initialNodes: Node[] = [
  { 
    id: 'miner-1', 
    type: 'skill', 
    position: { x: 100, y: 200 }, 
    data: { label: 'Log Miner Agent', sublabel: 'Appropriated Funds', variant: 'miner' } 
  },
  { 
    id: 'core-1', 
    type: 'reasoning', 
    position: { x: 500, y: 200 }, 
    data: { label: 'AERA Reasoning Core', sublabel: 'Variance Detection' } 
  },
];

export const useWorkbench = create<WorkbenchState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
  logs: [],
  isExecuting: false,

  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection: Connection) => {
    set({ edges: addEdge({ ...connection, animated: true, style: { stroke: '#3b82f6' } }, get().edges) });
  },

  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 50) })),

  runGraph: async () => {
    const { nodes, edges, addLog } = get();
    set({ isExecuting: true });

    // 1. Initial Handshake
    addLog({
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleTimeString(),
      source: 'SYSTEM',
      target: 'ORCHESTRATOR',
      status: 'pending',
      payload: { event: 'INIT_AUDIT_RUN', scope: 'FY2026_Q1_RECON' }
    });

    // 2. Identify Execution Order (Simple DFS for DAG)
    const visited = new Set();
    const executionQueue = nodes.filter(n => !edges.find(e => e.target === n.id));

    for (const node of executionQueue) {
      if (visited.has(node.id)) continue;
      
      // Simulate Node Processing Logic
      const outgoingEdges = edges.filter(e => e.source === node.id);
      
      await new Promise(r => setTimeout(r, 1200)); // Latency Simulation

      const resultPayload = node.type === 'skill' 
        ? { parsed_records: 1240, variances_found: 12, schema: 'SF-133' }
        : { decision: 'ESCALATE', confidence: 0.98, logic: 'Threshold > 5% mismatch' };

      addLog({
        id: Math.random().toString(36),
        timestamp: new Date().toLocaleTimeString(),
        source: node.id,
        target: outgoingEdges.length > 0 ? outgoingEdges[0].target : 'OUTPUT',
        status: 'success',
        payload: resultPayload
      });

      visited.add(node.id);
    }

    set({ isExecuting: false });
  },
}));