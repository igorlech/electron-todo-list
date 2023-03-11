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

const form = document.querySelector<HTMLFormElement>("#task-form");
const input = document.querySelector<HTMLInputElement>("#task-input");
const add = document.querySelector("#task-add");
const list = document.querySelector<HTMLUListElement>(".list");
//let elementTemplate = "";

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const task = {
    id: uuidv4(),
    title: input.value,
    addedOn: new Date().getTime(),
    isCompleted: false,
  };
});

/* input.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
});

add.addEventListener("click", () => {
  console.log("add clicked");
  console.log(input.value);

  elementTemplate = `<li class="list-item">
  <input type="checkbox" class="list-item-checkbox" />
  <span class="list-item-text">${input.value}</span>
  <button class="list-item-button">Delete</button>
  <button class="list-item-button">Edit</button>
  </li>`;
  list.innerHTML += elementTemplate;
}); */

// IndexedDBn stuff

/* const valueToDB = input.value;

let request: IDBOpenDBRequest;
let db: IDBDatabase; */

// eslint-disable-next-line prefer-const
/* request = window.indexedDB.open("todo", 1);
request.onerror = () => {
  console.log("error: ");
};
request.onupgradeneeded = () => {
  db = request.result;
  const objectStore = db.createObjectStore("todo", { keyPath: "id" });
  objectStore.createIndex("text", "text", { unique: false });
  console.log("success: " + db);
};

db = request.result;
const transaction = db.transaction("todo", "readwrite");
const objectStore = transaction.objectStore("todo");
const newrequest = objectStore.add({
  valueToDB,
});
newrequest.onsuccess = () => {
  console.log("Score added");
};
newrequest.onerror = () => {
  console.log("Error adding score");
};
 */
