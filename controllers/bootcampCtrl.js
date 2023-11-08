const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");

const createBootcamp = asyncHandler(async (req, res, next) => {
  const newBootcamp = await Bootcamp.create(req.body);
  res.status(201).json(newBootcamp);
});

const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  if (!bootcamps) {
    return next(
      new ErrorResponse(`No resource found with this ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json(bootcamps);
});

const getBootcamp = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const singleBootcamp = await Bootcamp.findById(id);
  if (!singleBootcamp) {
    return next(
      new ErrorResponse(`No resource found with this ID ${req.params.id}`, 404)
    );
  }
  res.status(200).json(singleBootcamp);
});

const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No resource found with this ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json(bootcamp);
});

const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No resource found with this ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
