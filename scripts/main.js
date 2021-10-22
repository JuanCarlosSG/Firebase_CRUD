import app from "./index.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Aux Variables
let editStatus = false;
let id = "";
let titleS = "";
let descriptionS = "";

// Firestore Data Base
const db = getFirestore(app);

// HTML Elements
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");
// const btnContainer = document.getElementById("btn-cont");

// CRUD

// CREATE @ Firebase
const createTask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title,
    description
  });

// READ @ Firebase
//const readTasks = () => getDocs(collection(db, "tasks"));
const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

// UPDATE @ Firebase

const getTask = (id) => getDoc(doc(db, "tasks", id));
const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);

// DELETE @ Firebase

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

// READ Values
window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    let marginT = 0;
    let aux = 0;
    querySnapshot.forEach((doc) => {
      if (aux !== 0) {
        marginT = 3;
      } else {
        marginT = 0;
      }
      aux++;
      const task = doc.data();
      task.id = doc.id;

      taskContainer.innerHTML += `
      <div class="card card-body  mt-md-${marginT} mt-3 border-primary">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-info btn-edit" data-id="${task.id}">Edit</button>
          <button class="btn btn-danger btn-delete" data-id="${task.id}">Delete</button>
        </div>
      </div>`;

      const btnsDelete = document.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteTask(e.target.dataset.id);
        });
      });

      const btnsEdit = document.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editStatus = true;
          id = doc.id;

          titleS = task.title;
          descriptionS = task.description;

          window.scrollTo(0, 0);

          document.getElementById("errorLabel").innerText = "";
          taskForm["task-title"].classList.remove("is-invalid");
          taskForm["task-description"].classList.remove("is-invalid");

          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;
          taskForm["btn-task-form"].innerText = "Update";
          taskForm["cancel"].style.visibility = "visible";
        });
      });
    });
  });
});

// CREATE Values

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    if (title.value !== "" && description.value !== "") {
      document.getElementById("errorLabel").innerText = "";
      title.classList.remove("is-invalid");
      description.classList.remove("is-invalid");
      await createTask(title.value, description.value);
      taskForm.reset();
    } else {
      if (title.value === "") {
        title.classList.add("is-invalid");
      }
      if (description.value === "") {
        description.classList.add("is-invalid");
      }
      document.getElementById("errorLabel").innerText =
        "Both inputs have to be filled! Try again.";
    }
  } else {
    if (title.value !== titleS || description.value !== descriptionS) {
      document.getElementById("errorLabel").innerText = "";
      await updateTask(id, {
        title: title.value,
        description: description.value
      });
      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
      taskForm["cancel"].style.visibility = "hidden";
      taskForm.reset();
    } else {
      alert("Both atributes have the same value as before");
      document.getElementById("errorLabel").innerText =
        "At least one value has to change! Try again.";
    }
  }

  title.focus();
});

document.getElementById("cancel").onclick = function () {
  editStatus = false;
  id = "";
  taskForm["btn-task-form"].innerText = "Save";
  taskForm["cancel"].style.visibility = "hidden";
  document.getElementById("errorLabel").innerText = "";
  taskForm.reset();
};
