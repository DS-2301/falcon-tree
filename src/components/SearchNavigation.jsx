import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonStyle = {
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  color: "#888",
};

export default function SearchNavigation({ current, total, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onPrev}
        className="p-1.5 rounded-md transition-colors hover:bg-[#222]"
        style={buttonStyle}
      >
        <ChevronLeft size={14} />
      </button>
      <span
        className="text-xs min-w-[45px] text-center tabular-nums"
        style={{ color: "#666" }}
      >
        {current}/{total}
      </span>
      <button
        onClick={onNext}
        className="p-1.5 rounded-md transition-colors hover:bg-[#222]"
        style={buttonStyle}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

