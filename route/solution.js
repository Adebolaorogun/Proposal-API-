const express = require("express");
const router = express.Router();
const commentRoutes = require("./comment");

const {
  addSolution,
  getSingleSolution,
  getAllSolutions,
  deleteSolution,
} = require("../controller/solutionController");

router.use("/:solutionId/comments", commentRoutes);

router.route("/").get(getAllSolutions).post(addSolution);

router.route("/:id").get(getSingleSolution).delete(deleteSolution);

module.exports = router;
