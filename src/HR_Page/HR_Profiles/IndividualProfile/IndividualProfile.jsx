import React from "react";
import "./IndividualProfile.css";
import Photo from "../../../Assets/Images/photo.jpg";
import gmail from "../../../Assets/Images/gmail.png";
import linkedin from "../../../Assets/Images/Linkedin.png";
import whatsapp from "../../../Assets/Images/whatsapp img.png";

import { BoxArrowUpRight } from "react-bootstrap-icons"; //this is used to indicate that portfolio website is a link
import { FileEarmarkPdf, Download } from "react-bootstrap-icons"; // icon Indicating that resume is a pdf,and download icon
import { CloudUpload } from "react-bootstrap-icons"; // Uploading resume icon.
// import profileImage from "../src/Assets/Images/photo.jpeg";
// import Photo from "../src/Assets/Images/photo.jpg";
//this is the component ie,displayed at the left side of the container.

const IndividualProfile = () => {
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
          <img src={Photo} alt="Profile" className="Profile-image" />
        </div>
        {/*❌change profile image in future*/}
        {/* refer ProfileSection.css for these styles*/}
        <div className="name-usn">
          <label for="name" className="label-info">
            Name :
          </label>
          <h2 id="name" className="name">
            Name
          </h2>
          <label for="usn" className="label-info">
            USN :
          </label>
          <h2 id="usn" className="usn">
            USN
          </h2>
          <label for="resume-box" className="label-info">
            Resume:
          </label>
          <li className="resume-box" id="resume-box">
            <FileEarmarkPdf className="resume-icons" /> {/* File icon */}
            <a
              href="/pdfs/resume1.pdf"
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
      {/* <div className="contact-details">
        <a href="mailto:s60667843@gmail.com">Email</a>
        <a href="https://wa.me/8197759383">WhatsApp</a>
        <a href="https://linkedin.com/in/sunil63603">LinkedIn</a>
      </div> */}
      <div className="icons-list">
        <img src={gmail} className="icon"></img>
        <img src={linkedin} className="icon"></img>
        <img src={whatsapp} className="icon"></img>
        <button className="message-bttn">Message</button>
      </div>
      {/* personal portfolio link*/}
      {/* <label className="info-label" htmlFor="student-website">
        Website
      </label>
      <a
        href="https://sunilpersonalportfolio.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        id="student-website"
      > */}
      {/* {" "} is kind of placeholder for BoxArrowUpRight icon */}
      {/* Sunil Portfolio{" "}
        <BoxArrowUpRight className="icon-style"></BoxArrowUpRight> */}
      {/* BoxArrowUpRight icon indicates 'link'*/}
      {/* </a> */}
      {/* {/* // <div className="contact-details">
      //   <a href="mailto:s60667843@gmail.com">Email</a>
      //   <a href="https://wa.me/8197759383">WhatsApp</a>
      //   <a href="https://linkedin.com/in/sunil63603">LinkedIn</a>
      // </div>
      // <button className="MessageButton">Message</button> */}
    </div>
  );
};

export default IndividualProfile;
