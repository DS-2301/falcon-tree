import React from "react";

function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider" />
      <span>{label}</span>
    </label>
  );
}

export default Toggle;

