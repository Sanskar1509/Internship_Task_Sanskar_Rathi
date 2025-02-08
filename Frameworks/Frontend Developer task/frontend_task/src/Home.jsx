import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedIn"));
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login"); 
  };

  return (
    <div className="container text-center">
      <h2>Welcome to the Home Page</h2>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
