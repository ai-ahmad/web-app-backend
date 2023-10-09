const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  title: String,
  description: String,
  ingredients: [String],
  image: String,
  id: Number,
  price: Number,
});

const shop = mongoose.model("shop", shopSchema);

module.exports = shop;
