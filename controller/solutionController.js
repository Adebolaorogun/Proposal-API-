const Solution = require("../model/solution");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");

//   Send an error response to the client, don't just log the error to the console. Make sure you do this for all your controllers.
//   And implement proper error handling in your routes.
// Make sure you are using the correct HTTP status codes for each response.
//   For example, if a resource is not found, you should send a 404 status code.
//   If a resource is successfully deleted, you should send a 204 status code.
//   If a resource is successfully created, you should send a 201 status code.
//   If a resource is successfully updated, you should send a 200 status code.
//   If a resource is successfully retrieved, you should send a 200 status code.
//   If a request is invalid, you should send a 400 status code.
//   If a request is unauthorized, you should send a 401 status code.
//   If a request is forbidden, you should send a 403 status code.
//  You should also try to implement  a global error handler that will catch all errors and send a response to the client.
// This will be very helpful as your application grows.
//  And rename routes properly. For example /api/v1/solutions/:id
// The fields in your models should also be renamed properly. For example, the field "solutionName" in your solution model should be renamed to "name".
// Just make sure all variables and fields are named properly.

const addSolution = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    successMeasure,
    totalBudget,
    timeFrame,
    itemsNeeded,
    problemsSolved,
  } = req.body;

  const solution = await Solution.create({
    title,
    description,
    successMeasure,
    totalBudget,
    timeFrame,
    itemsNeeded,
    problemsSolved,
  });

  //  send status code 201
  res.status(201).json({
    status: "success",
    data: {
      solution,
    },
  });
});

const getSingleSolution = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a solution id", 400));
  }

  const solution = await Solution.findOne({ _id: id });

  if (!solution) {
    return next(new AppError(`No solution with id: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      solution,
    },
  });
});

const getAllSolutions = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Solution.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const solutions = await features.query;

  res.status(200).json({
    status: "success",
    results: solutions.length,
    data: {
      solutions,
    },
  });
});

const deleteSolution = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a solution id", 400));
  }

  const solution = await Solution.findOneAndDelete({ _id: id });

  if (!solution) {
    return next(new AppError(`No solution with id: ${id}`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addSolution,
  getSingleSolution,
  getAllSolutions,
  deleteSolution,
};
