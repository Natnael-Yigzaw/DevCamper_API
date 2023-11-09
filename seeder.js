require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");
const Bootcamp = require("./models/Bootcamp");

mongoose.connect(process.env.MONGO_URI);

// Read Bootcamps
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany({});
    console.log("Data deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
