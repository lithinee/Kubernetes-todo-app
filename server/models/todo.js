const mongoose = require("mongoose");

// Schema for ToDo item
const todoSchema = new mongoose.Schema({
  // a task description
  task: {
    type: String,
    required: true
  // state (completed / not completed)
  },
  stateOfCompletion: {
    type: Boolean,
    default: false
  },
  //time and date of created task
  dateOfCreation: {
    type: Date,
    default: Date.now
  }
});

// Model for ToDo based on the schema
const Todo = mongoose.model("Todo", todoSchema);

// model exported - other files can use it
module.exports = Todo;
