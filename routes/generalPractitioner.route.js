const express = require("express");
const router = express.Router();
const {
  getGeneralPractitioners,
  getGeneralPractitioner,
  postGeneralPractitioner,
  updateGeneralPractitioner,
  deleteGeneralPractitioner,
  fetchGeneralPractitionerByUserId,
} = require("../controllers/generalP.controller");

// Routes for General Practitioner
router.get("/", getGeneralPractitioners);
router.get("/:id", getGeneralPractitioner);
router.post("/", postGeneralPractitioner);
router.put("/:id", updateGeneralPractitioner);
router.delete("/:id", deleteGeneralPractitioner);
router.get("/user/:userId", fetchGeneralPractitionerByUserId);

module.exports = router;
