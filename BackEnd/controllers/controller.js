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
    const { userName, password, email, phone } = req.body;

    if (!userName || !password || !email || !phone) {
      return res
        .status(401)
        .json("userName , password, email and phone all details are required.");
    }

    //Checking if this Email Already Exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: " This email already exists." });
    }

    //Checking if this phone no. Already Exists
    const existingPhone = await User.findOne({ phone: phone });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: " This phone number already exists." });
    }

    // Hasing the Password
    const hashedPassword = await hashPassword(password);

    // Finally Creaate a new User.
    await User.create({ userName, password: hashedPassword, email, phone }); // using User.create to create the User record inside the collection

    return res.json("Your Account Created Successfully.");
  } catch (error) {
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

    if (isValidPass) {
      const token = jwt.sign(
        // Payload
        {
          id: user[0]._id,
          name: user[0].userName,
        },
        //Server Side Password
        process.env.JWT_SECRET,

        // Expiration Time
        {
          expiresIn: "10min",
        }
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
      });
    }

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
