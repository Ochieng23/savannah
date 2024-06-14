const mongoose = require("mongoose");
const Physiotherapist = require("../models/physiotherapist.model");

const getPhysiotherapists = async (req, res) => {
  try {
    const physiotherapists = await Physiotherapist.find({});
    res.status(200).json(physiotherapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPhysiotherapist = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Physiotherapist ID" });
    }

    const physiotherapist = await Physiotherapist.findById(id);
    if (!physiotherapist) {
      return res.status(404).json({ message: "Physiotherapist not found" });
    }
    res.status(200).json(physiotherapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPhysiotherapist = async (req, res) => {
  try {
    const physiotherapist = await Physiotherapist.create(req.body);
    res.status(201).json(physiotherapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePhysiotherapist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Physiotherapist ID" });
    }

    const physiotherapist = await Physiotherapist.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!physiotherapist) {
      return res.status(404).json({ message: "Physiotherapist not found" });
    }
    res.status(200).json(physiotherapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePhysiotherapist = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Physiotherapist ID" });
    }

    const physiotherapist = await Physiotherapist.findByIdAndDelete(id);
    if (!physiotherapist) {
      return res
        .status(404)
        .json({ message: "Physiotherapist does not exist" });
    }
    res.status(200).json({ message: "Physiotherapist deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPhysiotherapistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const physiotherapist = await Physiotherapist.findOne({ user_id: userId });
    if (!physiotherapist) {
      return res.status(404).json({ message: "Physiotherapist not found" });
    }
    res.status(200).json(physiotherapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPhysiotherapists,
  getPhysiotherapist,
  postPhysiotherapist,
  updatePhysiotherapist,
  deletePhysiotherapist,
  fetchPhysiotherapistByUserId,
};
