const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    image: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    category: {
        type: 'string',
        enum: ['Food and Drinks', 'Electronics', 'Clothing', 'Personal Care', 'Fitness'],
    },                                                                                             
    unit: {
        type: 'string',
        required: true,
    },
    quantity: {
        type: 'number',
        required: true,
    },
    price: {
        type: 'number',
        required: true,
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
})

module.exports = mongoose.model('Product', ProductSchema);