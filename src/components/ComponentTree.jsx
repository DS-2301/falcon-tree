import { useState, useCallback, useEffect, useMemo } from "react";
import { useNodesState, useEdgesState, useReactFlow } from "reactflow";

import Header from "./Header";
import FlowCanvas from "./FlowCanvas";
import NodeDetailsPanel from "./NodeDetailsPanel";
import { getLayoutedElements, loadTestData } from "../utils";

export default function ComponentTree() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { setCenter } = useReactFlow();

  useEffect(() => {
    loadTestData().then(({ nodes: parsed, edges: parsedEdges }) => {
      setNodes(getLayoutedElements(parsed, parsedEdges));
      setEdges(parsedEdges);
      setLoading(false);
    });
  }, [setNodes, setEdges]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return nodes.filter((n) => n.data.label.toLowerCase().includes(q));
  }, [nodes, searchQuery]);

  const totalComponents = useMemo(
    () => nodes.reduce((sum, n) => sum + (n.data.usageCount || 1), 0),
    [nodes]
  );

  const zoomToNode = useCallback(
    (node) => {
      if (!node) return;
      setCenter(node.position.x + 75, node.position.y + 25, {
        zoom: 1.5,
        duration: 400,
      });
      setSelectedNode(node);
      setIsPanelOpen(true);
    },
    [setCenter]
  );

  useEffect(() => {
    if (searchResults.length > 0 && searchIndex < searchResults.length) {
      zoomToNode(searchResults[searchIndex]);
    }
  }, [searchIndex, searchResults, zoomToNode]);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        data: {
          ...node.data,
          highlighted: q ? node.data.label.toLowerCase().includes(q) : false,
        },
      }))
    );
    setSearchIndex(0);
  }, [searchQuery, setNodes]);

  const handleSearchChange = useCallback((v) => setSearchQuery(v), []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedNode(null);
    setIsPanelOpen(false);
  }, []);

  const handlePrevResult = useCallback(
    () => setSearchIndex((i) => (i > 0 ? i - 1 : searchResults.length - 1)),
    [searchResults.length]
  );

  const handleNextResult = useCallback(
    () => setSearchIndex((i) => (i < searchResults.length - 1 ? i + 1 : 0)),
    [searchResults.length]
  );

  const handleNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
    setIsPanelOpen(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedNode(null), 300);
  }, []);

  return (
    <div className="w-screen h-screen" style={{ background: "#0a0a0a" }}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        searchResults={searchResults}
        searchIndex={searchIndex}
        onPrevResult={handlePrevResult}
        onNextResult={handleNextResult}
        totalComponents={totalComponents}
        loading={loading}
      />

      <main className="w-full h-[calc(100vh-56px)] mt-14">
        {loading ? (
          <div
            className="flex items-center justify-center h-full text-sm"
            style={{ color: "#555" }}
          >
            Parsing components...
          </div>
        ) : (
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
          />
        )}
      </main>

      <NodeDetailsPanel
        node={selectedNode}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}

