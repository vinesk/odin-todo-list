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

const project1 = new Project("Project 1");
project1.addTask(new Task("Task 1", "2024-02-18", "Low"));
project1.addTask(new Task("Task 2", "2024-02-24", "Medium"));
project1.addTask(new Task("Task 3", "2024-02-28", "High"));

const project2 = new Project("Project 2");
project2.addTask(new Task("Task 1", "2024-02-28", "Medium"));

projects.push(project1);
projects.push(project2);

// Functions
function renderItems(section) {
  const items = document.querySelector(`#${section} .items`);
  items.innerHTML = "";

  let data;
  switch (section) {
    case "projects":
      data = projects;
      break;
    case "tasks":
      data = projects[0].tasks;
      break;
  }

  data.forEach((input) => {
    const item = renderItem(section, input);
    items.appendChild(item);
  });
}

function renderItem(section, input) {
  const item = document.createElement("div");
  item.classList.add("item");

  const itemIcon = renderItemIcon(section, input);
  item.appendChild(itemIcon);

  const itemName = renderItemName(input);
  item.appendChild(itemName);

  if (section === "tasks") {
    const itemDueDate = renderItemDueDate(input);
    item.appendChild(itemDueDate);

    const itemPriority = renderItemPriority(input);
    item.appendChild(itemPriority);
  }

  const editBtn = renderEditItemBtn(section, input, item);
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteItemBtn(section, input);
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon(section, input) {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");
  switch (section) {
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

function renderEditItemBtn(section, input, item) {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => {
    editItem(section, input, item);
  });
  return editBtn;
}

function editItem(section, input, item) {
  item.innerHTML = "";

  const itemIcon = renderItemIcon(section, input);
  item.appendChild(itemIcon);

  const nameInput = renderNameInput(input);
  item.appendChild(nameInput);

  let dueDateInput;
  let prioritySelect;
  if (section === "tasks") {
    dueDateInput = renderDueDateInput(input);
    item.appendChild(dueDateInput);

    prioritySelect = renderPrioritySelect(input);
    item.appendChild(prioritySelect);
  }

  const editItemConfirmBtn = renderEditItemConfirmBtn(
    section,
    input,
    nameInput,
    dueDateInput,
    prioritySelect
  );
  item.appendChild(editItemConfirmBtn);

  const editItemCancelBtn = renderEditItemCancelBtn(section);
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
  section,
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
    switch (section) {
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
    renderItems(section);
  });
  return editItemConfirmBtn;
}

function renderEditItemCancelBtn(section) {
  const editItemCancelBtn = document.createElement("span");
  editItemCancelBtn.classList.add("check-btn");
  editItemCancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  editItemCancelBtn.addEventListener("click", () => {
    renderItems(section);
  });
  return editItemCancelBtn;
}

function renderDeleteItemBtn(section, input) {
  const deleteItemBtn = document.createElement("span");
  deleteItemBtn.classList.add("edit-btn");
  deleteItemBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteItemBtn.addEventListener("click", () => {
    deleteItem(section, input);
  });
  return deleteItemBtn;
}

function deleteItem(section, input) {
  switch (section) {
    case "projects":
      projects = projects.filter((project) => project.name !== input.name);
      break;
    case "tasks":
      tasks = tasks.filter((task) => task.name !== input.name);
      break;
  }
  renderItems(section);
}

function showTasksOnProjectClick() {
  const projects = document.querySelectorAll("#projects .item");
  projects.forEach((project) => {
    project.addEventListener("click", () => {
      projects.forEach((project) => {
        project.classList.remove("selected");
      });
      project.classList.add("selected");
    });
  });
}

function showFormOnBtnAddClick(section) {
  const btnAdd = document.querySelector(`#${section} .btn-add`);
  btnAdd.addEventListener("click", () => {
    const form = document.querySelector(`#${section} .form`);
    form.classList.toggle("hidden");
  });
}

function addItemOnFormSubmit(section) {
  const form = document.querySelector(`#${section} .form`);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector(`#${section.slice(0, -1)}-name`);
    const name = nameInput.value.trim();

    switch (section) {
      case "projects":
        const project = new Project(name);
        projects.push(project);
        nameInput.value = "";
        break;
      case "tasks":
        const dueDateInput = document.querySelector(
          `#${section.slice(0, -1)}-due-date`
        );
        const dueDate = dueDateInput.value;
        const prioritySelect = document.querySelector(
          `#${section.slice(0, -1)}-priority`
        );
        const priority =
          prioritySelect.value[0].toUpperCase() + prioritySelect.value.slice(1);
        const task = new Task(name, dueDate, priority);
        tasks.push(task);
        nameInput.value = "";
        dueDateInput.value = "";
        prioritySelect.value = "low";
        break;
    }
    renderItems(section);
    form.classList.toggle("hidden");
  });
}

const sections = ["projects", "tasks"];
sections.forEach((section) => {
  renderItems(section);
  showTasksOnProjectClick();
  showFormOnBtnAddClick(section);
  addItemOnFormSubmit(section);
});
