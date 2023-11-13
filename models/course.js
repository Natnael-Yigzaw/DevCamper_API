const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

// Static method to get avg of course tuitions
courseSchema.statics.getAverageCost = async function (bootcampId) {
  // Use the aggregate function to perform aggregation on the Course model
  const obj = await this.aggregate([
    {
      // Match courses that belong to the specified bootcamp
      $match: { bootcamp: bootcampId },
    },
    {
      // Group courses by bootcamp and calculate the average tuition cost
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  // Extract the average cost from the aggregation result
  const averageCost = obj[0]
    ? Math.ceil(obj[0].averageCost / 10) * 10
    : undefined;

  // Try updating the Bootcamp model with the calculated average cost
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost,
    });
  } catch (err) {
    console.log(err);
  }
};

// Call getAverageCost after save
courseSchema.post("save", async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after remove
courseSchema.post("remove", async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});

//Export the model
module.exports = mongoose.model("Course", courseSchema);
