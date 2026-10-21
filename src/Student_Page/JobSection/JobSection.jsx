//this component is rendered when user clicks on jobs button which is present in the topFixedBar.
import React from "react";
import { useState, useEffect } from "react";
import "./JobSection.css"; //Add your styling for Jobs.

import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
import { useGlobalContext } from "../../context/GlobalContext";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);

  const { pollingInterval } = useGlobalContext();

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs data");
      }

      let data = await response.json();
      data = Object.values(data);

      // Extract jobs array from JSONBin response
      const jobsData = data || [];

      // Sort by id in descending order
      const sortedJobs = jobsData.reverse();

      if (JSON.stringify(sortedJobs) !== JSON.stringify(jobs)) {
        setJobs(sortedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    //fetch jobs initially
    fetchJobs();

    //polling mechanism
    const intervalId = setInterval(() => {
      fetchJobs();
    }, pollingInterval); //polling for every 'x' seconds

    //cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [jobs]);

  return (
    <div className="companies-list">
      <h2 className="component-name">Jobs/Oppurtunities</h2>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
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

            <a className="apply-button" href={job.applyLink} target="_blank">
              Apply
            </a>

            {/* students should not be able to delete it. */}
            {/* <button className="delete-button" onClick={() => onDelete(job.id)}>
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSection;
