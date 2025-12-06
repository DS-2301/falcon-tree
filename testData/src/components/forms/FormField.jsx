import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";

function FormField({ label, type, value, onChange }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {type === "textarea" ? (
        <Textarea value={value} onChange={onChange} />
      ) : (
        <Input type={type} value={value} onChange={onChange} />
      )}
    </div>
  );
}

export default FormField;

