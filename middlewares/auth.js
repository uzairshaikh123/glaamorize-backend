// Import necessary modules
const jwt = require("jsonwebtoken");

// Middleware for user role-based access control
function checkUserRole(allowedRoles) {
  return (req, res, next) => {
    // Get the user's role from the JWT token (assuming you store it in the token)
    const userRole = req.user.role; // Assuming 'role' is part of your JWT payload

    // Check if the user's role is included in the allowedRoles array
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // If the user's role is allowed, proceed to the next middleware or route handler
    next();
  };
}

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization; // Assuming the token is sent in the Authorization header

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, "your-secret-key"); // Replace with your actual secret key

    // Attach the decoded token payload to the request for later use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Middleware to log user information
function logUserInfo(req, res, next) {
  const user = req.user;

  // Create a log entry with user information
  const logEntry = `User ID: ${user.userId}, Username: ${
    user.username
  }, Role: ${user.role}, Timestamp: ${new Date()}\n`;

  // Define the log file path
  const logFilePath = path.join(__dirname, "logs", "user_logs.txt"); // Change the filename as needed

  // Append the log entry to the log file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
    // Continue to the next middleware or route handler
    next();
  });
}

module.exports = {
  verifyToken,
  logUserInfo,
};
