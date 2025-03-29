// src/components/ApplyForJob.jsx
// importing react to use the components based architecture and needed to interpret JSX and in React 17 not needed.

import React, { useEffect, useState } from "react";
// importing the component JobCard that us used in this componenet.
import JobCard from "./JobCard/JobCard";
// import "./CompaniesList.css"; // Import the CSS file for standard styling

// importing the PopUpToast component to show the toast message when the job is deleted.
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

//TS interfaces
import { JobData } from "../CreateJobPosting/CreateJobPosting";

const CompaniesList: React.FC = () => {
  // the Previous jobs which are present in the .json file that is fetched and stored in the jobs(state) and then that are used to display in the UI..
  const [jobs, setJobs] = useState<JobData[]>([]);
  //FormData is imported from 'CreateJobPosting' fuctional component.

  const fetchJobs = async (): Promise<void> => {
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
      // the data which is in the form of the string that is converted into the json format to get the data and then it can be used in the UI, bcz we cannot use the string easily.
      let data: Record<string, any> = await response.json();
      //in the above line, can i write 'FormData[]' instead of 'Record<string,any>'

      let jobsArray: JobData[] = []; //if you dont initialize here,then you would get TS error.
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
        const sortedJobs: JobData[] = jobsArray.reverse(); // Sort by id in descending order

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

  //returns a promise and returns nothing as value(hence void)
  const handleDelete = async (id: string | undefined): Promise<void> => {
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

      PopUpToast.success("Job Deleted Successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      PopUpToast.error("Failed to delete job");
    }
    fetchJobs();
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);
  //here no need to use setInterval because , when HR posts a job and if he visits 'companies' component to ensure latest job is posted , then it will be updated . because visiting this components triggers component mount.

  return (
    <div className="px-5 py-6 max-w-6xl mx-auto">
      <h2 className="mt-2 mb-5 text-2xl font-semibold">Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((job: JobData) => (
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
