const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    kitchen: {
        type: Schema.Types.ObjectId,
        ref: 'Kitchen'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reviews = mongoose.model("Reviews", ReviewSchema);
module.exports = Reviews;