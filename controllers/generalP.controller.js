const mongoose = require("mongoose");
const GeneralPractitioner = require("../models/generalPractitioner.model");

const getGeneralPractitioners = async (req, res) => {
  try {
    const generalPractitioners = await GeneralPractitioner.find({});
    res.status(200).json(generalPractitioners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGeneralPractitioner = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res
        .status(400)
        .json({ message: "Invalid General Practitioner ID" });
    }

    const generalPractitioner = await GeneralPractitioner.findById(id);
    if (!generalPractitioner) {
      return res
        .status(404)
        .json({ message: "General Practitioner not found" });
    }
    res.status(200).json(generalPractitioner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postGeneralPractitioner = async (req, res) => {
  try {
    const generalPractitioner = await GeneralPractitioner.create(req.body);
    res.status(201).json(generalPractitioner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGeneralPractitioner = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid General Practitioner ID" });
    }

    const generalPractitioner = await GeneralPractitioner.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!generalPractitioner) {
      return res
        .status(404)
        .json({ message: "General Practitioner not found" });
    }
    res.status(200).json(generalPractitioner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGeneralPractitioner = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid General Practitioner ID" });
    }

    const generalPractitioner = await GeneralPractitioner.findByIdAndDelete(id);
    if (!generalPractitioner) {
      return res
        .status(404)
        .json({ message: "General Practitioner does not exist" });
    }
    res.status(200).json({ message: "General Practitioner deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchGeneralPractitionerByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const generalPractitioner = await GeneralPractitioner.findOne({
      user_id: userId,
    });
    if (!generalPractitioner) {
      return res
        .status(404)
        .json({ message: "General Practitioner not found" });
    }
    res.status(200).json(generalPractitioner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGeneralPractitioners,
  getGeneralPractitioner,
  postGeneralPractitioner,
  updateGeneralPractitioner,
  deleteGeneralPractitioner,
  fetchGeneralPractitionerByUserId,
};
