"use client"; //indicates that this is a client component.

import { useEffect, useState, JSX } from "react"; //used to display 'filteredStudents' and error message when no matches are found.
//useEffect is used to fetch students matching 'searchTerm'

import { useSearchContext } from "@/contexts/SearchContext"; //Context APi is used to share 'searchTerm' from 'Stud_Navbar' to 'AllProfiles'.
import { useRouter } from "next/navigation"; //❌useRouter is present in next/router as well.why?❌

//TS interfaces and types
import { registeredStuds } from "../../../(Authentication)/login/(loginClientComp)/loginClientComp";

const AllProfileSectionClientComp: React.FC = (): JSX.Element => {
  const [students, setStudents] = useState<registeredStuds[]>([]); //filteredStudents based on 'searchTerm'.
  const [error, setError] = useState<string | null>(null); //if no match is found , then this state variable is used to display error message.
  const { searchTerm } = useSearchContext();

  //for navigation purpose . When student clicks on any one friend profile in the list , then based on navigation , entire friendProfile will be displayed.
  const router = useRouter();

  //fetching students from firebase using fetch
  useEffect(() => {
    const fetchStudents = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }

        const data: registeredStuds[] = await response.json();

        //extract students array from Firebase response.
        const studentsData = data || [];

        setStudents(studentsData);
      } catch (error) {
        setError("Error fetching students data");
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  //filter students based on the searchTerm dynamically
  const filteredStudents: registeredStuds[] = students.filter(
    (student: registeredStuds) =>
      student.USN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (studentUSN: string): void => {
    router.push(`/student/allProfiles/friendProfile?frndUSN=${studentUSN}`);
    //friendUSN is stored as searchParam,so that based on USN,friendProfile can be rendered.
  };

  return (
    <>
      {/* Displayed the students */}
      <div className="flex flex-col justify-center items-center gap-5">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student: registeredStuds, index: number) => (
            <div
              key={index}
              className="bg-white border border-blue-600 rounded-lg flex justify-between flex-row p-4 w-[530px] text-center shadow-md transition-transform duration-300 ease-in-out hover:transform hover:translate-y-[-5px] hover:cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                handleViewProfile(student.USN)
              }
            >
              <p className="my-2.5 text-lg text-gray-800">
                <strong>USN:</strong>
                {student.USN}
              </p>
              <p className="my-2.5 text-lg text-gray-800">
                <strong>Name:</strong>
                {student.name}
              </p>
            </div>
          ))
        ) : (
          <p>No students match your search</p>
        )}
      </div>
    </>
  );
};

export default AllProfileSectionClientComp;
