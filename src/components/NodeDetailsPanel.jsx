import { File, Boxes, Code, Hash, Folder } from "lucide-react";
import {
  Section,
  PropsList,
  PanelHeader,
  ComponentHeader,
  InstanceCard,
} from "./panel";

const panelClasses =
  "fixed right-0 top-14 bottom-0 w-96 p-5 overflow-y-auto z-20 transition-transform duration-300 ease-out";

export default function NodeDetailsPanel({ node, isOpen, onClose }) {
  const data = node?.data;

  const panelStyle = {
    background: "#111111",
    borderLeft: "1px solid #1f1f1f",
    transform: isOpen && data ? "translateX(0)" : "translateX(100%)",
  };

  if (!data) {
    return (
      <div
        className={panelClasses}
        style={{ ...panelStyle, transform: "translateX(100%)" }}
      />
    );
  }

  const hasMultipleInstances = data.usageCount > 1 && data.instances;
  const singleProps = data.usageCount === 1 && data.instances?.[0]?.props;

  return (
    <div className={panelClasses} style={panelStyle}>
      <PanelHeader title="Component Details" onClose={onClose} />

      <ComponentHeader
        label={data.label}
        usageCount={data.usageCount}
        componentType={data.componentType}
      />

      {data.category && (
        <Section icon={Folder} title="Category">
          <div className="text-sm font-mono" style={{ color: "#888" }}>
            {data.category}
          </div>
        </Section>
      )}

      <Section icon={File} title="File Path">
        <div
          className="p-3 rounded-lg text-sm font-mono break-all"
          style={{
            background: "#0a0a0a",
            color: "#10b981",
            border: "1px solid #1a1a1a",
          }}
        >
          {data.filePath}
        </div>
      </Section>

      {data.propsDefinition?.length > 0 && (
        <Section icon={Code} title="Props Definition">
          <div className="flex flex-wrap gap-1.5">
            {data.propsDefinition.map((prop, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-xs font-mono"
                style={{ background: "#1a1a1a", color: "#a78bfa" }}
              >
                {prop}
              </span>
            ))}
          </div>
        </Section>
      )}

      {singleProps && Object.keys(singleProps).length > 0 && (
        <Section icon={Hash} title="Props Passed">
          <PropsList props={singleProps} />
        </Section>
      )}

      {hasMultipleInstances && (
        <Section icon={Hash} title={`${data.usageCount} Instances`}>
          <div className="space-y-2">
            {data.instances.map((instance, i) => (
              <InstanceCard key={i} instance={instance} />
            ))}
          </div>
        </Section>
      )}

      {!hasMultipleInstances && !singleProps && (
        <Section icon={Boxes} title="Usage">
          <div className="text-sm" style={{ color: "#888" }}>
            Used <strong className="text-white">{data.usageCount}</strong>{" "}
            {data.usageCount === 1 ? "time" : "times"}
          </div>
        </Section>
      )}

      <div className="mt-6 pt-5" style={{ borderTop: "1px solid #1a1a1a" }}>
        <button
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#222] hover:text-white"
          style={{
            background: "#1a1a1a",
            color: "#888",
            border: "1px solid #2a2a2a",
          }}
        >
          Jump to Code
        </button>
      </div>
    </div>
  );
}
