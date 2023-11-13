const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error(error.message);
  }
};
