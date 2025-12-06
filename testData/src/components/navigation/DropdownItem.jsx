import React from "react";

function DropdownItem({ label, href, onClick }) {
  return (
    <a className="dropdown-item" href={href} onClick={onClick}>
      {label}
    </a>
  );
}

export default DropdownItem;

