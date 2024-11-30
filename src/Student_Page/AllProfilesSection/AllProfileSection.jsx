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
      try {
        const response = await fetch("http://localhost:3000/registeredStuds");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError("Error fetching students data");
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the search term dynamically
  const filteredStudents = students.filter((student) =>
    student.usn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let navigate = useNavigate();
  const handleClickToMessage = () => {
    navigate(""); //when student wants to message some friend
  };

  return (
    <div className="all-profiles">
      <h2 className="component-name">All Profiles</h2>

      {/* Displaying the students */}
      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              className="student-card"
              onClick={handleClickToMessage}
              // onClick , open entire profile (not handling message)
            >
              <p>
                <strong>USN:</strong> {student.usn}
              </p>
              <p>
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
