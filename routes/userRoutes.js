const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/userController");

router.get("/test", (req, res) => res.json({ msg: "Users Works" }));


router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;