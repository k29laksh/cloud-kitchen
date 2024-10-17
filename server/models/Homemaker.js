const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homemakerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        requires: true
    },

    email: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    State: {
        type: String,
        required: true
    },

    Pin: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    refreshToken: {
        type: String,
    },

    kitchen: {
        type: Schema.Types.ObjectId,
        ref: 'Kitchen'
    }
});

const Homemaker = mongoose.model("Homemaker", homemakerSchema);
module.exports = Homemaker;