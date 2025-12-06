import React from "react";

function Icon({ name, size }) {
  return (
    <span className={`icon icon-${name} icon-${size}`} />
  );
}

export default Icon;

