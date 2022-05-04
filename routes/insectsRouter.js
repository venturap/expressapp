const express = require("express");

const {
  allInsects,
  createInsect,
  getInsect,
  deleteInsect,
  updateInsect
} = require("../controllers/insectsController.js");

const router = express.Router();

router
    .route("/")
    .get(allInsects)
    .post(createInsect);

router
    .route("/:id")
    .get(getInsect)
    .delete(deleteInsect)
    .patch(updateInsect);

module.exports = router;
