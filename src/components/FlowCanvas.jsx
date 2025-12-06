import { memo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import ComponentNode from "./ComponentNode";
import { getMinimapColor } from "../constants";

const nodeTypes = { component: ComponentNode };
const defaultEdgeOptions = { style: { stroke: "#2a2a2a", strokeWidth: 1.5 } };

function FlowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  onPaneClick,
}) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
    >
      <Background color="#1a1a1a" gap={24} size={1} />
      <Controls />
      <MiniMap nodeColor={(n) => getMinimapColor(n.data.componentType)} />
    </ReactFlow>
  );
}

export default memo(FlowCanvas);

