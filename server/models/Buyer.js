const mongoose = require('mongoose');

const BuyerSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' 
        }
    ],
    reviewsAdded:  [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],
})

module.exports = mongoose.model('Buyer', BuyerSchema);