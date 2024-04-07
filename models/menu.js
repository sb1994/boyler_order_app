const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants", // Reference to the Restaurant model
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      category: String,
      description: String,
      ingredients: [String],
      allergens: [String],
      calories: Number,
      available: { type: Boolean, default: true },
      nutritionalInfo: {
        fat: Number,
        protein: Number,
        carbohydrates: Number,
        fiber: Number,
      },
      isSpecial: { type: Boolean, default: false },
      price: { type: Number, required: true },
      imageUrl: String,
    },
  ],
  updated: { type: Date, default: Date.now }, // Updated property to track last update
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
