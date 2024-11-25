// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HR_Profiles.css";

const Profiles = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState(null);

  // Fetching students from db.json
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // ❌TMG : try to write this using 'fetch' instead of 'axios'
        const response = await axios.get(
          "http://localhost:3000/studentProfiles"
        );
        setStudents(response.data);
      } catch (err) {
        setError("Error fetching students data");
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredStudents([]); // Clear the list if search term is empty
      setError("Please enter a USN to search.");
      return;
    }

    const result = students.filter(
      (student) => student.usn.toLowerCase() === searchTerm.toLowerCase()
    );

    if (result.length > 0) {
      setFilteredStudents(result); // Display the matching student
      setError(null); // Clear error if a match is found
    } else {
      setFilteredStudents([]); // No match found
      setError("No student found with the given USN.");
    }
  };

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
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>

      {/* Error or Instruction Message */}
      {error && <p className="error">{error}</p>}

      {/* Displaying the searched students */}
      {filteredStudents.length > 0 && (
        <div className="student-list">
          {filteredStudents.map((student, index) => (
            <div key={index} className="student-card">
              <p>
                <strong>USN:</strong> {student.usn}
              </p>
              <p>
                <strong>Name:</strong> {student.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profiles;
