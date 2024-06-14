const mongoose = require("mongoose");
const Dentist = require("../models/dentist.model");

const getDentists = async (req, res) => {
  try {
    const dentists = await Dentist.find({});
    res.status(200).json(dentists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDentist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Dentist ID" });
    }

    const dentist = await Dentist.findById(id);
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" });
    }
    res.status(200).json(dentist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDentist = async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json(dentist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDentist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Dentist ID" });
    }

    const dentist = await Dentist.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" });
    }
    res.status(200).json(dentist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDentist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Dentist ID" });
    }

    const dentist = await Dentist.findByIdAndDelete(id);
    if (!dentist) {
      return res.status(404).json({ message: "Dentist does not exist" });
    }
    res.status(200).json({ message: "Dentist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchDentistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const dentist = await Dentist.findOne({ user_id: userId });
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" });
    }
    res.status(200).json(dentist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDentists,
  getDentist,
  postDentist,
  updateDentist,
  deleteDentist,
  fetchDentistByUserId,
};
