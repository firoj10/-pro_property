import React from 'react';

function TextareaComponent({ value, onChange, name, label, rows = 2, width, placeholder, error }) {
  return (
    <div className="login-field">
      <textarea
        name={name}
        value={value}
        className={`login-field-input ${error ? 'border-red-500' : ''}`}
        rows={rows}
        style={{ width }}
        onChange={onChange}
        placeholder={placeholder || "Enter your Description here"}
      ></textarea>
      <label className="login-field-label" htmlFor={name}>
        {label}
      </label>
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  );
}

export default TextareaComponent;
