const express = require("express");
const router = express.Router();
const {
  getPhysiotherapists,
  getPhysiotherapist,
  postPhysiotherapist,
  updatePhysiotherapist,
  deletePhysiotherapist,
  fetchPhysiotherapistByUserId,
} = require("../controllers/physio.controller");

// Routes for Physiotherapist
router.get("/", getPhysiotherapists);
router.get("/:id", getPhysiotherapist);
router.post("/", postPhysiotherapist);
router.put("/:id", updatePhysiotherapist);
router.delete("/:id", deletePhysiotherapist);
router.get("/user/:userId", fetchPhysiotherapistByUserId);

module.exports = router;
