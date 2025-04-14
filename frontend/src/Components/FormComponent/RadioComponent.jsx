import React from 'react';

function RadioComponent({ options = [], selectedValue, onChange, name, label, width }) {
  return (
    <div className="radio-group">
      <div className="text-sm font-medium text-gray-700 pb-1">{label}</div>
      <div className="flex items-center" style={{ width }}>
        {options.length > 0 ? (
          options.map((option, index) => (
            <div className="flex items-center mr-[10px] mb-2" key={index}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={onChange}
                className="cursor-pointer w-[30px] h-[30px] mr-2 accent-[#3C9D9B]"
              />
              <label htmlFor={`${name}-${option.value}`} className="cursor-pointer ml-2">
                {option.label}
              </label>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No options available</p>
        )}
      </div>
    </div>
  );
}

export default RadioComponent;
