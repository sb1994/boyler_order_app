const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllMenus,
  getSelectedMenuByID,
  filterMenusByCategory,
  createMenu,
} = require("../controllers/menuController");

// Route to get all menus
router.get("/", getAllMenus);

// Route to get a specific menu by ID
router.get("/:menuId", getSelectedMenuByID);

// Route to filter menus by category
router.get("/category/:category", filterMenusByCategory);

// Route to create a new menu
router.post("/", passport.authenticate("jwt", { session: false }), createMenu);

module.exports = router;
