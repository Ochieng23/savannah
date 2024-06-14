// pediatrician.router.js
const express = require("express");
const router = express.Router();
const {
  getPediatricians,
  getPediatrician,
  postPediatrician,
  updatePediatrician,
  deletePediatrician,
  fetchPediatricianByUserId,
} = require("../controllers/paeditrician.controller");

// Routes for Pediatrician
router.get("/", getPediatricians);
router.get("/:id", getPediatrician);
router.post("/", postPediatrician);
router.put("/:id", updatePediatrician);
router.delete("/:id", deletePediatrician);
router.get("/user/:userId", fetchPediatricianByUserId);

module.exports = router;
