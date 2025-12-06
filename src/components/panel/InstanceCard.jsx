export default function InstanceCard({ instance }) {
  const hasProps = Object.keys(instance.props).length > 0;

  return (
    <div
      className="p-3 rounded-lg"
      style={{ background: "#0a0a0a", border: "1px solid #1a1a1a" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold"
          style={{ background: "#1a1a1a", color: "#666" }}
        >
          {instance.id}
        </span>
        <span className="text-xs" style={{ color: "#555" }}>
          Instance #{instance.id}
        </span>
      </div>
      {hasProps ? (
        <div className="space-y-1">
          {Object.entries(instance.props).map(([name, value]) => (
            <div key={name} className="flex items-start gap-2 text-xs">
              <span className="font-mono" style={{ color: "#a78bfa" }}>
                {name}:
              </span>
              <span
                className="font-mono break-all"
                style={{ color: "#f59e0b" }}
              >
                {String(value).substring(0, 50)}
                {String(value).length > 50 ? "..." : ""}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-xs" style={{ color: "#444" }}>
          No props
        </span>
      )}
    </div>
  );
}
