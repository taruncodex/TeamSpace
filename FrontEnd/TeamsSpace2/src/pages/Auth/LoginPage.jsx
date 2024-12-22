import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login_Register.css";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://teamspace.onrender.com/login", {
        email,
        password,
      });
      console.log("Response:", res);
      if (res.data.token) {
        // Assuming that the token is sent in the response and `msg` indicates success
        localStorage.setItem("token", res.data.token); // Store token in localStorage (if available)

        localStorage.setItem("userId", res.data.Data[0]._id); // Storing user ID
        console.log(res.data.Data[0]._id);
        console.log(res.data.token);

        setRedirect(true); // Set redirect flag to true after successful login
      } else {
        setError(res.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err); // To show the general error
      console.error("Login error:", err.response.data); // to catch the API error

      if (err.response) {
        // The request was made and the server responded
        setError(err.response.data?.msg || "Login failed");
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An error occurred while processing your request.");
      }
    }
  }
  if (redirect) {
    return <Navigate to="/Userspage" />;
  }

  return (
    <form className="form" onSubmit={handleLogin}>
      <h2>Login Form</h2>
      {error && <div className="error">{error}</div>}{" "}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <a href="#">Forgot Password?</a>
      <button>Login</button>
    </form>
  );
}
