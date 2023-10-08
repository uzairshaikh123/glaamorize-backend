const express = require("express");
const connection = require("./config/db");
const authRouter = require("./routes/auth");
const { verifyToken, logUserInfo } = require("./middlewares/auth");
const app = express();
const port = 3000;
app.use(express.json());
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
