const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDb;
