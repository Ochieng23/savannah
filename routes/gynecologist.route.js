const express = require("express");
const router = express.Router();
const {
  getGynecologists,
  getGynecologist,
  postGynecologist,
  updateGynecologist,
  deleteGynecologist,
  fetchGynecologistByUserId,
} = require("../controllers/gynecologist.controller");

// Routes for Gynecologist
router.get("/", getGynecologists);
router.get("/:id", getGynecologist);
router.post("/", postGynecologist);
router.put("/:id", updateGynecologist);
router.delete("/:id", deleteGynecologist);
router.get("/user/:userId", fetchGynecologistByUserId);

module.exports = router;
