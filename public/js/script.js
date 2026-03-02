cardForTask("Java programming", "Medium", "In Progress");
const tasks = [
  { taskName: "Java programming", priority: "High", status: "Complete" },
  { taskName: "Python programming", priority: "Low", status: "In progress" },
];

for (index in tasks) {
  cardForTask(
    tasks[index]["taskName"],
    tasks[index]["priority"],
    tasks[index]["status"],
  );
}

function cardForTask(name, priority, status) {
  let container = document.getElementById("container");
  // console.log(`Test : ${container}`);
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
  btnEdit.classList.add(
    "active:scale-95",
    "transition",
    "duration-150",
    "ease-in-out",
  );
  const iconEdit = document.createElement("i");
  iconEdit.classList.add("fa-solid", "fa-pen-to-square", "text-blue-700");
  btnEdit.appendChild(iconEdit);

  const btnDelete = document.createElement("button");
  btnDelete.classList.add(
    "active:scale-95",
    "transition",
    "duration-150",
    "ease-in-out",
  );
  const iconDelete = document.createElement("i");
  iconDelete.classList.add("fa-solid", "fa-trash", "text-red-500");
  btnDelete.appendChild(iconDelete);
  boxAction.appendChild(btnEdit);
  boxAction.appendChild(btnDelete);

  otherBox.appendChild(priorityText);
  otherBox.appendChild(statusText);
  otherBox.appendChild(boxAction);
  cardTask.appendChild(divTaskName);
  cardTask.appendChild(otherBox);
  container.appendChild(cardTask);
}


/*
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
