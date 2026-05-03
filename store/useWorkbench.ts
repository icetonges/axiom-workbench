import { create } from 'zustand';
import { 
  Connection, 
  Edge, 
  Node, 
  addEdge, 
  OnNodesChange, 
  OnEdgesChange, 
  applyNodeChanges, 
  applyEdgeChanges 
} from 'reactflow';

interface Trace {
  id: string;
  timestamp: string;
  source: string;
  target: string;
  payload: any;
  status: 'success' | 'error' | 'pending';
}

interface WorkbenchState {
  nodes: Node[];
  edges: Edge[];
  logs: Trace[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addLog: (log: Omit<Trace, 'id' | 'timestamp'>) => void;
  runGraph: () => void;
}

export const useWorkbench = create<WorkbenchState>((set, get) => ({
  nodes: [
    { 
      id: 'core-1', 
      type: 'reasoning', 
      data: { model: 'Gemini 1.5 Pro' }, 
      position: { x: 250, y: 50 } 
    },
    { 
      id: 'tool-1', 
      type: 'skill', 
      data: { function: 'audit_parser' }, 
      position: { x: 100, y: 250 } 
    },
  ],
  edges: [],
  logs: [],
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (params) => set({ edges: addEdge({ ...params, animated: true }, get().edges) }),
  
  addLog: (log) => set((state) => ({
    logs: [
      { 
        ...log, 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: new Date().toLocaleTimeString() 
      }, 
      ...state.logs
    ].slice(0, 50)
  })),

  runGraph: () => {
    const { nodes, edges, addLog } = get();
    const rootNode = nodes[0];

    addLog({ 
      source: 'SYSTEM', 
      target: rootNode.id, 
      payload: { event: 'INIT_PIPELINE', context: 'Audit Reconciliation' }, 
      status: 'pending' 
    });

    // Simulate the Handshake Logic
    setTimeout(() => {
      const activeEdges = edges.filter(e => e.source === rootNode.id);
      
      if (activeEdges.length === 0) {
        addLog({
          source: rootNode.id,
          target: 'NONE',
          payload: { error: "No outgoing connections found. Workflow halted." },
          status: 'error'
        });
        return;
      }

      activeEdges.forEach(edge => {
        const target = nodes.find(n => n.id === edge.target);
        addLog({
          source: rootNode.id,
          target: target?.id || 'unknown',
          payload: {
            intent: "Execute data extraction",
            schema: { file_id: "string", user_auth: "required" },
            result: "FAILED: Key mismatch. Target expected 'auth_token'."
          },
          status: 'error'
        });
      });
    }, 1000);
  }
}));