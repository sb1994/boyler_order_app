const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/userController");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current",passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;