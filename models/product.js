const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    offPrice: {
        type: String,
        required: true,
        trim: true
    },
    descrip: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    seller: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product', ProductSchema);
