"use client"; //this is a client component because we are using react components

//'useState' is used for students,searchTerm,error.
import React, { useState, useEffect } from "react";

import IndividualProfile from "../(individualProfile)/page";

//TS interfaces
import { registeredStuds } from "../../../(Authentication)/login/(loginClientComp)/loginClientComp";

const ProfilesClientComp = () => {
  const [students, setStudents] = useState<registeredStuds[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  const [selectedStudent, setSelectedStudent] = useState<registeredStuds | {}>(
    {}
  );
  const [showStudentProfile, setShowStudentProfile] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudents = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const jsonData: registeredStuds[] = await response.json();
        const data: registeredStuds[] = jsonData || []; //Access 'registeredStuds'.
        setStudents(data);
      } catch (error) {
        setError("Error fetching students data");
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  //Filter students based on the search term dynamically.
  const filteredStudents: registeredStuds[] = students.filter(
    (student: registeredStuds) =>
      student.USN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickToMessage = (student: registeredStuds): void => {
    setSelectedStudent(student);
    setShowStudentProfile(true);
  };

  return (
    <>
      <header className="fixed top-20 w-full flex justify-between items-center p-5 border-b-2 border-pink-400 bg-white z-10">
        <div className="text-4xl font-bold text-blue-600">
          <h1>Profiles</h1>
        </div>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by USN..."
            className="p-2 text-base text-black border border-pink-400 rounded-md"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            } //update search term dynamically
          ></input>
        </div>
      </header>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mt-20">{error}</p>}

      {/* Displaying the students */}
      <div className="flex w-full mt-24">
        <div className="w-3/5 h-full overflow-y-auto p-14">
          <div className="flex flex-col space-y-5">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student: registeredStuds) => (
                <div
                  key={student.USN}
                  className={`p-4 w-[550px] h-[77px] bg-gray-100 border border-blue-400 rounded-lg shadow-md text-center text-gray-500 transition-transform duration-300 ${
                    (selectedStudent as registeredStuds).USN === student.USN
                      ? "!bg-blue-100 text-black border-violet-500"
                      : ""
                  } hover:translate-y-[-5px] cursor-pointer`}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                    handleClickToMessage(student)
                  }
                >
                  <p className="text-lg">
                    <strong>USN:</strong> {student.USN}
                  </p>
                  <p className="text-lg">
                    <strong>Name:</strong> {student.name}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No students match your search
              </p>
            )}
          </div>
        </div>

        {/* show student profile */}
        {showStudentProfile && (
          <IndividualProfile
            selectedStudent={selectedStudent}
          ></IndividualProfile>
        )}
      </div>
    </>
  );
};

export default ProfilesClientComp;
