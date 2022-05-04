const express = require("express");

const {
  allMammals,
  createMammal,
  getMammal,
  deleteMammal,
  updateMammal
} = require("./../controllers/mammalsController.js");

const router = express.Router();

router.route("/").get(allMammals).post(createMammal);

router.route("/:id").get(getMammal).delete(deleteMammal).patch(updateMammal);

module.exports = router;
