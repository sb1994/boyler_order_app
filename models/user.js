const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  role: {
    type: String,
    enum: ["delivery_driver", "client", "restauranteur", "admin"],
  },
  profile: {
    type: String,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", userSchema);
