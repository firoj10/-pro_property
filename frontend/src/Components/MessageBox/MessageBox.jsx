
// import { IoIosCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";

// const MessageBox = ({ message, error, clearMessage, onOk }) => {
//   // Helper function to safely render errors or messages:
//   const renderContent = (content) => {
//     if (!content) return "";
//     if (typeof content === "object") {
//       return Object.values(content).flat().join(", ");
//     }
//     return content;
//   };

//   const displayContent = renderContent(message) || renderContent(error);

//   return (
//     <>
//       {(message || error) && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
//       )}
//       {(message || error) && (
//         <div className="fixed inset-0 flex top-[5%] justify-center z-50">
//           <div className="h-[352px] w-[410px] bg-white border border-gray-300 rounded-[16px] shadow-md flex flex-col items-center justify-center p-[27px]">
//             <div className={`bg-[#BEFEC7] ${error ? "text-red-600" : "text-[#00A81C]"} rounded-full p-4`}>
//               <IoIosCheckmark className="text-5xl" />
//               <RxCross2 className="text-5xl" />
//             </div>
//             <h2 className="text-[24px] font-semibold text-center text-gray-800 mt-4">
//               {error ? "Error" : "Success!"}
//             </h2>
//             <p className="text-center text-[16px] text-gray-600 mt-2">
//               {displayContent}
//             </p>
//             <button
//               onClick={() => {
//                 if (onOk) {
//                   onOk();
//                 }
//                 clearMessage();
//               }}
//               className="bg-[#3D9D9B] w-full text-white font-semibold py-2 px-6 mt-6 rounded-lg"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MessageBox;


import { IoIosCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
const MessageBox = ({ message, error, clearMessage, onOk }) => {
  // Helper function to safely render errors or messages:
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
            {/* Success/Error Icon */}
            <div
              className={`rounded-full p-4 ${
                error ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {error ? (
                <RxCross1 className="text-5xl" />
              ) : (
                <IoIosCheckmark className="text-5xl" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center text-gray-800 mt-4">
              {error ? "Error!" : "Success!"}
            </h2>
            <p className="text-center text-base text-gray-600 mt-2">
              {displayContent}
            </p>
            <button
              onClick={() => {
                if (onOk) {
                  onOk();
                }
                clearMessage();
              }}
              className="bg-primary w-full text-white font-semibold py-2 px-6 mt-6 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default MessageBox;


