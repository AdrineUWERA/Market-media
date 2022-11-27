const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    buyerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    }, 
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    rating: {
        type: 'number',
        required: true
    },
    comment: {
        type: 'string',
        required: true
    }
    
});

module.exports = mongoose.model('Review', ReviewSchema);