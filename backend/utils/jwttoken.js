const Sendtoken=(user,statusCode,resp)=>{
    let token= user.getJWTToken();

    // options for cookie

    const options={
        expires:new Date(
            Date.now() + process.env.COOKI_EXPIRE*24*60*60*1000 // it will be in mili second
        ),
        httpOnly:true
    }

    resp.status(statusCode).cookie("token",token,options).json({
        sucess:true,
        user,
        token
    })
}

module.exports=Sendtoken;