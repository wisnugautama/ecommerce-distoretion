var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    itemId: [],
    quantitiy: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
})

var Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart