// ❌❌❌❌❌❌In this component,❌❌❌❌❌❌❌
//studentObj is initialized in 'getConversationByUSN' function() . So,its better to shift entire JSX logic from this file to client file.

//this component is rendered when user clicks on messageHRD button which is present in Stud_Navbar.

import React, { JSX } from "react";
import { FaWhatsapp } from "react-icons/fa"; //HRD's contact options.(ie.whatsapp,mail and phone).
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

//TS imports,interfaces and type-aliases
type USNType = string | null;

import {
  conversationsWithHR,
  registeredStuds,
} from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";
import MessageHRDSectionClientComp from "./(messageHRDClientComp)/messageHRDClientComp";

const MessageHRDSection = (): JSX.Element => {
  //to store details of student.
  let studentObj: registeredStuds | {} = {};

  return (
    <div className="flex flex-col h-[80vh] w-[600px] mx-auto my-auto bg-gray-100 rounded-4xl shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white text-center text-lg font-bold">
        Message HRD
      </div>
      <div className="flex justify-around my-2.5">
        <a
          href={`https://wa.me/${(studentObj as registeredStuds).phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full text-2xl"
        >
          <FaWhatsapp className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 hover:text-blue-500 text-green-500"></FaWhatsapp>
        </a>

        <a
          href={`tel:${(studentObj as registeredStuds).phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPhoneAlt className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 hover:text-blue-500 text-green-500"></FaPhoneAlt>
        </a>

        <a
          href={`mailto:${(studentObj as registeredStuds).email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGmail className="mx-2.5 text-xl cursor-pointer transition-colors duration-300 text-red-500"></SiGmail>
        </a>
      </div>
      <hr></hr>
      <MessageHRDSectionClientComp></MessageHRDSectionClientComp>
    </div>
  );
};

export default MessageHRDSection;
