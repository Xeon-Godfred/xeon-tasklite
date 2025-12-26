// Xeon TaskLite - Advanced Task Manager with completed class
// Author: Xeon Godfred Opoku

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", addTask);

// Allow Enter key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
    id: Date.now()
  };

  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}

// Render a task in the list
function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  li.dataset.id = task.id;

  // Apply completed class if needed
  if (task.completed) li.classList.add("completed");

  // Toggle completion on click
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    updateTask(task);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling completion
    deleteTask(task.id);
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task in localStorage
function updateTask(updatedTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index > -1) {
    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Delete task from localStorage
function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filtered = tasks.filter(t => t.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(filtered));
}

// Load all tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}
