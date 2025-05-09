
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, 'secrect', {
    expiresIn: "1h",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
