const User = require("../models/User");
const RestaurantProfile = require("../models/restaurant");
const { checkRoleType } = require("../utils/validation");

const createRestaurant = async (req, res) => {
  let {
    user, // ID of the restaurant owner user
    restaurant_name,
    cuisine_type,
    address,
    postaleCode,
    description,
    logo,
    foodSafetyUrl,
  } = req.body;
  // console.log(req.user._id.toHexString());

  //check that the user exists

  let errors = [];
  const currentUser = await User.findById(req.user._id.toHexString()).select(
    "-password"
  );
  // console.log(currentUser);

  currentUser === null || currentUser === undefined
    ? errors.push("User Doesn't exist please use a valid user")
    : null; //checks that it is a valid user type

  checkRoleType(currentUser.role) && currentUser.role === "restauranteur"
    ? null
    : errors.push(
        "You dont have a valid role type you cannot create a restaurant on the platform"
      );

  restaurant_name === null ||
  restaurant_name === undefined ||
  restaurant_name === ""
    ? errors.push("Please enter a valid Restaurant Name")
    : null;

  cuisine_type === null || cuisine_type === undefined || cuisine_type === ""
    ? errors.push("Please enter a valid Type of cuisine")
    : null;

  address === null || address === undefined || address === ""
    ? errors.push("Please enter a valid Address")
    : null;
  postaleCode === null || postaleCode === undefined || postaleCode === ""
    ? errors.push("Please enter a valid Postal Code")
    : null;
  description === null || description === undefined || description === ""
    ? errors.push("Please enter a description")
    : null;
  logo === null || logo === undefined || logo === ""
    ? errors.push("Please enter a logo")
    : null;
  foodSafetyUrl === null || foodSafetyUrl === undefined || foodSafetyUrl === ""
    ? errors.push(
        "Please enter a the URL to your food safety cert on Food Safty Ireland"
      )
    : null;

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const newRestaurant = await new RestaurantProfile({
    restaurant_name,
    description,
    address,
    postaleCode,
    logo,
    cuisine_type,
    foodSafetyUrl,
    user: req.user._id.toHexString(),
  });

  //save the new restaunt

  try {
    let savedRestaurant = await newRestaurant.save();
    return res.status(200).json({ savedRestaurant, success: true });
  } catch (error) {
    res.json(error);
  }
};
const getAllRestaurants = async (req, res) => {
  const allRestaurants = await RestaurantProfile.find({});

  console.log(allRestaurants);
  return res
    .status(200)
    .json({ msg: "this is the get all restaurants method" });
};
//gets all the restaurants owned by the current user being the restaruanteur
const getRestaurantByCurrentUserId = async (req, res) => {
  let { user } = req; //user on the token

  try {
    let listRestaurants = await RestaurantProfile.find({
      user: user._id,
    }).populate("user");
    return res.json(listRestaurants);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantByCurrentUserId,
};
