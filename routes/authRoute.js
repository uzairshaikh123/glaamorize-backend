const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const dotenv = require("dotenv");

dotenv.config();
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

// Generate a random OTP
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Store OTPs temporarily (You might want to use a database for this)
const otpStorage = {};

// POST route to send OTP to user's email
authRouter.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const otp = generateOTP();

  // Store OTP
  otpStorage[email] = otp;

  // Create email message
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Your OTP for Password Reset",
    text: `Your OTP for password reset is: ${otp}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// POST route to verify OTP and reset password
authRouter.post("/verify-otp", (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Verify OTP
  if (otpStorage[email] === otp) {
    // Reset password logic here (update in the database, for example)
    // In this example, we're just printing the new password
    console.log(`New password for ${email}: ${newPassword}`);

    // Clear OTP
    delete otpStorage[email];

    res.status(200).json({ message: "Password reset successful" });
  } else {
    res.status(401).json({ error: "Invalid OTP" });
  }
});

module.exports = authRouter;
