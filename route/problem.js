const express = require("express");
const router = express.Router();

const {
  addProblem,
  getSingleProblem,
  getAllProblems,
  deleteProblem,
} = require("../controller/problemController");

router.route("/").post(addProblem).get(getAllProblems);

router.route("/:id").get(getSingleProblem).delete(deleteProblem);

module.exports = router;