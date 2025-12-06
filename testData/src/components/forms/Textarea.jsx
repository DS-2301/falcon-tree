import React from "react";

function Textarea({ placeholder, value, onChange, rows }) {
  return (
    <textarea
      className="textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  );
}

export default Textarea;

