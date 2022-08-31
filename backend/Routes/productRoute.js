const express=require('express');
const { getAllProduct,createProduct, UpdateProduct, DeleteProduct, SingleProduct} = require('../controller/productController');
const router=express.Router();

router.route('/products').get(getAllProduct);

router.route('/product/new').post(createProduct);

router.route('/product/:id').put(UpdateProduct).delete(DeleteProduct).get(SingleProduct);

module.exports=router;