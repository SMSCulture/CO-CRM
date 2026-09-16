'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Workflow, WorkflowBranch, WorkflowNode } from '@/store/workflow-builder-store';
import { WorkflowCanvasNode } from './workflow-node';
import { WorkflowConfigSheet } from './workflow-config-sheet';
import { WorkflowNodePicker, WorkflowPalettePanel, type PaletteItem } from './workflow-palette';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Props {
  workflow: Workflow;
  focusNodeId?: string | null;
  onFocusHandled?: () => void;
  onUpdateNode: (nodeId: string, patch: Partial<Omit<WorkflowNode, 'id' | 'type'>>) => void;
  onAddNode: (node: Omit<WorkflowNode, 'id'>) => string;
  onRemoveNode: (nodeId: string) => void;
  onConnect: (edge: { from: string; to: string; branch?: WorkflowBranch }) => void;
  onRemoveEdge: (edgeId: string) => void;
}

const nodeTypes = { workflow: WorkflowCanvasNode };

export function WorkflowCanvas({ workflow, focusNodeId, onFocusHandled, onUpdateNode, onAddNode, onRemoveNode, onConnect, onRemoveEdge }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [localPositions, setLocalPositions] = useState<Record<string, WorkflowNode['position']>>({});
  const selectedNode = workflow.nodes.find((node) => node.id === selectedId) ?? null;

  useEffect(() => {
    if (!focusNodeId || !workflow.nodes.some((node) => node.id === focusNodeId)) return;
    setSelectedId(focusNodeId);
    onFocusHandled?.();
  }, [focusNodeId, onFocusHandled, workflow.nodes]);

  const nodes = useMemo<Node[]>(() => workflow.nodes.map((node) => ({
    id: node.id,
    type: 'workflow',
    position: localPositions[node.id] ?? node.position,
    data: { workflowNode: node },
    selected: node.id === selectedId,
  })), [workflow.nodes, localPositions, selectedId]);

  const edges = useMemo<Edge[]>(() => workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.from,
    target: edge.to,
    sourceHandle: edge.branch,
    label: edge.branch ? edge.branch.toUpperCase() : undefined,
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  })), [workflow.edges]);

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    const nextNodes = applyNodeChanges(changes, nodes);
    const positions: Record<string, WorkflowNode['position']> = {};
    nextNodes.forEach((node) => { positions[node.id] = node.position; });
    setLocalPositions(positions);
    changes.forEach((change) => {
      if (change.type === 'position' && change.position && !change.dragging) {
        onUpdateNode(change.id, { position: change.position });
      }
      if (change.type === 'remove') onRemoveNode(change.id);
    });
  }, [nodes, onRemoveNode, onUpdateNode]);

  const handleConnect = useCallback((connection: Connection) => {
    if (!connection.source || !connection.target) return;
    const branch = connection.sourceHandle === 'yes' || connection.sourceHandle === 'no' ? connection.sourceHandle : undefined;
    onConnect({ from: connection.source, to: connection.target, branch });
  }, [onConnect]);

  const addAt = (item: PaletteItem, position?: {x:number;y:number}) => {
    const count=workflow.nodes.length;
    const id=onAddNode({...item,config:{},position:position??{x:260+(count%3)*260,y:170+Math.floor(count/3)*160}});
    setSelectedId(id);
  };
  const handleAdd=(item:PaletteItem)=>addAt(item);

  return (
    <div className="relative flex h-[calc(100vh-16rem)] min-h-[640px] overflow-hidden rounded-xl border border-border bg-[#f7f5f2]">
      <aside className="z-10 hidden w-[280px] shrink-0 border-r bg-white p-3 lg:block"><div className="mb-3"><p className="text-sm font-semibold">Add nodes</p><p className="text-xs text-muted-foreground">Pick a node, then configure it.</p></div><WorkflowPalettePanel compact onAdd={handleAdd}/></aside><Button size="sm" className="absolute left-3 top-3 z-20 h-8 gap-1.5 rounded-full px-3 shadow-md lg:left-[292px]" onClick={()=>setPickerOpen(true)}><Plus className="h-3.5 w-3.5"/>Add node</Button>
      <div className="min-w-0 flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleNodesChange}
          onConnect={handleConnect}
          onEdgesDelete={(items) => items.forEach((edge) => onRemoveEdge(edge.id))}
          onNodeClick={(_, node) => setSelectedId(node.id)}
          onPaneClick={() => setSelectedId(null)}
          fitView
          fitViewOptions={{ padding: 0.18, duration: 0 }}
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Background gap={24} size={1} color="#d8d4cd" />
          <MiniMap pannable zoomable nodeStrokeWidth={3} className="!rounded-lg !border !bg-white" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <WorkflowNodePicker open={pickerOpen} onOpenChange={setPickerOpen} onAdd={handleAdd} />
      <WorkflowConfigSheet
        node={selectedNode}
        open={Boolean(selectedNode)}
        onOpenChange={(open) => { if (!open) setSelectedId(null); }}
        onChange={(patch) => { if (selectedNode) onUpdateNode(selectedNode.id, patch); }}
        onDelete={() => { if (selectedNode) { onRemoveNode(selectedNode.id); setSelectedId(null); } }}
      />
    </div>
  );
}
