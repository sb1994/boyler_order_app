
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
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
    enum: ["delivery_driver", "client","restauranteur",],
    default: "client",
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", userSchema)