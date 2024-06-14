const mongoose = require("mongoose");
const Ophthalmologist = require("../models/opthamologist.model");

const getOphthalmologists = async (req, res) => {
  try {
    const ophthalmologists = await Ophthalmologist.find({});
    res.status(200).json(ophthalmologists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOphthalmologist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Ophthalmologist ID" });
    }

    const ophthalmologist = await Ophthalmologist.findById(id);
    if (!ophthalmologist) {
      return res.status(404).json({ message: "Ophthalmologist not found" });
    }
    res.status(200).json(ophthalmologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postOphthalmologist = async (req, res) => {
  try {
    const ophthalmologist = await Ophthalmologist.create(req.body);
    res.status(201).json(ophthalmologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOphthalmologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Ophthalmologist ID" });
    }

    const ophthalmologist = await Ophthalmologist.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!ophthalmologist) {
      return res.status(404).json({ message: "Ophthalmologist not found" });
    }
    res.status(200).json(ophthalmologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOphthalmologist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Ophthalmologist ID" });
    }

    const ophthalmologist = await Ophthalmologist.findByIdAndDelete(id);
    if (!ophthalmologist) {
      return res
        .status(404)
        .json({ message: "Ophthalmologist does not exist" });
    }
    res.status(200).json({ message: "Ophthalmologist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchOphthalmologistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const ophthalmologist = await Ophthalmologist.findOne({ user_id: userId });
    if (!ophthalmologist) {
      return res.status(404).json({ message: "Ophthalmologist not found" });
    }
    res.status(200).json(ophthalmologist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOphthalmologists,
  getOphthalmologist,
  postOphthalmologist,
  updateOphthalmologist,
  deleteOphthalmologist,
  fetchOphthalmologistByUserId,
};
