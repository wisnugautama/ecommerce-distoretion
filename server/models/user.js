var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
},{
    timestamps: true
})

userSchema.pre('save', function(next){
    var hash = bcrypt.hashSync(this.password, 10);
    this.password = hash
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User