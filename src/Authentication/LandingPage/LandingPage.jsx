import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const handleHRLogin = () => {
    alert("HR Login clicked!");
  };

  const handleStudentLogin = () => {
    alert("Student Login clicked!");
  };

  return (
    <div className="landing-page">
      {/* Website Name */}
      <header className="header">
        <h1 className="website-name">C O H O R T</h1>
      </header>

      {/* Login Buttons */}
      <div className="button-container">
        <button className="login-button" onClick={handleHRLogin}>HR Login</button>
        <button className="login-button" onClick={handleStudentLogin}>Student Login</button>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2>About Cohort</h2>
        <p>
          Welcome to Cohort, a platform designed to connect job seekers and employers seamlessly. 
          Whether you're a student showcasing your skills or an HR professional searching for talent, 
          Cohort makes the process efficient and effective.
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
