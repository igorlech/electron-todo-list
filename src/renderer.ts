import "./index.css";
import { v4 as uuidv4 } from "uuid";

// THEME SWITCH LOGIC

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

// MODALS LOGIC

const modalTheme = document.querySelector("#modal-theme") as HTMLDivElement;
const openModalTheme = document.querySelector(
  "#modal-handler-theme"
) as HTMLButtonElement;
const closeModalTheme = document.querySelector(
  "#modal-theme-close"
) as HTMLSpanElement;

openModalTheme.addEventListener("click", () => {
  modalTheme.style.display = "flex";
});

closeModalTheme.addEventListener("click", () => {
  modalTheme.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modalTheme) {
    modalTheme.style.display = "none";
  }
});

const modalEdit = document.querySelector("#modal-edit") as HTMLDivElement;
const openModalEdit = document.querySelector(
  "#modal-handler-edit"
) as HTMLButtonElement;
const closeModalEdit = document.querySelector(
  "#modal-edit-close"
) as HTMLSpanElement;

openModalEdit.addEventListener("click", () => {
  modalEdit.style.display = "flex";
});

closeModalEdit.addEventListener("click", () => {
  modalEdit.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modalEdit) {
    modalEdit.style.display = "none";
  }
});

// LIST LOGIC

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

  deleteButton.addEventListener("click", () => {
    taskContainer.remove();
    taskStorage.splice(taskStorage.indexOf(task), 1);
    saveTasks();
  });

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = "Edit";
  editButton.type = "button";

  /* editButton.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.value = task.title;
    taskContent.replaceChild(editInput, taskContent.childNodes[1]);
    editInput.focus();

    editInput.addEventListener("blur", () => {
      task.title = editInput.value;
      saveTasks();
      taskContent.replaceChild(task.title, editInput);
    });
  }); */

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
// - add edit functionality
// - add date added
// - add date completed? + add due date?
// - add sorting?
// - add search?
