const COLOR_PALETTE = [
  { handle: "#3b82f6" }, // blue
  { handle: "#10b981" }, // emerald
  { handle: "#a855f7" }, // purple
  { handle: "#f59e0b" }, // amber
  { handle: "#f43f5e" }, // rose
  { handle: "#06b6d4" }, // cyan
  { handle: "#f97316" }, // orange
  { handle: "#14b8a6" }, // teal
  { handle: "#ec4899" }, // pink
  { handle: "#84cc16" }, // lime
  { handle: "#6366f1" }, // indigo
  { handle: "#0ea5e9" }, // sky
  { handle: "#d946ef" }, // fuchsia
  { handle: "#22c55e" }, // green
  { handle: "#8b5cf6" }, // violet
  { handle: "#ef4444" }, // red
  { handle: "#eab308" }, // yellow
];

const ROOT_STYLE = { handle: "#64748b" };
const ORPHAN_STYLE = { handle: "#eab308" };

const folderColorMap = new Map();
let nextColorIndex = 0;

function getColorForFolder(folderName) {
  if (!folderName) return COLOR_PALETTE[0];

  if (!folderColorMap.has(folderName)) {
    folderColorMap.set(folderName, nextColorIndex);
    nextColorIndex = (nextColorIndex + 1) % COLOR_PALETTE.length;
  }

  return COLOR_PALETTE[folderColorMap.get(folderName)];
}

export function getTypeStyles(componentType) {
  if (componentType === "root") return { handleBg: ROOT_STYLE.handle };
  if (componentType === "orphan") return { handleBg: ORPHAN_STYLE.handle };
  return { handleBg: getColorForFolder(componentType).handle };
}

export function getMinimapColor(componentType) {
  if (componentType === "root") return ROOT_STYLE.handle;
  if (componentType === "orphan") return ORPHAN_STYLE.handle;
  return getColorForFolder(componentType).handle;
}

export function formatTypeLabel(componentType) {
  if (!componentType) return "Component";
  if (componentType === "root") return "Root";
  if (componentType === "orphan") return "⚠️ Unused";

  return componentType
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
