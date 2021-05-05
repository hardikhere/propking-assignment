const mongoose = require("mongoose");

// we will use default _id by mongodb
const LandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    }
}, { timestamps: true });

const Land = mongoose.model("Land", LandSchema);
module.exports = Land