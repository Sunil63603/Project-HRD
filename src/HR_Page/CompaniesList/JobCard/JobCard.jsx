// src/components/JobCard.jsx
import React from "react";
import "./JobCard.css"; // Import the same CSS for styling

const JobCard = ({ job, onDelete }) => {
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
        <strong>Additional Details : </strong> {job.additionalDetails}
      </p>

      <button className="delete-button" onClick={() => onDelete(job.id)}>
        Delete
      </button>
    </div>
  );
};

export default JobCard;
