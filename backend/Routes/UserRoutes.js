const express=require('express');
const { registerUser, LoginUser } = require('../controller/usercontroller');
const router=express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(LoginUser);

module.exports=router;