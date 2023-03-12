import "./index.css";
import { v4 as uuidv4 } from "uuid";

// Theme switch logic

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });

// TodoList logic

type Task = {
  id: string;
  title: string;
  addedOn: Date;
  isCompleted: boolean;
};

const form = document.querySelector<HTMLFormElement>("#task-form");
const input = document.querySelector<HTMLInputElement>("#task-input");
const list = document.querySelector<HTMLUListElement>(".list");
const taskStorage: Task[] = loadTasks();
taskStorage.forEach(addItemToList);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    addedOn: new Date(),
    isCompleted: false,
  };

  taskStorage.push(newTask);
  saveTasks();

  addItemToList(newTask);
  input.value = "";
});

function addItemToList(task: Task) {
  const taskContainer = document.createElement("li");
  taskContainer.classList.add("task-li");

  const taskContent = document.createElement("label");
  taskContent.classList.add("task-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.isCompleted;
  checkbox.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    task.isCompleted = target.checked;
    saveTasks();
    if (checkbox.checked) {
      taskContent.classList.add("completed");
    } else {
      taskContent.classList.remove("completed");
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "Delete";
  deleteButton.type = "button";

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = "Edit";
  editButton.type = "button";

  taskContent.append(checkbox, task.title, deleteButton, editButton);
  taskContainer.append(taskContent);
  list?.append(taskContainer);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskStorage));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON == null) return [];
  return JSON.parse(localStorage.getItem("tasks"));
}

// TODO:
// - add delete functionality
// - add edit functionality
// - add date added
// - add date completed? + add due date?
// - add sorting?
// - add search?
