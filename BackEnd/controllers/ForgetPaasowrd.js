import "dotenv/config";
import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Refresh Token Use .
export const refreshToken = async (req, res) => {
  const refreshToken = req.headers.authorization?.split(" ")[1];
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = await User.findOne({ refreshToken });
    console.log(user.refreshToken);

    if (!user) return res.sendStatus(403);

    await jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign(
      { id: user.id, user: user.user },
      process.env.JWT_SECRET,
      { expiresIn: "5min" }
    );

    return res.status(201).json({
      message: "User Login Successfully. . .",
      Access_token: accessToken,
    });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tarunrathore200@gmail.com", // Replace with your Gmail address
    pass: "tbnr hzmp lkgi cvtl", // Replace with your Gmail App Password
  },
});

const sendResetEmail = async (email, token) => {
  try {
    const mailOptions = {
      to: email,
      from: "tarunrathore200@gmail.com",
      subject: "Reset Password OTP",
      text: token,
      html: `<h1>Reset Password</h1> ${token}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send reset email");
  }
};

export const forgotPassword = async (req, res) => {
  try {
    console.log("entered");
    const { email } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    console.log(user);
    console.log("Secret: ", process.env.JWT_SECRET);
    if (user) {
      const resetToken = jwt.sign(
        {
          id: user.id,
          name: user.user,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5min",
        }
      );

      user.resetToken = resetToken; // Storing the reset token inside the user record.
      await user.save();

      const user2 = await User.findOne({ email });

      console.log(user2);
      console.log(user2.resetToken);

      await sendResetEmail(user.email, resetToken);

      return res.json({
        message:
          "If a matching account was found, a password reset email has been sent.",
      });
    }
    return res.status(404).json({ message: "No User With this Email" });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Error is occuring ", error: error.message });
  }
};

// After getting the token from the email ,  enter the token and new passord into the resetPassword route
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token) {
    return res.status(400).json({ msg: "ResetToken is missing" });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired reset token" });
  }

  if (!newPassword) {
    return res.status(400).json({ msg: "New password is missing" });
  }

  try {
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    user.password = await hashPassword(newPassword);
    user.resetToken = null; // Update reset toke to null, As it should be used only once to reset the pasword.
    await user.save();
    return res.json({ msg: "Password Successfully updated." });
  } catch {
    return res.status(403).json({ message: "Invalid or expired reset token" });
  }
};
