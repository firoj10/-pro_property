import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaTimesCircle } from 'react-icons/fa';

const DropzoneComponent = ({ onFileDrop, name, multiple }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    console.log('Accepted Files:', acceptedFiles); // Debugging log

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result); // Store base64 image data
          onFileDrop(name, acceptedFiles); // Pass the files to the parent component
        };
        reader.readAsDataURL(file); // Convert image to base64
      } else {
        alert('Please upload a valid image.');
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Clear the selected file in the local state
    onFileDrop(name, []); // Pass an empty array to the parent to clear the file
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple, // Allow multiple files if required
  });

  return (
    <div className="mb-4 relative">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer">
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-primary text-4xl" />
        <p className="text-primary mt-2">Drag and drop an image here, or click to select one.</p>
      </div>

      {selectedFile && (
        <div className="image-preview mt-4 relative">
          <img src={selectedFile} alt="Selected" className="w-20 h-26 object-cover rounded-md" />
          
          {/* Cross button to remove image */}
          <button
            onClick={handleRemoveFile} // Remove the selected file
            className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-lg"
          >
            <FaTimesCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default DropzoneComponent;
