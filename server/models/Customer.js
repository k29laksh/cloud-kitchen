const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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