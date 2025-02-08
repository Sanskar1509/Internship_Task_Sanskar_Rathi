import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedIn");
    if (loggedInUser) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find((user) => user.email === email && user.password === password);
    
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    
    localStorage.setItem("loggedIn", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg w-50">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control my-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <div className="input-group my-2">
            <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-center mt-2">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;