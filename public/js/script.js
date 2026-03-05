const tasks = [];
let countId = tasks.length;
let container = document.getElementById("container");
let cardTaskContainer = document.createElement("div");
cardTaskContainer.classList.add("flex", "flex-col", "gap-8");
const modal = document.getElementById("modal");
modal.classList.add("hidden");
const modalDelete = document.getElementById("modalDelete");
modalDelete.classList.add("hidden");
const modalEdit = document.getElementById("modalEdit");
modalEdit.classList.add("hidden");

let idToUpdate;
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnOpenModal = document.getElementById("btnOpenModal");
const btnAddTask = document.getElementById("addTask");
const btnPriorities = document.querySelectorAll(".btnPriority");
const btnInProgress = document.querySelectorAll(".btnInProgress");
const btnTodo = document.getElementById("btnTodo");
const btnProgress = document.getElementById("btnProgress");
const btnCompleted = document.getElementById("btnCompleted");
const btnHigh = document.getElementById("btnHigh");
const btnMedium = document.getElementById("btnMedium");
const btnLow = document.getElementById("btnLow");
let idToDelete;
let priorityValue;
let progressValue;
let taskValue = document.getElementById("taskValue");

let taskToEdit = document.getElementById("taskToEdit");
let btnHighEdit = document.getElementById("btnHighEdit");
let btnMediumEdit = document.getElementById("btnMediumEdit");
let btnLowEdit = document.getElementById("btnLowEdit");

let btnTodoEdit = document.getElementById("btnTodoEdit");
let btnProgressEdit = document.getElementById("btnProgressEdit");
let btnCompleteEdit = document.getElementById("btnCompleteEdit");

let taskToUpdate;

btnInProgress.forEach((button) => {
  button.addEventListener("click", () => {
    btnInProgress.forEach((b) => {
      b.classList.remove("bg-cyan-300");
    });
    button.classList.add("bg-cyan-300");
    progressValue = button.value;
  });
});
btnPriorities.forEach((button) => {
  button.addEventListener("click", () => {
    btnPriorities.forEach((b) => {
      b.classList.remove(
        "bg-red-500",
        "bg-yellow-500",
        "bg-green-500",
        "text-white",
        "text-red-500",
        "text-yellow-500",
        "text-green-500",
      );
    });
    if (button.value === "High") {
      button.classList.add("bg-red-500", "text-white");
      btnMedium.classList.add("text-yellow-500");
      btnLow.classList.add("text-green-500");
    } else if (button.value === "Medium") {
      button.classList.add("bg-yellow-500", "text-white");
      btnHigh.classList.add("text-red-500");
      btnLow.classList.add("text-green-500");
    } else if (button.value === "Low") {
      button.classList.add("bg-green-500", "text-white");
      btnMedium.classList.add("text-yellow-500");
      btnHigh.classList.add("text-red-500");
    }
    priorityValue = button.value;
  });
});
function rederArray() {
  cardTaskContainer.innerHTML = "";
  for (let index = tasks.length - 1; index >= 0; index--) {
    cardForTask(
      tasks[index]["id"],
      tasks[index]["taskName"],
      tasks[index]["priority"],
      tasks[index]["status"],
    );
  }
}
function cardForTask(id, name, priority, status) {
  console.log(priority);
  console.log(status);
  const cardTask = document.createElement("div");
  cardTask.classList.add(
    "h-20",
    "w-full",
    "bg-white",
    "rounded-tl-2xl",
    "rounded-br-2xl",
    "flex",
    "items-center",
    "text-lg",
    "font-bold",
    "px-10",
  );
  const divTaskName = document.createElement("div");
  divTaskName.classList.add("flex", "w-100", "justify-start");
  const taskName = document.createElement("p");
  taskName.textContent = name;
  divTaskName.appendChild(taskName);
  const otherBox = document.createElement("div");
  otherBox.classList.add("flex", "w-full", "justify-between");
  const priorityText = document.createElement("p");
  const colorPriority =
    priority === "High"
      ? "text-red-500"
      : priority === "Medium"
        ? "text-yellow-500"
        : "text-green-500";
  priorityText.classList.add(colorPriority);
  priorityText.textContent = priority;
  const statusText = document.createElement("p");
  statusText.classList.add("ml-10");
  statusText.textContent = status;
  const boxAction = document.createElement("div");
  boxAction.classList.add("text-2xl", "flex", "w-18", "justify-between");
  const btnEdit = document.createElement("button");
  btnEdit.value = id;
  btnEdit.classList.add(
    "active:scale-95",
    "transition",
    "duration-150",
    "ease-in-out",
  );
  const iconEdit = document.createElement("i");
  iconEdit.classList.add("fa-solid", "fa-pen-to-square", "text-blue-700");
  btnEdit.appendChild(iconEdit);
  btnEdit.addEventListener("click", () => {
    modalEdit.classList.remove("hidden");
    const task = tasks.find((t) => t.id == btnEdit.value);
    taskToEdit.value = task.taskName;
    idToUpdate = btnEdit.value;
    taskToUpdate = task;
    if (task.priority == "High") {
      btnHighEdit.classList.remove("bg-red-500");
      btnHighEdit.classList.add("bg-red-500");
    } else if (task.priority == "Medium") {
      btnMediumEdit.classList.remove("bg-yellow-500");
      btnMediumEdit.classList.add("bg-yellow-500");
    } else {
      btnMediumEdit.classList.remove("bg-green-500");
      btnMediumEdit.classList.add("bg-green-500");
    }
    if (task.status == "Todo") {
      btnTodoEdit.classList.add("bg-cyan-300");
      btnCompleteEdit.classList.remove("bg-cyan-300");
      btnProgressEdit.classList.remove("bg-cyan-300");
    } else if (task.status == "Completed") {
      btnCompleteEdit.classList.add("bg-cyan-300");
      btnTodoEdit.classList.remove("bg-cyan-300");
      btnProgressEdit.classList.remove("bg-cyan-300");
    } else {
      btnProgressEdit.classList.add("bg-cyan-300");
      btnCompleteEdit.classList.remove("bg-cyan-300");
      btnTodoEdit.classList.remove("bg-cyan-300");
    }
  });

  const btnDelete = document.createElement("button");
  btnDelete.value = id;
  btnDelete.classList.add(
    `btnDeleteTask`,
    "active:scale-95",
    "transition",
    "duration-150",
    "ease-in-out",
  );
  const iconDelete = document.createElement("i");
  iconDelete.classList.add("fa-solid", "fa-trash", "text-red-500");
  btnDelete.appendChild(iconDelete);
  btnDelete.addEventListener("click", () => {
    idToDelete = btnDelete.value;
    deleteModal();
  });
  boxAction.appendChild(btnEdit);
  boxAction.appendChild(btnDelete);
  otherBox.appendChild(priorityText);
  otherBox.appendChild(statusText);
  otherBox.appendChild(boxAction);
  cardTask.appendChild(divTaskName);
  cardTask.appendChild(otherBox);
  cardTaskContainer.appendChild(cardTask);
  container.appendChild(cardTaskContainer);
}
function closeModal() {
  modal.classList.add("hidden");
  btnPriorities.forEach((button) => {
    button.classList.remove(
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "text-white",
    );
  });
  btnMedium.classList.add("text-yellow-500");
  btnHigh.classList.add("text-red-500");
  btnLow.classList.add("text-green-500");
  btnInProgress.forEach((button) => {
    button.classList.remove("bg-cyan-300");
  });
  taskValue.value = "";
}
function openModal() {
  modal.classList.remove("hidden");
}

function deleteModal() {
  modalDelete.classList.remove("hidden");
}

confirmDeleteBtn.addEventListener("click", () => {
  modalDelete.classList.add("hidden");
  const idOfTaskToRemove = tasks.findIndex((task) => task.id == idToDelete);
  if (idOfTaskToRemove != -1) {
    tasks.splice(idOfTaskToRemove, 1);
  }
  rederArray();
  alert("Deleted task successfully!");
  modalDelete.classList.add("hidden");
});

cancelDeleteBtn.addEventListener("click", () => {
  modalDelete.classList.add("hidden");
});
function addTask() {
  console.log(priorityValue);
  console.log(progressValue);
  countId++;
  if (taskValue.value == "") {
    alert("Please fill the Task Name!");
    return;
  }
  const newTask = {
    id: countId,
    taskName: taskValue.value,
    priority: priorityValue ?? "Medium",
    status: progressValue ?? "Todo",
  };
  tasks.push(newTask);
  rederArray();
  alert("Added successfully");
  priorityValue = null;
  progressValue = null;
  closeModal();
}

function updateTask() {
  const task = tasks.find((t) => t.id == idToUpdate);
  const index = tasks.indexOf(task);
  tasks[index]["taskName"] = taskToEdit.value;
  tasks[index]["priority"] = priorityValue;
  tasks[index]["status"] = progressValue; 
  rederArray();
  cancelEditModal();
}
function cancelEditModal() {
  modalEdit.classList.add("hidden");
}
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
/*
// Default : Tasks
// const tasks = [
//   { id: 1, taskName: "Java programming", priority: "High", status: "Complete" },
//   {
//     id: 2,
//     taskName: "Python programming",
//     priority: "Low",
//     status: "Progress",
//   },
//   {
//     id: 3,
//     taskName: "Python programming",
//     priority: "Medium",
//     status: "Progress",
//   },
// ];


<!--Test Dynamic UI , Will be append from JavaScript-->
<div class="h-20 w-full bg-white rounded-tl-2xl rounded-br-2xl flex items-center text-lg font-bold px-10">
  <div class="flex w-100 justify-start">
    <p>Task Name</p>
  </div>
  <div class="w-full flex justify-between"> 
    <p>Hight</p>
    <p class="ml-10">Complete</p>
    <div class="flex text-2xl w-18 justify-between"> // OtherBox
      <button
        onclick="alert('Hello')"
        class="active:scale-95 transition duration-150 ease-in-out"
      >
        <i class="fa-solid fa-pen-to-square text-blue-700"></i>
      </button>
      <button
        onclick="alert('Hello')"
        class="active:scale-95 transition duration-150 ease-in-out"
      >
        <i class="fa-solid fa-trash text-red-500"></i>
      </button>
    </div>
  </div>
</div>;
*/
