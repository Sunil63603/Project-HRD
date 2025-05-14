import React from "react";

//TS interfaces
import { JobData } from "../../createJobPosting/page";
import JobCardClientComp from "./(JobCardClientComp)/JobCardClientComp";

const JobCard: React.FC<{
  job: JobData;
  onDelete: (id: string | undefined) => Promise<void>;
}> = ({ job, onDelete }) => {
  return (
    <div
      className="border border-gray-300  rounded-2xl p-4 bg-gray-100 shadow-md transition-transform duration-200 hover:translate-y-1"
      key={job.companyName}
    >
      <h4 className="text-lg font-bold mb-2">{job.companyName}</h4>
      <p className="mb-2">
        <strong>Job Title:{job.jobDescription}</strong>
      </p>
      <p className="mb-2">
        <strong>Eligibility:{job.eligibility}</strong>
      </p>
      <JobCardClientComp job={job} onDelete={onDelete}></JobCardClientComp>
    </div>
  );
};

export default JobCard;
