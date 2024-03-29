const { Request, Response } = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { checkRoleType } = require("../utils/validation");

const registerUser = async (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    role,
    postalCode,
    city,
    country,
  } = req.body;
  const errors = [];

  if (!role || role == "") {
    errors.push("Cannot have an empty type");
  } else {
    let validRoleType = checkRoleType(role);
    console.log(validRoleType);

    !validRoleType ? errors.push("Need to enter a valid type") : null;
  }
  // Check if firstName is filled out
  if (!firstName) {
    errors.push("First name is required");
  }

  // Check if lastName is filled out
  if (!lastName) {
    errors.push("Last name is required");
  }

  // Check if email is filled out
  if (!email) {
    errors.push("Email is required");
  }

  // Check if password is filled out
  if (!password) {
    errors.push("Password is required");
  }
  if (!postalCode) {
    errors.push("postalCode is required");
  }
  if (!city) {
    errors.push("city is required");
  }
  if (!country) {
    errors.push("country is required");
  }

  // If any errors are present, send the errors array in the response
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  const currentUser = await User.findOne({ email });

  if (currentUser) {
    errors.push("User already exists please enter a new email");
    return res.status(400).json({ errors });
  } else {
    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: req.body.password,
      city,
      country,
      postalCode,
      role,
    });

    //create the password hash
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const passwordHash = await bcrypt.hash(newUser.password, salt);

    //add the user hashed password to the object
    newUser.password = passwordHash;

    try {
      // Save the record to the database
      const savedUser = await newUser.save();

      res.status(200).json({ registerSuccess: true, user: savedUser });
      // console.log('Product saved:', savedProduct);
      // res.json({ msg: "my message" });
    } catch (error) {
      console.error("Error saving user:", error);
    }

    //   res.json(passwordHash);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const errors = {};
  // // //find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ email: "User Not Found" });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
      const token = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: 3600 * 1000 * 1000 * 20,
      });

      res.json({
        success: true,
        token: `${token}`,
      });
    } else {
      return res.status(404).json({ email: "Password incorrect" });
    }
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    // res.json(user);

    if (req.user._id != user._id.toHexString()) {
      res
        .status(500)
        .json({ message: "You are not authorized to view this resource" });
    } else {
      //tidy up the user object
      user._id = req.user._id;

      console.log(user);
      res.status(200).json({ user, success: true });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
