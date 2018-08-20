const router = require('express').Router()
const { pay } = require('../controllers/cart-controller')

router.post('/', pay)

module.exports = router