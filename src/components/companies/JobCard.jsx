// src/components/JobCard.jsx
import React from "react";
import "./companies_list.css"; // Import the same CSS for styling

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p>{job.jobDescription}</p>
      <p>
        <strong>Eligibility:</strong> {job.eligibility}
      </p>

      <button className="delete-button" onClick={() => onDelete(job.id)}>
        Delete
      </button>
    </div>
  );
};

export default JobCard;
