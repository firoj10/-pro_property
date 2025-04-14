import React from 'react';
//  Created By Firoj Hasan
function EmailInputComponent({ label, value, onChange, name, placeholder,width}) {
  return (
    <div className="login-field">
      <input
        type="email"
        name={name}
        value={value}
        className="login-field-input"
        style={{ width }}

        placeholder={placeholder}
        onChange={onChange}
      />
      <label className="login-field-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default EmailInputComponent;
