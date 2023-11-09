const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const geocoder = require("../utils/geocoder");

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
const createBootcamp = asyncHandler(async (req, res, next) => {
  const newBootcamp = await Bootcamp.create(req.body);
  res.status(201).json(newBootcamp);
});

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = Bootcamp.find(JSON.parse(queryStr));
  const bootcamps = await query;
  if (!bootcamps) {
    return next(
      new ErrorResponse(`No resource found with this ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json(bootcamps);
});

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
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

// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
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

// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
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

// @desc Get bootcamp within a radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Public

const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Convert distance to number and calculate the radius
  const radius = parseFloat(distance) / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lat, lng], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
};
