// models/Review.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer', // Assuming you have a Customer model
        required: true
    },
    foodItem: {
        type: Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    foodImage: [{
        type: String,
        default: []
    }],
    likeCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Review', reviewSchema);