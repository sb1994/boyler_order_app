const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getAllMenus,
  getSelectedMenuByID,
  filterMenusByCategory,
  createMenu,
  getSelectedMenuByRestaurantID,
  deleteMenus,
} = require("../controllers/menuController");

// Route to get all menus
router.get("/", getAllMenus);

// Route to get a specific menu by ID
router.get("/:menuId", getSelectedMenuByID);

router.get("/restaurant/:restaurant", getSelectedMenuByRestaurantID);

// Route to filter menus by category
router.get("/category/:category", filterMenusByCategory);

// Route to create a new menu
router.post("/", passport.authenticate("jwt", { session: false }), createMenu);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteMenus
);

module.exports = router;
