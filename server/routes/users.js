var express = require('express');
var router = express.Router();
const { register, login, loginFB } = require('../controllers/user-controller')

router.post('/signup', register)
router.post('/signin', login)
router.post('/loginfb', loginFB)

module.exports = router;
