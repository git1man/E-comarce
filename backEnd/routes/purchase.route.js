const express = require('express');
const router = express.Router();
const {getUserPurchases,buyProduct,getAllUserPurchases,makePurchase} = require('../controllers/purchase.controller');
const {authorize} = require('../middleware/role.middleware');
const {authenticate} = require('../middleware/auth.middleware');

router.get('/',authenticate,authorize('user'),getUserPurchases);
router.post('/',authenticate,authorize('user'),makePurchase);

router.get('/allpurchase',authenticate,authorize('admin'),getAllUserPurchases);
module.exports = router;