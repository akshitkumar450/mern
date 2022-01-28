const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "email is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "minimun of 6 length is required"],
  },
});

// hashing the password

// run before doc saved to db run only .save() /.create()
authSchema.pre("save", async function (next) {
  // this -> currently processing document
  // console.log(this, "user about to be created");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;
