import React from "react";
import "./ProfileSection.css";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon
import { CloudUpload } from "react-bootstrap-icons"; // Uploading resume icon.

//this is the component ie,displayed at the left side of the container.
const ProfileSection = () => {
  return (
    <>
      <div className="profile-section">
        <div className="profile-left">
          {/* 'component-name' class have common css code which is written in updateSection.css*/}
          {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
          <h2 className="component-name">Profile</h2>
          {/* refer UpdateSection.css for the 'component-name' */}
          <img src="/locket logo.png" alt="Profile" className="profile-image" />
          {/*❌change profile image in future*/}

          {/* refer ProfileSection.css for these styles*/}
          <label className="info-label" htmlFor="student-name">
            Name
          </label>
          <h2 className="student-name" id="student-name">
            Sunil
          </h2>

          <label className="info-label" htmlFor="student-usn">
            USN
          </label>
          <p className="student-usn" id="student-usn">
            1SJ21CS154
          </p>

          {/* personal portfolio link*/}
          <label className="info-label" htmlFor="student-website">
            Website
          </label>
          <a
            href="https://sunilpersonalportfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            id="student-website"
          >
            {/* {" "} is kind of placeholder for BoxArrowUpRight icon */}
            Sunil Portfolio{" "}
            <BoxArrowUpRight className="icon-style"></BoxArrowUpRight>
            {/* BoxArrowUpRight icon indicates 'link'*/}
          </a>

          {/* display resumes as pdfs(similar to linkedin) */}
          <label className="info-label" htmlFor="resumes">
            Resumes
          </label>
          {/* container for resumes */}
          <div className="resumes-container">
            <ul className="resumes-list" id="resumes">
              {/* resume1 */}
              <li className="resume-item">
                <FileEarmarkPdf className="resume-icon" /> {/* File icon */}
                <a
                  href="/pdfs/resume1.pdf"
                  // ❌change this href in future
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  Resume 1
                </a>
                <Download className="download-icon" /> {/* Download icon */}
              </li>

              {/* resume2 */}
              <li className="resume-item">
                <FileEarmarkPdf className="resume-icon" /> {/* File icon */}
                <a
                  href="/pdfs/resume2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  Resume 2
                </a>
                <Download className="download-icon" /> {/* Download icon */}
              </li>
            </ul>
          </div>

          {/* ❌update styling for this button */}
          <button className="upload-resume">
            <CloudUpload className="upload-icon" /> Upload Resume
            {/* uploading to cloud icon,to upload resume*/}
          </button>

          <div className="contact-details">
            <a href="mailto:s60667843@gmail.com">Email</a>
            <a href="https://wa.me/8197759383">WhatsApp</a>
            <a href="https://linkedin.com/in/sunil63603">LinkedIn</a>
          </div>
        </div>
        <div className="profile-right">
          <li>
            {/* New Projects Section */}
            <div className="profile-projects">
              <h2>Projects</h2>
              <div className="project-item">
                <h3>Project Title</h3>
                <video controls className="project-video">
                  <source src="demo-video-url.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="project-links">
                  <a
                    href="github-repo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    GitHub Repo
                  </a>
                  <a
                    href="hosted-website-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              {/* Repeat .project-item for additional projects */}
            </div>

            {/* New Skills Section */}
            <div className="profile-skills">
              <h2>Skills</h2>
              <ul className="skills-list">
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
                {/* Add more skills as needed */}
              </ul>
            </div>
          </li>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
