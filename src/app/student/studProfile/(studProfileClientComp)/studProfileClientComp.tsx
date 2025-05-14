"use client"; //client component as we are using 'state' variable

import { useState, useEffect } from "react";
//useState to store current student_obj.
//useEffect to fetch current student details when component mounts.

import Image from "next/image"; //to display student profile_img

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this icon is used to indicate that portfolio website is a link.
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; //icon indicating that resume is a pdf,and download icon.

//TS interfaces and type-aliases
import { registeredStuds } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";
import { Projects } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";

const ProfileSectionClientComp: React.FC = () => {
  const [studentObj, setStudentObj] = useState<registeredStuds | null>();

  //Based on this studentUSN,fetch details and display details related to students.
  const studentUSN: string | null = localStorage.getItem("studentUSN");
  //localStorage may return 'null' if theres no 'studentUSN'.

  const getStudentObj = async (): Promise<registeredStuds | null> => {
    try {
      const response = await fetch(
        `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json?orderBy=%22USN%22&equalTo=%22${studentUSN}%22`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const studentData: Record<string, registeredStuds> =
        await response.json();
      return Object.values(studentData)[0]; //Get the first value;
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
        <div className="w-[80%] bg-gray-100 rounded-lg shadow-md box-border mx-auto my-0 flex justify-between items-start text-black">
          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm text-left h-screen overflow-y-scroll m-10">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center relative">
              Profile
            </h2>

            <div className="flex mx-auto justify-center items-center w-[300px] h-[300px] rounded-full overflow-hidden bg-gray-300">
              <Image
                src={`/Assets/Images/${studentUSN}.jpg`}
                alt="profile"
                width={10}
                height={10}
                className="w-full h-full object-cover rounded-full"
              ></Image>
            </div>

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

            {/* personal portfolio link */}
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
              {/* BoxArrowUpRight icon indicates 'link' */}
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
                    className="flex items-center p-2.5 mb-2.5 border-gray-300 rounded-lg bg-gray-100 transition-shadow duration-300 ease-in-out hover:shadow-md"
                    key={index}
                  >
                    {" "}
                    {/* Use index or a unique value */}
                    <FileEarmarkPdf className="text-red-500 text-xl"></FileEarmarkPdf>
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2.5 text-blue-500 no-underline flex-grow hover:underline"
                    >
                      Resume {index + 1}
                      {/* Display Resume with an index */}
                    </a>
                    <Download className="text-blue-500 text-lg cursor-pointer"></Download>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-details">
              <a
                href={`mailto:${studentObj.email}`}
                className="block my-1.5 text-blue-500 no-underline"
              >
                Email
              </a>
              <a
                href={`https://wa.me/${studentObj.phoneNumber}`}
                className="block my-1.5 text-blue-500 no-underline"
              >
                Whatsapp
              </a>
              <a
                href={`${studentObj.socialContacts.linkedIn}`}
                className="block my-1.5 text-blue-500 no-underline"
              >
                Linkedin
              </a>

              <label
                className="block text-xs text-gray-600 mt-6 mb-0.5 font-semibold uppercase"
                htmlFor="student-mobile"
              >
                Mobile
              </label>
              <a
                href={`tel:${studentObj.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentObj.phoneNumber}
              </a>
            </div>
          </div>

          <div className="w-[45%] p-2.5 bg-white rounded-lg shadow-sm text-left h-screen m-10">
            {/* New project section */}
            <div className="mb-7.5">
              <h2 className="text-xl mb-3.75 border-b-2 border-gray-300 pb-1.25">
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
};

export default ProfileSectionClientComp;
