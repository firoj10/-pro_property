const TabButton = ({ label, tabIndex, handleTabChange, color = "bg-primary", textColor = "text-white", fullWidth = true }) => {
    return (
        <button
            onClick={() => handleTabChange(tabIndex)}
            className={`${color} ${textColor} py-2 mt-3 px-4 ${fullWidth ? "w-full" : ""} rounded`}
        >
            {label}
        </button>
    );
};

export default TabButton;
