const express = require('express');
const bearerToken = require('express-bearer-token');

const users = require('../controllers/users');
const recipes = require('../controllers/recipes');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(bearerToken());
router.use(auth);

router.get('/users/me', users.me);
router.post('/users/craft', users.craft);
router.put('/users/reset', users.reset);
router.get('/recipes', recipes.all);

module.exports = router;
