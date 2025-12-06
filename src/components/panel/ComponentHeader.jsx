import { formatTypeLabel } from "../../constants";

export default function ComponentHeader({ label, usageCount, componentType }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-2">
        <h3 className="text-xl font-semibold text-white">{label}</h3>
        {usageCount > 1 && (
          <span
            className="px-2 py-0.5 text-xs font-medium rounded"
            style={{
              background: "rgba(59, 130, 246, 0.15)",
              color: "#3b82f6",
            }}
          >
            ×{usageCount}
          </span>
        )}
      </div>
      <span
        className="inline-block px-2.5 py-1 rounded text-xs"
        style={{ background: "#1a1a1a", color: "#666" }}
      >
        {formatTypeLabel(componentType)}
      </span>
    </div>
  );
}

