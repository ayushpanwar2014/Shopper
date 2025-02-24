const mongoose = require("mongoose");

//Schema for Product

const Product = mongoose.model('Products', {

    id:{
        type: Number,
        required: true,
        unique: true
    },

    name:{
        type: String,
        required: true,
    },

    image:{
        type: String,
        required: true,
    },

    category:{
        type: String,
        required: true
    },

    new_price:{
        type: Number,
        required: true
    },

    old_price:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },

    available:{
        type: Boolean,
        default: true
    },
})


module.exports = Product;