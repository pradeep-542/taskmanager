// script.js
const taskInput = document.getElementById("taskInput");
const category = document.getElementById("category");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-2 rounded shadow";
    li.innerHTML = `
      <span class="${task.done ? 'line-through text-gray-400' : ''}">
        [${task.category}] ${task.text}
      </span>
      <div class="flex gap-2">
        <button onclick="toggleTask(${index})" class="text-green-500">✔</button>
        <button onclick="deleteTask(${index})" class="text-red-500">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  if (taskInput.value.trim() === "") return;
  tasks.push({ text: taskInput.value, category: category.value, done: false });
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();
