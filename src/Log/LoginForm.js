import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  const handlelog1 = () => {
    navigate('/login1'); // Navigates to the login1 page
  };

  return (
    <div className="head">
      <button className="headButton" onClick={handlelog1}>H R Login</button>
      <button className="headButton" onClick={handlelog1}>Student Login</button>
    </div>
  );
}

export default LoginForm;
