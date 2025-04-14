import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './../../../../../Components/InputField/InputField';
import DropzoneComponent from './../../../../../Components/InputField/DropzoneComponent/DropzoneComponent';
import { SubmitButton } from './../../../../../Components/Buttons/SubmitButton';
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../../memberSlice/memberSlice";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import { NavigationButton } from "../../../../../Components/Buttons/NavigationButton";

import { FaSave } from 'react-icons/fa';

// Yup schema for validation
const schema = yup.object().shape({
  full_name: yup.string().required('Full Name is required'),
  general_contact: yup.string().required('General contact is required'),
  general_email: yup.string().email('Invalid email').required('General email is required'),
  nid_number: yup.string().required('NID Number is required'),
  photo: yup.mixed().nullable(),
  about_us: yup.string().nullable(),
  facebook_profile: yup.string().url('Invalid URL').nullable(),
  linkedin_profile: yup.string().url('Invalid URL').nullable(),
  permanent_address: yup.string().required('Permanent address is required'),
  present_address: yup.string().required('Present address is required'),
  date_of_birth: yup.date().nullable(),
  occupation: yup.string().nullable(),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid Gender').required('Gender is required'),
  marital_status: yup.string().nullable(),
  religion: yup.string().nullable(),
  nid_front: yup.mixed().nullable(),
  nid_back: yup.mixed().nullable(),
  delivery_method: yup.string().nullable(),
});

const AddMember = ({ existingData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [loading, setLoading] = useState(false); // Loading state to disable submit button

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: existingData || {},
  });

  useEffect(() => {
    if (existingData) {
      methods.reset(existingData); // Reset form to existing data
    }
  }, [existingData, methods]);

  const [files, setFiles] = useState({
    nid_front: null,
    nid_back: null,
    photo: null,
  });

  const [credentialType, setCredentialType] = useState('email');

  useEffect(() => {
    const email = methods.getValues('general_email') || '';
    const contact = methods.getValues('general_contact') || '';
    methods.setValue('login_credential', credentialType === 'email' ? email : contact);
  }, [credentialType, methods.watch('general_email'), methods.watch('general_contact')]);

  const handleFileDrop = (name, acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles((prev) => ({
        ...prev,
        [name]: acceptedFiles[0],
      }));
    } else {
      setFiles((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmitForm = (data) => {
    setLoading(true); // Disable submit button during submission

    const formData = {
      ...data,
      user: {
        email: data.login_credential,
      },
      files: {
        nid_front: files.nid_front,
        nid_back: files.nid_back,
        photo: files.photo,
      },
    };

    dispatch(addMember(formData))
    .unwrap()
    .then((response) => {
      setLoading(false); // Enable submit button once response is received
      if (response?.message) {
        Swal.fire({
          title: 'Success!',
          text: response.message, // Display success message from the backend
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/member-list'); // Redirect to list page after success
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    })
    .catch((error) => {
      setLoading(false); 
      Swal.fire({
        title: 'Error!',
        text: error.payload?.message || error.message || 'Failed to submit form',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  };

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="p-6 bg-white shadow-md rounded-md max-w-[1440px]">
      <h2 className="text-xl font-bold mb-4 text-primary text-center">
          {existingData ? 'Update Member' : 'Create Member'}
        </h2>
      <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
           <NavigationButton
                              to="/member-list"
                              variant="primary"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-blue-700 transition-colors"
                          >
                                                          <RiArrowLeftLine className="text-lg" />

                           Members List
                          </NavigationButton>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 py-2">Nid Front</label>
            <DropzoneComponent onFileDrop={handleFileDrop} name="nid_front" multiple={false} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 py-2">Member photo</label>
            <DropzoneComponent onFileDrop={handleFileDrop} name="photo" multiple={false} />
          </div>
          </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700 py-3">Nid Back</label>
            <DropzoneComponent onFileDrop={handleFileDrop} name="nid_back" multiple={false} />
          </div>
          <InputField icon={true} type="text" label="Full Name" name="full_name" />
          <InputField icon={true} type="number" label="General Contact" name="general_contact" />
          <InputField icon={true}  label="General Email" name="general_email" type="email" />
          <InputField icon={true} type="text" label="NID Number" name="nid_number" />
          <InputField icon={true}  label="About Us" name="about_us" type="textarea" />
          <InputField icon={true}  label="Facebook Profile" name="facebook_profile" type="url" />
          <InputField icon={true}  label="LinkedIn Profile" name="linkedin_profile" type="url" />
          <InputField icon={true} type="text" label="Permanent Address" name="permanent_address" />
          <InputField icon={true} type="text" label="Present Address" name="present_address" />
          <InputField icon={true} type="text" label="Occupation" name="occupation" />
          <InputField icon={true}  label="Gender" name="gender" type="select" options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 py-2">Login Credential Type</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="credentialType"
                  value="email"
                  checked={credentialType === 'email'}
                  onChange={() => setCredentialType('email')}
                /> Email
              </label>
              <label>
                <input
                  type="radio"
                  name="credentialType"
                  value="contact"
                  checked={credentialType === 'contact'}
                  onChange={() => setCredentialType('contact')}
                /> Contact
              </label>
            </div>
          </div>
          <InputField label="Login Credential"  icon={true} name="login_credential" disabled />
          
          <SubmitButton
            variant="primary"
            size="sm"
            width="w-[60%]"
            margin="mx-4"
            disabled={loading} // Disable button if loading
          >
            {loading ? (
              <span>Submitting...</span> // Show loading text while submitting
            ) : (
              <><FaSave /> Save Data</>
            )}
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddMember;












// import React, { useState, useEffect } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import InputField from './../../../../../Components/InputField/InputField';
// import DropzoneComponent from './../../../../../Components/InputField/DropzoneComponent/DropzoneComponent';
// import { SubmitButton } from './../../../../../Components/Buttons/SubmitButton';
// import { FaSave } from 'react-icons/fa';
// import { useDispatch } from "react-redux";
// import { addMember } from "../../../memberSlice/memberSlice";

// const schema = yup.object().shape({
//   full_name: yup.string().required('Full Name is required'),
//   general_contact: yup.string().required('General contact is required'),
//   general_email: yup.string().email('Invalid email').required('General email is required'),
//   nid_number: yup.string().required('NID Number is required'),
//   photo: yup.mixed().nullable(),
//   about_us: yup.string().nullable(),
//   facebook_profile: yup.string().url('Invalid URL').nullable(),
//   linkedin_profile: yup.string().url('Invalid URL').nullable(),
//   permanent_address: yup.string().required('Permanent address is required'),
//   present_address: yup.string().required('Present address is required'),
//   date_of_birth: yup.date().nullable(),
//   occupation: yup.string().nullable(),
//   gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid Gender').required('Gender is required'),
//   marital_status: yup.string().nullable(),
//   religion: yup.string().nullable(),
//   nid_front: yup.mixed().nullable(),
//   nid_back: yup.mixed().nullable(),
//   delivery_method: yup.string().nullable(),
//   login_credential: yup.string().required('Login Credential is required'),
// });

// const AddMember = ({ existingData }) => {
//   const dispatch = useDispatch();
//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: existingData || {},
//   });

//   useEffect(() => {
//     if (existingData) {
//       methods.reset(existingData);
//     }
//   }, [existingData, methods]);

//   const [files, setFiles] = useState({
//     nid_front: null,
//     nid_back: null,
//     photo: null,
//   });

//   const [credentialType, setCredentialType] = useState('email');

//   useEffect(() => {
//     const email = methods.getValues('general_email') || '';
//     const contact = methods.getValues('general_contact') || '';
//     methods.setValue('login_credential', credentialType === 'email' ? email : contact);
//   }, [credentialType, methods.watch('general_email'), methods.watch('general_contact')]);

//   const handleFileDrop = (name, acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       setFiles((prev) => ({ ...prev, [name]: acceptedFiles[0] }));
//     } else {
//       setFiles((prev) => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleSubmitForm = (data) => {
//     const formData = {
//       ...data,
//       files: {
//         nid_front: files.nid_front,
//         nid_back: files.nid_back,
//         photo: files.photo,
//       },
//     };
    
//     dispatch(addMember(formData))
//       .unwrap()
//       .then((response) => console.log("Success:", response.message))
//       .catch((error) => console.error("Submission Error:", error));
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="p-6 bg-white shadow-md rounded-md max-w-[1440px]">
//         <h2 className="text-xl font-bold mb-4 text-gray-700">
//           {existingData ? 'Update Member' : 'Create Member'}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 py-2">Login Credential Type</label>
//             <div className="flex gap-4">
//               <label>
//                 <input
//                   type="radio"
//                   name="credentialType"
//                   value="email"
//                   checked={credentialType === 'email'}
//                   onChange={() => setCredentialType('email')}
//                 /> Email
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="credentialType"
//                   value="contact"
//                   checked={credentialType === 'contact'}
//                   onChange={() => setCredentialType('contact')}
//                 /> Contact
//               </label>
//             </div>
//           </div>
//           <InputField label="Login Credential" name="login_credential" disabled />
//           <InputField icon={true} label="Full Name" name="full_name" />
//           <InputField icon={true} label="General Contact" name="general_contact" />
//           <InputField icon={true} label="General Email" name="general_email" type="email" />
//           <SubmitButton variant="primary" size="sm" width="w-[60%]" margin="mx-4">
//             <FaSave /> Save Data
//           </SubmitButton>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default AddMember;



// import React, { useState, useEffect } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import InputField from './../../../../../Components/InputField/InputField';
// import DropzoneComponent from './../../../../../Components/InputField/DropzoneComponent/DropzoneComponent';
// import { SubmitButton } from './../../../../../Components/Buttons/SubmitButton';
// import { FaSave } from 'react-icons/fa';
// import { useDispatch, useSelector } from "react-redux";
// import { addMember } from "../../../memberSlice/memberSlice";
// import DatePicker from "react-datepicker"; // Importing the date picker
// import "react-datepicker/dist/react-datepicker.css"; // Import the necessary CSS

// // Yup schema for validation
// const schema = yup.object().shape({
//   full_name: yup.string().required('Full Name is required'),
//   general_contact: yup.string().required('General contact is required'),
//   general_email: yup.string().email('Invalid email').required('General email is required'),
//   nid_number: yup.string().required('NID Number is required'),
//   photo: yup.mixed().nullable(),
//   about_us: yup.string().nullable(),
//   facebook_profile: yup.string().url('Invalid URL').nullable(),
//   linkedin_profile: yup.string().url('Invalid URL').nullable(),
//   permanent_address: yup.string().required('Permanent address is required'),
//   present_address: yup.string().required('Present address is required'),
//   date_of_birth: yup.date().required('Date of Birth is required'),
//   occupation: yup.string().nullable(),
//   gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid Gender').required('Gender is required'),
//   marital_status: yup.string().nullable(),
//   religion: yup.string().nullable(),
//   nid_front: yup.mixed().nullable(),
//   nid_back: yup.mixed().nullable(),
//   delivery_method: yup.string().nullable(),
// });

// const AddMember = ({ existingData, onSubmit }) => {
//   const [startDate, setStartDate] = useState(new Date());

//   const dispatch = useDispatch(); // Correctly use dispatch hook

//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: existingData || {}, // Load existing data for edit mode
//   });

//   useEffect(() => {
//     if (existingData) {
//       methods.reset(existingData); // Reset form to existing data
//     }
//   }, [existingData, methods]);

//   const [files, setFiles] = useState({
//     nid_front: null,
//     nid_back: null,
//     photo: null,
//   });

//   const handleFileDrop = (name, acceptedFiles) => {
//     console.log('Files dropped for', name, acceptedFiles); // Debugging log
//     if (acceptedFiles.length > 0) {
//       setFiles((prev) => ({
//         ...prev,
//         [name]: acceptedFiles[0], // Set first file for single file upload
//       }));
//     } else {
//       // Handle the case where files are removed (empty array passed)
//       setFiles((prev) => ({
//         ...prev,
//         [name]: null,
//       }));
//     }
//   };

//   // State to hold the selected date


//   // Handle date change

//   // Adding custom user data to the form submission
//   const user = {
//     email: "gariner.info@gmail.com",  // Your custom user data
//   };

//   const handleSubmitForm = (e, data, files, dispatch, onSubmit) => {
//     const formData = {
//       ...data,
//       date_of_birth: dob,  // Include the selected date
//       user: user, // Add the custom user data
//     };
//     dispatch(addMember(formData)).then(() => {
//       console.log("Form submitted successfully");
//     });
//     console.log("Form Data with Files and User:", formData);
//     onSubmit(formData);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="p-6 bg-white shadow-md rounded-md max-w-[1440px]">
//         <h2 className="text-xl font-bold mb-4 text-gray-700">
//           {existingData ? 'Update Member' : 'Create Member'}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 py-2">Nid Front</label>
//             <DropzoneComponent onFileDrop={handleFileDrop} name="nid_front" multiple={false}   accept="image/jpeg, image/png" // Restricting to valid image file types
// />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 py-2">Member photo</label>
//             <DropzoneComponent onFileDrop={handleFileDrop} name="photo" multiple={false}   accept="image/jpeg, image/png" // Restricting to valid image file types
// />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 py-2">Nid Back</label>
//             <DropzoneComponent onFileDrop={handleFileDrop} name="nid_back" multiple={false}   accept="image/jpeg, image/png" // Restricting to valid image file types
// />
//           </div>
          // <InputField icon={true} label="Full Name" name="full_name" />
          // <InputField icon={true} label="General Contact" name="general_contact" />
          // <InputField icon={true} label="General Email" name="general_email" type="email" />
          // <InputField icon={true} label="NID Number" name="nid_number" />
          // <InputField icon={true} label="About Us" name="about_us" type="textarea" />
          // <InputField icon={true} label="Facebook Profile" name="facebook_profile" type="url" />
          // <InputField icon={true} label="LinkedIn Profile" name="linkedin_profile" type="url" />
          // <InputField icon={true} label="Permanent Address" name="permanent_address" />
          // <InputField icon={true} label="Present Address" name="present_address" />
//           <div>
//             <label className="block text-sm font-medium text-gray-700 py-2">Date of Birth</label>
//             {/* <DatePicker
//               selected={dob}
//               onChange={handleDateChange}
//               dateFormat="yyyy-MM-dd" // Set format to YYYY-MM-DD
//               name="date_of_birth" // Added name attribute for the date picker
//               className="w-full p-2 border border-gray-300 rounded-md"
//             /> */}
//          {/* <DatePicker selected={startDate}  name="date_of_birth" onChange={(date) => setStartDate(date)} />; */}
//           </div>
//           <InputField icon={true} label="Occupation" name="occupation" />
//           <InputField icon={true} label="Gender" name="gender" type="select" options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]} />
//           <SubmitButton variant="primary" size="sm" width="w-[60%]" margin="mx-4">
//             <FaSave />
//             Save Data
//           </SubmitButton>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default AddMember;
