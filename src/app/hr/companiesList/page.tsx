import React from "react";
import CompaniesListClientComp from "./(companiesListClientComp)/companiesListClientComp";

const CompaniesList: React.FC = () => {
  return (
    <div className="px-5 py-6 text-black max-w-6xl mx-auto">
      <h2 className="mt-2 mb-5 text-2xl font-semibold">Companies</h2>
      <CompaniesListClientComp></CompaniesListClientComp>
    </div>
  );
};

export default CompaniesList;
