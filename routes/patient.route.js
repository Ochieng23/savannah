const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatient,
  postPatient,
  updatePatient,
  deletePatient,
  fetchPatientByUserId,
} = require("../controllers/patient.controller");
const profileCompletion = require("../middlewares/profileCompletion");

// Routes for Patient
router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", postPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);
router.get("/user/:userId", fetchPatientByUserId);
router.use("/:patientId/profile/completion", profileCompletion); // Use middleware to check profile completion
router.get("/:patientId/profile/completion", (req, res) => {
  res.json({ profileCompletionPercentage: req.profileCompletionPercentage });
});

module.exports = router;
