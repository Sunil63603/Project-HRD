import React from "react";
import "./ProfileSection.css";
import { useState, useEffect } from "react";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon

//TS interfaces and type-aliases
import { registeredStuds } from "../../Authentication/LoginForm/LoginForm";
import { Projects } from "../../Authentication/LoginForm/LoginForm";

//when user clicks on icon in the left side of the screen , then this component will be displayed
const ProfileSection: React.FC = () => {
  const [studentObj, setStudentObj] = useState<registeredStuds | null>();

  // ❌❌❌Based on this studentUSN , fetch details and display details related to students.
  const studentUSN: string | null = localStorage.getItem("studentUSN");
  //localStorage may return null if theres no 'studentUSN'.

  const getStudentObj = async (): Promise<registeredStuds | null> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const studentData: Record<string, registeredStuds> =
        await response.json();
      return Object.values(studentData)[0]; // Get the first value;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return null;
    }
  };

  useEffect(() => {
    getStudentObj()
      .then((student: registeredStuds | null) => setStudentObj(student))
      .catch((error: Error) => console.error(error));
  }, []);

  return (
    <>
      {studentObj && (
        <div className="w-full bg-gray-100 rounded-lg shadow-md box-border mx-4 my-0 flex justify-between items-start mt-24">
          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm text-left h-screen overflow-y-scroll m-10">
            {/* 'component-name' class have common css code which is written in updateSection.css*/}
            {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text center relative">
              Profile
            </h2>
            {/* refer UpdateSection.css for the 'component-name' */}

            <div className="flex mx-auto justify-center items-center w-[300px] h-[300px] rounded-full overflow-hidden bg-gray-300">
              <img
                src={`/Assets/Images/${studentUSN}.jpg`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* ❌❌❌❌How to display image using google drive image URL❌❌❌❌ */}

            {/* refer ProfileSection.css for these styles*/}
            <label
              className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
              htmlFor="student-name"
            >
              Name
            </label>
            <h2
              className="text-2xl font-bold text-gray-800 my-1.5"
              id="student-name"
            >
              {studentObj.name}
            </h2>

            <label
              className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
              htmlFor="student-usn"
            >
              USN
            </label>
            <p className="text-xl text-gray-800 my-1.5" id="student-usn">
              {studentObj.USN}
            </p>

            {/* personal portfolio link*/}
            <label
              className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
              htmlFor="student-website"
            >
              Website
            </label>
            <a
              href={studentObj.website}
              target="_blank"
              rel="noopener noreferrer"
              id="student-website"
              className="flex flex-row text-blue-500 no-underline text-lg my-1.5 transition-colors duration-300 ease-in-out hover:text-blue-700"
            >
              {/* {" "} is kind of placeholder for BoxArrowUpRight icon */}
              Portfolio{" "}
              <BoxArrowUpRight className="text-base text-blue-500 cursor-pointer mr-1.5 hover:text-blue-700"></BoxArrowUpRight>
              {/* BoxArrowUpRight icon indicates 'link'*/}
            </a>

            <div className="mb-7.5">
              <h2 className="text-xl border-b-2 border-gray-300 pb-1.25">
                Skills
              </h2>
              <ul className="list-disc pl-5">
                {studentObj.skills.map((skill: string, index: number) => (
                  <li className="mb-2.5 text-lg" key={index}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* display resumes as pdfs(similar to linkedin) */}
            <label
              className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
              htmlFor="resumes"
            >
              Resumes
            </label>
            {/* container for resumes */}
            <div className="mb-5">
              <ul className="list-none p-0 m-0" id="resumes">
                {studentObj.resumes.map((resumeLink: string, index: number) => (
                  <li
                    className="flex items-center p-2.5 mb-2.5 border border-gray-300 rounded-lg bg-gray-100 transition-shadow duration-300 ease-in-out hover:shadow-md"
                    key={index}
                  >
                    {" "}
                    {/* Use index or a unique value */}
                    <FileEarmarkPdf className="text-red-500 text-xl" />
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2.5 text-blue-500 no-underline flex-grow hover:underline"
                    >
                      Resume {index + 1} {/* Display Resume with an index */}
                    </a>
                    <Download className="text-blue-500 text-lg cursor-pointer" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-details">
              <a
                href="mailto:s60667843@gmail.com"
                className="block my-1.5 text-blue-500 no-underline"
              >
                Email
              </a>
              <a
                href="https://wa.me/8197759383"
                className="block my-1.5 text-blue-500 no-underline"
              >
                WhatsApp
              </a>
              <a
                href="https://linkedin.com/in/sunil63603"
                className="block my-1.5 text-blue-500 no-underline"
              >
                LinkedIn
              </a>

              <label
                className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
                htmlFor="student-mobile"
              >
                Mobile
              </label>
              <a
                href="tel:+91 8197759383"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 8197759383
              </a>
            </div>
          </div>

          <div className="w-[45%] p-2.5 bg-white rounded-lg shadow-sm text-left h-screen  m-10">
            {/* New Projects Section */}
            <div className="mb-7.5">
              <h2 className="text-xl mb-3.75 border-b-2 border-gray-300 pb-1.25 ">
                Projects
              </h2>
              <ul>
                {studentObj.Projects.map((Project: Projects, index: number) => (
                  <li key={index}>
                    <div className="mb-5">
                      <h3>{Project.title}</h3>
                      {/* <video controls className="w-full h-auto mb-2.5 border border-gray-300 rounded-lg">
                        {/* ❌❌❌Even here try to use video from google drive/youtube❌❌❌ */}
                      {/* <source src={Project.videoLink} type="video/mp4" /> */}
                      {/* Your browser does not support the video tag. */}
                      {/* </video>} */}
                      <div className="flex gap-2.5">
                        <a
                          href={Project.GitHub_Repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-2.5 bg-blue-500 text-white no-underline rounded-lg transition-colors duration-300 ease-in-out hover:bg-blue-700"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={Project.deployLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-2.5 bg-blue-500 text-white no-underline rounded-lg transition-colors duration-300 ease-in-out hover:bg-blue-700"
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
