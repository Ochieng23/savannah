const Patient = require("../models/patient.model");
const mongoose = require("mongoose");

const profileCompletion = async (req, res, next) => {
  try {
    const { patientId } = req.params; // Assuming the patient ID is passed as a parameter

    // Validate if the patientId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const fields = [
      "avatar",
      "medical_history",
      "current_medical_issue",
      "location",
      // Add other patient-specific fields here
    ];

    let filledFields = 0;
    fields.forEach((field) => {
      if (Array.isArray(patient[field])) {
        if (patient[field].length > 0) filledFields++;
      } else if (patient[field]) {
        filledFields++;
      }
    });

    const profileCompletionPercentage = (filledFields / fields.length) * 100;

    req.profileCompletionPercentage = profileCompletionPercentage;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = profileCompletion;
