const mongoose = require("mongoose");
const Pediatrician = require("../models/paeditrician.model");

const getPediatricians = async (req, res) => {
  try {
    const pediatricians = await Pediatrician.find({});
    res.status(200).json(pediatricians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPediatrician = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Pediatrician ID" });
    }

    const pediatrician = await Pediatrician.findById(id);
    if (!pediatrician) {
      return res.status(404).json({ message: "Pediatrician not found" });
    }
    res.status(200).json(pediatrician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPediatrician = async (req, res) => {
  try {
    const pediatrician = await Pediatrician.create(req.body);
    res.status(201).json(pediatrician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePediatrician = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Pediatrician ID" });
    }

    const pediatrician = await Pediatrician.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!pediatrician) {
      return res.status(404).json({ message: "Pediatrician not found" });
    }
    res.status(200).json(pediatrician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePediatrician = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Pediatrician ID" });
    }

    const pediatrician = await Pediatrician.findByIdAndDelete(id);
    if (!pediatrician) {
      return res.status(404).json({ message: "Pediatrician does not exist" });
    }
    res.status(200).json({ message: "Pediatrician deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPediatricianByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const pediatrician = await Pediatrician.findOne({ user_id: userId });
    if (!pediatrician) {
      return res.status(404).json({ message: "Pediatrician not found" });
    }
    res.status(200).json(pediatrician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPediatricians,
  getPediatrician,
  postPediatrician,
  updatePediatrician,
  deletePediatrician,
  fetchPediatricianByUserId,
};
