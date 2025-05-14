//this component is rendered when user clicks on 'jobs' button which is present in the Stud_Navbar
import React from "react";
import JobSectionClientComp from "./(jobsClientComp)/jobsClientComp";

//PopUpToast component is not used in this 'jobs' component.

const JobSection = () => {
  return (
    <div className="px-5 py-6 text-black max-w-6xl mx-auto">
      <h2 className="mt-2 mb-5 text-2xl font-semibold">Jobs/Opportunities</h2>
      <JobSectionClientComp></JobSectionClientComp>
    </div>
  );
};

export default JobSection;
