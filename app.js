// Defining UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all Event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task Event
  form.addEventListener("submit", addTask);
  //   Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear tasks Event
  clearBtn.addEventListener("click", clearTasks);
  //   Filter Tasks Event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //   Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      e.target.parentElement.parentElement.remove();

      //   Remove from Local Storage
      reomoveTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove From Local Storage
function reomoveTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // one way to delete everything
  //   taskList.innerHTML = "";
  // Fatser Way using While loop
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //   Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
