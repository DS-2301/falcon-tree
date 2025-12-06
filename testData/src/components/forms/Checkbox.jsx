import React from "react";

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export default Checkbox;

