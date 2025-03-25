//this component is rendered when user clicks on AllProfiles button which is present in the topFixedBar.

import React from "react";
import "./AllProfileSection.css"; //Add your styling for AllProfiles.
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const AllProfileSection = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const { searchTerm } = useContext(SearchContext);

  // Fetching students from db.json using fetch
  useEffect(() => {
    const fetchStudents = async () => {
      // try {
      //   const response = await fetch("http://localhost:3000/registeredStuds");
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch");
      //   }
      //   const data = await response.json();
      //   setStudents(data);
      // } catch (err) {
      //   setError("Error fetching students data");
      //   console.error("Error fetching students:", err);
      // }

      try {
        const response = await fetch(
          `https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/registeredStuds.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }

        const data = await response.json();

        // Extract students array from JSONBin response
        const studentsData = data || [];

        setStudents(studentsData);
      } catch (err) {
        setError("Error fetching students data");
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the search term dynamically
  const filteredStudents = students.filter((student) =>
    student.USN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let navigate = useNavigate();

  const handleViewProfile = (studentUSN) => {
    navigate(`/student/allprofiles/friendprofile?frndUSN=${studentUSN}`); //when student wants to message some friend
    //friendUSN is stored as searchParam , so that based on usn , friendProfile can be rendered.
  };

  return (
    <div className="flex-2 p-5 m-60 mt-12 bg-gray-200 rounded-2xl w-[1150px] h-[70vh] overflow-y-scroll border-1 border-gray-300 shadow-lg">
      <h2 className="text-4xl italic font-medium mb-4 capitalize text-black flex items-center justify-center">
        All Profiles
      </h2>

      {/* Displaying the students */}
      <div className="flex flex-col justify-center items-center gap-5">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              className="bg-white border border-blue-600 rounded-lg flex justify-between flex-row p-4 w-[530px] text-center shadow-md transition-transform duration-300 ease-in-out hover:transform hover:translate-y-[-5px] hovercursor-pointer"
              onClick={() => handleViewProfile(student.USN)}
            >
              <p className="my-2.5 text-lg text-gray-800">
                <strong>USN:</strong> {student.USN}
              </p>
              <p className="my-2.5 text-lg text-gray-800">
                <strong>Name:</strong> {student.name}
              </p>
            </div>
          ))
        ) : (
          <p>No students match your search.</p>
        )}
      </div>
    </div>
  );
};

export default AllProfileSection;
