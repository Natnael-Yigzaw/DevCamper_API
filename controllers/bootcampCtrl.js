const asyncHandler = require("express-async-handler");
const Bootcamp = require("../models/Bootcamp");

const getBootcamps = asyncHandler(async (req, res) => {
  console.log("working");
});

const getBootcamp = asyncHandler(async (req, res) => {});

const createBootcamp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await Bootcamp.findOne({ email: email });
    if (!existingUser) {
      const newUser = await Bootcamp.create(req.body);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "User Already Exists" });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

const updateBootcamp = asyncHandler(async (req, res) => {});

const deleteBootcamp = asyncHandler(async (req, res) => {});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
