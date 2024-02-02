const mongoose = require("mongoose");
const { Schema } = mongoose;

//user schema for storing user in the database
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  creation: { type: Date, default: new Date().toDateString() },
  bio: { type: String, required: true },
  education: { type: String, required: true },
  links: { type: Array, default: [], required: true },
  projects: { type: Array, default: [], required: true },
  funfact: { type: String, default: "", required: true },
});

const User = mongoose.model("users",userSchema)
module.exports = User 