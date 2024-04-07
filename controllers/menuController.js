const User = require("../models/User");
const Menu = require("../models/menu");
const Restaurant = require("../models/restaurant");
const passport = require("passport");

const getAllMenus = async (req, res) => {
  const allMenus = await Menu.find({}).populate("restaurant");
  res.json({ allMenus });
};

const getSelectedMenuByID = async (req, res) => {
  let { menuId } = req.params;

  const errors = [];

  console.log(menuId);

  try {
    const menu = await Menu.findById(menuId).populate("restaurant");

    // console.log(menu);
    res.status(200).json({ menu, getMenuSuccess: true });
  } catch (error) {
    errors.push("menu not found");
    res.status(404).json({ error });
  }
};
const getSelectedMenuByRestaurantID = async (req, res) => {
  let { restaurant } = req.params;
  // console.log(restaurant);

  const errors = [];

  try {
    const menu = await Menu.findOne({ restaurant }).populate("restaurant");

    console.log(menu);
    res.status(200).json({ menu, getMenuSuccess: true });
  } catch (error) {
    console.log(error);
    errors.push("menu not found");
    res.status(404).json({ msg: "Menu not found" });
  }
};

const filterMenusByCategory = async (req, res) => {
  res.json({ msg: "hello" });
};

const createMenu = async (req, res) => {
  let { _id } = req.user;
  let { restaurant, items } = req.body;

  const errors = [];
  ////////check that the user has created a restaurant and they have a restauraneur role

  //checks based on the resID and userID as user can have mutiple restaurants
  const hasRestaurant = await Restaurant.findOne({
    user: _id,
    _id: restaurant,
  });

  // console.log(hasRestaurant);
  if (!hasRestaurant) {
    errors.push("You don't own a restaurant you cannot create a Menu");
    res.status(404).json({ errors });
  }

  if (hasRestaurant.menu !== null) {
    errors.push(
      "Menu has already been created for this restaurant, you cannot create a Menu. Please update your Menu"
    );
    res.status(404).json({ errors });
  }
  if (items.length > 0) {
    // console.log(items);
    try {
      //create the menu and add the id to thhe restaurant model
      let newMenu = new Menu({ restaurant, items });

      console.log(newMenu);
      let savedMenu = await newMenu.save();

      //create

      let { _id } = savedMenu;
      console.log(_id);

      // add the menu to the restaurant model
      let updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurant,
        { $set: { menu: _id } },
        { new: true }
      );

      res.status(200).json({
        addMenuSuccess: true,
        updatedRestaurant,
        msg: "Successfully added Menu for your restaurant",
      });
    } catch (error) {
      res.status(500).json(error);
    }
    // console.log(savedMenu);
  } else {
    errors.push("To create menu, please add food items");
    res.status(404).json({ errors });
  }
};

const deleteMenus = async (req, res) => {
  const deletedMenus = await Menu.deleteMany({});

  // add the menu to the restaurant model
  let updatedRestaurant = await Restaurant.findByIdAndUpdate(
    "66130ca52cb7f7ce940404de",
    { $set: { menu: null } },
    { new: true }
  );

  res.status(200).json({
    updatedRestaurant,

    msg: "Successfully deleted all menus and update the restaurant record 66130ca52cb7f7ce940404de",
  });
};

module.exports = {
  createMenu,
  filterMenusByCategory,
  getSelectedMenuByID,
  getAllMenus,
  getSelectedMenuByRestaurantID,
  deleteMenus,
};
