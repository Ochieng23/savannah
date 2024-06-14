const mongoose = require("mongoose");
const Patient = require("../models/patient.model");

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id); // Debugging log

    // Validate if the id is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    console.log("Is Valid ObjectId:", isValidObjectId); // Debugging log

    if (!isValidObjectId) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }

    const patient = await Patient.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }

    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient does not exist" });
    }
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchPatientByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const patient = await Patient.findOne({ user_id: userId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatient,
  postPatient,
  updatePatient,
  deletePatient,
  fetchPatientByUserId,
};
