const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: { type: String, trim: true, required: true },
        name: { type: String, trim: true, required: true },
        duration: { type: Number, required: true },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  var totalDuration = this.exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue.duration,
    0
  );

  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
