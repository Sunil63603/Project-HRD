// src/components/JobCard.jsx
import React, { useState } from "react";
// import "./JobCard.css"; // Import the same CSS for styling

const JobCard = ({ job, onDelete }) => {
  // state for displaying the full text or truncated text
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div
      className="border border-gray-300 rounded-2xl p-4 bg-gray-100 shadow-md transition-transform duration-200 hover:-translate-y-1"
      key={job.companyName}
    >
      <h4 className="text-lg font-bold mb-2">{job.companyName}</h4>
      <p className="mb-2">
        <strong>Job Title : {job.jobDescription}</strong>
      </p>
      <p className="mb-2">
        <strong>Eligibility : {job.eligibility}</strong>
      </p>

      <p className="mb-2 break-words whitespace-pre-wrap w-full overflow-hidden">
        <strong>Additional Details : </strong>{" "}
        {showFullText
          ? job.additionalDetails
          : job.additionalDetails.length > 20
          ? `${job.additionalDetails.substring(0, 10)}`
          : job.additionalDetails}
        {job.additionalDetails.length > 20 && (
          <a
            className="text-blue-600 font-semibold cursor-pointer inline-block"
            onClick={toggleShowMore}
          >
            {showFullText ? "Read Less..." : "...Read More"}
          </a>
        )}
      </p>

      <button
        className="inline-flex items-center bg-blue-600 text-white px-4 py-2 text-base font-semibold rounded-full cursor-pointer shadow-md transition-all duration-300 hover:bg-blue-800 hover:shadow-lg"
        onClick={() => onDelete(job.companyName)}
      >
        Delete
      </button>
    </div>
  );
};

export default JobCard;
