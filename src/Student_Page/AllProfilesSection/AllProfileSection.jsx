import "./AllProfileSection.css"; //Add your styling for AllProfiles.
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const AllProfileSection = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const { searchTerm } = useContext(SearchContext);

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
      } catch (err) {
        setError("Error fetching students data");
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on the search term dynamically
  const filteredStudents = students.filter((student) =>
    student.USN.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  let navigate = useNavigate();

  const handleViewProfile = (studentUSN) => {
    navigate(`/student/allprofiles/friendprofile?frndUSN=${studentUSN}`); //when student wants to message some friend
    //studentUSN is stored as searchParam , so that based on usn , friendProfile can be rendered.
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
              onClick={() => handleViewProfile(student.USN)}
              // onClick , open entire profile (not handling message)
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
  );
};

export default AllProfileSection;
