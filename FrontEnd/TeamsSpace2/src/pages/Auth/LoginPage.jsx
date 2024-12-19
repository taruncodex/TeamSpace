import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login_Register.css"
import axios from "axios";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);  // Add a state to handle redirection

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });

      if (res.data.success) {
        
        localStorage.setItem("token", res.data.token);  // Use 'res' instead of 'response'
        setRedirect(true);  // Set redirect to true after successful login
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;  // Redirect the user to the home page after login
  }

  return (
    <div className="form" onSubmit={handleLogin}>
      <h2>Login Form Form</h2>
     

      <input type="email" placeholder='Email' value={email}
        onChange={(e) => setEmail(e.target.value)} required/>
      
      <input type="password" placeholder='Password' value={password}
        onChange={(e) => setPassword(e.target.value)} required/>
      

      <a href="#">Forgot Password ?</a>
      <button>Login</button>

    </div>
  );
}
