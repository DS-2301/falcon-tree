import React from "react";

function SidebarSection({ title, children }) {
  return (
    <div className="sidebar-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default SidebarSection;

