import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";

// Define port
const port = 3000;

// Initialize express
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Define routes for
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//? Definie function to save users

//? Definie routes for /api/users to get users

//? Definie routes for /api/editUser to get edit information of users

// Start the server

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
