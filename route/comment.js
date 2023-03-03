const express = require("express");
const {
  addComment,
  getAllComments,
} = require("../controller/commentController");

const router = express.Router({ mergeParams: true });

router.route("/").post(addComment).get(getAllComments);

// router.route('/:id').get().patch().delete()

module.exports = router;
