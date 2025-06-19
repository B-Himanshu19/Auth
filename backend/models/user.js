const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
    required: true,
  },
  lastName: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    default: null,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema); // Define the user schema with fields like firstName, lastName, email, password, etc.
// This schema will be used to create a User model that interacts with the MongoDB database.
