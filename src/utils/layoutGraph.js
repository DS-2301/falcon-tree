const NODE_WIDTH = 150;
const NODE_HEIGHT = 50;
const H_SPACING = 40;
const V_SPACING = 70;

function estimateNodeWidth(node) {
  const label = node.data?.label || "";
  const hasMultiple = node.data?.usageCount > 1;
  const isOrphan = node.data?.isOrphan;
  const isOrphanContainer = node.data?.isOrphanContainer;

  let width = Math.max(NODE_WIDTH, label.length * 9 + 40);
  if (hasMultiple) width += 30;
  if (isOrphan && !isOrphanContainer) width += 50;
  if (isOrphanContainer) width = Math.max(width, 200);

  return width;
}

export function getLayoutedElements(nodes, edges) {
  const nodeWidths = {};
  nodes.forEach((node) => (nodeWidths[node.id] = estimateNodeWidth(node)));

  const childrenMap = {};
  const parentMap = {};

  edges.forEach((edge) => {
    if (!childrenMap[edge.source]) childrenMap[edge.source] = [];
    childrenMap[edge.source].push(edge.target);
    parentMap[edge.target] = edge.source;
  });

  const roots = nodes.filter((node) => !parentMap[node.id]);

  const depths = {};
  const calculateDepth = (nodeId, depth) => {
    depths[nodeId] = depth;
    (childrenMap[nodeId] || []).forEach((childId) =>
      calculateDepth(childId, depth + 1)
    );
  };
  roots.forEach((root) => calculateDepth(root.id, 0));

  const subtreeWidths = {};
  const calculateSubtreeWidth = (nodeId) => {
    const children = childrenMap[nodeId] || [];
    const nodeWidth = nodeWidths[nodeId] || NODE_WIDTH;

    if (children.length === 0) {
      subtreeWidths[nodeId] = nodeWidth;
      return nodeWidth;
    }

    const childrenWidth =
      children.reduce(
        (sum, childId) => sum + calculateSubtreeWidth(childId),
        0
      ) +
      (children.length - 1) * H_SPACING;

    subtreeWidths[nodeId] = Math.max(nodeWidth, childrenWidth);
    return subtreeWidths[nodeId];
  };
  roots.forEach((root) => calculateSubtreeWidth(root.id));

  const positions = {};
  const positionNode = (nodeId, leftX) => {
    const children = childrenMap[nodeId] || [];
    const subtreeWidth = subtreeWidths[nodeId];

    positions[nodeId] = {
      x: leftX + subtreeWidth / 2,
      y: depths[nodeId] * (NODE_HEIGHT + V_SPACING),
    };

    let childLeftX = leftX;
    children.forEach((childId) => {
      positionNode(childId, childLeftX);
      childLeftX += subtreeWidths[childId] + H_SPACING;
    });
  };

  let currentX = 0;
  roots.forEach((root) => {
    positionNode(root.id, currentX);
    currentX += subtreeWidths[root.id] + H_SPACING * 3;
  });

  return nodes.map((node) => ({
    ...node,
    position: {
      x: positions[node.id].x - (nodeWidths[node.id] || NODE_WIDTH) / 2,
      y: positions[node.id].y,
    },
  }));
}

export { NODE_WIDTH, NODE_HEIGHT };
