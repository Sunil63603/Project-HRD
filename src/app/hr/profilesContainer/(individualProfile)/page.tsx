//this is the component ie,displayed at the left side of the container.

import React from "react";
import Image from "next/image"; //this provides many benefits like lazy-loading..etc
//profile image of student will be imported dynamically based on USN.

//social media icon images.
import gmail from "../../../../../public/Assets/Images/gmail.png";
import linkedin from "../../../../../public/Assets/Images/linkedin.png";
import whatsapp from "../../../../../public/Assets/Images/whatsapp img.png";

// 'react-bootstrap-icons' is a library.
import { FileEarmarkPdf, Download } from "react-bootstrap-icons";
//icon indicating that resume is a pdf, and download icon.

//TS interface
import { registeredStuds } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";
import IndividualProfileClientComp from "./(individualProfileClientComp)/individualProfileClientComp";

const IndividualProfile: React.FC<{
  selectedStudent: registeredStuds | {};
}> = ({ selectedStudent }) => {
  //whatsapp functionality.
  const handleWhatsAppClick = (phoneNumber: string) => {
    let num = Number(phoneNumber);
    window.open(`https://wa.me/${num}`, "_blank"); //'blank' indicates that the 'link' should be opened in new tab.
  };

  //gmail functionality
  const handleEmailClick = (email: string, subject = "", body = ""): void => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_self"); //opens in the same tab.
  };

  //linkedin functionality
  const handleLinkedInClick = (profileUrl: string): void => {
    window.open(profileUrl, "_blank"); //opens in new tab.
  };

  return (
    <div className="w-[900px] bg-gray-300 rounded-xl p-6 mr-12 mt-10 h-[400px]  text-black">
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold">Profile</h2>
      </div>
      <div className="flex flex-row mt-4">
        <div className="flex items-center">
          <Image
            src={`/Assets/Images/${
              (selectedStudent as registeredStuds).USN
            }.jpg`}
            alt="Profile"
            width={53}
            height={53}
            className="w-[211px] h-[211px] rounded-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-10 p-5 items-start">
          <div className="flex flex-col ml-5">
            <label
              htmlFor="name"
              className="block text-lg text-red-700 uppercase font-light"
            >
              Name:
            </label>
            <h2 id="name" className="text-xl font-semibold">
              {(selectedStudent as registeredStuds).name}
            </h2>
            <label
              htmlFor="usn"
              className="block text-lg text-red-700 uppercase font-light mt-2"
            >
              USN:
            </label>
            <h2 id="usn" className="text-xl font-semibold">
              {(selectedStudent as registeredStuds).USN}
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
              {/* File/PDF icon */}
              <a
                //❌here write logic to display all resumes of student❌
                href={(selectedStudent as registeredStuds).resumes[0]}
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
        <Image
          src={gmail}
          alt="gmail"
          width={2}
          height={2}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLImageElement>) =>
            handleEmailClick((selectedStudent as registeredStuds).email)
          }
        ></Image>
        <Image
          src={linkedin}
          alt="linkedin"
          width={2}
          height={2}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLImageElement>) =>
            handleLinkedInClick(
              (selectedStudent as registeredStuds).socialContacts.linkedIn
            )
          }
        ></Image>
        <Image
          src={whatsapp}
          alt="whatsapp"
          width={2}
          height={2}
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={(e: React.MouseEvent<HTMLImageElement>) =>
            handleWhatsAppClick(
              (selectedStudent as registeredStuds).phoneNumber
            )
          }
        ></Image>
        <IndividualProfileClientComp
          selectedStudent={selectedStudent}
        ></IndividualProfileClientComp>
      </div>
    </div>
  );
};

export default IndividualProfile;
