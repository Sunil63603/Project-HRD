import React, { useState } from "react";

const ResumeUploader = () => {
  const [resumeList, setResumeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setResumeList(fileArray);
    setCurrentIndex(0); // Set the first resume to be shown
  };

  // Function to navigate resumes
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < resumeList.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  return (
    <div>
      <h2>Resume Uploader</h2>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
      />
      {resumeList.length > 0 && (
        <div>
          <embed
            src={resumeList[currentIndex]}
            type="application/pdf"
            width="100%"
            height="600px"
          />
          <div>
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === resumeList.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
