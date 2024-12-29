// src/components/JobCard.jsx
import React, { useState } from "react";
import "./JobCard.css"; // Import the same CSS for styling

const JobCard = ({ job, onDelete }) => {
  // state for displaying the full text or truncated text
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="job-card">
      <h4>{job.companyName}</h4>
      <p>
        <strong>Job Title : {job.jobDescription}</strong>
      </p>
      <p>
        <strong>Eligibility : {job.eligibility}</strong>
      </p>

      <p>
        <strong>Additional Details : </strong>{" "}
        {showFullText
          ? job.additionalDetails
          : job.additionalDetails.length > 20
          ? `${job.additionalDetails.substring(0, 10)}`
          : job.additionalDetails}
        {job.additionalDetails.length > 20 && (
          <a className="showMore" onClick={toggleShowMore}>
            {showFullText ? " ...Read Less" : "Read More..."}
          </a>
        )}
      </p>

      <button className="delete-button" onClick={() => onDelete(job.id)}>
        Delete
      </button>
    </div>
  );
};

export default JobCard;
