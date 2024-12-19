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
      const res = await axios.post(`http://localhost:3000/sign-up`, {
        email,
        password,
        Fullname,
        phone,
      });
      if (res.data.success) {
        console.log(res.data.message);
      } else {
        console.log(res.data.message);
      }
      navigate("/AuthForm");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.log("Something went Wrong");
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

      <a href="#">Forgot Password ?</a>
      <button type="submit">Signup</button>
    </form>
  );
};

export default RegisterPage;
