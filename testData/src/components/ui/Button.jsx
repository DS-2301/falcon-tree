import React from "react";

function Button({ children, variant, size, onClick }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

