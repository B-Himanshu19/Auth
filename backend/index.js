const express = require("express");
const app = express();
const { DBconnection } = require("./database/db");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

DBconnection(); // Connect to the database
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("Hello World is coming from backend index.js!");
});

app.post("/register", async (req, res) => {
  try {
    console.log("📥 Incoming registration body:", req.body);

    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("Please enter all the info!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with same email!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const userData = user.toObject();
    userData.token = token;
    delete userData.password;

    res.status(200).json({
      message: "You have registered successfully!",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

//mongo dbf cluster 27017 by default
// To connect to MongoDB, you would typically use a library like mongoose or the native Mongo
