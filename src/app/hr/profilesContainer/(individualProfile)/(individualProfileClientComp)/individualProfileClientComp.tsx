"use client";
import { registeredStuds } from "@/app/(Authentication)/login/(loginClientComp)/loginClientComp";

import { useRouter } from "next/navigation"; //used to navigate to the chat page when HR clicks on messageStudent button.

//this component handles events.

const IndividualProfileClientComp: React.FC<{
  selectedStudent: registeredStuds | {};
}> = ({ selectedStudent }) => {
  //this router is used when HR clicks on 'message Student' button.
  const router = useRouter();

  return (
    <>
      <button
        className="ml-auto px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:cursor-pointer transition"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          router.push(
            `messageStudent?studentUSN=${
              (selectedStudent as registeredStuds).USN
            }`
          );
        }}
      >
        Message Student
      </button>
    </>
  );
};

export default IndividualProfileClientComp;
