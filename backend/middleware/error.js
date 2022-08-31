const ErrorHander = require("../utils/errorhander");

module.exports = (err, reqs, resp, next) => {
  err.statusCode = err.statusCode || 500; 
  err.message = err.message || "internal server Error";

  // wrong mongodb id error

  if (err.name === "CastError") {
    const message = `Resourse not found , Invalid : ${err.path}`;

    err = new ErrorHander(message, 404);
  }

  resp.status(err.statusCode).json({
    success: false,
    erroMessage: err.message,
    // error:err.stack
  });
};
