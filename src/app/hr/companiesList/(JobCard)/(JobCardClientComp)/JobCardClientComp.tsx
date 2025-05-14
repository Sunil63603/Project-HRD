"use client"; //this is a client component because 'useState' react hook is used.

import { JobData } from "@/app/hr/createJobPosting/page";
import React, { useState } from "react";
//useState is used to track whether particular job card needs to be extended or not.

const JobCardClientComp: React.FC<{
  job: JobData;
  onDelete: (id: string | undefined) => Promise<void>;
}> = ({ job, onDelete }) => {
  //state for displaying the full text or truncated text
  const [showFullText, setShowFullText] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
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
            {showFullText ? "Read Less..." : "...Read More"}
          </a>
        )}
      </p>

      <button
        className="inline-flex items-center bg-red-400 text-white px-4 py-2 text-base font-semibold rounded-full cursor-pointer shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onDelete(job.id)}
      >
        Delete
      </button>
    </>
  );
};

export default JobCardClientComp;
