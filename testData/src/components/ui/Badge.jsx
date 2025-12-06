import React from "react";

function Badge({ children, variant }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export default Badge;

