import React from "react";

function NavItem({ href, label, active }) {
  return (
    <a className={`nav-item ${active ? 'active' : ''}`} href={href}>
      {label}
    </a>
  );
}

export default NavItem;

