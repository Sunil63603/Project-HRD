import React from "react";
import "./IndividualProfile.css";

import { useNavigate } from "react-router-dom"; //used to navigate to the chat page when message button is clicked

import gmail from "../../../../public/Assets/Images/gmail.png";
import linkedin from "../../../../public/Assets/Images/linkedin.png";
import whatsapp from "../../../../public/Assets/Images/whatsapp img.png";

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
    <div className="Individual-profile-section">
      {/* 'component-name' class have common css code which is written in updateSection.css*/}
      {/* ❌actually it should be written in global css file(so move .component-name css to global css file)*/}
      <div className="Profile-name">
        <h2>Profile</h2>
      </div>
      {/* refer UpdateSection.css for the 'component-name' */}
      <div className="name-usn-photo">
        <div className="photo">
          <img
            src={`/Assets/Images/${selectedStudent.USN}.jpg`}
            alt="Profile"
            className="Profile-image"
          />
        </div>
        {/*❌change profile image in future*/}
        {/* refer ProfileSection.css for these styles*/}
        <div className="name-usn">
          <label htmlFor="name" className="label-info">
            Name :
          </label>
          <h2 id="name" className="name">
            {selectedStudent.name}
          </h2>
          <label htmlFor="usn" className="label-info">
            USN :
          </label>
          <h2 id="usn" className="usn">
            {selectedStudent.USN}
          </h2>
          <label htmlFor="resume-box" className="label-info">
            Resume:
          </label>
          <li className="resume-box" id="resume-box">
            <FileEarmarkPdf className="resume-icons" /> {/* File icon */}
            <a
              href={selectedStudent.resumes[0]}
              // ❌change this href in future
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link-address"
            >
              Resume
            </a>
            <Download className="download-icons" /> {/* Download icon */}
          </li>
        </div>
      </div>
      <p className="Contacts">Contacts:</p>
      <div className="icons-list">
        <img
          src={gmail}
          className="icon"
          onClick={() => handleEmailClick(selectedStudent.email)}
        ></img>
        <img
          src={linkedin}
          className="icon"
          onClick={() =>
            handleLinkedInClick(selectedStudent.socialContacts.linkedIn)
          }
        ></img>
        <img
          src={whatsapp}
          className="icon"
          onClick={() => handleWhatsAppClick(selectedStudent.phoneNumber)}
        ></img>
        <button
          className="message-btn"
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
