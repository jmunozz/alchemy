const express = require('express');
const users = require('../controllers/users');

const router = express.Router();

router.post('/users/token', users.token);
router.post('/users', users.create);

module.exports = router;
