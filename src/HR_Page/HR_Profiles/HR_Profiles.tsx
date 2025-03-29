import React, { useState, useEffect } from "react";
// import "./HR_Profiles.css";
import { useNavigate } from "react-router";
import IndividualProfile from "./IndividualProfile/IndividualProfile";

//TS interfaces
import { registeredStuds } from "../../Authentication/LoginForm/LoginForm";

const Profiles = () => {
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
        const data: registeredStuds[] = jsonData || []; // Access 'registeredStuds'
        setStudents(data);
      } catch (err) {
        setError("Error fetching students data");
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the search term dynamically
  const filteredStudents: registeredStuds[] = students.filter(
    (student: registeredStuds) =>
      student.USN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickToMessage = (student: registeredStuds): void => {
    setSelectedStudent(student);
    setShowStudentProfile(true);
    // console.log(selectedStudent);

    // navigate("/IndividualProfile");
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="fixed top-30 w-full flex justify-between items-center p-5 border-b-2 border-pink-400 bg-white z-10">
        <div className="text-4xl font-bold text-blue-600">
          <h1>Profiles</h1>
        </div>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by USN..."
            className="p-2 text-base border border-pink-400 rounded-md"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            } // Update search term dynamically
          />
        </div>
      </header>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-20">{error}</p>}

      {/* Displaying the students */}
      <div className="flex w-full mt-24">
        <div className="w-2/5 h-full overflow-y-auto p-14">
          <div className="flex flex-col space-y-5">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student: registeredStuds) => (
                <div
                  key={student.USN}
                  className={`p-4 w-[530px] h-[77px] bg-white border border-blue-400 rounded-lg shadow-md text-center transition-transform duration-300 ${
                    (selectedStudent as registeredStuds).USN === student.USN
                      ? "!bg-blue-100 text-black border-violet-500"
                      : ""
                  } hover:translate-y-[-5px] cursor-pointer `}
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
                No students match your search.
              </p>
            )}
          </div>
        </div>

        {/* show student profile */}
        {showStudentProfile && (
          <IndividualProfile selectedStudent={selectedStudent} />
        )}
      </div>
    </div>
  );
};

export default Profiles;
