const express = require("express");
const router = express.Router();
const {
  getOphthalmologists,
  getOphthalmologist,
  postOphthalmologist,
  updateOphthalmologist,
  deleteOphthalmologist,
  fetchOphthalmologistByUserId,
} = require("../controllers/opthamologist.controller");

// Routes for Ophthalmologist
router.get("/", getOphthalmologists);
router.get("/:id", getOphthalmologist);
router.post("/", postOphthalmologist);
router.put("/:id", updateOphthalmologist);
router.delete("/:id", deleteOphthalmologist);
router.get("/user/:userId", fetchOphthalmologistByUserId);

module.exports = router;
