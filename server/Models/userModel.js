const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  age: Number,
  phoneNumber: Number,
  password: String,
});
module.exports = mongoose.model("user", userSchema);
