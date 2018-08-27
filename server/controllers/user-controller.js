var User = require('../models/user')
var jwt = require('jsonwebtoken')
var axios = require('axios')
var bcrypt = require('bcryptjs')
require('dotenv').config()

const register = (req,res) => {
    const { name,email,password } = req.body
    User.findOne({
        email: email
    })
        .then((user) => {
            if (user == null) {
                User.create({
                    name: name,
                    email: email,
                    password: password
                })
                    .then((new_user) => {
                        res.status(201).json({
                            message: `User Succesfully Registered`,
                            data: new_user
                        })
                    })
                    .catch((err) => {
                        re.status(400).json({
                            message: err.message
                        })
                    });
            }
            else {
                res.status(400).json({
                    message: `User Already Exist`
                })
            }

        })
        .catch((err) => {
            re.status(400).json({
                message: err.message
            })
        });
}

const login = (req,res) => {
    const { email, password } = req.body
    User.findOne({
        email: email
    })
        .then((user) => {
            if (user == null) {
                res.status(400).json({
                    message: `email / password is wrong!`
                })
            }else {
                let check_pass = bcrypt.compareSync(password, user.password);
                if (check_pass) {
                    let token = jwt.sign({ id: user._id, email: user.email, role: user.role}, process.env.jwt_secret)
                    res.status(200).json({
                        message: `User Succesfully login`,
                        token,
                        role: user.role
                    })
                }
                else {
                    res.status(400).json({
                        message: `email / password is wrong!`
                    }) 
                }
                
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const loginFB = (req,res) => {
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${req.body.accessToken}`
    axios.get(url_user_info)
        .then((response) => {
            User.findOne({
                email: response.data.email
            })
                .then((user) => {
                    if (user == null) {
                        User.create({
                            name: response.data.name,
                            email: response.data.email,
                            password: response.data.id
                        })
                            .then((new_user) => {
                                let token = jwt.sign({ id: new_user._id, email: new_user.email, role: user.role }, process.env.jwt_secret)
                                res.status(201).json({
                                    message: `User successfully login`,
                                    token
                                })
                            })
                            .catch((err) => {
                                res.status(400).json({
                                    message: err.message
                                })
                            });
                    }
                    else {
                        let token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.jwt_secret)
                        res.status(200).json({
                            message: `User successfully logged in`,
                            token
                        })
                    }

                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                });
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    
    
}

module.exports = {
    register,
    login,
    loginFB
}