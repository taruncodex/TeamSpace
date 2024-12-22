import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/forgotPassword.css";
import { useSearchParams, useNavigate } from "react-router-dom"; // useSearchParams for token from URL

const ForgotResetPassword = () => {
  const [email, setEmail] = useState(""); // Email for Forgot Password
  const [newPassword, setNewPassword] = useState(""); // New password for Reset Password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password for Reset Password
  const [message, setMessage] = useState(""); // For success or error messages
  const [isForgotPassword, setIsForgotPassword] = useState(true); // State to toggle between Forgot Password and Reset Password forms
  const [resetToken, setResetToken] = useState(null); // To store the reset token
  const [searchParams] = useSearchParams(); // To get token from URL
  const token = searchParams.get("token"); // Extract token from URL
  const navigate = useNavigate(); // For navigation after reset success

  // Handle Forgot Password form submission
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://teamspace.onrender.com/api/forgot-password `,
        { email }
      );
      setMessage(response.data.message); // Success or error message
    } catch (error) {
      setMessage("Token sent to your Email Successfully");
    }
  };

  // Handle Reset Password form submission
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `https://teamspace.onrender.com/api/reset-password`,
        {
          token,
          newPassword,
        }
      );
      setMessage(response.data.message); // Success message
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setMessage("Invalid or expired reset token.");
    }
  };

  // Set the token if it's in the URL (for reset password)
  useEffect(() => {
    if (token) {
      setResetToken(token);
      setIsForgotPassword(false); // Switch to reset password form if token exists
    }
  }, [token]);

  return (
    <div className="auth-container">
      {/* Forgot Password Form */}
      {isForgotPassword ? (
        <div>
          <h2>Forgot Password</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <div className="back-to-login">
            <button onClick={() => setIsForgotPassword(false)}>
              Back to Reset
            </button>
          </div>
        </div>
      ) : (
        // Reset Password Form
        <div>
          <h2>Reset Password</h2>
          {message && <p>{message}</p>}
          {resetToken && (
            <form onSubmit={handleResetPasswordSubmit}>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Reset Password</button>
            </form>
          )}
          <div className="back-to-forgot-password">
            <button onClick={() => setIsForgotPassword(true)}>
              Back to Forgot Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotResetPassword;
