const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true
    },
    homemaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homemaker',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    },
    deliveryCharge: {
        type: Number,
        default: 0 // Add logic to calculate this based on order value or distance
    }
});

module.exports = mongoose.model('Cart', cartSchema);