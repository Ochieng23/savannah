const mongoose = require("mongoose");
const Oncologist = require("../models/oncologist.model");

const getOncologists = async (req, res) => {
  try {
    const oncologists = await Oncologist.find({});
    res.status(200).json(oncologists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOncologist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Oncologist ID" });
    }

    const oncologist = await Oncologist.findById(id);
    if (!oncologist) {
      return res.status(404).json({ message: "Oncologist not found" });
    }
    res.status(200).json(oncologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postOncologist = async (req, res) => {
  try {
    const oncologist = await Oncologist.create(req.body);
    res.status(201).json(oncologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOncologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Oncologist ID" });
    }

    const oncologist = await Oncologist.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!oncologist) {
      return res.status(404).json({ message: "Oncologist not found" });
    }
    res.status(200).json(oncologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOncologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Oncologist ID" });
    }

    const oncologist = await Oncologist.findByIdAndDelete(id);
    if (!oncologist) {
      return res.status(404).json({ message: "Oncologist does not exist" });
    }
    res.status(200).json({ message: "Oncologist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchOncologistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const oncologist = await Oncologist.findOne({ user_id: userId });
    if (!oncologist) {
      return res.status(404).json({ message: "Oncologist not found" });
    }
    res.status(200).json(oncologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOncologists,
  getOncologist,
  postOncologist,
  updateOncologist,
  deleteOncologist,
  fetchOncologistByUserId,
};
