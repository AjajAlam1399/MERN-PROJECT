const mongoose = require("mongoose");
const Validator = require("validator");
const Bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken');

const userSchmas = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the user name"],
    trim: true,
    maxLength: [50, "Name cannot exceed 50 charcter"],
    minLength: [4, "Name should have minimum length 4"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [Validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Your password should have minimum length 8"],
    maxLength: [32, "Max length of password should not exceed 32 chracter"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetpasswordToken: String,
  resetpasswordExpire: Date,
});

userSchmas.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await Bcryptjs.hash(this.password, 10);
  }
});


// creating a token

userSchmas.methods.getJWTToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  })
}

// compare password

userSchmas.methods.comparepassword=async function(enterpassword){
  return await Bcryptjs.compare(enterpassword,this.password);
}

module.exports = mongoose.model("user", userSchmas);
