const express = require('express');
const users = require('../controllers/users');

const router = express.Router();

router.post('/users', users.create);
router.post('/users/token', users.token);


module.exports = router;
