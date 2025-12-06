import { Search, X } from "lucide-react";
import SearchNavigation from "./SearchNavigation";

export default function Header({
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchResults,
  searchIndex,
  onPrevResult,
  onNextResult,
  totalComponents,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.shiftKey ? onPrevResult() : onNextResult();
    }
    if (e.key === "Escape") {
      onClearSearch();
    }
  };

  return (
    <header
      className="absolute top-0 left-0 right-0 h-14 flex items-center px-4 z-10"
      style={{ background: "#111111", borderBottom: "1px solid #1f1f1f" }}
    >
      <span className="text-white font-medium text-sm tracking-tight">
        Tree
      </span>

      <div className="flex-1 max-w-md flex items-center gap-2 ml-6">
        <div
          className="flex-1 relative"
          style={{
            background: "#1a1a1a",
            borderRadius: "8px",
            border: "1px solid #2a2a2a",
          }}
        >
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#555" }}
          />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-2 pl-9 pr-8 bg-transparent text-white text-sm rounded-lg outline-none"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: "#888" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {searchResults.length > 0 && (
          <SearchNavigation
            current={searchIndex + 1}
            total={searchResults.length}
            onPrev={onPrevResult}
            onNext={onNextResult}
          />
        )}
      </div>

      <span className="ml-auto text-xs" style={{ color: "#555" }}>
        {loading ? "Loading..." : `${totalComponents} components`}
      </span>
    </header>
  );
}
