const express = require('express');
const router = express.Router();
const {getUsers,createUser} = require('../controllers/user.controller');
const {authenticate} = require('../middleware/auth.middleware');
const {authorize} = require('../middleware/role.middleware')
router.get('/',authenticate,authorize('admin'),getUsers);
router.post('/createAdmin',authenticate,authorize('admin'),createUser('admin'));
router.post('/',createUser('user'));

module.exports = router;