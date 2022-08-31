const mongoose = require("mongoose");

const productSchemas = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Proudct Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the product Price"],
    maxLength: [8, "price can not exceed 8 figure"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter the product catogery"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the product count"],
    maxLength: [4, "Stock cannot exceed 4 chracters"],
    default: 1,
  },
  numofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required:[true]
      },
      rating:{
        type:Number,
        required:[true],
        default:0
      },
      Comment:{
        type:String,
        required:[true]
      }
    },
  ],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports=mongoose.model("ProductCollection",productSchemas);
