const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    max: 50,
    validate: [isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    min: [8, 'The password should be at least 8 characters long'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Users", userSchema);