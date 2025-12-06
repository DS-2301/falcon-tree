import React from "react";
import Icon from "../ui/Icon";

function SidebarItem({ icon, label, href }) {
  return (
    <a className="sidebar-item" href={href}>
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );
}

export default SidebarItem;

