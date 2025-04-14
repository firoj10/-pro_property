import React from 'react';
//  Created By Firoj Hasan
function SelectComponent({ options, value, onChange, name, label,width }) {
  if (!options || !Array.isArray(options)) {
    return null; // Optionally handle gracefully if no options available
  }

  return (
    <div className="login-field">
      <select
        name={name}
        value={value}
        className="login-field-input"
        style={{ width }}

        onChange={onChange}
      >
        {options.map((option, optIndex) => (
          <option key={optIndex} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label className="login-field-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default SelectComponent;
