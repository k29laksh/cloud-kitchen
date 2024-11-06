const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
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

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
    },

    city: {
        type: String,
    },

    state: {
        type: String,
    },

    pin: {
        type: Number,
    },

    payments: [{
        type: Schema.Types.ObjectId,
        ref: 'Payments'
    }],

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Reviews'
    }],

    // Cart embedded directly within the Customer schema
    cart: {
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            default: 0
        },
        deliveryCharge: {
            type: Number,
            default: 0 // You can add logic to calculate this based on order value or distance
        }
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    refreshToken: {
        type: String,
    },
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;