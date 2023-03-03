const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    //   change problemName to title or name, we already know its a problem
    title: {
      type: String,
      required: [true, "please enter the problem title"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
    },
  },
  {
    timestamps: true,
  }
);

// problemSchema.index({ title: "text" });

module.exports = mongoose.model("Problem", problemSchema);
