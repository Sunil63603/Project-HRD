import React from "react";
// import "./IndividualProfile.css";

import { useNavigate } from "react-router-dom"; //used to navigate to the chat page when message button is clicked

import gmail from "/Assets/Images/gmail.png";
import linkedin from "/Assets/Images/linkedin.png";
import whatsapp from "/Assets/Images/whatsapp img.png";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon
import { CloudUpload } from "react-bootstrap-icons"; // Uploading resume icon.
// import profileImage from "../src/Assets/Images/photo.jpeg";
// import Photo from "../src/Assets/Images/photo.jpg";
//this is the component ie,displayed at the left side of the container.

const IndividualProfile = ({ selectedStudent }) => {
  const navigate = useNavigate();

  //whats app functionality
  const handleWhatsAppClick = (number) => {
    let num = Number(number);
    window.open(`https://wa.me/${num}`, "_blank");
  };

  //gmail functionality
  const handleEmailClick = (email, subject = "", body = "") => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_self"); // Opens in the same tab
  };
  //linkedin functionality
  const handleLinkedInClick = (profileUrl) => {
    console.log(profileUrl);

    window.open(profileUrl, "_blank");
  };

  return (
    <div className="w-[800px] bg-gray-300 rounded-xl p-7 m-7  h-[400px]">
      {/* 'component-name' class have common css code which is written in updateSection.css*/}
      {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold">Profile</h2>
      </div>
      {/* refer UpdateSection.css for the 'component-name' */}
      <div className="flex flex-row mt-4">
        <div className="flex items-center">
          <img
            src={`/Assets/Images/${selectedStudent.USN}.jpg`}
            alt="Profile"
            className="w-[211px] h-[211px] rounded-full object-cover"
          />
        </div>
        {/*❌change profile image in future*/}
        {/* refer ProfileSection.css for these styles*/}
        <div className="grid grid-cols-2 gap-14 p-5 items-start">
          <div className="flex flex-col ml-10">
            <label
              htmlFor="name"
              className="block text-lg text-red-700 uppercas font-light"
            >
              Name :
            </label>
            <h2 id="name" className="text-xl font-semibold">
              {selectedStudent.name}
            </h2>
            <label
              htmlFor="usn"
              className="block text-lg text-red-700 uppercase font-light mt-2"
            >
              USN :
            </label>
            <h2 id="usn" className="text-xl font-semibold">
              {selectedStudent.USN}
            </h2>
          </div>
          <div className="ml-10">
            <label
              htmlFor="resume-box"
              className="block text-lg text-red-700 uppercase font-light"
            >
              Resume:
            </label>
            <li
              className="flex items-center p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 transition-shadow hover:shadow-md"
              id="resume-box"
            >
              <FileEarmarkPdf className="text-red-500 text-2xl" />{" "}
              {/* File icon */}
              <a
                href={selectedStudent.resumes[0]}
                // ❌change this href in future
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:underline flex-grow"
              >
                Resume
              </a>
              <Download className="text-blue-600 text-lg cursor-pointer" />{" "}
              {/* Download icon */}
            </li>
          </div>
        </div>
      </div>
      <p className="text-xl mt-6 font-semibold">Contacts:</p>
      <div className="flex items-center mt-2 space-x-12">
        <img
          src={gmail}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => handleEmailClick(selectedStudent.email)}
        ></img>
        <img
          src={linkedin}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() =>
            handleLinkedInClick(selectedStudent.socialContacts.linkedIn)
          }
        ></img>
        <img
          src={whatsapp}
          className="w-8 h-8 rounded-full cursor-pointr"
          onClick={() => handleWhatsAppClick(selectedStudent.phoneNumber)}
        ></img>
        <button
          className="ml-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          onClick={() => {
            navigate(`messageStudent?studentUSN=${selectedStudent.USN}`);
          }}
        >
          Message Student
        </button>
      </div>
    </div>
  );
};

export default IndividualProfile;
