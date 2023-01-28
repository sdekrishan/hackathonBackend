const mongoose = require("mongoose");

const quesSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    ans: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      opt1: {
        type: String,
        required: true,
      },
      opt2: {
        type: String,
        required: true,
      },
      opt3: {
        type: String,
        required: true,
      },
      opt4: {
        type: String,
        required: true,
      },
    },
    category: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Que = mongoose.model("qus", quesSchema);

module.exports = Que;
// opt1: {
//   type: String,
//   required: true,
