// index file to run the server //

const express = require("express");

const app = express(); 
const PORT = 5000;      

const mongoose = require("mongoose");

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


app.get("/todos", (req, res) => {
    const sampleTodos = [
      { id: 1, task: "Buy milk", done: false },
      { id: 2, task: "Walk the dog", done: true },
      { id: 3, task: "Do laundry", done: false },
    ];
  
    res.json(sampleTodos); 
  });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  
