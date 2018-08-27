const Cart = require('../models/cart')
const Item = require('../models/item')
const jwt = require('jsonwebtoken')

const pay = (req,res) => {
    const { item, total_price } = req.body
    let quan = 0
    for (let i = 0; i < req.body.item.length; i++) {
        quan += +req.body.item[i].quantity
    }
    var token = req.headers.token
    var decoded = jwt.verify(token, 'smbvabvlue')
    Cart.create({
        userId: decoded.id,
        itemId: item,
        quantity: quan,
        total_price: total_price
    })
        .then((invoice) => {
            res.status(201).json({
                message: `payment success`,
                data: invoice
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

module.exports = {
    pay
}