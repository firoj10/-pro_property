// SubmitButton.jsx
import React from 'react';

const SubmitButton = ({ text = 'Submit', loading = false, disabled = false, onClick, width = 'auto'  }) => {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onClick={onClick}
      className={`px-4 py-2 mt-3 text-white font-semibold rounded transition-all duration-200
        ${width === 'full' ? 'w-full' : 'w-auto'}  
        ${loading ? 'bg-primary cursor-not-allowed' : 'bg-primary hover:bg-primary'}
        ${disabled || loading ? 'opacity-50' : 'opacity-100'}
      `}>
      {loading ? 'Submitting...' : text}
    </button>
  );
};

export default SubmitButton;
