const mongoose = require("mongoose");
const User = require("../models/user.model");

const isValidUserId = async (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid user ID format");
  }

  const user = await User.findById(value);
  if (!user) {
    throw new Error("User not found");
  }

  return true;
};

module.exports = {
  isValidUserId,
};
