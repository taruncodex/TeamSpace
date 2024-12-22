import React, { useState } from "react";
import axios from "axios";
import "../styles/forgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://teamspace.onrender.com/api/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        {message && <p>{message}</p>}
        <input
          type="email"
          placeholder="Enter your email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
        <div className="back-to-login">
          <Link to={"/Authpage"}>Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
