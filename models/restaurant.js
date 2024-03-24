// models/RestaurantProfile.js
const mongoose = require("mongoose");

const restaurantProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }, //over of the
  restaurant_name: String,
  cuisine_type: String,
  address: String,
  description: String,
  logo: String,
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null }, // Ensure menu is required
  // other restaurant-specific fields
  bankStatement: Buffer,
  bankStatementVerified: { type: Boolean, default: false },
  contractSigned: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  contractId: String, // Added contract_id field
  foodSafetyUrl: String, // Added food_safety_url field
  created: {
    type: Date,
    default: Date.now,
  },
  updateProfilDate: {
    type: Date,
    default: Date.now,
  },
  updateByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = RestuarantProfile = mongoose.model(
  "restaurantprofiles",
  restaurantProfileSchema
);
