import React from "react";
import "./ProfileSection.css";
import { useState, useEffect } from "react";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon

//this is the component ie,displayed at the left side of the container.
const ProfileSection = () => {
  const [studentObj, setStudentObj] = useState();

  // ❌❌❌Based on this studentUSN , fetch details from 'db.json' and display details related to students.
  const studentUSN = "1SJ21CS154";

  //call this function , inside useEffect.
  const getStudentObj = () => {
    return fetch(`http://localhost:3000/registeredStuds`)
      .then((response) => response.json())
      .then((students) => students.find((stud) => stud.USN === studentUSN))
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  useEffect(() => {
    getStudentObj()
      .then((student) => setStudentObj(student))
      .catch((error) => console.error(error));
  }, [studentUSN]);

  return (
    <>
      {studentObj && (
        <div className="profile-section">
          <div className="profile-left">
            {/* 'component-name' class have common css code which is written in updateSection.css*/}
            {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
            <h2 className="component-name">Profile</h2>
            {/* refer UpdateSection.css for the 'component-name' */}
            <img
              src="https://drive.google.com/thumbnail?id=1OKWuCoF7X7lNiNPdGEQ1QmbAWZJGTrth"
              alt="Profile"
              className="profile-image"
            />
            {/* ❌❌❌❌How to display image using google drive image URL❌❌❌❌ */}

            {/* refer ProfileSection.css for these styles*/}
            <label className="info-label" htmlFor="student-name">
              Name
            </label>
            <h2 className="student-name" id="student-name">
              {studentObj.name}
            </h2>

            <label className="info-label" htmlFor="student-usn">
              USN
            </label>
            <p className="student-usn" id="student-usn">
              {studentObj.USN}
            </p>

            {/* personal portfolio link*/}
            <label className="info-label" htmlFor="student-website">
              Website
            </label>
            <a
              href={studentObj.website}
              target="_blank"
              rel="noopener noreferrer"
              id="student-website"
            >
              {/* {" "} is kind of placeholder for BoxArrowUpRight icon */}
              Portfolio{" "}
              <BoxArrowUpRight className="icon-style"></BoxArrowUpRight>
              {/* BoxArrowUpRight icon indicates 'link'*/}
            </a>

            <div className="profile-skills">
              <h2>Skills</h2>
              <ul className="skills-list">
                {studentObj.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            {/* display resumes as pdfs(similar to linkedin) */}
            <label className="info-label" htmlFor="resumes">
              Resumes
            </label>
            {/* container for resumes */}
            <div className="resumes-container">
              <ul className="resumes-list" id="resumes">
                {studentObj.resumes.map((resumeLink, index) => (
                  <li className="resume-item" key={index}>
                    {" "}
                    {/* Use index or a unique value */}
                    <FileEarmarkPdf className="resume-icon" />
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-link"
                    >
                      Resume {index + 1} {/* Display Resume with an index */}
                    </a>
                    <Download className="download-icon" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-details">
              <a href="mailto:s60667843@gmail.com">Email</a>
              <a href="https://wa.me/8197759383">WhatsApp</a>
              <a href="https://linkedin.com/in/sunil63603">LinkedIn</a>
            </div>
          </div>

          <div className="profile-right">
            {/* New Projects Section */}
            <div className="profile-projects">
              <h2>Projects</h2>
              <ul>
                {studentObj.Projects.map((Project, index) => (
                  <li key={index}>
                    <div className="project-item">
                      <h3>{Project.title}</h3>
                      <video controls className="project-video">
                        {/* ❌❌❌Even here try to use video from google drive/youtube❌❌❌ */}
                        <source src={Project.videoLink} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="project-links">
                        <a
                          href={Project.GitHub_Repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={Project.deployLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
