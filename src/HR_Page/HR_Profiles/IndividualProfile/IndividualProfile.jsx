import React from "react";
import "./IndividualProfile.css";
import Photo from "../../../Assets/Images/photo.jpg";

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
      <h2 className="Profile-name">Profile</h2>
      {/* refer UpdateSection.css for the 'component-name' */}
      <img src={Photo} alt="Profile" className="Profile-image" />
      {/*❌change profile image in future*/}

      {/* refer ProfileSection.css for these styles*/}
      {/* <label className="info-label" htmlFor="student-name">
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
      </p> */}

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
