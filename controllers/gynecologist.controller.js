const mongoose = require("mongoose");
const Gynecologist = require("../models/gynecologist.model");

const getGynecologists = async (req, res) => {
  try {
    const gynecologists = await Gynecologist.find({});
    res.status(200).json(gynecologists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGynecologist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Gynecologist ID" });
    }

    const gynecologist = await Gynecologist.findById(id);
    if (!gynecologist) {
      return res.status(404).json({ message: "Gynecologist not found" });
    }
    res.status(200).json(gynecologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postGynecologist = async (req, res) => {
  try {
    const gynecologist = await Gynecologist.create(req.body);
    res.status(201).json(gynecologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGynecologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Gynecologist ID" });
    }

    const gynecologist = await Gynecologist.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!gynecologist) {
      return res.status(404).json({ message: "Gynecologist not found" });
    }
    res.status(200).json(gynecologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGynecologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Gynecologist ID" });
    }

    const gynecologist = await Gynecologist.findByIdAndDelete(id);
    if (!gynecologist) {
      return res.status(404).json({ message: "Gynecologist does not exist" });
    }
    res.status(200).json({ message: "Gynecologist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchGynecologistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const gynecologist = await Gynecologist.findOne({ user_id: userId });
    if (!gynecologist) {
      return res.status(404).json({ message: "Gynecologist not found" });
    }
    res.status(200).json(gynecologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGynecologists,
  getGynecologist,
  postGynecologist,
  updateGynecologist,
  deleteGynecologist,
  fetchGynecologistByUserId,
};
