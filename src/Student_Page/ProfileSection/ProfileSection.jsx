import "./ProfileSection.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon

//this is the component ie,displayed at the left side of the container.
const ProfileSection = () => {
  const [studentObj, setStudentObj] = useState();
  const [searchParams] = useSearchParams();

  const studentUSN = searchParams.get("studentUSN");

  const getStudentObj = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${encodeURIComponent(studentUSN)}`,
        { credentials: "include" },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching student:", error);
      return null;
    }
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
            <h2 className="component-name">Profile</h2>

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
                {(studentObj.skills || []).map((skill, index) => (
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
                {(studentObj.resumes || []).map((resumeLink, index) => (
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
              <a href={`mailto:${studentObj.email}`}>Email</a>

              <a
                href={studentObj.socialContacts?.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

              <a
                href={studentObj.socialContacts?.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <label className="info-label" htmlFor="student-mobile">
                Mobile
              </label>

              <a href={`tel:${studentObj.phoneNumber}`}>
                {studentObj.phoneNumber}
              </a>
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-projects">
              <h2>Projects</h2>
              <ul>
                {(studentObj.Projects || []).map((Project, index) => (
                  <li key={index}>
                    <div className="project-item">
                      <h3>{Project.title}</h3>
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
