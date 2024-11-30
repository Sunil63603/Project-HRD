import React, { useState, useEffect } from "react";
import "./HR_Profiles.css";
import { useNavigate } from "react-router";
import IndividualProfile from "./IndividualProfile/IndividualProfile";

const Profiles = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const [selectedStrudent, setSelectedStrudent] = useState();
  const [showStudentProfile, setShowStudentProfile] = useState(false);

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
  const handleClickToMessage = (student) => {
    setShowStudentProfile(student);
    setShowStudentProfile(true);
    // navigate("/IndividualProfile");
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
      <div className="srollingProfiles">
        <div className="student-list">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div
                key={index}
                className="student-card"
                onClick={handleClickToMessage}
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

      {/* show student profile */}
      {showStudentProfile && <IndividualProfile />}
    </div>
  );
};

export default Profiles;

// import React, { useState } from "react";
// import "./HR_Profiles.css";

// const profiles = [
//   {
//     usn: "1SJ21CS150",
//     name: "John Doe",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   {
//     usn: "1SJ21CS151",
//     name: "Jane Doe",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   {
//     usn: "1SJ21CS180",
//     name: "Viki",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   {
//     usn: "1SJ21CS150",
//     name: "John Doe",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   {
//     usn: "1SJ21CS150",
//     name: "John Doe",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   {
//     usn: "1SJ21CS150",
//     name: "John Doe",
//     photo: "https://via.placeholder.com/100",
//     contact: "#",
//     whatsapp: "#",
//     linkedin: "#",
//   },
//   // Add more profiles as needed
// ];

// function App() {
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   return (
//     <div className="container">
//       <div className="profile-list">
//         <h2>Profiles</h2>
//         {profiles.map((profile, index) => (
//           <div
//             key={index}
//             className="profile-card"
//             onClick={() => setSelectedProfile(profile)}
//           >
//             <p>USN: {profile.usn}</p>
//             <p>Name: {profile.name}</p>
//           </div>
//         ))}
//       </div>
//       <div className="profile-details">
//         {selectedProfile ? (
//           <div className="details-box">
//             <img
//               src={selectedProfile.photo}
//               alt="Profile"
//               className="profile-photo"
//             />
//             <div className="profile-info">
//               <p>USN: {selectedProfile.usn}</p>
//               <p>Name: {selectedProfile.name}</p>
//               <div className="profile-icons">
//                 <a
//                   href={selectedProfile.contact}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <i className="fas fa-phone"></i>
//                 </a>
//                 <a
//                   href={selectedProfile.whatsapp}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <i className="fab fa-whatsapp"></i>
//                 </a>
//                 <a
//                   href={selectedProfile.linkedin}
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   <i className="fab fa-linkedin"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Select a profile to view details</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
