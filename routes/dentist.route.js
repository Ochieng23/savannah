const express = require("express");
const router = express.Router();
const {
  getDentists,
  getDentist,
  postDentist,
  updateDentist,
  deleteDentist,
  fetchDentistByUserId,
} = require("../controllers/dentist.controller");

// Routes for Dentist
router.get("/", getDentists);
router.get("/:id", getDentist);
router.post("/", postDentist);
router.put("/:id", updateDentist);
router.delete("/:id", deleteDentist);
router.get("/user/:userId", fetchDentistByUserId);

module.exports = router;
