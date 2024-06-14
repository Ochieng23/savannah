const User = require("../models/user.model");
const passport = require("passport");
const axios = require("axios");
const requestIp = require("request-ip");
const dotenv = require("dotenv");

dotenv.config();

// Geotag user
const geoTagUser = async (req) => {
  try {
    const ip = requestIp.getClientIp(req) || "8.8.8.8"; // Use a default IP for development/testing
    const accessKey = process.env.IPSTACK_ACCESS_KEY;

    if (!accessKey) {
      throw new Error(
        "IPStack access key is missing in environment variables."
      );
    }

    const url = `http://api.ipstack.com/${ip}?access_key=${accessKey}`;
    const response = await axios.get(url);
    const data = response.data;

    return {
      ip: data.ip,
      country_code: data.country_code,
      country_name: data.country_name,
      region_code: data.region_code,
      region_name: data.region_name,
      city: data.city,
      zip: data.zip,
      latitude: data.latitude,
      longitude: data.longitude,
      time_zone: data.time_zone,
    };
  } catch (error) {
    console.error("Error geotagging user:", error.message);
    return null; // Return null if geotagging fails
  }
};

// Register a new user with a role
const registerUser = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      government_id,
      phonenumber,
      password,
      role,
    } = req.body;

    // Input Validation
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !phonenumber ||
      !government_id ||
      !role
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check for unique email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const geoLocation = await geoTagUser(req);

    const user = new User({
      firstname,
      lastname,
      email,
      government_id,
      phonenumber,
      role,
      geoLocation, // Assign geoLocation from function
    });

    await user.setPassword(password); // Hash password using Passport
    const registeredUser = await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: registeredUser,
    });
  } catch (err) {
    next(err); // Pass error to error handling middleware
  }
};

// Login a user and create a session
const loginUser = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }

      const geoLocation = await geoTagUser(req);

      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phonenumber: user.phonenumber,
          role: user.role,
          geoLocation, // Include geolocation in the response
        },
      });
    });
  })(req, res, next);
};

// Logout a user
const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid"); // Assuming 'connect.sid' is your session cookie name
      res.json({ message: "Logout successful" });
    });
  });
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
