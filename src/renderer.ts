import "./index.css";

console.log(
  '👋 This message is being logged by "renderer.ts", included via webpack'
);

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

const input = <HTMLInputElement>document.querySelector("#inputfield");
const add = document.querySelector("#add");
let elementTemplate = "";

input.addEventListener("input", (e) => {
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
  document.querySelector(".list").innerHTML += elementTemplate;
});

const valueToDB = input.value;

let request: IDBOpenDBRequest;
let db: IDBDatabase;

// eslint-disable-next-line prefer-const
request = window.indexedDB.open("todo", 1);
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
