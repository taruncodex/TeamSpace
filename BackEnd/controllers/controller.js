import "dotenv/config";
import { User } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Hasing the Password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare the Hash passwords.
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// "/sign-up" route logic to create User.
export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password, email, phone } = req.body;

    console.log("checking the details");
    if (!userName || !password || !email || !phone) {
      return res.status(400).json({
        message: "userName, password, email, and phone are required.",
      });
    }

    console.log("checking the email");
    //Checking if this Email Already Exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: " This email already exists." });
    }
    console.log("checking the phone number");

    //Checking if this phone no. Already Exists
    const existingPhone = await User.findOne({ phone: phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ error: " This phone number already exists." });
    }

    console.log("Hasing the password");

    // Hasing the Password
    const hashedPassword = await hashPassword(password);
    console.log("Creating the user");

    // Finally Creaate a new User.
    await User.create({
      userName: userName,
      password: hashedPassword,
      email: email,
      phone: phone,
    }); // using User.create to create the User record inside the collection
    console.log("user created");
    return res.json("Your Account Created Successfully.");
  } catch (error) {
    console.log("Error occur ");
    return res.json({
      message: "Error Occures.",
      error: error.message,
    });
  }
};
// "LogIn" route logic to logIn user.
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ error: "Email and Password details are required." });
    }

    // Fetching the User Data
    const user = await User.find({ email: email });

    // If the User do not Exists.
    if (user.length == 0) {
      return res.status(404).json("NO RECORD FOUND. ");
    }

    // Checking the Password of the User
    const isValidPass = await comparePassword(password, user[0].password);

    console.log("Jwt secret: ", process.env.JWT_SECRET);
    if (isValidPass) {
      // Creating the Access Token.
      const token = jwt.sign(
        { id: user[0]._id, name: user[0].userName, email: user[0].email },
        process.env.JWT_SECRET,
        { expiresIn: "100min" }
      );
      // Creating refresh token
      const refreshToken = jwt.sign(
        { id: user[0]._id, for: "Refresh" },
        process.env.JWT_SECRET,
        {
          expiresIn: "28 days",
        }
      );

      // Save the refreshtoken in the user record
      user[0].refreshToken = refreshToken;
      await user[0].save();

      // After completing everything return the respond to the user
      return res.status(201).json({
        msg: "Token is verifined So you can enter into the TeamSpace.",
        Data: user,
        token: token,
      });
    }

    // If the password does not match
    return res.status(401).json({
      message: "User Details are wrong. . .",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Occures.",
      error: error.message,
    });
  }
};

export const homePage = async (req, res) => {
  try {
    return res.status(401).json({
      message: "This is homePage",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error Occures.",
      error: error.message,
    });
  }
};
