// models/Homemaker.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homemakerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    kitchenName: { type: String },
    IFSCLicense: { type: String },
    city: { type: String },
    state: { type: String },
    pin: { type: Number },
    phone: { type: Number },
    veg: { type: Boolean },
    nonVeg: { type: Boolean },
    kitchenImage: { type: [String], default: [] },
    foodItems: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }], // Reference to FoodItems
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Reference to all Reviews
    createdAt: { type: Date, default: Date.now },
    refreshToken: { type: String }
});

module.exports = mongoose.model("Homemaker", homemakerSchema);