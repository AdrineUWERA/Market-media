const mongoose = require('mongoose');

const SellerSchema = mongoose.Schema({
    image: {
        type: 'string',
        required: true,
    },
    businessName: {
        type: 'string',
        required: true,
    },
    businessDescription: {
        type: 'string',
        required: true,
    },
    webLink: {
        type: 'string', 
    },
    socialMediaLink: {
        type: 'string', 
    },
    businessEmail: {
        type: 'string',
        required: true,
    },
    phoneNumber: {
        type: 'string',
        required: true,
    },
    province: {
        type: 'string',
        required: true,
    },
    district: {
        type: 'string',
        required: true,
    },
    streetAddress: {
        type: 'string'
    },
    otherAddressDescription: {
        type: 'string', 
    },
    legalDocument: {
        type: 'string',
        required: true,
    },
    applicationStatus: {
        type: 'string',
        enum: ['Approved', 'Rejected', 'Pending']
    },
    addedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    ordersReceived: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ], 
    reviewsReceived: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],

})

module.exports = mongoose.model('Seller', SellerSchema);