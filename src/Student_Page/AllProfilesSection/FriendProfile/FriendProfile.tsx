import "./FriendProfile.css";
import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon
import { CloudUpload } from "react-bootstrap-icons"; // Uploading resume icon.
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

//TS interfaces and types
import { registeredStuds } from "../../../Authentication/LoginForm/LoginForm";
import { Projects } from "../../../Authentication/LoginForm/LoginForm";

type USNType = string | null;

type StudentType = registeredStuds | null;

function FriendProfile(): JSX.Element {
  const [studentObj, setStudentObj] = useState<StudentType>();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // ❌❌❌Based on this studentUSN , fetch details and display details related to friend.
  const friendUSN: USNType = queryParams.get("frndUSN");

  const getStudentObj = async (): Promise<StudentType> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${friendUSN}%22`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch friend data");
      }

      const studentData = await response.json();

      return Object.values(studentData)[0] as StudentType;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    getStudentObj()
      .then((student: StudentType) => setStudentObj(student))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {studentObj && (
        <div className="w-full p-8 bg-gray-200 rounded-2xl shadow-lg box-border mr-4 flex justify-between items-start text-left">
          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm mb-5">
            {/* 'component-name' class have common css code which is written in updateSection.css*/}
            {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:transform-translate-x-[-50%] after:w-12 after:h-1 bg-blue-500 after:rounded after:transition-width after:duration-300 ease hover:after:w-full">
              Profile
            </h2>
            {/* refer UpdateSection.css for the 'component-name' */}
            <div className="flex mx-auto justify-center items-center w-[300px] h-[300px] rounded-full overflow-hidden bg-gray-300">
              <img
                src={`/Assets/Images/${friendUSN}.jpg`}
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
              <h2 className="text-xl mb-3.75 border-b-2 border-gray-300 pb-1.25">
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
                className="block my-1.5 text-blue-500 no-underline"
                href="mailto:s60667843@gmail.com"
              >
                Email
              </a>
              <a
                className="block my-1.5 text-blue-500 no-underline"
                href="https://wa.me/8197759383"
              >
                WhatsApp
              </a>
              <a
                className="block my-1.5 text-blue-500 no-underline"
                href="https://linkedin.com/in/sunil63603"
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
            <div>
              <button
                className="mt-8 inline-block p-2.5 px-5 text-lg font-semibold text-white bg-blue-500 border-none rounded-full shadow-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:transform hover:translate-y-[-2px] active:bg-blue-900 active:transform active:translate-y-0 focus:outline-none focus:shadow-outline-blue "
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  navigate(`messageFriend?frndUSN=${friendUSN}`);
                }}
              >
                Message
              </button>
            </div>
          </div>

          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm text-left">
            {/* New Projects Section */}
            <div className="mb-7.5">
              <h2 className="text-xl ,b-3.75 border-b-2 border-gray-300 pb-1.25">
                Projects
              </h2>
              <ul>
                {studentObj.Projects.map((Project: Projects, index: number) => (
                  <li key={index}>
                    <div className="mb-5">
                      <h3>{Project.title}</h3>

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
}

export default FriendProfile;
