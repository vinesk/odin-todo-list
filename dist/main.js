/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
project1.tasks.push(new Task("Task 1", "2024-02-18", "Low"));
project1.tasks.push(new Task("Task 2", "2024-02-24", "Medium"));
project1.tasks.push(new Task("Task 3", "2024-02-28", "High"));

const project2 = new Project("Project 2");
project2.tasks.push(new Task("Task 1", "2024-02-28", "Medium"));

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVM7QUFDcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNkJBQTZCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JEO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQ7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSwwQ0FBMEMsU0FBUztBQUNuRDtBQUNBOztBQUVBLGlEQUFpRCxxQkFBcUI7QUFDdEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ2xhc3Nlc1xuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxuXG4gIGFkZFRhc2sodGFzaykge1xuICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgfVxuXG4gIHJlbW92ZVRhc2sodGFza05hbWUpIHtcbiAgICB0aGlzLnRhc2tzID0gdGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2submFtZSAhPT0gdGFza05hbWUpO1xuICB9XG59XG5cbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBEYXRhXG5sZXQgcHJvamVjdHMgPSBbXTtcblxuY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMVwiKTtcbnByb2plY3QxLnRhc2tzLnB1c2gobmV3IFRhc2soXCJUYXNrIDFcIiwgXCIyMDI0LTAyLTE4XCIsIFwiTG93XCIpKTtcbnByb2plY3QxLnRhc2tzLnB1c2gobmV3IFRhc2soXCJUYXNrIDJcIiwgXCIyMDI0LTAyLTI0XCIsIFwiTWVkaXVtXCIpKTtcbnByb2plY3QxLnRhc2tzLnB1c2gobmV3IFRhc2soXCJUYXNrIDNcIiwgXCIyMDI0LTAyLTI4XCIsIFwiSGlnaFwiKSk7XG5cbmNvbnN0IHByb2plY3QyID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDJcIik7XG5wcm9qZWN0Mi50YXNrcy5wdXNoKG5ldyBUYXNrKFwiVGFzayAxXCIsIFwiMjAyNC0wMi0yOFwiLCBcIk1lZGl1bVwiKSk7XG5cbnByb2plY3RzLnB1c2gocHJvamVjdDEpO1xucHJvamVjdHMucHVzaChwcm9qZWN0Mik7XG5cbi8vIEZ1bmN0aW9uc1xuZnVuY3Rpb24gcmVuZGVySXRlbXMoc2VjdGlvbikge1xuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NlY3Rpb259IC5pdGVtc2ApO1xuICBpdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGxldCBkYXRhO1xuICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIGRhdGEgPSBwcm9qZWN0cztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ0YXNrc1wiOlxuICAgICAgZGF0YSA9IHByb2plY3RzWzBdLnRhc2tzO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBkYXRhLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IHJlbmRlckl0ZW0oc2VjdGlvbiwgaW5wdXQpO1xuICAgIGl0ZW1zLmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbShzZWN0aW9uLCBpbnB1dCkge1xuICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiKTtcblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHNlY3Rpb24sIGlucHV0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZShpbnB1dCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuXG4gIGlmIChzZWN0aW9uID09PSBcInRhc2tzXCIpIHtcbiAgICBjb25zdCBpdGVtRHVlRGF0ZSA9IHJlbmRlckl0ZW1EdWVEYXRlKGlucHV0KTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1EdWVEYXRlKTtcblxuICAgIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IHJlbmRlckl0ZW1Qcmlvcml0eShpbnB1dCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChpdGVtUHJpb3JpdHkpO1xuICB9XG5cbiAgY29uc3QgZWRpdEJ0biA9IHJlbmRlckVkaXRJdGVtQnRuKHNlY3Rpb24sIGlucHV0LCBpdGVtKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVJdGVtQnRuKHNlY3Rpb24sIGlucHV0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbihzZWN0aW9uLCBpbnB1dCkge1xuICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pY29uXCIpO1xuICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3QtY2hlY2tcIj48L2k+YDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ0YXNrc1wiOlxuICAgICAgaWYgKGlucHV0LmNvbXBsZXRlZCkge1xuICAgICAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZS1jaGVja1wiPjwvaT5gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jaXJjbGVcIj48L2k+YDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUoaW5wdXQpIHtcbiAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbU5hbWUuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpbnB1dC5uYW1lO1xuXG4gIHJldHVybiBpdGVtTmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUR1ZURhdGUoaW5wdXQpIHtcbiAgY29uc3QgaXRlbUR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUR1ZURhdGUuY2xhc3NMaXN0LmFkZChcIml0ZW0tZHVlLWRhdGVcIik7XG4gIGl0ZW1EdWVEYXRlLnRleHRDb250ZW50ID0gaW5wdXQuZHVlRGF0ZTtcblxuICByZXR1cm4gaXRlbUR1ZURhdGU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1Qcmlvcml0eShpbnB1dCkge1xuICBjb25zdCBpdGVtUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbVByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXG4gICAgXCJpdGVtLXByaW9yaXR5XCIsXG4gICAgYCR7aW5wdXQucHJpb3JpdHkudG9Mb3dlckNhc2UoKX1gXG4gICk7XG4gIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IGlucHV0LnByaW9yaXR5O1xuXG4gIHJldHVybiBpdGVtUHJpb3JpdHk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRJdGVtQnRuKHNlY3Rpb24sIGlucHV0LCBpdGVtKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZWRpdEl0ZW0oc2VjdGlvbiwgaW5wdXQsIGl0ZW0pO1xuICB9KTtcbiAgcmV0dXJuIGVkaXRCdG47XG59XG5cbmZ1bmN0aW9uIGVkaXRJdGVtKHNlY3Rpb24sIGlucHV0LCBpdGVtKSB7XG4gIGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHNlY3Rpb24sIGlucHV0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KGlucHV0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gIGxldCBkdWVEYXRlSW5wdXQ7XG4gIGxldCBwcmlvcml0eVNlbGVjdDtcbiAgaWYgKHNlY3Rpb24gPT09IFwidGFza3NcIikge1xuICAgIGR1ZURhdGVJbnB1dCA9IHJlbmRlckR1ZURhdGVJbnB1dChpbnB1dCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQpO1xuXG4gICAgcHJpb3JpdHlTZWxlY3QgPSByZW5kZXJQcmlvcml0eVNlbGVjdChpbnB1dCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG4gIH1cblxuICBjb25zdCBlZGl0SXRlbUNvbmZpcm1CdG4gPSByZW5kZXJFZGl0SXRlbUNvbmZpcm1CdG4oXG4gICAgc2VjdGlvbixcbiAgICBpbnB1dCxcbiAgICBuYW1lSW5wdXQsXG4gICAgZHVlRGF0ZUlucHV0LFxuICAgIHByaW9yaXR5U2VsZWN0XG4gICk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEl0ZW1Db25maXJtQnRuKTtcblxuICBjb25zdCBlZGl0SXRlbUNhbmNlbEJ0biA9IHJlbmRlckVkaXRJdGVtQ2FuY2VsQnRuKHNlY3Rpb24pO1xuICBpdGVtLmFwcGVuZENoaWxkKGVkaXRJdGVtQ2FuY2VsQnRuKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTmFtZUlucHV0KGlucHV0KSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IGlucHV0Lm5hbWU7XG5cbiAgcmV0dXJuIG5hbWVJbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRHVlRGF0ZUlucHV0KGlucHV0KSB7XG4gIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgZHVlRGF0ZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLWR1ZS1kYXRlXCIpO1xuICBkdWVEYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiO1xuICBkdWVEYXRlSW5wdXQudmFsdWUgPSBpbnB1dC5kdWVEYXRlO1xuXG4gIHJldHVybiBkdWVEYXRlSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByaW9yaXR5U2VsZWN0KGlucHV0KSB7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgcHJpb3JpdHlTZWxlY3QuY2xhc3NMaXN0LmFkZChcIml0ZW0tcHJpb3JpdHlcIik7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJMb3dcIiwgXCJNZWRpdW1cIiwgXCJIaWdoXCJdO1xuICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi52YWx1ZSA9IG9wdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChvcHRpb24gPT09IGlucHV0LnByaW9yaXR5KSB7XG4gICAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcIlwiKTtcbiAgICB9XG4gICAgcHJpb3JpdHlTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBvcHRpb247XG4gICAgcHJpb3JpdHlTZWxlY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3RPcHRpb24pO1xuICB9KTtcbiAgcmV0dXJuIHByaW9yaXR5U2VsZWN0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJFZGl0SXRlbUNvbmZpcm1CdG4oXG4gIHNlY3Rpb24sXG4gIGlucHV0LFxuICBuYW1lSW5wdXQsXG4gIGR1ZURhdGVJbnB1dCxcbiAgcHJpb3JpdHlTZWxlY3Rcbikge1xuICBjb25zdCBlZGl0SXRlbUNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEl0ZW1Db25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGVkaXRJdGVtQ29uZmlybUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVja1wiPjwvaT5gO1xuICBlZGl0SXRlbUNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgbGV0IG5ld0l0ZW1EdWVEYXRlO1xuICAgIGxldCBuZXdJdGVtUHJpb3JpdHk7XG4gICAgc3dpdGNoIChzZWN0aW9uKSB7XG4gICAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IChwcm9qZWN0Lm5hbWUgPSBpbnB1dC5uYW1lKSk7XG4gICAgICAgIHByb2plY3QubmFtZSA9IG5ld0l0ZW1OYW1lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ0YXNrc1wiOlxuICAgICAgICBuZXdJdGVtRHVlRGF0ZSA9IGR1ZURhdGVJbnB1dC52YWx1ZTtcbiAgICAgICAgbmV3SXRlbVByaW9yaXR5ID0gcHJpb3JpdHlTZWxlY3QudmFsdWU7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLm5hbWUgPT09IGlucHV0Lm5hbWUpO1xuICAgICAgICB0YXNrLm5hbWUgPSBuZXdJdGVtTmFtZTtcbiAgICAgICAgdGFzay5kdWVEYXRlID0gbmV3SXRlbUR1ZURhdGU7XG4gICAgICAgIHRhc2sucHJpb3JpdHkgPVxuICAgICAgICAgIG5ld0l0ZW1Qcmlvcml0eVswXS50b1VwcGVyQ2FzZSgpICsgbmV3SXRlbVByaW9yaXR5LnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmVuZGVySXRlbXMoc2VjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gZWRpdEl0ZW1Db25maXJtQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJFZGl0SXRlbUNhbmNlbEJ0bihzZWN0aW9uKSB7XG4gIGNvbnN0IGVkaXRJdGVtQ2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVkaXRJdGVtQ2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGVkaXRJdGVtQ2FuY2VsQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPmA7XG4gIGVkaXRJdGVtQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVySXRlbXMoc2VjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gZWRpdEl0ZW1DYW5jZWxCdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRlbGV0ZUl0ZW1CdG4oc2VjdGlvbiwgaW5wdXQpIHtcbiAgY29uc3QgZGVsZXRlSXRlbUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVJdGVtQnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ0blwiKTtcbiAgZGVsZXRlSXRlbUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuICBkZWxldGVJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZGVsZXRlSXRlbShzZWN0aW9uLCBpbnB1dCk7XG4gIH0pO1xuICByZXR1cm4gZGVsZXRlSXRlbUJ0bjtcbn1cblxuZnVuY3Rpb24gZGVsZXRlSXRlbShzZWN0aW9uLCBpbnB1dCkge1xuICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgIT09IGlucHV0Lm5hbWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInRhc2tzXCI6XG4gICAgICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5uYW1lICE9PSBpbnB1dC5uYW1lKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJlbmRlckl0ZW1zKHNlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiBzaG93VGFza3NPblByb2plY3RDbGljaygpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3Byb2plY3RzIC5pdGVtXCIpO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH0pO1xuICAgICAgcHJvamVjdC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93Rm9ybU9uQnRuQWRkQ2xpY2soc2VjdGlvbikge1xuICBjb25zdCBidG5BZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzZWN0aW9ufSAuYnRuLWFkZGApO1xuICBidG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2VjdGlvbn0gLmZvcm1gKTtcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRJdGVtT25Gb3JtU3VibWl0KHNlY3Rpb24pIHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NlY3Rpb259IC5mb3JtYCk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NlY3Rpb24uc2xpY2UoMCwgLTEpfS1uYW1lYCk7XG4gICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICAgIGNhc2UgXCJwcm9qZWN0c1wiOlxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRhc2tzXCI6XG4gICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYCMke3NlY3Rpb24uc2xpY2UoMCwgLTEpfS1kdWUtZGF0ZWBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGR1ZURhdGVJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAjJHtzZWN0aW9uLnNsaWNlKDAsIC0xKX0tcHJpb3JpdHlgXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID1cbiAgICAgICAgICBwcmlvcml0eVNlbGVjdC52YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgcHJpb3JpdHlTZWxlY3QudmFsdWUuc2xpY2UoMSk7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGR1ZURhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlID0gXCJsb3dcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJlbmRlckl0ZW1zKHNlY3Rpb24pO1xuICAgIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgfSk7XG59XG5cbmNvbnN0IHNlY3Rpb25zID0gW1wicHJvamVjdHNcIiwgXCJ0YXNrc1wiXTtcbnNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24pID0+IHtcbiAgcmVuZGVySXRlbXMoc2VjdGlvbik7XG4gIHNob3dUYXNrc09uUHJvamVjdENsaWNrKCk7XG4gIHNob3dGb3JtT25CdG5BZGRDbGljayhzZWN0aW9uKTtcbiAgYWRkSXRlbU9uRm9ybVN1Ym1pdChzZWN0aW9uKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9