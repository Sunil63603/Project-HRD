import React from "react";
import { useNavigate } from "react-router-dom"; //Used to display the login form along with information(info on whether student/HR button was clicked)
import "./LandingPage.css"; //Write all styling related to this 'LandingPage' component in this css file.

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate function.

  const HRLoginClick = (role) => {
    //here write logic to change route and display '/login' page along with the info about button clicked .
    navigate(`/login?role=${role}`); // Replace current path with '/login' path.
  };

  const StudentLoginClick = (role) => {
    //here write logic to change route and display '/login' page.
    navigate(`/login?role=${role}`); // Replace current path with '/login' path
  };

  return (
    <div className="landing-page">
      {/* Website Name */}
      <header className="header">
        <h1 className="website-name">C O H O R T</h1>
      </header>

      {/* Login Buttons */}
      <div className="button-container">
        <button
          className="login-button"
          onClick={() => HRLoginClick("registeredHRs")}
        >
          HR Login
        </button>
        <button
          className="login-button"
          onClick={() => StudentLoginClick("registeredStuds")}
        >
          Student Login
        </button>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2>About Cohort</h2>
        <p>
          Welcome to Cohort, a platform designed to connect job seekers and
          employers seamlessly. Whether you're a student showcasing your skills
          or an HR professional searching for talent, Cohort makes the process
          efficient and effective.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Cohort. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
