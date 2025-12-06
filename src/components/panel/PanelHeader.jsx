import { X } from "lucide-react";

export default function PanelHeader({ title, onClose }) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-sm font-medium" style={{ color: "#888" }}>
        {title}
      </h2>
      <button
        onClick={onClose}
        className="p-1 rounded transition-colors hover:bg-white/5"
        style={{ color: "#555" }}
      >
        <X size={18} />
      </button>
    </div>
  );
}

