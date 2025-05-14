"use client"; //useState is used to store fetched jobs and to 'show full text'.

import { useState, useEffect } from "react";
//useState is to store fetched jobs and to 'show full text(ie.additional details)'
//useEffect is to fetch jobs from database.

//to get the 'pollingInterval'.
import useCohortStore from "@/store/cohortStore";

//TS interfaces,type-aliases and imports.
import { JobData } from "@/app/hr/createJobPosting/(createJobPostingClientComp)/createJobPostingClientComp";

const JobSectionClientComp = () => {
  const [jobs, setJobs] = useState<JobData[]>([]); //array of job-opportunities posted by HR

  //state for displaying full text or truncated text.
  const [showFullText, setShowFullText] = useState<boolean>(false);

  //This data is fetched from zustand store.
  const pollingInterval: number = useCohortStore(
    (state: { pollingInterval: number }) => state.pollingInterval
  );

  const toggleShowMore = (): void => {
    setShowFullText(!showFullText);
  };

  //Fetch job postings from firebase.
  const fetchJobs = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json`
      );

      if (!response.json) {
        throw new Error("Failed to fetch jobs data");
      }

      let data = await response.json();
      data = Object.values(data);

      //extract jobs array from firebase.
      const jobsData: JobData[] = data || [];

      //sort by 'id' in descending order . LIFO(just like stack)
      const sortedJobs = jobsData.reverse();

      if (JSON.stringify(sortedJobs) !== JSON.stringify(jobs)) {
        setJobs(sortedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  //fetch jobs when the component mounts
  useEffect(() => {
    //fetch jobs initially
    fetchJobs();

    //polling mechanism
    const intervalID = setInterval(() => {
      fetchJobs();
    }, pollingInterval); //polling for every 'x' seconds

    //clean-up interval on component unmount
    return () => clearInterval(intervalID);
  }, [jobs]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {jobs.map((job: JobData, index: number) => (
          <div
            className="border border-gray-300 rounded-2xl p-4 bg-gray-100 shadow-md transition-transform duration-200 hover:translate-y-1"
            key={index}
          >
            <h4 className="text-lg font-bold mb-2">{job.companyName}</h4>
            <p className="mb-2">
              <strong>Job Title:{job.jobDescription}</strong>
            </p>
            <p className="mb-2">
              <strong>Eligibility:{job.eligibility}</strong>
            </p>

            <p className="mb-2 break-words whitespace-pre-wrap w-full overflow-hidden">
              <strong>Additional Details:</strong>{" "}
              {showFullText
                ? job.additionalDetails
                : job.additionalDetails.length > 20
                ? `${job.additionalDetails.substring(0, 10)}`
                : job.additionalDetails}
              {job.additionalDetails.length > 20 && (
                <a
                  className="text-blue-600 font-semibold cursor-pointer inline-block"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    toggleShowMore()
                  }
                >
                  {showFullText ? "Read less.." : "...Read more"}
                </a>
              )}
            </p>

            <a
              className="inline-flex items-center bg-green-400 text-white px-4 py-2 text-base font-semibold rounded-full cursor-pointer shadow-md transition-all duration-300 hover:bg-green-500 hover:shadow-lg"
              href={job.applyLink}
              target="_blank"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobSectionClientComp;
