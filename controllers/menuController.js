const User = require("../models/User");
const Menu = require("../models/menu");
const Restaurant = require("../models/restaurant");
const passport = require("passport");

const getAllMenus = async (req, res) => {
  const allMenus = await Menu.find({});
  res.json({ allMenus });
};

const getSelectedMenuByID = async (req, res) => {
  let { id } = req.params;

  console.log(id);
  res.json({ msg: id });
};

const filterMenusByCategory = async (req, res) => {
  res.json({ msg: "hello" });
};

const createMenu = async (req, res) => {
  let { _id } = req.user;
  let { restaurant_id, items } = req.body;

  const errors = [];
  ////////check that the user has created a restaurant and they have a restauraneur role

  //checks based on the resID and userID as user can have mutiple restaurants
  const hasRestaurant = await Restaurant.find({
    user: _id,
    _id: restaurant_id,
  });

  if (!hasRestaurant) {
    errors.push("You don't own a restaurant you cannot create a Menu");
    res.status(404).json({ errors });
  } else {
    if (hasRestaurant.length > 1) {
      // errors.push
    }
  }

  let newMenu = new Menu({ restaurant_id, items });

  res.json(newMenu);
};

module.exports = {
  createMenu,
  filterMenusByCategory,
  getSelectedMenuByID,
  getAllMenus,
};
