const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures");

//create product  --Admin

exports.createProduct = catchAsyncErrors(async (reqs, resp, next) => {
  const product = await Product.create(reqs.body);

  resp.status(200).json({
    success: true,
    product,
  });
});

// get all the product

exports.getAllProduct = catchAsyncErrors(async (reqs, resp, next) => {

  const resultPerpage=5;
  const apifeature=new  Apifeatures(Product.find(),reqs.query).search().filter().pagination(resultPerpage);
  const result = await apifeature.query;

  const productcount=await Product.countDocuments(); 

  resp.status(200).json({
    success: true,
    result,
    productcount,
  });
});

// update product --Admin

exports.UpdateProduct = catchAsyncErrors(async (reqs, resp, next) => {
  let product = await Product.findById(reqs.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  } else {
    product = await Product.findByIdAndUpdate(reqs.params.id, reqs.body, {
      new: true,
      runValidators: true,
    });
    resp.status(200).json({
      success: true,
      product,
    });
  }
});

// Delete product --Admin

exports.DeleteProduct = catchAsyncErrors(async (reqs, resp, next) => {
  let product = await Product.findById(reqs.params.id);

  if (!product) {
    return next(new ErrorHander("product not found", 404));
  } else {
    await product.remove();

    resp.status(200).json({
      success: true,
      message: "product has been deleted !",
    });
  }
});

// get single product detail

exports.SingleProduct = catchAsyncErrors(async (reqs, resp, next) => {
  let product = await Product.findById(reqs.params.id);

  if (!product) {
    return next(new ErrorHander("product not found", 404));
  } else {
    resp.status(200).json({
      success: true,
      product,
    });
  }
});
