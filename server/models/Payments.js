const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

const Payments = mongoose.model("Payments", PaymentSchema);
module.exports = Payments;