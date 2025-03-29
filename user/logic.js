// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
  
    // Fetch TODOs from backend
    fetch("http://localhost:5000/todos")
      .then(response => response.json())
      .then(todos => {
        todos.forEach(todo => {
          const listItem = document.createElement("li");
          listItem.textContent = todo.task;
          todoList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error("Failed to fetch TODOs:", error);
      });
  });
  