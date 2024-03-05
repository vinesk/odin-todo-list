/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/addItemOnSubmit.js":
/*!************************************!*\
  !*** ./src/app/addItemOnSubmit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addItemOnSubmit)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../obj/Task */ "./src/obj/Task.js");
/* harmony import */ var _renderProjectItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjectItems */ "./src/app/renderProjectItems.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/renderTaskItems.js");





function addItemOnSubmit(projects) {
  const inputs = ["project", "task"];

  inputs.forEach((input) => {
    const form = document.querySelector(`#form-${input}`);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.querySelector(`#${input}-name`);
      const name = nameInput.value.trim();

      switch (input) {
        case "project":
          const project = new _obj_Project__WEBPACK_IMPORTED_MODULE_0__["default"](name);
          projects.push(project);
          nameInput.value = "";
          form.classList.add("hidden");
          (0,_renderProjectItems__WEBPACK_IMPORTED_MODULE_2__["default"])(projects);
          break;
        case "task":
          const dueDateInput = document.querySelector(`#${input}-due-date`);
          const dueDate = dueDateInput.value;

          const prioritySelect = document.querySelector(`#${input}-priority`);
          const priority =
            prioritySelect.value[0].toUpperCase() +
            prioritySelect.value.slice(1);

          const task = new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"](name, dueDate, priority);
          const tasks = (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_3__.getTasks)(projects);
          tasks.push(task);
          nameInput.value = "";
          dueDateInput.value = "";
          prioritySelect.value = "low";
          form.classList.add("hidden");
          (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_3__.renderTaskItems)(projects);
          break;
      }
    });
  });
}


/***/ }),

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./src/data/data.js");
/* harmony import */ var _addItemOnSubmit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addItemOnSubmit */ "./src/app/addItemOnSubmit.js");
/* harmony import */ var _renderProjectItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjectItems */ "./src/app/renderProjectItems.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/renderTaskItems.js");
/* harmony import */ var _toggleAsideOnClick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggleAsideOnClick */ "./src/app/toggleAsideOnClick.js");
/* harmony import */ var _toggleFormOnClick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toggleFormOnClick */ "./src/app/toggleFormOnClick.js");







function app() {
  const projects = (0,_data_data__WEBPACK_IMPORTED_MODULE_0__["default"])();

  (0,_toggleFormOnClick__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_toggleAsideOnClick__WEBPACK_IMPORTED_MODULE_4__["default"])();

  (0,_renderProjectItems__WEBPACK_IMPORTED_MODULE_2__["default"])(projects);
  (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_3__.renderTaskItems)(projects);
  (0,_addItemOnSubmit__WEBPACK_IMPORTED_MODULE_1__["default"])(projects);
}


/***/ }),

/***/ "./src/app/renderProjectItems.js":
/*!***************************************!*\
  !*** ./src/app/renderProjectItems.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderProjectItems)
/* harmony export */ });
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/renderTaskItems.js");


function renderProjectItems(projects) {
  const items = document.querySelector("#projects");
  items.innerHTML = "";

  projects.forEach((project, index) => {
    const item = renderProjectItem(project);

    if (index === 0) {
      item.classList.add("selected");
    }

    items.appendChild(item);
  });

  changeSelectedProjectOnClick(projects);
  editProjectOnClick(projects);
  deleteProjectOnClick(projects);
}

function renderProjectItem(project) {
  const item = document.createElement("div");
  item.classList.add("item", "project");

  const itemIcon = renderItemIcon();
  item.appendChild(itemIcon);

  const itemName = renderItemName(project);
  item.appendChild(itemName);

  const editBtn = renderEditBtn();
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteBtn();
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon() {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");
  itemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;

  return itemIcon;
}

function renderItemName(project) {
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  itemName.textContent = project.name;

  return itemName;
}

function renderEditBtn() {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  return editBtn;
}

function renderDeleteBtn() {
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  return deleteBtn;
}

function changeSelectedProjectOnClick(projects) {
  const items = document.querySelectorAll(".project");
  const itemNames = document.querySelectorAll(".project .item-name");

  itemNames.forEach((itemName, index) => {
    itemName.addEventListener("click", () => {
      items.forEach((item) => {
        item.classList.remove("selected");
      });
      items[index].classList.add("selected");
      (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_0__.renderTaskItems)(projects);
    });
  });
}

function editProjectOnClick(projects) {
  const items = document.querySelectorAll(".project");
  const editBtns = document.querySelectorAll(".project .edit-btn");

  editBtns.forEach((editBtn, index) => {
    editBtn.addEventListener("click", () => {
      const project = projects[index];
      const item = items[index];
      item.innerHTML = "";

      const itemIcon = renderItemIcon();
      item.appendChild(itemIcon);

      const nameInput = renderNameInput(project);
      item.appendChild(nameInput);

      const confirmBtn = renderConfirmBtn(projects, index);
      item.appendChild(confirmBtn);

      const cancelBtn = renderCancelBtn(projects);
      item.appendChild(cancelBtn);
    });
  });
}

function renderNameInput(project) {
  const nameInput = document.createElement("input");
  nameInput.classList.add("item-name");
  nameInput.type = "text";
  nameInput.value = project.name;

  return nameInput;
}

function renderConfirmBtn(projects, index) {
  const confirmBtn = document.createElement("span");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  confirmBtn.addEventListener("click", () => {
    const itemNames = document.querySelectorAll(".project .item-name");
    const newItemName = itemNames[index].value.trim();
    projects[index].name = newItemName;
    renderProjectItems(projects);
  });

  return confirmBtn;
}

function renderCancelBtn(projects) {
  const cancelBtn = document.createElement("span");
  cancelBtn.classList.add("check-btn");
  cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  cancelBtn.addEventListener("click", () => {
    renderProjectItems(projects);
  });

  return cancelBtn;
}

function deleteProjectOnClick(projects) {
  const deleteBtns = document.querySelectorAll(".project .delete-btn");

  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      projects.splice(index, 1);
      renderProjectItems(projects);
    });
  });
}


/***/ }),

/***/ "./src/app/renderTaskItems.js":
/*!************************************!*\
  !*** ./src/app/renderTaskItems.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTasks: () => (/* binding */ getTasks),
/* harmony export */   renderTaskItems: () => (/* binding */ renderTaskItems)
/* harmony export */ });
function renderTaskItems(projects) {
  const items = document.querySelector("#tasks");
  items.innerHTML = "";

  const tasks = getTasks(projects);
  tasks.forEach((task) => {
    const item = renderTaskItem(task);
    items.appendChild(item);
  });

  changeItemIconOnClick(projects);
  deleteTaskOnClick(projects);
  editTaskOnClick(projects);
}

function getTasks(projects) {
  const selectedProjectName = document.querySelector(
    ".project.selected .item-name"
  ).textContent;

  const selectedProject = projects.find(
    (project) => project.name === selectedProjectName
  );

  return selectedProject.tasks;
}

function renderTaskItem(task) {
  const item = document.createElement("div");
  item.classList.add("item", "task");

  if (task.completed) {
    item.classList.add("completed");
  }

  const itemIcon = renderItemIcon(task);
  item.appendChild(itemIcon);

  const itemName = renderItemName(task);
  item.appendChild(itemName);

  const itemDueDate = renderItemDueDate(task);
  item.appendChild(itemDueDate);

  const itemPriority = renderItemPriority(task);
  item.appendChild(itemPriority);

  const editBtn = renderEditBtn();
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteBtn();
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon(task) {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");

  if (task.completed) {
    itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
  } else {
    itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
  }

  return itemIcon;
}

function renderItemName(task) {
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  itemName.textContent = task.name;

  return itemName;
}

function renderItemDueDate(task) {
  const itemDueDate = document.createElement("span");
  itemDueDate.classList.add("item-due-date");
  itemDueDate.textContent = task.dueDate;

  return itemDueDate;
}

function renderItemPriority(task) {
  const itemPriority = document.createElement("span");
  itemPriority.classList.add("item-priority", `${task.priority.toLowerCase()}`);
  itemPriority.textContent = task.priority;

  return itemPriority;
}

function renderEditBtn() {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

  return editBtn;
}

function renderDeleteBtn() {
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  return deleteBtn;
}

function changeItemIconOnClick(projects) {
  const tasks = getTasks(projects);
  const itemIcons = document.querySelectorAll(".task .item-icon");

  itemIcons.forEach((itemIcon, index) => {
    itemIcon.addEventListener("click", () => {
      const task = tasks[index];
      task.completed = task.completed ? false : true;
      renderTaskItems(projects);
    });
  });
}

function deleteTaskOnClick(projects) {
  const tasks = getTasks(projects);
  const deleteBtns = document.querySelectorAll(".task .delete-btn");

  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTaskItems(projects);
    });
  });
}

function editTaskOnClick(projects) {
  const tasks = getTasks(projects);
  const items = document.querySelectorAll(".task");
  const editBtns = document.querySelectorAll(".task .edit-btn");

  editBtns.forEach((editBtn, index) => {
    editBtn.addEventListener("click", () => {
      const task = tasks[index];
      const item = items[index];
      item.innerHTML = "";

      const itemIcon = renderItemIcon(task);
      item.appendChild(itemIcon);

      const nameInput = renderNameInput(task);
      item.appendChild(nameInput);

      const dueDateInput = renderDueDateInput(task);
      item.appendChild(dueDateInput);

      const prioritySelect = renderPrioritySelect(task);
      item.appendChild(prioritySelect);

      const confirmBtn = renderConfirmBtn(projects, task, index);
      item.appendChild(confirmBtn);

      const cancelBtn = renderCancelBtn(projects);
      item.appendChild(cancelBtn);
    });
  });
}

function renderNameInput(task) {
  const nameInput = document.createElement("input");
  nameInput.classList.add("item-name");
  nameInput.type = "text";
  nameInput.value = task.name;

  return nameInput;
}

function renderDueDateInput(task) {
  const dueDateInput = document.createElement("input");
  dueDateInput.classList.add("item-due-date");
  dueDateInput.type = "date";
  dueDateInput.value = task.dueDate;

  return dueDateInput;
}

function renderPrioritySelect(task) {
  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("item-priority");
  const options = ["Low", "Medium", "High"];
  options.forEach((option) => {
    const prioritySelectOption = document.createElement("option");
    prioritySelectOption.value = option.toLowerCase();
    if (option === task.priority) {
      prioritySelectOption.setAttribute("selected", "");
    }
    prioritySelectOption.textContent = option;
    prioritySelect.appendChild(prioritySelectOption);
  });
  return prioritySelect;
}

function renderConfirmBtn(projects, task, index) {
  const confirmBtn = document.createElement("span");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  confirmBtn.addEventListener("click", () => {
    const itemNames = document.querySelectorAll(".task .item-name");
    const itemDueDates = document.querySelectorAll(".task .item-due-date");
    const itemPriorities = document.querySelectorAll(".task .item-priority");

    const newItemName = itemNames[index].value.trim();
    const newItemDueDate = itemDueDates[index].value;
    const newItemPriority = itemPriorities[index].value;

    task.name = newItemName;
    task.dueDate = newItemDueDate;
    task.priority = newItemPriority[0].toUpperCase() + newItemPriority.slice(1);

    renderTaskItems(projects);
  });

  return confirmBtn;
}

function renderCancelBtn(projects) {
  const cancelBtn = document.createElement("span");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  cancelBtn.addEventListener("click", () => {
    renderTaskItems(projects);
  });

  return cancelBtn;
}




/***/ }),

/***/ "./src/app/toggleAsideOnClick.js":
/*!***************************************!*\
  !*** ./src/app/toggleAsideOnClick.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleAsideOnClick)
/* harmony export */ });
function toggleAsideOnClick() {
  const btnAside = document.querySelector("#btn-aside");
  btnAside.addEventListener("click", () => {
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  });
}


/***/ }),

/***/ "./src/app/toggleFormOnClick.js":
/*!**************************************!*\
  !*** ./src/app/toggleFormOnClick.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleFormOnClick)
/* harmony export */ });
function toggleFormOnClick() {
  const inputs = ["project", "task"];
  inputs.forEach((input) => {
    const btnAdd = document.querySelector(`#btn-add-${input}`);
    btnAdd.addEventListener("click", () => {
      const form = document.querySelector(`#form-${input}`);
      form.classList.toggle("hidden");
    });
  });
}


/***/ }),

/***/ "./src/data/data.js":
/*!**************************!*\
  !*** ./src/data/data.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ data)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../obj/Task */ "./src/obj/Task.js");



function data() {
  let data = [];
  const project1 = new _obj_Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Project 1");
  project1.addTask(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 1", "2024-02-18", "Low"));
  project1.addTask(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 2", "2024-02-24", "Medium"));
  project1.addTask(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 3", "2024-02-28", "High"));
  data.push(project1);

  const project2 = new _obj_Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Project 2");
  project2.addTask(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 1", "2024-02-28", "Medium"));
  data.push(project2);

  return data;
}


/***/ }),

/***/ "./src/layout/assets/aside.js":
/*!************************************!*\
  !*** ./src/layout/assets/aside.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ aside)
/* harmony export */ });
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section */ "./src/layout/assets/section.js");


function aside() {
  const aside = document.createElement("aside");

  const filterSection = (0,_section__WEBPACK_IMPORTED_MODULE_0__["default"])("filters");
  aside.appendChild(filterSection);

  const projectSection = (0,_section__WEBPACK_IMPORTED_MODULE_0__["default"])("projects");
  aside.appendChild(projectSection);

  return aside;
}


/***/ }),

/***/ "./src/layout/assets/footer.js":
/*!*************************************!*\
  !*** ./src/layout/assets/footer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ footer)
/* harmony export */ });
function footer() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <a href="https://github.com/vinesk/odin-todo-list" target="_blank">
      <i class="fa-brands fa-github"></i> vinesk
    </a>`;

  return footer;
}


/***/ }),

/***/ "./src/layout/assets/header.js":
/*!*************************************!*\
  !*** ./src/layout/assets/header.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ header)
/* harmony export */ });
function header() {
  const header = document.createElement("header");
  header.innerHTML = `
        <h1>Todo List</h1>
        <span id="btn-aside">
          <i class="fa-solid fa-bars"></i>
        </span>`;

  return header;
}


/***/ }),

/***/ "./src/layout/assets/main.js":
/*!***********************************!*\
  !*** ./src/layout/assets/main.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section */ "./src/layout/assets/section.js");


function main() {
  const main = document.createElement("main");

  const taskSection = (0,_section__WEBPACK_IMPORTED_MODULE_0__["default"])("tasks");
  main.appendChild(taskSection);

  return main;
}


/***/ }),

/***/ "./src/layout/assets/section.js":
/*!**************************************!*\
  !*** ./src/layout/assets/section.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ section)
/* harmony export */ });
function section(sectionName) {
  let section = document.createElement("section");

  switch (sectionName) {
    case "filters":
      section.innerHTML = `
        <h2 class="title">Filters</h2>
        <div class="items" id="filters">
          <div class="item filter" id="filter-all">
            <span class="item-icon">
              <i class="fa-solid fa-inbox"></i>
            </span>
            <span class="item-name">All</span>
          </div>
          <div class="item filter" id="filter-today">
            <span class="item-icon">
              <i class="fa-solid fa-calendar-day"></i>
            </span>
            <span class="item-name">Today</span>
          </div>
          <div class="item filter" id="filter-week">
            <span class="item-icon">
              <i class="fa-solid fa-calendar-day"></i>
            </span>
            <span class="item-name">This week</span>
          </div>
        </div>`;
      break;

    case "projects":
      section.innerHTML = `
        <h2 class="title">Projects</h2>
        <div class="items" id="projects"></div>
        <button class="btn-add" id="btn-add-project">Add a project</button>
        <form class="form hidden" id="form-project" action="#" method="post">
          <label for="project-name">Name:</label>
          <input type="text" id="project-name" required="" />
          <div class="form-controls">
            <button type="submit">Confirm</button>
            <button type="reset">Reset</button>
          </div>
        </form>`;
      break;

    case "tasks":
      section.innerHTML = `
        <h2 class="title">Tasks</h2>
        <div class="items" id="tasks"></div>
        <button class="btn-add" id="btn-add-task">Add a task</button>
        <form class="form hidden" id="form-task" action="#" method="post">
          <label for="task-name">Name:</label>
          <input type="text" id="task-name" required="" />
          <label for="task-due-date">Due date:</label>
          <input type="date" id="task-due-date" required="" />
          <label for="task-priority">Priority:</label>
          <select id="task-priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div class="form-controls">
            <button type="submit">Confirm</button>
            <button type="reset">Reset</button>
          </div>
        </form>`;
      break;
  }

  return section;
}


/***/ }),

/***/ "./src/layout/layout.js":
/*!******************************!*\
  !*** ./src/layout/layout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ layout)
/* harmony export */ });
/* harmony import */ var _assets_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/header */ "./src/layout/assets/header.js");
/* harmony import */ var _assets_aside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/aside */ "./src/layout/assets/aside.js");
/* harmony import */ var _assets_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/main */ "./src/layout/assets/main.js");
/* harmony import */ var _assets_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/footer */ "./src/layout/assets/footer.js");





function layout() {
  const container = document.querySelector("#container");

  container.appendChild((0,_assets_header__WEBPACK_IMPORTED_MODULE_0__["default"])());
  container.appendChild((0,_assets_aside__WEBPACK_IMPORTED_MODULE_1__["default"])());
  container.appendChild((0,_assets_main__WEBPACK_IMPORTED_MODULE_2__["default"])());
  container.appendChild((0,_assets_footer__WEBPACK_IMPORTED_MODULE_3__["default"])());
}


/***/ }),

/***/ "./src/obj/Project.js":
/*!****************************!*\
  !*** ./src/obj/Project.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }
}


/***/ }),

/***/ "./src/obj/Task.js":
/*!*************************!*\
  !*** ./src/obj/Task.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(name, dueDate, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _layout_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout/layout */ "./src/layout/layout.js");
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app */ "./src/app/app.js");



(() => {
  (0,_layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_app_app__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDTjtBQUN1QjtBQUNROztBQUUvQztBQUNmOztBQUVBO0FBQ0EsaURBQWlELE1BQU07QUFDdkQ7QUFDQTs7QUFFQSxtREFBbUQsTUFBTTtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLG9EQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0RBQWtCO0FBQzVCO0FBQ0E7QUFDQSwwREFBMEQsTUFBTTtBQUNoRTs7QUFFQSw0REFBNEQsTUFBTTtBQUNsRTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGlEQUFJO0FBQy9CLHdCQUF3QiwwREFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpRUFBZTtBQUN6QjtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NnQztBQUNnQjtBQUNNO0FBQ0Y7QUFDRTtBQUNGOztBQUVyQztBQUNmLG1CQUFtQixzREFBSTs7QUFFdkIsRUFBRSw4REFBaUI7QUFDbkIsRUFBRSwrREFBa0I7O0FBRXBCLEVBQUUsK0RBQWtCO0FBQ3BCLEVBQUUsaUVBQWU7QUFDakIsRUFBRSw0REFBZTtBQUNqQjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCb0Q7O0FBRXJDO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE1BQU0saUVBQWU7QUFDckIsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQzNKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQsNEJBQTRCO0FBQzdFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFcUM7Ozs7Ozs7Ozs7Ozs7OztBQzFPdEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7O0FDTmU7QUFDZjtBQUNBO0FBQ0Esc0RBQXNELE1BQU07QUFDNUQ7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVHFDO0FBQ047O0FBRWhCO0FBQ2Y7QUFDQSx1QkFBdUIsb0RBQU87QUFDOUIsdUJBQXVCLGlEQUFJO0FBQzNCLHVCQUF1QixpREFBSTtBQUMzQix1QkFBdUIsaURBQUk7QUFDM0I7O0FBRUEsdUJBQXVCLG9EQUFPO0FBQzlCLHVCQUF1QixpREFBSTtBQUMzQjs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJnQzs7QUFFakI7QUFDZjs7QUFFQSx3QkFBd0Isb0RBQU87QUFDL0I7O0FBRUEseUJBQXlCLG9EQUFPO0FBQ2hDOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1plO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNSZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDVGdDOztBQUVqQjtBQUNmOztBQUVBLHNCQUFzQixvREFBTztBQUM3Qjs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNUZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVxQztBQUNGO0FBQ0Y7QUFDSTs7QUFFdEI7QUFDZjs7QUFFQSx3QkFBd0IsMERBQU07QUFDOUIsd0JBQXdCLHlEQUFLO0FBQzdCLHdCQUF3Qix3REFBSTtBQUM1Qix3QkFBd0IsMERBQU07QUFDOUI7Ozs7Ozs7Ozs7Ozs7OztBQ1plO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ1Q7O0FBRTVCO0FBQ0EsRUFBRSwwREFBTTtBQUNSLEVBQUUsb0RBQUc7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2FkZEl0ZW1PblN1Ym1pdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXBwLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9yZW5kZXJQcm9qZWN0SXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL3JlbmRlclRhc2tJdGVtcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvdG9nZ2xlQXNpZGVPbkNsaWNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC90b2dnbGVGb3JtT25DbGljay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9hc2lkZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL21haW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9zZWN0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi4vb2JqL1Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuLi9vYmovVGFza1wiO1xuaW1wb3J0IHJlbmRlclByb2plY3RJdGVtcyBmcm9tIFwiLi9yZW5kZXJQcm9qZWN0SXRlbXNcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0VGFza3MgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSXRlbU9uU3VibWl0KHByb2plY3RzKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuXG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tbmFtZWApO1xuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgICAgY2FzZSBcInByb2plY3RcIjpcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFza1wiOlxuICAgICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1kdWUtZGF0ZWApO1xuICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1wcmlvcml0eWApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID1cbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlWzBdLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBkdWVEYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlID0gXCJsb3dcIjtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgZGF0YSBmcm9tIFwiLi4vZGF0YS9kYXRhXCI7XG5pbXBvcnQgYWRkSXRlbU9uU3VibWl0IGZyb20gXCIuL2FkZEl0ZW1PblN1Ym1pdFwiO1xuaW1wb3J0IHJlbmRlclByb2plY3RJdGVtcyBmcm9tIFwiLi9yZW5kZXJQcm9qZWN0SXRlbXNcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcyB9IGZyb20gXCIuL3JlbmRlclRhc2tJdGVtc1wiO1xuaW1wb3J0IHRvZ2dsZUFzaWRlT25DbGljayBmcm9tIFwiLi90b2dnbGVBc2lkZU9uQ2xpY2tcIjtcbmltcG9ydCB0b2dnbGVGb3JtT25DbGljayBmcm9tIFwiLi90b2dnbGVGb3JtT25DbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHAoKSB7XG4gIGNvbnN0IHByb2plY3RzID0gZGF0YSgpO1xuXG4gIHRvZ2dsZUZvcm1PbkNsaWNrKCk7XG4gIHRvZ2dsZUFzaWRlT25DbGljaygpO1xuXG4gIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIGFkZEl0ZW1PblN1Ym1pdChwcm9qZWN0cyk7XG59XG4iLCJpbXBvcnQgeyByZW5kZXJUYXNrSXRlbXMgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKSB7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcbiAgaXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcblxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJQcm9qZWN0SXRlbShwcm9qZWN0KTtcblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaXRlbXMuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH0pO1xuXG4gIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RJdGVtKHByb2plY3QpIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIiwgXCJwcm9qZWN0XCIpO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZShwcm9qZWN0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XG5cbiAgY29uc3QgZWRpdEJ0biA9IHJlbmRlckVkaXRCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbigpIHtcbiAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUljb24uY2xhc3NMaXN0LmFkZChcIml0ZW0taWNvblwiKTtcbiAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5gO1xuXG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUocHJvamVjdCkge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuXG4gIHJldHVybiBlZGl0QnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4oKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRlbGV0ZUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuaXRlbS1uYW1lXCIpO1xuXG4gIGl0ZW1OYW1lcy5mb3JFYWNoKChpdGVtTmFtZSwgaW5kZXgpID0+IHtcbiAgICBpdGVtTmFtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH0pO1xuICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGVkaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5lZGl0LWJ0blwiKTtcblxuICBlZGl0QnRucy5mb3JFYWNoKChlZGl0QnRuLCBpbmRleCkgPT4ge1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1tpbmRleF07XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgaXRlbS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KHByb2plY3QpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICBjb25zdCBjb25maXJtQnRuID0gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgaW5kZXgpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dChwcm9qZWN0KSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCBpbmRleCkge1xuICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm0tYnRuXCIpO1xuICBjb25maXJtQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPmA7XG4gIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpdGVtTmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLml0ZW0tbmFtZVwiKTtcbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IGl0ZW1OYW1lc1tpbmRleF0udmFsdWUudHJpbSgpO1xuICAgIHByb2plY3RzW2luZGV4XS5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5gO1xuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY2FuY2VsQnRuO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5kZWxldGUtYnRuXCIpO1xuXG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZGVsZXRlQnRuLCBpbmRleCkgPT4ge1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKSB7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcbiAgaXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcblxuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJUYXNrSXRlbSh0YXNrKTtcbiAgICBpdGVtcy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfSk7XG5cbiAgY2hhbmdlSXRlbUljb25PbkNsaWNrKHByb2plY3RzKTtcbiAgZGVsZXRlVGFza09uQ2xpY2socHJvamVjdHMpO1xuICBlZGl0VGFza09uQ2xpY2socHJvamVjdHMpO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrcyhwcm9qZWN0cykge1xuICBjb25zdCBzZWxlY3RlZFByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5wcm9qZWN0LnNlbGVjdGVkIC5pdGVtLW5hbWVcIlxuICApLnRleHRDb250ZW50O1xuXG4gIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gc2VsZWN0ZWRQcm9qZWN0TmFtZVxuICApO1xuXG4gIHJldHVybiBzZWxlY3RlZFByb2plY3QudGFza3M7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tJdGVtKHRhc2spIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIiwgXCJ0YXNrXCIpO1xuXG4gIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24odGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gIGNvbnN0IGl0ZW1OYW1lID0gcmVuZGVySXRlbU5hbWUodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuXG4gIGNvbnN0IGl0ZW1EdWVEYXRlID0gcmVuZGVySXRlbUR1ZURhdGUodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUR1ZURhdGUpO1xuXG4gIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IHJlbmRlckl0ZW1Qcmlvcml0eSh0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtUHJpb3JpdHkpO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSByZW5kZXJFZGl0QnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gcmVuZGVyRGVsZXRlQnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUljb24odGFzaykge1xuICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pY29uXCIpO1xuXG4gIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlLWNoZWNrXCI+PC9pPmA7XG4gIH0gZWxzZSB7XG4gICAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jaXJjbGVcIj48L2k+YDtcbiAgfVxuXG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUodGFzaykge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1EdWVEYXRlKHRhc2spIHtcbiAgY29uc3QgaXRlbUR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUR1ZURhdGUuY2xhc3NMaXN0LmFkZChcIml0ZW0tZHVlLWRhdGVcIik7XG4gIGl0ZW1EdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuXG4gIHJldHVybiBpdGVtRHVlRGF0ZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbVByaW9yaXR5KHRhc2spIHtcbiAgY29uc3QgaXRlbVByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1Qcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1wcmlvcml0eVwiLCBgJHt0YXNrLnByaW9yaXR5LnRvTG93ZXJDYXNlKCl9YCk7XG4gIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XG5cbiAgcmV0dXJuIGl0ZW1Qcmlvcml0eTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRWRpdEJ0bigpIHtcbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ0blwiKTtcbiAgZWRpdEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGVkaXRCdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRlbGV0ZUJ0bigpIHtcbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGRlbGV0ZUJ0bjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlSXRlbUljb25PbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBpdGVtSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLml0ZW0taWNvblwiKTtcblxuICBpdGVtSWNvbnMuZm9yRWFjaCgoaXRlbUljb24sIGluZGV4KSA9PiB7XG4gICAgaXRlbUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1tpbmRleF07XG4gICAgICB0YXNrLmNvbXBsZXRlZCA9IHRhc2suY29tcGxldGVkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2tPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5kZWxldGUtYnRuXCIpO1xuXG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZGVsZXRlQnRuLCBpbmRleCkgPT4ge1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZGl0VGFza09uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpO1xuICBjb25zdCBlZGl0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuZWRpdC1idG5cIik7XG5cbiAgZWRpdEJ0bnMuZm9yRWFjaCgoZWRpdEJ0biwgaW5kZXgpID0+IHtcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gdGFza3NbaW5kZXhdO1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbih0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSByZW5kZXJOYW1lSW5wdXQodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cbiAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IHJlbmRlckR1ZURhdGVJbnB1dCh0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZHVlRGF0ZUlucHV0KTtcblxuICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSByZW5kZXJQcmlvcml0eVNlbGVjdCh0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuXG4gICAgICBjb25zdCBjb25maXJtQnRuID0gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgdGFzaywgaW5kZXgpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dCh0YXNrKSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHRhc2submFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJEdWVEYXRlSW5wdXQodGFzaykge1xuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGR1ZURhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1kdWUtZGF0ZVwiKTtcbiAgZHVlRGF0ZUlucHV0LnR5cGUgPSBcImRhdGVcIjtcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlO1xuXG4gIHJldHVybiBkdWVEYXRlSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByaW9yaXR5U2VsZWN0KHRhc2spIHtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICBwcmlvcml0eVNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1wcmlvcml0eVwiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IFtcIkxvd1wiLCBcIk1lZGl1bVwiLCBcIkhpZ2hcIl07XG4gIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnZhbHVlID0gb3B0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG9wdGlvbiA9PT0gdGFzay5wcmlvcml0eSkge1xuICAgICAgcHJpb3JpdHlTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XG4gICAgfVxuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgIHByaW9yaXR5U2VsZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0T3B0aW9uKTtcbiAgfSk7XG4gIHJldHVybiBwcmlvcml0eVNlbGVjdDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgdGFzaywgaW5kZXgpIHtcbiAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJjb25maXJtLWJ0blwiKTtcbiAgY29uZmlybUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVja1wiPjwvaT5gO1xuICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgaXRlbU5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLW5hbWVcIik7XG4gICAgY29uc3QgaXRlbUR1ZURhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLWR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGl0ZW1Qcmlvcml0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLXByaW9yaXR5XCIpO1xuXG4gICAgY29uc3QgbmV3SXRlbU5hbWUgPSBpdGVtTmFtZXNbaW5kZXhdLnZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBuZXdJdGVtRHVlRGF0ZSA9IGl0ZW1EdWVEYXRlc1tpbmRleF0udmFsdWU7XG4gICAgY29uc3QgbmV3SXRlbVByaW9yaXR5ID0gaXRlbVByaW9yaXRpZXNbaW5kZXhdLnZhbHVlO1xuXG4gICAgdGFzay5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgdGFzay5kdWVEYXRlID0gbmV3SXRlbUR1ZURhdGU7XG4gICAgdGFzay5wcmlvcml0eSA9IG5ld0l0ZW1Qcmlvcml0eVswXS50b1VwcGVyQ2FzZSgpICsgbmV3SXRlbVByaW9yaXR5LnNsaWNlKDEpO1xuXG4gICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjYW5jZWwtYnRuXCIpO1xuICBjYW5jZWxCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+YDtcbiAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNhbmNlbEJ0bjtcbn1cblxuZXhwb3J0IHsgcmVuZGVyVGFza0l0ZW1zLCBnZXRUYXNrcyB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9nZ2xlQXNpZGVPbkNsaWNrKCkge1xuICBjb25zdCBidG5Bc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLWFzaWRlXCIpO1xuICBidG5Bc2lkZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFzaWRlXCIpO1xuICAgIGFzaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9nZ2xlRm9ybU9uQ2xpY2soKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBjb25zdCBidG5BZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLWFkZC0ke2lucHV0fWApO1xuICAgIGJ0bkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLSR7aW5wdXR9YCk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uL29iai9Qcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi4vb2JqL1Rhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YSgpIHtcbiAgbGV0IGRhdGEgPSBbXTtcbiAgY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMVwiKTtcbiAgcHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIlRhc2sgMVwiLCBcIjIwMjQtMDItMThcIiwgXCJMb3dcIikpO1xuICBwcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiVGFzayAyXCIsIFwiMjAyNC0wMi0yNFwiLCBcIk1lZGl1bVwiKSk7XG4gIHByb2plY3QxLmFkZFRhc2sobmV3IFRhc2soXCJUYXNrIDNcIiwgXCIyMDI0LTAyLTI4XCIsIFwiSGlnaFwiKSk7XG4gIGRhdGEucHVzaChwcm9qZWN0MSk7XG5cbiAgY29uc3QgcHJvamVjdDIgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMlwiKTtcbiAgcHJvamVjdDIuYWRkVGFzayhuZXcgVGFzayhcIlRhc2sgMVwiLCBcIjIwMjQtMDItMjhcIiwgXCJNZWRpdW1cIikpO1xuICBkYXRhLnB1c2gocHJvamVjdDIpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc2lkZSgpIHtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG5cbiAgY29uc3QgZmlsdGVyU2VjdGlvbiA9IHNlY3Rpb24oXCJmaWx0ZXJzXCIpO1xuICBhc2lkZS5hcHBlbmRDaGlsZChmaWx0ZXJTZWN0aW9uKTtcblxuICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IHNlY3Rpb24oXCJwcm9qZWN0c1wiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdFNlY3Rpb24pO1xuXG4gIHJldHVybiBhc2lkZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLmlubmVySFRNTCA9IGBcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZpbmVzay9vZGluLXRvZG8tbGlzdFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgPGkgY2xhc3M9XCJmYS1icmFuZHMgZmEtZ2l0aHViXCI+PC9pPiB2aW5lc2tcbiAgICA8L2E+YDtcblxuICByZXR1cm4gZm9vdGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDE+VG9kbyBMaXN0PC9oMT5cbiAgICAgICAgPHNwYW4gaWQ9XCJidG4tYXNpZGVcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJhcnNcIj48L2k+XG4gICAgICAgIDwvc3Bhbj5gO1xuXG4gIHJldHVybiBoZWFkZXI7XG59XG4iLCJpbXBvcnQgc2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IHNlY3Rpb24oXCJ0YXNrc1wiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZCh0YXNrU2VjdGlvbik7XG5cbiAgcmV0dXJuIG1haW47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWN0aW9uKHNlY3Rpb25OYW1lKSB7XG4gIGxldCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cbiAgc3dpdGNoIChzZWN0aW9uTmFtZSkge1xuICAgIGNhc2UgXCJmaWx0ZXJzXCI6XG4gICAgICBzZWN0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5GaWx0ZXJzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgaWQ9XCJmaWx0ZXJzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gZmlsdGVyXCIgaWQ9XCJmaWx0ZXItYWxsXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0taWNvblwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWluYm94XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5BbGw8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gZmlsdGVyXCIgaWQ9XCJmaWx0ZXItdG9kYXlcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5Ub2RheTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci13ZWVrXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0taWNvblwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLWRheVwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+VGhpcyB3ZWVrPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIHNlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlByb2plY3RzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgaWQ9XCJwcm9qZWN0c1wiPjwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFkZFwiIGlkPVwiYnRuLWFkZC1wcm9qZWN0XCI+QWRkIGEgcHJvamVjdDwvYnV0dG9uPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0gaGlkZGVuXCIgaWQ9XCJmb3JtLXByb2plY3RcIiBhY3Rpb249XCIjXCIgbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9qZWN0LW5hbWVcIj5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwcm9qZWN0LW5hbWVcIiByZXF1aXJlZD1cIlwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPmA7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJ0YXNrc1wiOlxuICAgICAgc2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+VGFza3M8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cInRhc2tzXCI+PC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWRkXCIgaWQ9XCJidG4tYWRkLXRhc2tcIj5BZGQgYSB0YXNrPC9idXR0b24+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybSBoaWRkZW5cIiBpZD1cImZvcm0tdGFza1wiIGFjdGlvbj1cIiNcIiBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIHJlcXVpcmVkPVwiXCIgLz5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1kdWUtZGF0ZVwiPkR1ZSBkYXRlOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJ0YXNrLWR1ZS1kYXRlXCIgcmVxdWlyZWQ9XCJcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXByaW9yaXR5XCI+UHJpb3JpdHk6PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGlkPVwidGFzay1wcmlvcml0eVwiPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPmA7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9uO1xufVxuIiwiaW1wb3J0IGhlYWRlciBmcm9tIFwiLi9hc3NldHMvaGVhZGVyXCI7XG5pbXBvcnQgYXNpZGUgZnJvbSBcIi4vYXNzZXRzL2FzaWRlXCI7XG5pbXBvcnQgbWFpbiBmcm9tIFwiLi9hc3NldHMvbWFpblwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwiLi9hc3NldHMvZm9vdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxheW91dCgpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcigpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFzaWRlKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWFpbigpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3RlcigpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbGF5b3V0IGZyb20gXCIuL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCBhcHAgZnJvbSBcIi4vYXBwL2FwcFwiO1xuXG4oKCkgPT4ge1xuICBsYXlvdXQoKTtcbiAgYXBwKCk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9