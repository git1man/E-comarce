const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const {authenticate} = require('../middleware/auth.middleware');

router.post('/products/by-ids', async (req, res) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  res.json({ message: 'Success', data: products });
});

router.get('/' , cartController.getCart);              
router.post('/add', cartController.addToCart);
router.put('/update',  cartController.updateCart);    
router.delete('/remove',  cartController.deleteFromCart);

module.exports=router;