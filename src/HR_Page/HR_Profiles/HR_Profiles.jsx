import { useState, useEffect } from "react";
import "./HR_Profiles.css";
import IndividualProfile from "./IndividualProfile/IndividualProfile";

const Profiles = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState({});
  const [showStudentProfile, setShowStudentProfile] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/students`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError("Error fetching students data");
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the search term dynamically
  const filteredStudents = students.filter((student) =>
    student.USN.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClickToMessage = (student) => {
    setSelectedStudent(student);
    setShowStudentProfile(true);
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
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term dynamically
          />
        </div>
      </header>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Displaying the students */}
      <div className="profiles-content">
        <div className="srollingProfiles">
          <div className="student-list">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.USN}
                  className={`student-card ${
                    selectedStudent.USN === student.USN ? "active" : ""
                  } `}
                  onClick={() => handleClickToMessage(student)}
                >
                  <p>
                    <strong>USN:</strong> {student.USN}
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

        {/* show student profile */}
        {showStudentProfile && (
          <IndividualProfile selectedStudent={selectedStudent} />
        )}
      </div>
    </div>
  );
};

export default Profiles;
