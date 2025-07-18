const express = require('express');
const router = express.Router();
const {
    getProducts,
    createPoduct,
    getProductById,
    getRelatedProducts,
    getSortedProducts,
    getSearchProduct,
    updateProduct
} = require('../controllers/product.controller');
const {authenticate} = require('../middleware/auth.middleware');
const {authorize} = require('../middleware/role.middleware');
const {upload} = require('../middleware/upload.middleware');
const paginate = require('../middleware/paginate.middleware')
const Product = require('../models/product.model');

router.get('/', paginate(Product),getProducts); 
router.get('/sorted',getSortedProducts)
router.get('/search',getSearchProduct)
router.get('/:id',getProductById);
router.get('/related/:id',getRelatedProducts);
router.post('/',authenticate,authorize('admin'),upload.single('img'),createPoduct);
router.put('/:id', authenticate, authorize('admin'), updateProduct);


module.exports = router;