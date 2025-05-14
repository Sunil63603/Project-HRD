//this is a server component .
//using react hooks , event handlers are migrated into a seperate client component.
//that client component is called and used here.

//LANDING PAGE
import React from "react";
import LandingClientComp from "./(landingClientComp)/landingClientComp"; //all the client logic is moved into this file.

//this is where user will come , as soon as he visits the page.
const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      <section className="flex flex-1 items-center justify-center text-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-semibold text-blue-900 mb-5">
            Empowering Careers
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Discover your potential with Cohort.Whether you're an HR or a
            student ready to launch your career,we bring the world of
            opportunities to you.
          </p>
          <LandingClientComp></LandingClientComp>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
