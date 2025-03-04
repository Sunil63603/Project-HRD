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

  // Fetch job postings from JSON server.
  // const fetchJobs = async () => {
  //   // Fetch job postings from the server.
  //   try {
  //     //the response is the variable that will be having the object which is stored in the .json file...
  //     const response = await fetch("http://localhost:3000/jobs", {
  //       // GET method will fetch the data which is present in .json file
  //       method: "GET",
  //       // the data will be in .json form.
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // the data which is fetched it will be in the form of the string..
  //     // the data which is in the form of the string that is converted into the json form to get the data and then it can be used in the UI, bcz we cannot use the string easily.

  //     const res = await response.json();

  //     // Sort by id in descending order
  //     // to show the data in the form that the latest one  should be first then the older one....usus

  //     const sortedJobs = res.reverse(); // Sort by id in descending order

  //     // set the Jobs.
  //     // if new jobs are added then the new jobs are added in the state Jobs.
  //     setJobs(sortedJobs);
  //   } catch (error) {
  //     // Handle's the error.
  //     console.error("Error fetching jobs:", error);
  //   }
  // };

  const fetchJobs = async () => {
    // Fetch job postings from the server.
    try {
      // the response is the variable that will be having the object which is stored in the .json file...
      const response = await fetch(
        "https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json",
        {
          // GET method will fetch the data which is present in .json file
          method: "GET",
          // the data will be in .json form.
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      // the data which is fetched it will be in the form of the string..
      // the data which is in the form of the string that is converted into the json form to get the data and then it can be used in the UI, bcz we cannot use the string easily.
      let data = await response.json();

      let jobsArray;
      if (data !== null) {
        //if there are no jobs , then data is empty.
        //convert the fetched data into array of jobs
        jobsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }

      // Sort by id in descending order
      // to show the data in the form that the latest one should be first then the older one....usus
      // Check if the record contains jobs data.
      if (response.ok && data !== null) {
        // Sort by id in descending order
        // to show the data in the form that the latest one should be first then the older one....usus
        const sortedJobs = jobsArray.reverse(); // Sort by id in descending order

        // set the Jobs.
        // if new jobs are added then the new jobs are added in the state Jobs.
        setJobs(sortedJobs);
      } else {
        console.error(
          "Jobs data not found in the firebase response orelse , there are no jobs"
        );
        setJobs([]);
      }
    } catch (error) {
      // Handle's the error.
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // based on the id the jobs are deleted.
      // if we click the delete Jobs(Companies) btn then that particular job's id passed in this function that particular Job is deleted from the .json file
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs/${id}.json`,
        {
          // Pass the ID in the URL so that particular ID job will get deleted..
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // // if we delete the Jobs that particular job is deleted from the .json file but that particular job is not deleted form the jobs array (state) so to delete that job from the state we use the filter method to update that particular Jobs state.
      // const updatedJobs = jobs.filter((job) => job.id !== id);

      // const updatedResponse = await fetch(
      //   `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(updatedJobs),
      //   }
      // );

      // if (!updatedResponse.ok) {
      //   throw new Error(`Error updating data:${updatedResponse.status}`);
      // }

      // setJobs(updatedJobs);
      PopUpToast.success("Job Deleted Successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      PopUpToast.error("Failed to delete job");
    }
    fetchJobs();
  };

  // Delete job posting from JSON server
  /*
  const handleDelete = async (idcompanyName) => {
    try {
      // Fetch the latest data from JSONBin
      const fetchResponse = await fetch(
        "https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9/latest",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!fetchResponse.ok) {
        throw new Error(`Error fetching data: ${fetchResponse.status}`);
      }

      const fetchData = await fetchResponse.json();
      console.log(fetchData);
      const currentData = fetchData.record || {};

      // Ensure jobs exist before filtering
      if (!Array.isArray(currentData.jobs)) {
        throw new Error("Jobs data is missing or invalid.");
      }

      // Filter out the job with the specific ID
      const updatedJobs = currentData.jobs.filter(
        (job) => job.companyName !== idcompanyName
      );

      // Ensure other properties remain intact while updating only jobs
      const updatedData = {
        ...currentData, // Retain existing properties
        jobs: updatedJobs, // Update jobs list
      };

      // Update JSONBin with the modified data
      const updateResponse = await fetch(
        "https://api.jsonbin.io/v3/b/6795e1b6ad19ca34f8f48af9",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Error updating data: ${updateResponse.status}`);
      }
      // to correct the jobs , based on the applied date that is from the first to last
      fetchJobs();

      // Update local state
      setJobs(updatedJobs);
      PopUpToast.success("Job Deleted Successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      PopUpToast.error("Failed to delete job");
    }
  };
  */

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);
  //here no need to use setInterval because , when HR posts a job and if he visits 'companies' component to ensure latest job is posted , then it will be updated . because visiting this components triggers component mount.

  return (
    <div className="companies-list">
      <h2>Companies</h2>
      <div className="job-list">
        {jobs.map((job) => (
          // imported component below.
          <JobCard
            key={job.id}
            job={job}
            onDelete={() => handleDelete(job.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
