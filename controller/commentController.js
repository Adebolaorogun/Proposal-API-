const Comment = require("../model/solutionComments");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");

exports.addComment = catchAsync(async (req, res) => {
  const { type, comment } = req.body;
  const { solutionId } = req.params;

  const commentCreated = await Comment.create({
    type,
    comment,
    solution: solutionId,
  });

  res.status(201).json({
    status: "success",
    data: {
      comment: commentCreated,
    },
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const { solutionId } = req.params;

  const features = new ApiFeatures(
    Comment.find({ solution: solutionId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const comments = await features.query;

  return res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});
