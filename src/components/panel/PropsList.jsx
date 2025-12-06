export default function PropsList({ props, size = "sm" }) {
  const textSize = size === "xs" ? "text-xs" : "text-sm";

  return (
    <div
      className="p-3 rounded-lg space-y-1.5"
      style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
    >
      {Object.entries(props).map(([name, value]) => (
        <div key={name} className={`flex items-start gap-2 ${textSize}`}>
          <span className="font-mono" style={{ color: "#a78bfa" }}>
            {name}:
          </span>
          <span className="font-mono break-all" style={{ color: "#f59e0b" }}>
            {String(value).substring(0, 50)}
            {String(value).length > 50 ? "..." : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

