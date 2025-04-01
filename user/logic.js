
document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");
    const todoForm = document.getElementById("todo-form");
    const taskInput = document.getElementById("task-input");

  // loading tasks
  function loadTodos() {
    fetch("http://127.0.0.1:3001/todos")
    .then(response => response.json())
    .then(todos => {
      todoList.innerHTML = "";
      todos.forEach(todo => {
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.stateOfCompletion;

       

        // done options
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            fetch(`http://127.0.0.1:3001/todos/${todo._id}`, {
              method: "PUT"
            })
              .then(response => response.json())
              .then(updated => {
                console.log("Marked as done:", updated);
                loadTodos(); 
              });
          }
        });


        

        // delete button

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.padding = "3px 6px";
        deleteButton.style.backgroundColor = "#f44336";
        deleteButton.style.color = "#fff";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "4px";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", () => {
          fetch(`http://127.0.0.1:3001/todos/${todo._id}`, {
            method: "DELETE"
          })
            .then(res => res.json())
            .then(() => loadTodos());
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(" " + todo.task));
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
      });
    });




  }

  loadTodos();

  // Add new TODO (POST)
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const newTask = taskInput.value.trim();
    if (newTask === "") return;

    fetch("http://127.0.0.1:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: newTask })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Task added:", data);
        taskInput.value = ""; 
        loadTodos(); 
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
  });


  
    // // Fetch TODOs from backend
    // fetch("http://localhost:5000/todos")
    //   .then(response => response.json())
    //   .then(todos => {
    //     todos.forEach(todo => {
    //       const listItem = document.createElement("li");
    //       listItem.textContent = todo.task;
    //       todoList.appendChild(listItem);
    //     });
    //   })
    //   .catch(error => {
    //     console.error("Failed to fetch TODOs:", error);
    //   });
  });
  