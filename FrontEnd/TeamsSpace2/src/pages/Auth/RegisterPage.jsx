import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login_Register.css";

const RegisterPage = () => {
  const [Fullname, setFull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `https://teamspace.onrender.com/sign-up`,
        { email, password, userName: Fullname, phone },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Log the entire response to inspect it
      console.log("Response:", res);

      // Since the backend returns a string, check if it contains a success message
      if (res.data && res.data.includes("Successfully")) {
        alert("Your Account Created Successfully.");
        console.log(res.data); // Success message
        navigate("/Authpage", { state: { isLogin: true } });
      } else {
        console.log(res.data || "Something went wrong.");
      }
    } catch (err) {
      // Handle errors (server or network errors)
      console.log("API Error : ", err.response?.data);
      if (err.response) {
        // Server responded with an error
        setError(err.response?.data?.message || "Registration failed");
        console.log("Error response:", err.response);
      } else if (err.request) {
        // No response was received
        setError("No response from server. Please try again.");
        console.log("Request error:", err.request);
      } else {
        // Other errors (e.g., invalid setup)
        setError("Something went wrong.");
        console.log("General error:", err.message);
      }
    }
  }

  return (
    <form className="form" onSubmit={handleRegister}>
      <h2>Register Form</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Full Name"
        value={Fullname}
        onChange={(e) => setFull_Name(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default RegisterPage;
