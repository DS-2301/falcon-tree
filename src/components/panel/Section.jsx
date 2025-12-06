export default function Section({ icon: Icon, title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color: "#444" }} />
        <span
          className="text-[11px] font-medium uppercase tracking-wider"
          style={{ color: "#555" }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

