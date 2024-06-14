const mongoose = require("mongoose");
const { isValidUserId } = require("../validators/userValidator");

const oncologistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    validate: {
      validator: isValidUserId,
      message: (props) => `${props.value} is not a valid user ID`,
    },
  },
  avatar: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

const Oncologist = mongoose.model("Oncologist", oncologistSchema);

module.exports = Oncologist;
