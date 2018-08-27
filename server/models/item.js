var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    image: {
        type: String,
        default: 'https://images-na.ssl-images-amazon.com/images/I/51AYJIDslHL._SY879_.jpg'
    }
})

var Item = mongoose.model('Item', itemSchema)

module.exports = Item