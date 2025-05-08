const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi"); 

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    
    { expiresIn: "1h" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName:  Joi.string().required(),
    email:     Joi.string().email().required(),
    password:  Joi.string().min(6).required()
  });

  return schema.validate(user);
};

module.exports = { User, validate };
