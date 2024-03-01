// import projects from "../data/data";
import Project from "../obj/Project";
import Task from "../obj/Task";

let projects = [];

const project1 = new Project("Project 1");
project1.addTask(new Task("Task 1", "2024-02-18", "Low"));
project1.addTask(new Task("Task 2", "2024-02-24", "Medium"));
project1.addTask(new Task("Task 3", "2024-02-28", "High"));
projects.push(project1);

const project2 = new Project("Project 2");
project2.addTask(new Task("Task 1", "2024-02-28", "Medium"));
projects.push(project2);

// Render items
export default function renderItems(sectionName) {
  const items = document.createElement("div");
  items.classList.add("items");

  const data = getData(sectionName);
  data.forEach((input, index) => {
    const item = renderItem(sectionName, input);

    if (sectionName === "projects" && index === 0) {
      item.classList.add("selected");
    }

    items.appendChild(item);
  });

  return items;
}

function getData(sectionName) {
  let data;
  switch (sectionName) {
    case "projects":
      data = projects;
      break;
    case "tasks":
      const selectedProject = getSelectedProject();
      data = selectedProject.tasks;
      break;
  }
  return data;
}

function getSelectedProject() {
  const selectedProjectName = document.querySelector(
    `#projects .selected .item-name`
  ).textContent;

  const selectedProject = projects.find(
    (project) => project.name === selectedProjectName
  );

  return selectedProject;
}

// Render item
function renderItem(sectionName, input) {
  const item = document.createElement("div");
  item.classList.add("item");

  let itemIcon = renderItemIcon(sectionName, input, item);
  item.appendChild(itemIcon);

  const itemName = renderItemName(sectionName, input, item);
  item.appendChild(itemName);

  if (sectionName === "tasks") {
    const itemDueDate = renderItemDueDate(input);
    item.appendChild(itemDueDate);

    const itemPriority = renderItemPriority(input);
    item.appendChild(itemPriority);
  }

  const editBtn = renderEditBtn(sectionName, input, item);
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteBtn(sectionName, input);
  item.appendChild(deleteBtn);

  return item;
}

// Render item icon
function renderItemIcon(sectionName, input, item) {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");

  switch (sectionName) {
    case "projects":
      itemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;
      break;
    case "tasks":
      if (input.completed) {
        item.classList.add("completed");
        itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
      } else {
        itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      }
      updateItemIconOnClick(input, item, itemIcon);
      break;
  }

  return itemIcon;
}

function updateItemIconOnClick(input, item, itemIcon) {
  itemIcon.addEventListener("click", () => {
    input.completed = input.completed ? false : true;
    if (input.completed) {
      item.classList.add("completed");
      itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    } else {
      item.classList.remove("completed");
      itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    }
  });
}

// Render item name
function renderItemName(sectionName, input, item) {
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  itemName.textContent = input.name;

  if (sectionName === "projects") {
    changeSelectedProjectOnClick(item, itemName);
  }

  return itemName;
}

function changeSelectedProjectOnClick(item, itemName) {
  itemName.addEventListener("click", () => {
    const projects = document.querySelectorAll("#projects .item");
    projects.forEach((project) => {
      project.classList.remove("selected");
    });
    item.classList.add("selected");
    updateItems("tasks");
  });
}

function updateItems(sectionName) {
  const items = document.querySelector(`#${sectionName} .items`);
  items.innerHTML = "";

  const data = getData(sectionName);
  data.forEach((input, index) => {
    const item = renderItem(sectionName, input);

    if (sectionName === "projects" && index === 0) {
      item.classList.add("selected");
    }

    items.appendChild(item);
  });

  return items;
}

// Render item due date
function renderItemDueDate(input) {
  const itemDueDate = document.createElement("span");
  itemDueDate.classList.add("item-due-date");
  itemDueDate.textContent = input.dueDate;

  return itemDueDate;
}

// Render item priority
function renderItemPriority(input) {
  const itemPriority = document.createElement("span");
  itemPriority.classList.add(
    "item-priority",
    `${input.priority.toLowerCase()}`
  );
  itemPriority.textContent = input.priority;

  return itemPriority;
}

// Render edit btn
function renderEditBtn(sectionName, input, item) {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  editItemOnClick(sectionName, input, item, editBtn);

  return editBtn;
}

function editItemOnClick(sectionName, input, item, editBtn) {
  editBtn.addEventListener("click", () => {
    item.innerHTML = "";

    const itemIcon = renderItemIcon(sectionName, input);
    item.appendChild(itemIcon);

    const nameInput = renderNameInput(input);
    item.appendChild(nameInput);

    let dueDateInput;
    let prioritySelect;
    if (sectionName === "tasks") {
      dueDateInput = renderDueDateInput(input);
      item.appendChild(dueDateInput);

      prioritySelect = renderPrioritySelect(input);
      item.appendChild(prioritySelect);
    }

    const confirmBtn = renderConfirmBtn(
      sectionName,
      input,
      nameInput,
      dueDateInput,
      prioritySelect
    );
    item.appendChild(confirmBtn);

    const cancelBtn = renderCancelBtn(sectionName);
    item.appendChild(cancelBtn);
  });
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

function renderConfirmBtn(
  sectionName,
  input,
  nameInput,
  dueDateInput,
  prioritySelect
) {
  const confirmBtn = document.createElement("span");
  confirmBtn.classList.add("check-btn");
  confirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

  confirmEditItemOnClick(
    sectionName,
    input,
    nameInput,
    dueDateInput,
    prioritySelect,
    confirmBtn
  );

  return confirmBtn;
}

function confirmEditItemOnClick(
  sectionName,
  input,
  nameInput,
  dueDateInput,
  prioritySelect,
  confirmBtn
) {
  confirmBtn.addEventListener("click", () => {
    const newItemName = nameInput.value.trim();
    let newItemDueDate;
    let newItemPriority;
    switch (sectionName) {
      case "projects":
        const project = projects.find((project) => (project.name = input.name));
        project.name = newItemName;
        break;
      case "tasks":
        newItemDueDate = dueDateInput.value;
        newItemPriority = prioritySelect.value;
        const selectedProject = getSelectedProject();
        const task = selectedProject.tasks.find(
          (task) => task.name === input.name
        );
        task.name = newItemName;
        task.dueDate = newItemDueDate;
        task.priority =
          newItemPriority[0].toUpperCase() + newItemPriority.slice(1);
        break;
    }
    updateItems(sectionName);
  });
}

function renderCancelBtn(sectionName) {
  const cancelBtn = document.createElement("span");
  cancelBtn.classList.add("check-btn");
  cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  cancelEditItemOnClick(sectionName, cancelBtn);

  return cancelBtn;
}

function cancelEditItemOnClick(sectionName, cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    updateItems(sectionName);
  });
}

// Render delete btn
function renderDeleteBtn(sectionName, input) {
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  deleteItemOnClick(sectionName, input, deleteBtn);

  return deleteBtn;
}

function deleteItemOnClick(sectionName, input, deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    switch (sectionName) {
      case "projects":
        projects = projects.filter((project) => project.name !== input.name);
        break;
      case "tasks":
        const selectedProject = getSelectedProject();
        selectedProject.removeTask(input.name);
        break;
    }
    updateItems(sectionName);
  });
}
