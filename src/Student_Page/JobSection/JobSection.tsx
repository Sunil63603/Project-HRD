//this component is rendered when user clicks on jobs button which is present in the topFixedBar.
import React from "react";
import { useState, useEffect } from "react";
import "./JobSection.css"; //Add your styling for Jobs.

import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

import useCohortStore from "../../store/cohortStore";

//TS interfaces,type-aliases and imports
import { JobData } from "../../HR_Page/CreateJobPosting/CreateJobPosting";

const JobSection = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);

  //state for displaying full text or truncated text
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const toggleShowMore = (): void => {
    setShowFullText(!showFullText);
  };

  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  // Fetch job postings from JSON server.
  const fetchJobs = async (): Promise<void> => {
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
      const jobsData: JobData[] = data || [];

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
    console.log("hi from JobSection");

    //polling mechanism
    const intervalId = setInterval(() => {
      fetchJobs();
    }, pollingInterval); //polling for every 'x' seconds

    //cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [jobs]);

  return (
    <div className="flex-1 w-full p-5 bg-gray-200 rounded-2xl overflow-y-auto h-[80vh] max-h-screen border-1 border-gray-300 shadow-md">
      <h2 className="component-name">Jobs/Opportunities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {jobs.map((job: JobData, index: number) => (
          <div
            className="flex flex-col justify-center items-center w-[350px] h-[250px] border border-gray-300 rounded-2xl p-1 bg-gray-100 shadow-sm transition-transform duration-200 hover:transform hover:translate-y-[-5px]"
            key={index}
          >
            <h4>{job.companyName}</h4>
            <p>
              <strong>Job Title : {job.jobDescription}</strong>
            </p>
            <p>
              <strong>Eligibility : {job.eligibility}</strong>
            </p>

            <p className="mb-2 break-words whitespace-pre-wrap w-full overflow-hidden">
              <strong>Additional Details : </strong>
              {showFullText
                ? job.additionalDetails
                : job.additionalDetails.length > 20
                ? `${job.additionalDetails.substring(0, 10)}`
                : job.additionalDetails}
              {job.additionalDetails.length > 20 && (
                <a
                  className="text-blue-600 font-semibold cursor-pointer inline-block"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    toggleShowMore
                  }
                >
                  {showFullText ? "Read Less..." : "...Read More"}
                </a>
              )}
            </p>

            <a
              className="bg-green-500 text-white border-none p-2.5 px-5 rounded-full cursor-pointer transition-colors duration-200 hover:bg-green-600"
              href={job.applyLink}
              target="_blank"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSection;
