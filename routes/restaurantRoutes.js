const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const {
  createRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurantController");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createRestaurant
);
router.get(
  "/all",

  getAllRestaurants
);
module.exports = router;
