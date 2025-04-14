// import { useFormContext, useWatch } from "react-hook-form";
// import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaLock, FaGenderless, FaFacebook, FaLinkedin, FaFile, FaIdCard, FaBriefcase, FaBirthdayCake, FaHome, FaCheckCircle, FaTimesCircle, FaSearch, FaKey, FaCloudUploadAlt, FaQuestionCircle, FaPen } from "react-icons/fa"; // React Icons থেকে আইকন ইমপোর্ট

// const InputField = ({ label, name, type = "text", placeholder, options = [], condition, icon }) => {
//   const {
//     register,
//     formState: { errors },
//     control,
//   } = useFormContext();

//   const watchValues = useWatch({ control });

//   if (condition && !condition(watchValues)) return null;

//   const getIcon = (name) => {
//     switch (name) {
//       case "full_name":
//         return <FaUser />;
//       case "general_email":
//         return <FaEnvelope />;
//       case "general_contact":
//         return <FaPhone />;
      
//       case "permanent_address":
//         return <FaMapMarkerAlt />;
//       case "password":
//         return <FaLock />;
//       case "gender":
//         return <FaGenderless />;
//       case "facebook_profile":
//         return <FaFacebook />;
//       case "linkedin_profile":
//         return <FaLinkedin />;
//       case "nid_number":
//         return <FaIdCard />;
//       case "occupation":
//         return <FaBriefcase />;
//       case "date_of_birth":
//         return <FaBirthdayCake/>;
//       case "present_address":
//         return <FaHome />;
//       case "is_org_member":
//         return <FaCheckCircle />;
//       case "is_comm_member":
//         return <FaTimesCircle />;
//       case "search":
//         return <FaSearch />;
//       case "secret_key":
//         return <FaKey />;
//       case "file":
//         return <FaCloudUploadAlt />;
//       case "about_us":
//         return <FaQuestionCircle />;
//       case "comments":
//         return <FaPen />;
//       default:
//         return <FaUser />;
//     }
//   };

//   return (
//     <div className="mb-4 relative">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <div className="mt-1 relative">
//         {icon && (
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 boder-r">
//             {getIcon(name)} 
//           </div>
//         )}
//         {type === "textarea" ? (
//           <textarea
//             {...register(name)}
//             placeholder={placeholder}
//             className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//           />
//         ) : type === "select" ? (
//           <select
//             {...register(name)}
//             className="pl-10 mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//           >
//             <option value="">Select {label}</option>
//             {options.map((option, index) => (
//               <option key={index} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         ) : type === "checkbox" ? (
//           <div className="flex items-center">
//             <input type="checkbox" {...register(name)} className="mr-2" />
//             <span>{label}</span>
//           </div>
//         ) : type === "radio" ? (
//           <div>
//             {options.map((option, index) => (
//               <label key={index} className="inline-flex items-center mr-4">
//                 <input type="radio" {...register(name)} value={option.value} className="mr-2" />
//                 {option.label}
//               </label>
//             ))}
//           </div>
//         ) : type === "file" ? (
//           <input type="file" {...register(name)} className="pl-10 mt-1 p-2 w-full border border-gray-300 rounded-md" />
//         ) : (
//           <input
//             type={type}
//             {...register(name)}
//             placeholder={placeholder}
//             className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//           />
//         )}
//       </div>

//       {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
//     </div>
//   );
// };

// export default InputField;













import { useFormContext, useWatch } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaGenderless, FaFacebook, FaLinkedin, FaIdCard, FaBriefcase, FaBirthdayCake, FaHome, FaCheckCircle, FaTimesCircle, FaSearch, FaKey, FaCloudUploadAlt, FaQuestionCircle, FaPen } from "react-icons/fa"; // React Icons from react-icons library

const InputField = ({ label, name, type = "text", placeholder, options = [], condition, icon, disabled }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const watchValues = useWatch({ control });

  if (condition && !condition(watchValues)) return null;

  const getIcon = (name) => {
    switch (name) {
      case "full_name":
        return <FaUser />;
      case "general_email":
        return <FaEnvelope />;
      case "general_contact":
        return <FaPhone />;
      case "permanent_address":
        return <FaMapMarkerAlt />;
      case "password":
        return <FaLock />;
      case "gender":
        return <FaGenderless />;
      case "facebook_profile":
        return <FaFacebook />;
      case "linkedin_profile":
        return <FaLinkedin />;
      case "nid_number":
        return <FaIdCard />;
      case "occupation":
        return <FaBriefcase />;
      case "date_of_birth":
        return <FaBirthdayCake />;
      case "present_address":
        return <FaHome />;
      case "is_org_member":
        return <FaCheckCircle />;
      case "is_comm_member":
        return <FaTimesCircle />;
      case "search":
        return <FaSearch />;
      case "secret_key":
        return <FaKey />;
      case "file":
        return <FaCloudUploadAlt />;
      case "about_us":
        return <FaQuestionCircle />;
      case "comments":
        return <FaPen />;
      default:
        return <FaUser />;
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 boder-r">
            {getIcon(name)}
          </div>
        )}
        {type === "textarea" ? (
          <textarea
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            className={`pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          />
        ) : type === "select" ? (
          <select
            {...register(name)}
            disabled={disabled}
            className={`pl-10 mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <div className="flex items-center">
            <input type="checkbox" {...register(name)} disabled={disabled} className="mr-2" />
            <span>{label}</span>
          </div>
        ) : type === "radio" ? (
          <div>
            {options.map((option, index) => (
              <label key={index} className="inline-flex items-center mr-4">
                <input type="radio" {...register(name)} value={option.value} disabled={disabled} className="mr-2" />
                {option.label}
              </label>
            ))}
          </div>
        ) : type === "file" ? (
          <input type="file" {...register(name)} disabled={disabled} className={`pl-10 mt-1 p-2 w-full border border-gray-300 rounded-md ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`} />
        ) : (
          <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            disabled={disabled}
            className={`pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-300 ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          />
        )}
      </div>

      {errors[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;

