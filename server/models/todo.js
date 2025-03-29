const mongoose = require("mongoose");

// Schema for ToDo
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  stateOfCompletion: {
    type: Boolean,
    default: false
  },
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});

// Model for ToDo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
