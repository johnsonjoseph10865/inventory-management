const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    productName: {
        type: String,
        required: true,
    },

    sku: {
        type: String,
        required: true,
        unique: true,
    },

    category: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 0,
    },

    supplier: {
        type: String,
    },

    description: {
        type: String,
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Product", productSchema);