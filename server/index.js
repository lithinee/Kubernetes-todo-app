// index file to run the server //


const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/todo");



const app = express(); // creating the app

// CORS setup

const cors = require("cors");

const corsOptions = {
  origin: [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:5501",
    "http://localhost:5501"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions)); // allowing frontend - backend communication



app.use(express.json()); // using middleware 

const PORT = 3001;      

// connect to local MongoDB database (ToDoApp)
//mongoose.connect("mongodb://127.0.0.1:27017/ToDoApp"); - before conternisation

//mongoose.connect("mongodb://mongo-db:27017/ToDoApp");


mongoose.connect("mongodb://mongo-service:27017/todos");


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// API routes:

// fetching data from the database
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find(); 
    res.json(todos); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "something wrong" });
  }
});

// adding a new task
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;

   
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    // Create new TODO using the Mongoose model
    const newTodo = new Todo({
      task: task,
      
    });

    const savedTodo = await newTodo.save(); 

    res.status(201).json(savedTodo); 
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// changing the state of the task

app.put("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const { stateOfCompletion } = req.body;

    const todo = await Todo.findById(todoId);
   
    todo.stateOfCompletion = stateOfCompletion;
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (err) {
    console.error(err.message);
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

// start the server 

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  
