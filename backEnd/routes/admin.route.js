const express = require('express');
const router = express.Router();

const {createBackup,restore} = require('../controllers/backup-restore.controller');

router.get('/backup',createBackup);
router.post('/restore',restore);

module.exports = router;