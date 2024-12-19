import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";

export default function RegisterPage() {
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
      
      const  res = await axios.post(`/sign-up`, {name, email, password, Full_Name});
      if (res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error("Something went Wrong")
    }
  }

  return (
    <div className="login-signin">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={Fullname}
            onChange={(e) => setFull_Name(e.target.value)}
            required
          />
        </div>
       
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone No.</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to={"/"}>Login</Link>
      </p>
    </div>
  );
}
