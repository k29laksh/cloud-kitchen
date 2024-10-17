const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    foodItems: [{
        name: String,
        price: Number,
        description: String
    }],
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;