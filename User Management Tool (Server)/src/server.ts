import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import axios from "axios";
import cors from "cors";
import User from "./models/userModel";
import { createObjectCsvWriter } from "csv-writer";

// Define port
const port = 3000;

// Initialize express
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "*",
  })
);

// Define routes for
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// type of Users
type UserInfo = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

//? Definie function to save users

const saveUsers = async (): Promise<void> => {
  try {
    const response = await axios.get("https://gorest.co.in/public-api/users");

    if (response.status !== 200) {
      throw new Error("Error getting users");
    }

    const users = response.data;

    const savedUsers = await Promise.all(
      users.map(async (user: UserInfo) => {
        const newUser = new User(user);
        return await newUser.save();
      })
    );
    console.log("Users saved successfully:", savedUsers);
  } catch (e) {
    console.log(e);
  }
};

//? Definie routes for /api/users to get users
app.get("/getUsers", async (req, res) => {
  try {
    // Make a GET request to fetch the users

    // await saveUsers();

    const users = await User.find();

    console.log(users);

    // Handle the response data

    res
      .status(200)
      .json({ message: "Users fetched successfully", users: users });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Error getting users", error: `Error is ${e}` });
  }
});

//? Definie routes for /api/editUser to get edit information of users
app.put("/editUser", async (req, res) => {
  const userId = req.body.id;
  const name = req.body.name;
  const gender = req.body.gender;
  const email = req.body.email;
  const status = req.body.status;

  console.log(req.body);

  try {
    // Find the user by their ID and update their data
    const updatedUser = await User.findOneAndUpdate({ id: userId }, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ status: "User Updated succefully.", newUser: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET /export endpoint
app.get("/exportUsers", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Create a CSV writer
    const csvWriter = createObjectCsvWriter({
      path: "users.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "status", title: "Status" },
        { id: "gender", title: "Gender" },
        { id: "email", title: "Email" },
      ],
    });

    // Write users to the CSV file
    await csvWriter.writeRecords(users);

    // Set response headers for CSV download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    // Send the CSV file as the response
    res.download("users.csv");
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start the server

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
