import React from "react";
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";

function Sidebar({ collapsed }) {
  return (
    <aside className="sidebar">
      <SidebarSection title="Main">
        <SidebarItem icon="home" label="Home" href="/" />
        <SidebarItem icon="dashboard" label="Dashboard" href="/dashboard" />
      </SidebarSection>
      <SidebarSection title="Settings">
        <SidebarItem icon="settings" label="Settings" href="/settings" />
        <SidebarItem icon="user" label="Profile" href="/profile" />
      </SidebarSection>
    </aside>
  );
}

export default Sidebar;

