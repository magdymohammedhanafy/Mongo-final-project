const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is requires"],
    unique: [true, "product name must be unique"],
  },
  description: {
    type: String,
    required: [true, "descreption required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity required"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "price required"],
  },
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;
