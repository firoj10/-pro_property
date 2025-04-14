import { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import confirmation from '../../assets/confimation-icon.png';

const ConfirmationMessageBox = ({ message, error, onConfirm, onCancel }) => {
  const [confirmed, setConfirmed] = useState(false);

  // Helper function to safely render messages or errors
  const renderContent = (content) => {
    if (!content) return "";
    if (typeof content === "object") {
      return Object.values(content).flat().join(", ");
    }
    return content;
  };

  const displayContent = renderContent(message) || renderContent(error);

  return (
    <>
      {(message || error) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
      )}
      {(message || error) && (
        <div className="fixed inset-0 flex top-[5%] justify-center z-50">
          <div className="h-[352px] w-[410px] bg-white border border-gray-300 rounded-16 shadow-md flex flex-col items-center justify-center p-7">
            <div className={`${error ? "text-red-600" : "text-primary"} rounded-full p-4`}>
              <img src={confirmation} className="text-5xl" alt="confirmation icon" />
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-800">
              {error ? "Error" : confirmed ? "Success!" : "Are you sure ?"}
            </h2>
            <p className="text-center text-base text-gray-600 mt-1">
              {confirmed ? "Action confirmed successfully." : displayContent}
            </p>
            {confirmed ? (
              <button
                onClick={onCancel}
                className="bg-primary w-full text-white py-2 px-6 mt-6 rounded-lg"
              >
                OK
              </button>
            ) : (
              <div className="flex gap-4 w-full mt-6">
                <button
                  onClick={onCancel}
                  className="border border-primary text-primary flex-1 py-2 px-6 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setConfirmed(true);
                    if (onConfirm) onConfirm();
                  }}
                  className="bg-primary flex-1 text-white py-2 px-6 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationMessageBox;
