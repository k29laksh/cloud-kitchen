const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
    kitchenName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    IFSCLicense: {
        type: String,
        required: true
    },
    homemaker: {
        type: Schema.Types.ObjectId,
        ref: 'Homemaker'
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    kitchenImage: {
        type: String,
        required: true
    }
});

const Kitchen = mongoose.model("Kitchen", kitchenSchema);
module.exports = Kitchen;