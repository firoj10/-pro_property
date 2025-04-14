import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import SingleImageUpload from "../../utils/SingleImageUpload";
import { Div } from "../Ui/Div";
import DottedNidBox from "../ImageBox/DottedNidBox";
import ErrorMessage from "../MessageBox/ErrorMessage";

const FileComponents = ({
  onFileChange,
  savedFront,
  savedBack,
  allowedTypes,
  errorMessage = "Please upload a valid image"
}) => {
  // Initialize state from props so that data persists
  const [file1, setFile1] = useState(savedFront || "");
  const [file2, setFile2] = useState(savedBack || "");
  const [file1error, setFile1error] = useState("");
  const [file2error, setFile2error] = useState("");

  // If parent updates, update our local state accordingly
  useEffect(() => {
    setFile1(savedFront);
  }, [savedFront]);

  useEffect(() => {
    setFile2(savedBack);
  }, [savedBack]);

  // File 1 change handler
  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file && !allowedTypes.includes(file.type)) {
      setFile1error(errorMessage);
      setFile1(""); // Clear the previous file if invalid
      return; // Stop further processing
    }

    setFile1error(""); // Clear error message
    setFile1(file);
    onFileChange("nid_front", file);
  };

  // File 2 change handler
  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file && !allowedTypes.includes(file.type)) {
      setFile2error(errorMessage);
      setFile2(""); // Clear the previous file if invalid
      return; // Stop further processing
    }

    setFile2error(""); // Clear error message
    setFile2(file);
    onFileChange("nid_back", file);
  };

  const removeFile1 = () => {
    setFile1("");
    onFileChange("nid_front", null);
  };

  const removeFile2 = () => {
    setFile2("");
    onFileChange("nid_back", null);
  };

  return (
    <Div className="flex justify-between gap-3 py-2">
      <Div className="flex justify-center gap-2 pb-5 lg:w-[687px]">
        <Div className="profile-picture flex flex-col items-center space-4 px-5 border border-dashed ">
          {file1error && <ErrorMessage message={file1error} />}
          <label htmlFor="nidFront" className="cursor-pointer">
            <Div className="my-[20px] flex justify-center items-center">
              {file1 ? (
                <Div className="relative py-1">
                  <SingleImageUpload
                    file={file1}
                    altImg="./nid.png"
                    customClass="member_doc"
                  />
                  <button
                    onClick={removeFile1}
                    className="absolute top-0 right-0 p-1 rounded-full bg-primary text-white"
                  >
                    <RxCross2 />
                  </button>
                </Div>
              ) : (
                <DottedNidBox title="NID Front Side"></DottedNidBox>
              )}
            </Div>

            <Div className="my-[10px]">
              <label
                htmlFor="nid_front"
                className="cursor-pointer bg-[#3C9D9B] text-white py-2 px-4 rounded w-full"
              >
                {file1 ? "Change NID Front" : "Upload NID Front"}
              </label>
              <input
                id="nid_front"
                type="file"
                accept={allowedTypes.join(",")}
                className="hidden"
                onChange={handleFileChange1}
              />
            </Div>
          </label>
        </Div>

        <Div className="profile-picture flex flex-col items-center space-4 px-5 border border-dashed ">
          {file2error && <ErrorMessage message={file2error} />}
          <label htmlFor="nidBack" className="cursor-pointer">
            <Div className="my-[20px] flex justify-center items-center">
              {file2 ? (
                <Div className="relative py-1">
                  <SingleImageUpload
                    file={file2}
                    altImg="./nid2.png"
                    customClass="member_doc"
                  />
                  <button
                    onClick={removeFile2}
                    className="absolute top-0 right-0 p-1 rounded-full bg-primary text-white"
                  >
                    <RxCross2 />
                  </button>
                </Div>
              ) : (
                <DottedNidBox title=" NID Back Side"></DottedNidBox>
              )}
            </Div>
            <Div className="my-[10px]">
              <label
                htmlFor="nid_back"
                className="cursor-pointer bg-[#3C9D9B] text-white py-2 px-4 rounded w-full"
              >
                {file2 ? "Change NID Back" : "Upload NID Back"}
              </label>
              <input
                id="nid_back"
                type="file"
                accept={allowedTypes.join(",")}
                className="hidden"
                onChange={handleFileChange2}
              />
            </Div>
          </label>
        </Div>
      </Div>
    </Div>
  );
};

export default FileComponents;
