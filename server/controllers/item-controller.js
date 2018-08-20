const Item = require('../models/item')

const addItem = (req,res) => {
    const { name, price, stock, image } = req.body
    Item.create({
        name: name,
        price: price,
        stock: stock,
        image: image
    })
        .then((item) => {
            res.status(201).json({
                message: `Successfully Add an Item`,
                data: item
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
}

const getOneItem = (req,res) => {
    const { id } = req.params
    Item.findOne({
        _id: id
    })
        .then((item) => {
            res.status(201).json({
                message: `ini itemnya`,
                data: item
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
}

const getAllitem = (req,res) => {
    Item.find()
        .then((data_item) => {
            res.status(200).json({
                message: `items list`,
                data: data_item
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
}

const updateItem = (req,res) => {
    const { name, price, stock, image } = req.body
    Item.updateOne({
        _id: req.params.id
    },{
        name: name,
        price: price,
        stock: stock,
        image: image
    })
        .then(() => {
            res.status(201).json({
                message: `item succesfully edited!`
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const removeItem = (req,res) => {
    const { id } = req.params
    Item.deleteOne({
        _id: id
    })
        .then(() => {
            res.status(201).json({
                message: `item succesfully deleted!`
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

module.exports = {
    addItem,
    removeItem,
    updateItem,
    getAllitem,
    getOneItem
}