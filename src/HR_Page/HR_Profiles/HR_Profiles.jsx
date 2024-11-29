
import React, { useState, useEffect } from "react";
import "./HR_Profiles.css";
import { useNavigate } from "react-router";


const Profiles = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

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
  const handleClickToMessage=()=>{
    navigate("/hr/IndividualProfile ");
  }

  return (
    <div className="profiles-container">
      <header className="headerProfile">
        <div className="logo-container">
          <h1>Profiles</h1>
        </div>
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by USN..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term dynamically
          />
        </div>
      </header>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Displaying the students */}
      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} className="student-card" onClick={handleClickToMessage}>
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

export default Profiles;
