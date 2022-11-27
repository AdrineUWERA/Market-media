const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    buyerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    phoneNumber: {
        type: 'string',
        required: true
    },
    shippingAddress: {
        type: 'string',
        required: true
    },
    shippingMethod: {
        type: 'string',
        required: true
    }
    
})

module.exports = mongoose.model('Order', OrderSchema);