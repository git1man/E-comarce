const express = require('express');
const router = express.Router();
const {getSalesReport} = require('../controllers/reports.controller');
const {authorize} = require('../middleware/role.middleware');
const {authenticate} = require('../middleware/auth.middleware');

router.get('/',authenticate,authorize('admin'),getSalesReport);

module.exports = router;