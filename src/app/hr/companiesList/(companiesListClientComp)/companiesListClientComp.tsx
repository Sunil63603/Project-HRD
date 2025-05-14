"use client"; //this is a client component because we are using useState react hook.

import React, { useEffect, useState } from "react";
//useState is used to store list of all jobs/companies.
//useEffect is used to fetch jobs/companies list.

//importing the PopUpToastProvider component to show the toast message when a job is deleted.
import PopUpToastProvider from "../../../components/PopUpToastProvider";

//importing the component JobCard that is used in this component.
import JobCard from "../(JobCard)/page";

//TS interfaces
import { JobData } from "../../createJobPosting/page";

const CompaniesListClientComp: React.FC = () => {
  //existing jobs which are present in the firebase are fetched and stored in the jobs(state variable) and then that are used to display in the UI.
  const [jobs, setJobs] = useState<JobData[]>([]);
  //JobData is imported from 'CreateJobPosting' functional component.

  const fetchJobs = async (): Promise<void> => {
    //Fetch job postings from the server.
    try {
      //the response is the variable storing promise of the fetching operation.
      const response = await fetch(
        "https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json",
        {
          //GET method will fetch the data which is present in firebase.
          method: "GET",
          //the data will be in .json form
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      //the data which is fetched, will be in the form of string.
      //the data which is in the form of string is converted into json format and then it can be used in the UI,because we cannot use strings easily.
      let data: Record<string, any> = await response.json();
      //in the above line,can i write 'JobData[]' instead of 'Record<string,any>'

      let jobsArray: JobData[] = []; //if you dont initialize here,then you would get TS error.
      if (data !== null) {
        //if there are no jobs,then data is empty.
        //convert the fetched data into array of jobs
        jobsArray = Object.keys(data).map((key) => ({
          id: key, //key is nothing but index.
          ...data[key], //spread data at this index 'key'.
        }));
      }

      //sort by id in descending order
      //to show the data in a format that the latest one should be at first of the list and then the older one.(just like stack LIFO)
      //check if the record contains jobs data.
      if (response.ok && data !== null) {
        //sort by id in descending order
        const sortedJobs: JobData[] = jobsArray.reverse();

        //set the jobs.
        //if new jobs are added then the new jobs will be updated into the state 'jobs'.
        setJobs(sortedJobs);
      } else {
        console.error(
          "Jobs data not found in the firebase response orelse,there are no jobs"
        );
        setJobs([]);
      }
    } catch (error) {
      //Handles the error.
      console.error("Error fetching jobs:", error);
    }
  };

  //returns a promise and might return nothing as well(hence void)
  const handleDelete = async (id: string | undefined): Promise<void> => {
    try {
      //based on the 'id', the jobs are deleted.
      //if we click the delete jobs(companies) btn then that particular job's id passed in this function . That particular job is deleted from firebase database.
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs/${id}.json`,
        {
          //Pass the ID in the URL  so that particular ID job will get deleted.
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error!status:${response.status}`);
      }

      PopUpToastProvider.success("Job Deleted Successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      PopUpToastProvider.error("Failed to delete job");
    }
    fetchJobs();
  };

  //fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);
  //here no need to use setInterval because,when HR posts a job and if he visits 'companies' component to ensure latest job is posted,then it will be updated.Because visiting this component triggers component mount.

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.map((job: JobData) => (
          //imported component below
          <JobCard
            key={job.id}
            job={job}
            onDelete={() => handleDelete(job.id)}
          ></JobCard>
        ))}
      </div>
    </>
  );
};

export default CompaniesListClientComp;
