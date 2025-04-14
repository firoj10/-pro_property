import React, { useState } from "react";
import "./FormComponent.css"; // Custom styles if needed
// Created By Firoj Hasan
function CheckboxComponent({
  value = "",
  label,
  name = "",
  onChange,
  checked
}) {
  //  const [checked, setChecked] = useState(false); // Local state to control checkbox
  const handleCheckboxChange = (e) => {
    const newCheckedState = e.target.checked;
    // setChecked(newCheckedState); // Update local state
    if (onChange) {
      onChange(e, newCheckedState); // Call the onChange prop if passed
    }
  };

  // <label className="flex items-center  parentdiv">
  //   <span className="mb-[30px]"> {label}</span>
  //   {/* Hidden checkbox input */}
  //   <input
  //     type="checkbox"
  //     id={name}
  //     name={name}
  //     value={value}
  //     checked={checked} // Controlled checkbox state
  //     onChange={handleCheckboxChange} // Updates state on change
  //     className="" // Used for styling the checkmark when checked
  //   />
  //   {/* Custom checkbox styled with checkmark */}
  //   <span className="checkmark "></span>
  // </label>;
  return (
    <label className="flex items-center p-1 cursor-pointer hover:bg-gray-100">
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        checked={checked} // Controlled checkbox state
        onChange={handleCheckboxChange} // Updates state on change
        className="mr-3 accent-[#3C9D9B] w-6 h-6"
      />
      {label}
    </label>
  );
}
export default CheckboxComponent;
