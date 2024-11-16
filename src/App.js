import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Top Bar */}
      <div className="top-bar">
        <p>
          !! S J C Institute of technology | ✉ sjcit@gmail.com | 📞 123-456-789
        </p>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        {/* <p1>&#x1F393;</p1> */}

        <div className="logo">
          Welcome to <p1>&#x1F393;</p1> HRD
        </div>

        {/* <ul className="nav-links">
          <li>
            <a href="#home">Jobs</a>
          </li>
          <li>
            <a href="#dropdown">Profiles</a>
          </li>
          <li>
            <a href="#courses">Updates</a>
          </li>
        </ul> */}
      </nav>

      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          {/* <h1>
            <p1>&#x1F393;</p1>Welcome to Department of HRD
          </h1>

          <div className="header-buttons">
            <button className="apply-btn">Visit Official Website</button>
          </div> */}
          <div className="nav-links">
            <li>
              <a href="#home">Jobs</a>
            </li>
            <li>
              <a href="#dropdown">Profiles</a>
            </li>
            <li>
              <a href="#courses">Updates</a>
            </li>
          </div>
        </div>
      </header>

      {/* Info Sections */}
      {/* <div className="info-section">
        <div className="info-box programs">
          <h2>PROGRAMS</h2>
        </div>
        <div className="info-box affordability">
          <h2>AFFORDABILITY</h2>
        </div>
        <div className="info-box certification">
          <h2>CERTIFICATION</h2>
        </div>
      </div> */}
    </div>
  );
}

export default App;
