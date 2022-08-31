const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModal");

const gettoken=require('../utils/jwttoken');

// Register  a user

exports.registerUser = catchAsyncErrors(async (reqs, resp, next) => {
  const { name, email, password } = reqs.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profileurl",
    },
  });

  let token = user.getJWTToken();

//   resp.status(201).json({
//     success: true,
//     // user,
//     token,
//   });

  gettoken(user,200,resp)

});

// login user

exports.LoginUser = catchAsyncErrors(async (reqs, resp, next) => {
  let { email, password } = reqs.body;

  // checking if the user has give email and password

  if (!email || !password) {
    return next(new ErrorHander("please Enter Email and password", 404));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("invalid email and password", 401)); //401 unauthorized
  }

  const ispasswordmatched = await user.comparepassword(password);

  if (!ispasswordmatched) {
    return next(new ErrorHander("Invalid email and password ", 401));
  }

//   let token = user.getJWTToken();

//   resp.status(201).json({
//     success: true,
//     // user,
//     token,
//   });

  gettoken(user,200,resp);

});
