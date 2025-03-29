import React from "react";
import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";

//functional component which doesnt take any parameters is written like this.
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role: string) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-500 py-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white font-bold text-4xl md:text-5xl">
            HRD - COHORT
          </h1>
          <p className="text-black-300 font-bold text-lg md:text-xl mt-12">
            Built for SJCIT-HR Department
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center text-center px-6 py-16">
        <div className="max-w-2xl w-full">
          <h2 className="text-4xl font-semibold text-blue-900 mb-5">
            Empowering Careers
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Discover your potential with Cohort. Whether you're an HR or a
            student ready to launch your career, we bring the world of
            opportunities to you.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-lg transform transition hover:scale-105"
              onClick={() => handleLoginClick("registeredHRs")}
            >
              HR Login
            </button>
            <button
              className="px-8 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-lg transform transition hover:scale-105"
              onClick={() => handleLoginClick("registeredStuds")}
            >
              Student Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-4 bg-blue-500 text-white text-sm">
        <p>&copy; 2025 Cohort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
