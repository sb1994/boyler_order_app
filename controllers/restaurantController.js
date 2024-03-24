const User = require("../models/User");
const RestaurantProfile = require("../models/restaurant");
const { checkRoleType } = require("../utils/validation");

const createRestaurant = async (req, res) => {
  let {
    user, // ID of the restaurant owner user
    restaurant_name,
    cuisine_type,
    address,
    description,
    logo,
    foodSafetyUrl,
  } = req.body;
  console.log(req.user._id.toHexString());

  //check that the user exists

  let errors = [];
  const currentUser = await User.findById(req.user._id.toHexString()).select(
    "-password"
  );
  console.log(currentUser);

  currentUser === null || currentUser === undefined
    ? errors.push("User Doesn't exist please use a valid user")
    : null; //checks that it is a valid user type

  checkRoleType(currentUser.role) && currentUser.role === "restauranteur"
    ? console.log("you can create a restaurant")
    : errors.push(
        "You dont have a valid role type you cannot create a restaurant"
      );

  // console.log(errors);

  return res.status(200).json({ msg: req.body });
};
const getAllRestaurants = async (req, res) => {
  const allRestaurants = await RestaurantProfile.find({});

  console.log(allRestaurants);
  return res
    .status(200)
    .json({ msg: "this is the get all restaurants method" });
};

module.exports = { createRestaurant, getAllRestaurants };
