const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
// Assuming you've defined your userModel model

// Signup Route
authRouter.post("/signup", async (req, res) => {
  try {
    const { userModelname, email, password, role } = req.body;

    // Check if a userModel with the same email or userModelname already exists
    const existinguserModel = await userModel.findOne({
      $or: [{ email }, { userModelname }],
    });
    if (existinguserModel) {
      return res
        .status(400)
        .json({ message: "Email or userModelname already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new userModel
    const newuserModel = new userModel({
      userModelname,
      email,
      password: hashedPassword,
      role: role || "customer", // Default to 'customer' role if not specified
    });

    await newuserModel.save();

    // Create and send a JWT token for the newly registered userModel
    const token = jwt.sign({ userModelId: newuserModel._id }, "authuserModel"); // Replace with your actual secret key
    res
      .status(201)
      .json({ message: "userModel registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the userModel by email
    const userModel = await userModel.findOne({ email });

    // If the userModel is not found, return an error
    if (!userModel) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, userModel.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and send a JWT token for the authenticated userModel
    const token = jwt.sign({ userModelId: userModel._id }, "authuserModel"); // Replace with your actual secret key
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = authRouter;
