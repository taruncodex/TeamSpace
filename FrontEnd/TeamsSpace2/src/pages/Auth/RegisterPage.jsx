import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

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
      
      const  res = await axios.post(`/sign-up`, { email, password, Fullname,phone});
      if (res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
      navigate("/AuthForm");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error("Something went Wrong")
    }
  }

  return (
    <div className="form" onSubmit={handleRegister}>
      <h2>Register Form</h2>
      <input type="text" placeholder='Full Name' value={Fullname}
        onChange={(e) => setFull_Name(e.target.value)} required/>

      <input type="email" placeholder='Email' value={email}
        onChange={(e) => setEmail(e.target.value)} required/>
      <input type="phone" placeholder='Phone' value={phone}
        onChange={(e) => setPhone(e.target.value)} required/>
      <input type="password" placeholder='Password' value={password}
        onChange={(e) => setPassword(e.target.value)} required/>
      <input type="text" placeholder='Confirm Password' value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} required/>

      <a href="#">Forgot Password ?</a>
      <button>Signup</button>

    </div>
  )
}

export default RegisterPage