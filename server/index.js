// index file to run the server //


const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");



const app = express(); // creating the app

const cors = require("cors");

const corsOptions = {
  origin: ["http://127.0.0.1:5501", "http://localhost:5501"], // Live Server port
  methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions));



app.use(express.json()); // using middleware 

const PORT = 3001;      

// connect to local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp");

// confirm connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.get("/", (req, res) => {
  res.send("Hello from the backend");
});


app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find(); // get all todos from the database
    res.json(todos); // send them to the browser
  } catch (err) {
    console.error("Error fetching todos:", err.message);
    res.status(500).json({ error: "Something went wrong..." });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;

    // Check if task is provided
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    // Create new TODO using the Mongoose model
    const newTodo = new Todo({
      task: task,
      // stateOfCompletion and dateOfCreation use default values
    });

    const savedTodo = await newTodo.save(); // Save to MongoDB

    res.status(201).json(savedTodo); // Return the new TODO
  } catch (err) {
    console.error("Error creating TODO:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// changing the state of the task

app.put("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { stateOfCompletion: true },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating TODO:", err.message);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// deleting tasks 

app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.findByIdAndDelete(todoId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting TODO:", err.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});


  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  
