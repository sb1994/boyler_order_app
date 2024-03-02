const { Request, Response } =require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    let { firstName, lastName, email, password, role,postalCode,city, country} = req.body;
    const errors = [];
  
    if(!role) {
        role = "client";
    }
    console.log(role);
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
    if (!country) {
      errors.push("country is required");
    }
    
  
    // If any errors are present, send the errors array in the response
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    //   const errors = {}
    //error - cannot deconstruct req.body so put whole value
    console.log(req.body);
  
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
      } catch (error) {
        console.error("Error saving user:", error);
      }
  
    //   res.json(passwordHash);
    }
  }
const loginUser = async(req, res) =>{
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
}

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {registerUser, loginUser,getCurrentUser};


