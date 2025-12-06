import { memo } from "react";
import { Handle, Position } from "reactflow";
import { getTypeStyles } from "../constants";

function ComponentNode({ data, selected }) {
  const { handleBg } = getTypeStyles(data.componentType);
  const isHighlighted = data.highlighted;
  const isActive = selected || isHighlighted;
  const hasMultiple = data.usageCount > 1;
  const isOrphan = data.isOrphan;
  const isOrphanContainer = data.isOrphanContainer;
  const accentColor = isOrphan ? "#eab308" : handleBg;

  return (
    <div
      className={`
        px-3.5 py-2 rounded-lg min-w-[90px] text-center cursor-pointer
        transition-all duration-150 ease-out
        ${isHighlighted ? "scale-105" : "scale-100"}
        ${isOrphanContainer ? "min-w-[160px]" : ""}
      `}
      style={{
        background: "#1f1f1f",
        border: isOrphan
          ? `1.5px dashed ${accentColor}${isActive ? "" : "60"}`
          : `1.5px solid ${accentColor}${isActive ? "" : "40"}`,
        boxShadow: isActive
          ? `0 0 0 1px ${accentColor}30, 0 4px 12px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: accentColor,
          width: 6,
          height: 6,
          border: "none",
          top: -3,
        }}
      />

      <div className="flex items-center justify-center gap-1.5">
        <span
          className="text-[13px] font-medium whitespace-nowrap"
          style={{ color: isOrphan ? "#eab308" : "#e5e5e5" }}
        >
          {data.label}
        </span>
        {hasMultiple && !isOrphanContainer && (
          <span
            className="px-1.5 py-0.5 text-[10px] font-semibold rounded"
            style={{ background: `${accentColor}25`, color: accentColor }}
          >
            ×{data.usageCount}
          </span>
        )}
        {isOrphan && !isOrphanContainer && data.usageCount === 0 && (
          <span
            className="px-1.5 py-0.5 text-[9px] font-semibold rounded uppercase tracking-wide"
            style={{ background: "rgba(234, 179, 8, 0.2)", color: "#eab308" }}
          >
            unused
          </span>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: accentColor,
          width: 6,
          height: 6,
          border: "none",
          bottom: -3,
        }}
      />
    </div>
  );
}

export default memo(ComponentNode);
