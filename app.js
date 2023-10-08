const express = require("express");
const connection = require("./config/db");
const authRouter = require("./routes/authRoute");
const { verifyToken, logUserInfo } = require("./middlewares/auth");
const bodyParser = require("body-parser");
const randomstring = require("randomstring");
const dotenv = require("dotenv");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

dotenv.config();

// Define a route that responds with "Hello, World!"
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", verifyToken, logUserInfo, authRouter);

// Start the server
app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is listening on port ${port}`);
    console.log("mongo is connected");
  } catch (error) {
    console.log(error.message);
  }
});
