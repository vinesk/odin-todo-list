// Classes
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
  }
}

class Task {
  constructor(name, dueDate, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

// Data
let projects = [];
projects.push(new Project("Project 1"));
projects.push(new Project("Project 2"));

let tasks = [];
tasks.push(new Task("Task 1", "2024-02-18", "Low"));
tasks.push(new Task("Task 2", "2024-02-24", "Medium"));
tasks.push(new Task("Task 3", "2024-02-28", "High"));

// Functions
function renderItems(sectionId) {
  const items = document.querySelector(`#${sectionId} .items`);
  items.innerHTML = "";

  let data;
  switch (sectionId) {
    case "projects":
      data = projects;
      break;
    case "tasks":
      data = tasks;
      break;
  }

  data.forEach((input) => {
    const item = renderItem(sectionId, input);
    items.appendChild(item);
  });
}

function renderItem(sectionId, input) {
  const item = document.createElement("div");
  item.classList.add("item");

  const itemIcon = renderItemIcon(sectionId, input);
  item.appendChild(itemIcon);

  const itemName = renderItemName(input);
  item.appendChild(itemName);

  if (sectionId === "tasks") {
    const itemDueDate = renderItemDueDate(input);
    item.appendChild(itemDueDate);

    const itemPriority = renderItemPriority(input);
    item.appendChild(itemPriority);
  }

  const editBtn = renderEditItemBtn(sectionId, input, item);
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteItemBtn(sectionId, input);
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon(sectionId, input) {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");
  switch (sectionId) {
    case "projects":
      itemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;
      break;
    case "tasks":
      if (input.completed) {
        itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
      } else {
        itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      }
      break;
  }
  return itemIcon;
}

function renderItemName(input) {
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  itemName.textContent = input.name;

  return itemName;
}

function renderItemDueDate(input) {
  const itemDueDate = document.createElement("span");
  itemDueDate.classList.add("item-due-date");
  itemDueDate.textContent = input.dueDate;

  return itemDueDate;
}

function renderItemPriority(input) {
  const itemPriority = document.createElement("span");
  itemPriority.classList.add(
    "item-priority",
    `${input.priority.toLowerCase()}`
  );
  itemPriority.textContent = input.priority;

  return itemPriority;
}

function renderEditItemBtn(sectionId, input, item) {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => {
    editItem(sectionId, input, item);
  });
  return editBtn;
}

function editItem(sectionId, input, item) {
  item.innerHTML = "";

  const itemIcon = renderItemIcon(sectionId, input);
  item.appendChild(itemIcon);

  const nameInput = renderNameInput(input);
  item.appendChild(nameInput);

  let dueDateInput;
  let prioritySelect;
  if (sectionId === "tasks") {
    dueDateInput = renderDueDateInput(input);
    item.appendChild(dueDateInput);

    prioritySelect = renderPrioritySelect(input);
    item.appendChild(prioritySelect);
  }

  const editItemConfirmBtn = renderEditItemConfirmBtn(
    sectionId,
    input,
    nameInput,
    dueDateInput,
    prioritySelect
  );
  item.appendChild(editItemConfirmBtn);

  const editItemCancelBtn = renderEditItemCancelBtn(sectionId);
  item.appendChild(editItemCancelBtn);
}

function renderNameInput(input) {
  const nameInput = document.createElement("input");
  nameInput.classList.add("item-name");
  nameInput.type = "text";
  nameInput.value = input.name;

  return nameInput;
}

function renderDueDateInput(input) {
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("item-due-date");
  dueDateInput.type = "date";
  dueDateInput.value = input.dueDate;

  return dueDateInput;
}

function renderPrioritySelect(input) {
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("item-priority");
  const options = ["Low", "Medium", "High"];
  options.forEach((option) => {
    const prioritySelectOption = document.createElement("option");
    prioritySelectOption.value = option.toLowerCase();
    if (option === input.priority) {
      prioritySelectOption.setAttribute("selected", "");
    }
    prioritySelectOption.textContent = option;
    prioritySelect.appendChild(prioritySelectOption);
  });
  return prioritySelect;
}

function renderEditItemConfirmBtn(
  sectionId,
  input,
  nameInput,
  dueDateInput,
  prioritySelect
) {
  const editItemConfirmBtn = document.createElement("span");
  editItemConfirmBtn.classList.add("check-btn");
  editItemConfirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  editItemConfirmBtn.addEventListener("click", () => {
    const newItemName = nameInput.value.trim();
    let newItemDueDate;
    let newItemPriority;
    switch (sectionId) {
      case "projects":
        const project = projects.find((project) => (project.name = input.name));
        project.name = newItemName;
        break;
      case "tasks":
        newItemDueDate = dueDateInput.value;
        newItemPriority = prioritySelect.value;
        const task = tasks.find((task) => task.name === input.name);
        task.name = newItemName;
        task.dueDate = newItemDueDate;
        task.priority =
          newItemPriority[0].toUpperCase() + newItemPriority.slice(1);
        break;
    }
    renderItems(sectionId);
  });
  return editItemConfirmBtn;
}

function renderEditItemCancelBtn(sectionId) {
  const editItemCancelBtn = document.createElement("span");
  editItemCancelBtn.classList.add("check-btn");
  editItemCancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  editItemCancelBtn.addEventListener("click", () => {
    renderItems(sectionId);
  });
  return editItemCancelBtn;
}

function renderDeleteItemBtn(sectionId, input) {
  const deleteItemBtn = document.createElement("span");
  deleteItemBtn.classList.add("edit-btn");
  deleteItemBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteItemBtn.addEventListener("click", () => {
    deleteItem(sectionId, input);
  });
  return deleteItemBtn;
}

function deleteItem(sectionId, input) {
  switch (sectionId) {
    case "projects":
      projects = projects.filter((project) => project.name !== input.name);
      break;
    case "tasks":
      tasks = tasks.filter((task) => task.name !== input.name);
      break;
  }
  renderItems(sectionId);
}

renderItems("projects");
renderItems("tasks");

// const projectBtnAdd = document.querySelector("#projects .btn-add");
// projectBtnAdd.addEventListener("click", () => {
//   const projectForm = document.querySelector("#projects .form");
//   projectForm.classList.toggle("hidden");
// });

// const projectForm = document.querySelector("#projects .form");
// projectForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const projectNameInput = document.querySelector("#project-name");
//   const projectName = projectNameInput.value.trim();
//   const project = new Project(projectName);
//   projects.push(project);
//   renderProjects();
//   projectNameInput.value = "";
//   projectForm.classList.add("hidden");
// });

// const taskBtnAdd = document.querySelector("#tasks .btn-add");
// taskBtnAdd.addEventListener("click", () => {
//   const taskForm = document.querySelector("#tasks .form");
//   taskForm.classList.toggle("hidden");
// });

// const taskForm = document.querySelector("#tasks .form");
// taskForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });
