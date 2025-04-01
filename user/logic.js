document.addEventListener("DOMContentLoaded", () => { // wating until HTML is fully loaded 
  const todoList = document.getElementById("todo-list");
  const todoForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  let hideCompleted = false; 

  // Toggle for hiding comp,leted tasks
  document.getElementById("hideCompletedToggle")?.addEventListener("change", (e) => {
      hideCompleted = e.target.checked;
      loadTodos();
  });

  // loading all tasks from the backend and displaying them
  function loadTodos() {
  fetch("http://127.0.0.1:3001/todos")
  .then(response => response.json())
  .then(todos => {
    todoList.innerHTML = "";
    todos.forEach(todo => {
      
    if (hideCompleted && todo.stateOfCompletion) return;

    // creating <li>> for each task
    const listItem = document.createElement("li");
    listItem.classList.add("mb-2", "list-group-item", "d-flex", "align-items-center");

    // creating a checkbox for marking when a task is completed 
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.checked = todo.stateOfCompletion;

// checkbox event - marking a task as completed / incompleted
checkbox.addEventListener("change", () => {
  const updatedCompletionState = checkbox.checked;

  //  updating UI
  todo.stateOfCompletion = updatedCompletionState;
  taskText.className = updatedCompletionState 
    ? "text-decoration-line-through text-muted" 
    : "";

  // sending update to backend
  fetch(`http://127.0.0.1:3001/todos/${todo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      stateOfCompletion: updatedCompletionState
    })
  })
  .then(response => {
    
    // hiding completed tasks and reloading 
    if (hideCompleted) {
      loadTodos();
    }
  })

});


  // containers with tasks
  const taskText = document.createElement("span");
  taskText.textContent = todo.task;
  taskText.className = todo.stateOfCompletion ? "text-decoration-line-through text-muted" : "";

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
  deleteButton.className = "btn btn-outline-danger btn-sm ms-auto"; 

  // deleting event
  deleteButton.addEventListener("click", () => {
      fetch(`http://127.0.0.1:3001/todos/${todo._id}`, {
          method: "DELETE"
      })
      .then(() => loadTodos());
  });
  
  // Appending all elements
  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);


    });
});
 }

  loadTodos();

  // adding new TODO (POST)
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
      .then(() => {
          taskInput.value = "";
          loadTodos();
      })
      .catch(console.error);
  });
});