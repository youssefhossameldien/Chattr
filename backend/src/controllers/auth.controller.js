import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ messaage: "Kindly Fill all the fields" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ messaage: "Password must be at least 8 characters long" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; /// this regex works most of the time
    if (!emailRegex.test(email)) {
      return res.status(400).json({ messaage: "Invalid Email adress" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ messaage: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email.trim(),
      password: hashedPassword,
      name: name.trim(),
    });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.name,
          process.env.CLIENT_URL
        );
      } catch (error) {
        console.log("Failed to send Welcome email");
      }
    } else {
      return res.status(400).json({ messaage: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in singup controller", error);
    res.status(500).json({ messaage: "Internal server error" });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ messaage: "Invalid Credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ messaage: "Invalid Credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signin controller", error);
    res.status(500).json({ messaage: "Internal server error" });
  }
};
export const signout = (_, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  res.status(200).json({ messaage: "Signout successful" });
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ messaage: "Profile pic is not found" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error);
    res.status(500).json({ messaage: "Internal server error" });
  }
};
