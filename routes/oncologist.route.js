const express = require("express");
const router = express.Router();
const {
  getOncologists,
  getOncologist,
  postOncologist,
  updateOncologist,
  deleteOncologist,
  fetchOncologistByUserId,
} = require("../controllers/oncologist.controller");

// Routes for Oncologist
router.get("/", getOncologists);
router.get("/:id", getOncologist);
router.post("/", postOncologist);
router.put("/:id", updateOncologist);
router.delete("/:id", deleteOncologist);
router.get("/user/:userId", fetchOncologistByUserId);

module.exports = router;
