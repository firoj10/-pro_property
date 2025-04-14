import React from 'react';
import "./FormComponent.css"; 
function NumberInputComponent({ value, onChange, name, label,placeholder, width, error='', disabled = false }) {
  return (
    <div className="login-field">
      <input
        type="number"
        name={name} 
        value={value}
        className="login-field-input custom-input"
        style={{ width }}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled} // Apply the disabled attribute
      />
      <label className="login-field-label" htmlFor={label}>
        {label}
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>} {/* Display error message */}

    </div>
  );
}

export default NumberInputComponent;
