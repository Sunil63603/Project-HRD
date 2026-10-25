// src/components/ApplyForJob.jsx
// importing react to use the components based architecture and needed to interpret JSX and in React 17 not needed.

import React, { useEffect, useState } from "react";
// importing the component JobCard that us used in this componenet.
import JobCard from "./JobCard/JobCard";
import "./CompaniesList.css"; // Import the CSS file for standard styling

// importing the PopUpToast component to show the toast message when the job is deleted.
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

const CompaniesList = () => {
  // the Previous jobs which are present in the .json file that is fetched and stored in the jobs(state) and then that are used to display in the UI..
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();

      setJobs(
        data.reverse().map((job) => ({
          ...job,
          id: job._id,
        })),
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((job) => job.id !== id));

      PopUpToast.success("Job Deleted Successfully");
    } catch (error) {
      console.error(error);
      PopUpToast.error("Failed to delete job");
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);
  //here no need to use setInterval because , when HR posts a job and if he visits 'companies' component to ensure latest job is posted , then it will be updated . because visiting this components triggers component mount.

  return (
    <div className="companies-list">
      <h2>Companies</h2>
      <div className="job-list">
        {jobs.length === 0 ? (
          <div>No Companies/Jobs</div>
        ) : (
          jobs.map((job) => (
            // imported component below.
            <JobCard
              key={job.id}
              job={job}
              onDelete={() => handleDelete(job.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
