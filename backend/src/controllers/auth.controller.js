import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
    const newUser = new User({ email, password: hashedPassword, name });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ messaage: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in singup controller", error);
    res.status(500).json({ messaage: "Internal server error" });
  }
};
