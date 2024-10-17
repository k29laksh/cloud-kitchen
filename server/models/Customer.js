const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    payments: [{
        type: Schema.Types.ObjectId,
        ref: 'Payments'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

    refreshToken: {
        type: String,
    },

    password: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;