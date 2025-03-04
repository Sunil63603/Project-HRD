//this component is rendered when user clicks on jobs button which is present in the topFixedBar.
import React from "react";
import { useState, useEffect } from "react";
import "./JobSection.css"; //Add your styling for Jobs.

import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";
import { useGlobalContext } from "../../context/GlobalContext";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);

  const { pollingInterval } = useGlobalContext();

  // Fetch job postings from JSON server.
  const fetchJobs = async () => {
    // Fetch job postings from the server.
    // try {
    //   //the response is the variable that will be having the object which is stored in the .json file...
    //   const response = await fetch("http://localhost:3000/jobs", {
    //     // GET method will fetch the data which is present in .json file
    //     method: "GET",
    //     // the data will be in .json form.
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   // the data which is fetched it will be in the form of the string..
    //   // the data which is in the form of the string that is converted into the json form to get the data and then it can be used in the UI, bcz we cannot use the string easily.
    //   const data = await response.json();

    //   // Sort by id in descending order
    //   // tyo show the data in the form that the latest one  should be first then the older one....usus
    //   const sortedJobs = data.reverse();

    //   if (JSON.stringify(sortedJobs) !== JSON.stringify(jobs)) {
    //     // set the Jobs.
    //     // if new jobs are added then the new jobs are added in the state Jobs.
    //     setJobs(sortedJobs);
    //   }
    // } catch (error) {
    //   // Handle's the error.
    //   console.error("Error fetching jobs:", error);
    // }

    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json`
      );

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
