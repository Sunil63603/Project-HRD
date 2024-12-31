import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <h1 className="logo-text">C O H O R T</h1>
          <p className="tagline">Connecting Talent with Opportunities</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Empowering Careers</h2>
          <p className="hero-description">
            Discover your potential with Cohort. Whether you're an HR looking
            for exceptional talent or a student ready to launch your career, we
            bring the world of opportunities to you.
          </p>
          <div className="button-container">
            <button
              className="hero-button"
              onClick={() => handleLoginClick("registeredHRs")}
            >
              HR Login
            </button>
            <button
              className="hero-button"
              onClick={() => handleLoginClick("registeredStuds")}
            >
              Student Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Cohort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
