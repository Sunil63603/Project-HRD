"use client"; //this is a client component .
//this client component is used inside landingPage which is server component.

import React from "react";
import { useRouter } from "next/navigation"; //this hook allows you to programmatically change routes inside client components.

const LandingClientComp: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = (role: string) => {
    router.push(`/login?role=${role}`);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6">
        <button
          className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-lg transform:transition hover:scale-105"
          onClick={() => handleLoginClick("registeredHRs")}
        >
          HR Login
        </button>
        <button
          className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-lg transform:transition hover:scale-105"
          onClick={() => handleLoginClick("registeredStuds")}
        >
          Student Login
        </button>
      </div>
    </>
  );
};

export default LandingClientComp;
