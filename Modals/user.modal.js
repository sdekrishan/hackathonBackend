const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 30,
      minLength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
  },
  {
    versionKey: false,
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;