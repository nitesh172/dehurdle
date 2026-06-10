const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model("Task", taskSchema)
