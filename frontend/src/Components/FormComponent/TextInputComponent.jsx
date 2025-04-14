import React from 'react';
//  Created By Firoj Hasan
function TextInputComponent({ label, value, onChange,name,placeholder,width='100%',error=''  }) {
    return (
        <div className="login-field" >
        <input
          type= "text"
          name={name}
          value={value}
          className="login-field-input"
          placeholder={placeholder}
          onChange={onChange}
          style={{ width }}
          />
        <label className="login-field-label" htmlFor={label}>
          {label}
        </label>
        {error && <p className="text-red-500 text-xs">{error}</p>} {/* Display error message */}

      </div>

    );
}

export default TextInputComponent;
