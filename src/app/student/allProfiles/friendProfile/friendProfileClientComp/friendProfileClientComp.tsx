"use client"; //this statement indicates that this is a client-component.

import { useState, useEffect, JSX } from "react"; //'student object' is fetched and stored as a state variable.
//useEffect is used to fetch student details object from firebase.

import { useRouter } from "next/navigation"; //for navigation purpose ie.when student clicks on 'messageFriend' button
import { useSearchParams } from "next/navigation"; //to get friendUSN from URL.FriendUSN is stored as search parameter.

import Image from "next/image"; //used to display friend profile photo.

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio webiste is a link.
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; //icon indicating that resume is a pdf,and download icon.

//TS interfaces and types.
import { registeredStuds } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";
import { Projects } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";

//TS 'type' can be used to define multiple types for single variable
type USNType = string | null;
type StudentType = registeredStuds | null;

function FriendProfileClientComp(): JSX.Element {
  const [studentObj, setStudentObj] = useState<StudentType>(); //fetch and store student details here
  const router = useRouter(); //for navigation.

  const searchParams = useSearchParams(); //to get 'frndUSN' from URL.
  const friendUSN = searchParams.get("frndUSN");
  //Based on this USN,fetch details and display details related to friend.

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
        <div className="w-full p-8 bg-gray-200 rounded-2xl shadow-lg box-border mr-4 flex justify-between items-start text-left text-black">
          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm mb-5">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:transform-translate-x-[-50%] after:w-12 after:h-1 bg-blue-500 after:rounded after:transition-wdith after:duration-300 ease hover:after:w-full">
              Profile
            </h2>
            <div className="flex mx-auto justify-center items-center w-[300px] h-[300px] rounded-full overflow-hidden bg-gray-300">
              <Image
                src={`/Assets/Images/${friendUSN}.jpg`}
                alt="profile_img"
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

            {/* Personal portfolio link */}
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
              {/* {" "} is kind of placeholder for BoxArrowUpRight icon */}\
              Portfolio{" "}
              <BoxArrowUpRight className="text-base text-blue-500 cursor-pointer mr-1.5 hover:text-blue-700"></BoxArrowUpRight>
              {/* BoxArrowUpRight icon indicates 'link' */}
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

            {/* display resumes as pdfs */}
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
                    <FileEarmarkPdf className="text-red-500 text-xl"></FileEarmarkPdf>
                    <a
                      href={resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2.5 text-blue-500 no-underline flex-grow hover:underline"
                    >
                      {/* Display resume with number */}
                      Resume {index + 1}
                    </a>
                    <Download className="text-blue-500 text-lg cursor-pointer"></Download>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-details">
              <a
                className="block my-1.5 text-blue-500 no-underline"
                href={`mailto:${studentObj.email}`}
              >
                Email
              </a>
              <a
                className="block my-1.5 text-blue-500 no-underline"
                href={`https://wa.me/${studentObj.phoneNumber}`}
              >
                Whatsapp
              </a>
              <a
                className="block my-1.5 text-blue-500 no-underline"
                href={`${studentObj.socialContacts.linkedIn}`}
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
                href={`tel:${studentObj.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentObj.phoneNumber}
              </a>
            </div>

            <div>
              <button
                className="mt-8 inline-block p-2.5 px-5 text-lg font-semibold text-white bg-blue-500 border-none rounded-full shadow-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:transform hover:translate-y-[-2px] active:bg-blue-900 active:translate-y-0 focus:outline-none focus:shadow-outline-blue "
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  router.push(`/student/messageFriend?frndUSN=${friendUSN}`);
                }}
              >
                Message
              </button>
            </div>
          </div>

          <div className="w-[48%] p-2.5 bg-white rounded-lg shadow-sm text-left">
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
                          Github Repo
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

export default FriendProfileClientComp;
