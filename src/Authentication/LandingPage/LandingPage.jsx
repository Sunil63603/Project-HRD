import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // State to store fetched users

  const handlelog = () => {
    navigate('/login'); // Navigates to the login page
  };

  // ❌change this logic , because 'users' has been changed to 'registeredStudents' and 'registeredHRs' in db.json
  // Fetch users from JSON Server
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const usersData = await response.json();
      console.log(usersData); // Logs the users array from db.json
      setUsers(usersData); // Save users to state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Call fetchUsers on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>  
      <div className="container">
        <h2 className='left'>C O H O R T</h2>
        <header className="header">
          {/*❌ write two different functions .One is handle HR login and Another one is handle Student login */}
          <button className="headerButton" onClick={handlelog}>HR Login</button>
          <button className="headerButton" onClick={handlelog}>Student Login</button>
        </header>
        <h1 className="title">C O H O R T</h1>
        <h1 className="title">Student's Hub</h1>

        {/* Display the list of users (optional) */}
        {/* <div className="users-list">
          <h2>Registered Users:</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name} - Age: {user.age}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
}

export default LandingPage;
