// src/components/ApplyForJob.jsx
// importing react to use the components based architecture and needed to interpret JSX and in React 17 not needed.

import React, { useEffect, useState } from "react";
// importing the component JobCard that us used in this componenet.
import JobCard from "./JobCard/JobCard";
import "./CompaniesList.css"; // Import the CSS file for standard styling
let data;
const CompaniesList = () => {
  // the Previous jobs which are present in the .json file that is fetched and stored in the jobs(state) and then that are used to display in the UI..
  const [jobs, setJobs] = useState([]);

  // Fetch job postings from JSON server.
  const fetchJobs = async () => {
    // Fetch job postings from the server.
    try {
      //the response is the variable that will be having the object which is stored in the .json file...
      const response = await fetch("http://localhost:3000/jobs", {
        // GET method will fetch the data which is present in .json file
        method: "GET",
        // the data will be in .json form.
        headers: {
          "Content-Type": "application/json",
        },
      });

      // the data which is fetched it will be in the form of the string..
      // the data which is in the form of the string that is converted into the json form to get the data and then it can be used in the UI, bcz we cannot use the string easily.
      data = await response.json();

      // Sort by id in descending order
      // tyo show the data in the form that the latest one  should be first then the older one....usus
      const sortedJobs = data.reverse();

      // set the Jobs.
      // if new jobs are added then the new jobs are added in the state Jobs.
      setJobs(sortedJobs);
    } catch (error) {
      // Handle's the error.
      console.error("Error fetching jobs:", error);
    }
  };

  // Delete job posting from JSON server
  const handleDelete = async (id) => {
    try {
      // based on the id the jobs are deleted.
      // if we click the delete Jobs(Companies) btn then that particular job's id passed in this function that particular Job is deleted from the .json file
      const response = await fetch(`http://localhost:3000/jobs/${id}`, {
        // Pass the ID in the URL so that particular ID job will get deleted..
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Sort by id in descending order
      const sortedJobs = data.reverse();

      // if we delete the Jobs that particular job is deleted from the .json file but that particular job is not deleted form the jobs array (state) so to delete that job from the state we use the filter method to update that particular Jobs state.

      setJobs(sortedJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
    fetchJobs();
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, [jobs]);

  return (
    <div className="companies-list">
      <h2>Companies</h2>
      <div className="job-list">
        {jobs.map((job) => (
          // imported component below.
          <JobCard key={job.id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
