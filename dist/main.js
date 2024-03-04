/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/addItemOnFormSubmit.js":
/*!****************************************!*\
  !*** ./src/app/addItemOnFormSubmit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addItemOnFormSubmit)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../obj/Task */ "./src/obj/Task.js");
/* harmony import */ var _renderProjectItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjectItems */ "./src/app/renderProjectItems.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/renderTaskItems.js");





function addItemOnFormSubmit(projects) {
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
          const selectedProject = (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_3__.getSelectedProject)(projects);
          selectedProject.addTask(task);
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

/***/ "./src/app/renderApp.js":
/*!******************************!*\
  !*** ./src/app/renderApp.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderApp)
/* harmony export */ });
/* harmony import */ var _addItemOnFormSubmit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addItemOnFormSubmit */ "./src/app/addItemOnFormSubmit.js");
/* harmony import */ var _renderProjectItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderProjectItems */ "./src/app/renderProjectItems.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/renderTaskItems.js");
/* harmony import */ var _toggleAsideOnBtnAsideClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toggleAsideOnBtnAsideClick */ "./src/app/toggleAsideOnBtnAsideClick.js");
/* harmony import */ var _toggleFormOnBtnAddClick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggleFormOnBtnAddClick */ "./src/app/toggleFormOnBtnAddClick.js");






function renderApp(projects) {
  (0,_toggleAsideOnBtnAsideClick__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_toggleFormOnBtnAddClick__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_renderProjectItems__WEBPACK_IMPORTED_MODULE_1__["default"])(projects);
  (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_2__.renderTaskItems)(projects);
  (0,_addItemOnFormSubmit__WEBPACK_IMPORTED_MODULE_0__["default"])(projects);
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
  const projectItems = document.querySelector("#projects");
  projectItems.innerHTML = "";

  projects.forEach((project, index) => {
    const projectItem = renderProjectItem(projects, project);

    if (index === 0) {
      projectItem.classList.add("selected");
    }

    projectItems.appendChild(projectItem);
  });
}

function renderProjectItem(projects, project) {
  const item = document.createElement("div");
  item.classList.add("project", "item");

  const itemIcon = renderItemIcon();
  item.appendChild(itemIcon);

  const itemName = renderItemName(projects, project, item);
  item.appendChild(itemName);

  const editBtn = renderEditBtn(projects, project, item);
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteBtn(projects, project);
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon() {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");
  itemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;

  return itemIcon;
}

function renderItemName(projects, project, item) {
  const itemName = document.createElement("span");
  itemName.classList.add("item-name");
  itemName.textContent = project.name;
  itemName.addEventListener("click", () => {
    const items = document.querySelectorAll(".project");
    items.forEach((item) => {
      item.classList.remove("selected");
    });
    item.classList.add("selected");
    (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_0__.renderTaskItems)(projects);
  });

  return itemName;
}

function renderEditBtn(projects, project, item) {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => {
    item.innerHTML = "";

    const itemIcon = renderItemIcon();
    item.appendChild(itemIcon);

    const nameInput = renderNameInput(project);
    item.appendChild(nameInput);

    const confirmBtn = renderConfirmBtn(projects, project, nameInput);
    item.appendChild(confirmBtn);

    const cancelBtn = renderCancelBtn(projects);
    item.appendChild(cancelBtn);
  });

  return editBtn;
}

function renderNameInput(project) {
  const nameInput = document.createElement("input");
  nameInput.classList.add("item-name");
  nameInput.type = "text";
  nameInput.value = project.name;

  return nameInput;
}

function renderConfirmBtn(projects, project, nameInput) {
  const confirmBtn = document.createElement("span");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  confirmBtn.addEventListener("click", () => {
    const newItemName = nameInput.value.trim();
    const input = projects.find((input) => input.name === project.name);
    input.name = newItemName;
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

function renderDeleteBtn(projects, project) {
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteBtn.addEventListener("click", () => {
    projects = projects.filter((input) => input.name !== project.name);
    renderProjectItems(projects);
    (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_0__.renderTaskItems)(projects);
  });

  return deleteBtn;
}


/***/ }),

/***/ "./src/app/renderTaskItems.js":
/*!************************************!*\
  !*** ./src/app/renderTaskItems.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSelectedProject: () => (/* binding */ getSelectedProject),
/* harmony export */   renderTaskItems: () => (/* binding */ renderTaskItems)
/* harmony export */ });
function renderTaskItems(projects) {
  const taskItems = document.querySelector("#tasks");
  taskItems.innerHTML = "";

  const selectedProject = getSelectedProject(projects);
  selectedProject.tasks.forEach((task) => {
    const taskItem = renderTaskItem(projects, task);

    taskItems.appendChild(taskItem);
  });
}

function getSelectedProject(projects) {
  const selectedProjectName = document.querySelector(
    ".project.selected .item-name"
  ).textContent;

  const selectedProject = projects.find(
    (input) => input.name === selectedProjectName
  );

  return selectedProject;
}

function renderTaskItem(projects, task) {
  const item = document.createElement("div");
  item.classList.add("task", "item");

  const itemIcon = renderItemIcon(task, item);
  item.appendChild(itemIcon);

  const itemName = renderItemName(task);
  item.appendChild(itemName);

  const itemDueDate = renderItemDueDate(task);
  item.appendChild(itemDueDate);

  const itemPriority = renderItemPriority(task);
  item.appendChild(itemPriority);

  const editBtn = renderEditBtn(projects, task, item);
  item.appendChild(editBtn);

  const deleteBtn = renderDeleteBtn(projects, task);
  item.appendChild(deleteBtn);

  return item;
}

function renderItemIcon(task, item) {
  const itemIcon = document.createElement("span");
  itemIcon.classList.add("item-icon");

  if (task.completed) {
    item.classList.add("completed");
    itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
  } else {
    item.classList.remove("completed");
    itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
  }

  itemIcon.addEventListener("click", () => {
    task.completed = task.completed ? false : true;
    if (task.completed) {
      item.classList.add("completed");
      itemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    } else {
      item.classList.remove("completed");
      itemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    }
  });

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

function renderDeleteBtn(projects, task) {
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteBtn.addEventListener("click", () => {
    const selectedProject = getSelectedProject(projects);
    selectedProject.removeTask(task.name);
    renderTaskItems(projects);
  });

  return deleteBtn;
}

function renderEditBtn(projects, task, item) {
  const editBtn = document.createElement("span");
  editBtn.classList.add("edit-btn");
  editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => {
    item.innerHTML = "";

    const itemIcon = renderItemIcon(task, item);
    item.appendChild(itemIcon);

    const nameInput = renderNameInput(task);
    item.appendChild(nameInput);

    const dueDateInput = renderDueDateInput(task);
    item.appendChild(dueDateInput);

    const prioritySelect = renderPrioritySelect(task);
    item.appendChild(prioritySelect);

    const confirmBtn = renderConfirmBtn(
      projects,
      task,
      nameInput,
      dueDateInput,
      prioritySelect
    );
    item.appendChild(confirmBtn);

    const cancelBtn = renderCancelBtn(projects);
    item.appendChild(cancelBtn);
  });

  return editBtn;
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

function renderConfirmBtn(
  projects,
  task,
  nameInput,
  dueDateInput,
  prioritySelect
) {
  const confirmBtn = document.createElement("span");
  confirmBtn.classList.add("confirm-btn");
  confirmBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  confirmBtn.addEventListener("click", () => {
    const newItemName = nameInput.value.trim();
    const newItemDueDate = dueDateInput.value;
    const newItemPriority = prioritySelect.value;
    const selectedProject = getSelectedProject(projects);
    const input = selectedProject.tasks.find(
      (input) => input.name === task.name
    );
    input.name = newItemName;
    input.dueDate = newItemDueDate;
    input.priority =
      newItemPriority[0].toUpperCase() + newItemPriority.slice(1);
    renderTaskItems(projects);
  });

  return confirmBtn;
}

function renderCancelBtn(projects) {
  const cancelBtn = document.createElement("span");
  cancelBtn.classList.add("check-btn");
  cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  cancelBtn.addEventListener("click", () => {
    renderTaskItems(projects);
  });

  return cancelBtn;
}




/***/ }),

/***/ "./src/app/toggleAsideOnBtnAsideClick.js":
/*!***********************************************!*\
  !*** ./src/app/toggleAsideOnBtnAsideClick.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleAsideOnBtnAsideClick)
/* harmony export */ });
function toggleAsideOnBtnAsideClick() {
  const btnAside = document.querySelector("#btn-aside");
  btnAside.addEventListener("click", () => {
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  });
}


/***/ }),

/***/ "./src/app/toggleFormOnBtnAddClick.js":
/*!********************************************!*\
  !*** ./src/app/toggleFormOnBtnAddClick.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleFormOnBtnAddClick)
/* harmony export */ });
function toggleFormOnBtnAddClick() {
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

/***/ "./src/data/getdata.js":
/*!*****************************!*\
  !*** ./src/data/getdata.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getData)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../obj/Task */ "./src/obj/Task.js");



function getData() {
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

/***/ "./src/layout/renderAside.js":
/*!***********************************!*\
  !*** ./src/layout/renderAside.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderAside)
/* harmony export */ });
/* harmony import */ var _renderSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderSection */ "./src/layout/renderSection.js");


function renderAside() {
  const aside = document.createElement("aside");
  aside.classList.add("aside");

  // const filterSection = renderSection("filters");
  // aside.appendChild(filterSection);

  const projectSection = (0,_renderSection__WEBPACK_IMPORTED_MODULE_0__["default"])("projects");
  aside.appendChild(projectSection);

  return aside;
}


/***/ }),

/***/ "./src/layout/renderFooter.js":
/*!************************************!*\
  !*** ./src/layout/renderFooter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderFooter)
/* harmony export */ });
function renderFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
    <a href="https://github.com/vinesk/odin-todo-list" target="_blank">
      <i class="fa-brands fa-github"></i> vinesk
    </a>`;

  return footer;
}


/***/ }),

/***/ "./src/layout/renderHeader.js":
/*!************************************!*\
  !*** ./src/layout/renderHeader.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderHeader)
/* harmony export */ });
function renderHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const title = renderTitle();
  header.appendChild(title);

  const toggleAside = renderToggleAside();
  header.appendChild(toggleAside);

  return header;
}

function renderTitle() {
  const title = document.createElement("h1");
  title.textContent = "Todo List";

  return title;
}

function renderToggleAside() {
  const toggleAside = document.createElement("span");
  toggleAside.id = "btn-aside";
  toggleAside.innerHTML = `<i class="fa-solid fa-bars"></i>`;

  return toggleAside;
}


/***/ }),

/***/ "./src/layout/renderLayout.js":
/*!************************************!*\
  !*** ./src/layout/renderLayout.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderLayout)
/* harmony export */ });
/* harmony import */ var _renderHeader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderHeader */ "./src/layout/renderHeader.js");
/* harmony import */ var _renderAside__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderAside */ "./src/layout/renderAside.js");
/* harmony import */ var _renderMain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderMain */ "./src/layout/renderMain.js");
/* harmony import */ var _renderFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderFooter */ "./src/layout/renderFooter.js");





function renderLayout() {
  const container = document.querySelector("#container");

  container.appendChild((0,_renderHeader__WEBPACK_IMPORTED_MODULE_0__["default"])());
  container.appendChild((0,_renderAside__WEBPACK_IMPORTED_MODULE_1__["default"])());
  container.appendChild((0,_renderMain__WEBPACK_IMPORTED_MODULE_2__["default"])());
  container.appendChild((0,_renderFooter__WEBPACK_IMPORTED_MODULE_3__["default"])());
}


/***/ }),

/***/ "./src/layout/renderMain.js":
/*!**********************************!*\
  !*** ./src/layout/renderMain.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderMain)
/* harmony export */ });
/* harmony import */ var _renderSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderSection */ "./src/layout/renderSection.js");


function renderMain() {
  const main = document.createElement("main");
  main.classList.add("main");

  const taskSection = (0,_renderSection__WEBPACK_IMPORTED_MODULE_0__["default"])("tasks");
  main.appendChild(taskSection);

  return main;
}


/***/ }),

/***/ "./src/layout/renderSection.js":
/*!*************************************!*\
  !*** ./src/layout/renderSection.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderSection)
/* harmony export */ });
function renderSection(sectionName) {
  const section = document.createElement("section");
  section.classList.add("section");

  const title = renderTitle(sectionName);
  section.appendChild(title);

  const items = renderItems(sectionName);
  section.appendChild(items);

  const btnAdd = renderBtnAdd(sectionName);
  section.appendChild(btnAdd);

  const form = renderForm(sectionName);
  section.appendChild(form);

  return section;
}

function renderTitle(sectionName) {
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent =
    sectionName[0].toUpperCase() + sectionName.slice(1).toLowerCase();

  return title;
}

function renderItems(sectionName) {
  const items = document.createElement("div");
  items.classList.add("items");
  items.id = sectionName;

  return items;
}

function renderBtnAdd(sectionName) {
  let btnAdd = document.createElement("button");
  btnAdd.classList.add("btn-add");
  btnAdd.id = `btn-add-${sectionName.slice(0, -1)}`;

  switch (sectionName) {
    case "projects":
      btnAdd.textContent = "Add a project";
      break;
    case "tasks":
      btnAdd.textContent = "Add a task";
      break;
  }

  return btnAdd;
}

function renderForm(sectionName) {
  let form = document.createElement("form");
  form.classList.add("form", "hidden");
  form.id = `form-${sectionName.slice(0, -1)}`;

  form.setAttribute("action", "#");
  form.setAttribute("method", "post");

  switch (sectionName) {
    case "projects":
      form.innerHTML = `
        <label for="project-name">Name:</label>
        <input type="text" id="project-name" required />
        <div class="form-controls">
          <button type="submit">Confirm</button>
          <button type="reset">Reset</button>
        </div>`;
      break;

    case "tasks":
      form.innerHTML = `
        <label for="task-name">Name:</label>
        <input type="text" id="task-name" required />
        <label for="task-due-date">Due date:</label>
        <input type="date" id="task-due-date" required />
        <label for="task-priority">Priority:</label>
        <select id="task-priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div class="form-controls">
          <button type="submit">Confirm</button>
          <button type="reset">Reset</button>
        </div>`;
      break;
  }

  return form;
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

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.name !== taskName);
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
/* harmony import */ var _data_getdata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/getdata */ "./src/data/getdata.js");
/* harmony import */ var _layout_renderLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/renderLayout */ "./src/layout/renderLayout.js");
/* harmony import */ var _app_renderApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/renderApp */ "./src/app/renderApp.js");




(() => {
  // Data
  const projects = (0,_data_getdata__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // Layout
  (0,_layout_renderLayout__WEBPACK_IMPORTED_MODULE_1__["default"])();

  // App
  (0,_app_renderApp__WEBPACK_IMPORTED_MODULE_2__["default"])(projects);
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBcUM7QUFDTjtBQUN1QjtBQUNrQjs7QUFFekQ7QUFDZjs7QUFFQTtBQUNBLGlEQUFpRCxNQUFNO0FBQ3ZEO0FBQ0E7O0FBRUEsbURBQW1ELE1BQU07QUFDekQ7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixvREFBTztBQUNyQztBQUNBO0FBQ0E7QUFDQSxVQUFVLCtEQUFrQjtBQUM1QjtBQUNBO0FBQ0EsMERBQTBELE1BQU07QUFDaEU7O0FBRUEsNERBQTRELE1BQU07QUFDbEU7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixpREFBSTtBQUMvQixrQ0FBa0Msb0VBQWtCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlFQUFlO0FBQ3pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdDd0Q7QUFDRjtBQUNGO0FBQ2tCO0FBQ047O0FBRWpEO0FBQ2YsRUFBRSx1RUFBMEI7QUFDNUIsRUFBRSxvRUFBdUI7QUFDekIsRUFBRSwrREFBa0I7QUFDcEIsRUFBRSxpRUFBZTtBQUNqQixFQUFFLGdFQUFtQjtBQUNyQjs7Ozs7Ozs7Ozs7Ozs7OztBQ1pvRDs7QUFFckM7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxpRUFBZTtBQUNuQixHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFlO0FBQ25CLEdBQUc7O0FBRUg7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRStDOzs7Ozs7Ozs7Ozs7Ozs7QUM1TmhDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ05lO0FBQ2Y7QUFDQTtBQUNBLHNEQUFzRCxNQUFNO0FBQzVEO0FBQ0EsbURBQW1ELE1BQU07QUFDekQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RxQztBQUNOOztBQUVoQjtBQUNmO0FBQ0EsdUJBQXVCLG9EQUFPO0FBQzlCLHVCQUF1QixpREFBSTtBQUMzQix1QkFBdUIsaURBQUk7QUFDM0IsdUJBQXVCLGlEQUFJO0FBQzNCOztBQUVBLHVCQUF1QixvREFBTztBQUM5Qix1QkFBdUIsaURBQUk7QUFDM0I7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCNEM7O0FBRTdCO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCQUF5QiwwREFBYTtBQUN0Qzs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNiZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNUZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCMEM7QUFDRjtBQUNGO0FBQ0k7O0FBRTNCO0FBQ2Y7O0FBRUEsd0JBQXdCLHlEQUFZO0FBQ3BDLHdCQUF3Qix3REFBVztBQUNuQyx3QkFBd0IsdURBQVU7QUFDbEMsd0JBQXdCLHlEQUFZO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWjRDOztBQUU3QjtBQUNmO0FBQ0E7O0FBRUEsc0JBQXNCLDBEQUFhO0FBQ25DOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHlCQUF5Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5QkFBeUI7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVGZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDYmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNZO0FBQ1Q7O0FBRXhDO0FBQ0E7QUFDQSxtQkFBbUIseURBQU87O0FBRTFCO0FBQ0EsRUFBRSxnRUFBWTs7QUFFZDtBQUNBLEVBQUUsMERBQVM7QUFDWCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2FkZEl0ZW1PbkZvcm1TdWJtaXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL3JlbmRlckFwcC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvcmVuZGVyUHJvamVjdEl0ZW1zLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9yZW5kZXJUYXNrSXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL3RvZ2dsZUFzaWRlT25CdG5Bc2lkZUNsaWNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC90b2dnbGVGb3JtT25CdG5BZGRDbGljay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2dldGRhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L3JlbmRlckFzaWRlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9yZW5kZXJGb290ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L3JlbmRlckhlYWRlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvcmVuZGVyTGF5b3V0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9yZW5kZXJNYWluLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9yZW5kZXJTZWN0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL29iai9Qcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL29iai9UYXNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uL29iai9Qcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi4vb2JqL1Rhc2tcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0SXRlbXMgZnJvbSBcIi4vcmVuZGVyUHJvamVjdEl0ZW1zXCI7XG5pbXBvcnQgeyBnZXRTZWxlY3RlZFByb2plY3QsIHJlbmRlclRhc2tJdGVtcyB9IGZyb20gXCIuL3JlbmRlclRhc2tJdGVtc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRJdGVtT25Gb3JtU3VibWl0KHByb2plY3RzKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuXG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tbmFtZWApO1xuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgICAgY2FzZSBcInByb2plY3RcIjpcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFza1wiOlxuICAgICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1kdWUtZGF0ZWApO1xuICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1wcmlvcml0eWApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID1cbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlWzBdLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGdldFNlbGVjdGVkUHJvamVjdChwcm9qZWN0cyk7XG4gICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LmFkZFRhc2sodGFzayk7XG4gICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBkdWVEYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlID0gXCJsb3dcIjtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgYWRkSXRlbU9uRm9ybVN1Ym1pdCBmcm9tIFwiLi9hZGRJdGVtT25Gb3JtU3VibWl0XCI7XG5pbXBvcnQgcmVuZGVyUHJvamVjdEl0ZW1zIGZyb20gXCIuL3JlbmRlclByb2plY3RJdGVtc1wiO1xuaW1wb3J0IHsgcmVuZGVyVGFza0l0ZW1zIH0gZnJvbSBcIi4vcmVuZGVyVGFza0l0ZW1zXCI7XG5pbXBvcnQgdG9nZ2xlQXNpZGVPbkJ0bkFzaWRlQ2xpY2sgZnJvbSBcIi4vdG9nZ2xlQXNpZGVPbkJ0bkFzaWRlQ2xpY2tcIjtcbmltcG9ydCB0b2dnbGVGb3JtT25CdG5BZGRDbGljayBmcm9tIFwiLi90b2dnbGVGb3JtT25CdG5BZGRDbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJBcHAocHJvamVjdHMpIHtcbiAgdG9nZ2xlQXNpZGVPbkJ0bkFzaWRlQ2xpY2soKTtcbiAgdG9nZ2xlRm9ybU9uQnRuQWRkQ2xpY2soKTtcbiAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgYWRkSXRlbU9uRm9ybVN1Ym1pdChwcm9qZWN0cyk7XG59XG4iLCJpbXBvcnQgeyByZW5kZXJUYXNrSXRlbXMgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKSB7XG4gIGNvbnN0IHByb2plY3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG4gIHByb2plY3RJdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEl0ZW0gPSByZW5kZXJQcm9qZWN0SXRlbShwcm9qZWN0cywgcHJvamVjdCk7XG5cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBwcm9qZWN0SXRlbXMuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdEl0ZW0ocHJvamVjdHMsIHByb2plY3QpIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcInByb2plY3RcIiwgXCJpdGVtXCIpO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZShwcm9qZWN0cywgcHJvamVjdCwgaXRlbSk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSByZW5kZXJFZGl0QnRuKHByb2plY3RzLCBwcm9qZWN0LCBpdGVtKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVCdG4ocHJvamVjdHMsIHByb2plY3QpO1xuICBpdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1JY29uKCkge1xuICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pY29uXCIpO1xuICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LWNoZWNrXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGl0ZW1JY29uO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtTmFtZShwcm9qZWN0cywgcHJvamVjdCwgaXRlbSkge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgaXRlbU5hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4ocHJvamVjdHMsIHByb2plY3QsIGl0ZW0pIHtcbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ0blwiKTtcbiAgZWRpdEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPmA7XG4gIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpdGVtLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgICBjb25zdCBuYW1lSW5wdXQgPSByZW5kZXJOYW1lSW5wdXQocHJvamVjdCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgY29uc3QgY29uZmlybUJ0biA9IHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHByb2plY3QsIG5hbWVJbnB1dCk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cyk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICB9KTtcblxuICByZXR1cm4gZWRpdEJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTmFtZUlucHV0KHByb2plY3QpIHtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgbmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgbmFtZUlucHV0LnZhbHVlID0gcHJvamVjdC5uYW1lO1xuXG4gIHJldHVybiBuYW1lSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHByb2plY3QsIG5hbWVJbnB1dCkge1xuICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm0tYnRuXCIpO1xuICBjb25maXJtQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPmA7XG4gIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG4gICAgY29uc3QgaW5wdXQgPSBwcm9qZWN0cy5maW5kKChpbnB1dCkgPT4gaW5wdXQubmFtZSA9PT0gcHJvamVjdC5uYW1lKTtcbiAgICBpbnB1dC5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5gO1xuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY2FuY2VsQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4ocHJvamVjdHMsIHByb2plY3QpIHtcbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPmA7XG4gIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChpbnB1dCkgPT4gaW5wdXQubmFtZSAhPT0gcHJvamVjdC5uYW1lKTtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG4iLCJmdW5jdGlvbiByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpIHtcbiAgY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcbiAgdGFza0l0ZW1zLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZ2V0U2VsZWN0ZWRQcm9qZWN0KHByb2plY3RzKTtcbiAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICBjb25zdCB0YXNrSXRlbSA9IHJlbmRlclRhc2tJdGVtKHByb2plY3RzLCB0YXNrKTtcblxuICAgIHRhc2tJdGVtcy5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3RlZFByb2plY3QocHJvamVjdHMpIHtcbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIucHJvamVjdC5zZWxlY3RlZCAuaXRlbS1uYW1lXCJcbiAgKS50ZXh0Q29udGVudDtcblxuICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0cy5maW5kKFxuICAgIChpbnB1dCkgPT4gaW5wdXQubmFtZSA9PT0gc2VsZWN0ZWRQcm9qZWN0TmFtZVxuICApO1xuXG4gIHJldHVybiBzZWxlY3RlZFByb2plY3Q7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tJdGVtKHByb2plY3RzLCB0YXNrKSB7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIsIFwiaXRlbVwiKTtcblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHRhc2ssIGl0ZW0pO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICBjb25zdCBpdGVtTmFtZSA9IHJlbmRlckl0ZW1OYW1lKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcblxuICBjb25zdCBpdGVtRHVlRGF0ZSA9IHJlbmRlckl0ZW1EdWVEYXRlKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1EdWVEYXRlKTtcblxuICBjb25zdCBpdGVtUHJpb3JpdHkgPSByZW5kZXJJdGVtUHJpb3JpdHkodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbVByaW9yaXR5KTtcblxuICBjb25zdCBlZGl0QnRuID0gcmVuZGVyRWRpdEJ0bihwcm9qZWN0cywgdGFzaywgaXRlbSk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gcmVuZGVyRGVsZXRlQnRuKHByb2plY3RzLCB0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbih0YXNrLCBpdGVtKSB7XG4gIGNvbnN0IGl0ZW1JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1JY29uLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWljb25cIik7XG5cbiAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlLWNoZWNrXCI+PC9pPmA7XG4gIH0gZWxzZSB7XG4gICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkXCIpO1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI+PC9pPmA7XG4gIH1cblxuICBpdGVtSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRhc2suY29tcGxldGVkID0gdGFzay5jb21wbGV0ZWQgPyBmYWxzZSA6IHRydWU7XG4gICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZS1jaGVja1wiPjwvaT5gO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJjb21wbGV0ZWRcIik7XG4gICAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiPjwvaT5gO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGl0ZW1JY29uO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtTmFtZSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1OYW1lLmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuXG4gIHJldHVybiBpdGVtTmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUR1ZURhdGUodGFzaykge1xuICBjb25zdCBpdGVtRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1kdWUtZGF0ZVwiKTtcbiAgaXRlbUR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgcmV0dXJuIGl0ZW1EdWVEYXRlO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtUHJpb3JpdHkodGFzaykge1xuICBjb25zdCBpdGVtUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbVByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJpdGVtLXByaW9yaXR5XCIsIGAke3Rhc2sucHJpb3JpdHkudG9Mb3dlckNhc2UoKX1gKTtcbiAgaXRlbVByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcblxuICByZXR1cm4gaXRlbVByaW9yaXR5O1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4ocHJvamVjdHMsIHRhc2spIHtcbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPmA7XG4gIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGdldFNlbGVjdGVkUHJvamVjdChwcm9qZWN0cyk7XG4gICAgc2VsZWN0ZWRQcm9qZWN0LnJlbW92ZVRhc2sodGFzay5uYW1lKTtcbiAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gZGVsZXRlQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJFZGl0QnRuKHByb2plY3RzLCB0YXNrLCBpdGVtKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaXRlbS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbih0YXNrLCBpdGVtKTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgIGNvbnN0IG5hbWVJbnB1dCA9IHJlbmRlck5hbWVJbnB1dCh0YXNrKTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cbiAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSByZW5kZXJEdWVEYXRlSW5wdXQodGFzayk7XG4gICAgaXRlbS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQpO1xuXG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSByZW5kZXJQcmlvcml0eVNlbGVjdCh0YXNrKTtcbiAgICBpdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcblxuICAgIGNvbnN0IGNvbmZpcm1CdG4gPSByZW5kZXJDb25maXJtQnRuKFxuICAgICAgcHJvamVjdHMsXG4gICAgICB0YXNrLFxuICAgICAgbmFtZUlucHV0LFxuICAgICAgZHVlRGF0ZUlucHV0LFxuICAgICAgcHJpb3JpdHlTZWxlY3RcbiAgICApO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICBjb25zdCBjYW5jZWxCdG4gPSByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpO1xuICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGVkaXRCdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dCh0YXNrKSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHRhc2submFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJEdWVEYXRlSW5wdXQodGFzaykge1xuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGR1ZURhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1kdWUtZGF0ZVwiKTtcbiAgZHVlRGF0ZUlucHV0LnR5cGUgPSBcImRhdGVcIjtcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlO1xuXG4gIHJldHVybiBkdWVEYXRlSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByaW9yaXR5U2VsZWN0KHRhc2spIHtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICBwcmlvcml0eVNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1wcmlvcml0eVwiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IFtcIkxvd1wiLCBcIk1lZGl1bVwiLCBcIkhpZ2hcIl07XG4gIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnZhbHVlID0gb3B0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG9wdGlvbiA9PT0gdGFzay5wcmlvcml0eSkge1xuICAgICAgcHJpb3JpdHlTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XG4gICAgfVxuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgIHByaW9yaXR5U2VsZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0T3B0aW9uKTtcbiAgfSk7XG4gIHJldHVybiBwcmlvcml0eVNlbGVjdDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29uZmlybUJ0bihcbiAgcHJvamVjdHMsXG4gIHRhc2ssXG4gIG5hbWVJbnB1dCxcbiAgZHVlRGF0ZUlucHV0LFxuICBwcmlvcml0eVNlbGVjdFxuKSB7XG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiY29uZmlybS1idG5cIik7XG4gIGNvbmZpcm1CdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L2k+YDtcbiAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1OYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBuZXdJdGVtRHVlRGF0ZSA9IGR1ZURhdGVJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBuZXdJdGVtUHJpb3JpdHkgPSBwcmlvcml0eVNlbGVjdC52YWx1ZTtcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBnZXRTZWxlY3RlZFByb2plY3QocHJvamVjdHMpO1xuICAgIGNvbnN0IGlucHV0ID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZpbmQoXG4gICAgICAoaW5wdXQpID0+IGlucHV0Lm5hbWUgPT09IHRhc2submFtZVxuICAgICk7XG4gICAgaW5wdXQubmFtZSA9IG5ld0l0ZW1OYW1lO1xuICAgIGlucHV0LmR1ZURhdGUgPSBuZXdJdGVtRHVlRGF0ZTtcbiAgICBpbnB1dC5wcmlvcml0eSA9XG4gICAgICBuZXdJdGVtUHJpb3JpdHlbMF0udG9VcHBlckNhc2UoKSArIG5ld0l0ZW1Qcmlvcml0eS5zbGljZSgxKTtcbiAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlybUJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKSB7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcImNoZWNrLWJ0blwiKTtcbiAgY2FuY2VsQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPmA7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjYW5jZWxCdG47XG59XG5cbmV4cG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0U2VsZWN0ZWRQcm9qZWN0IH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b2dnbGVBc2lkZU9uQnRuQXNpZGVDbGljaygpIHtcbiAgY29uc3QgYnRuQXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1hc2lkZVwiKTtcbiAgYnRuQXNpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhc2lkZVwiKTtcbiAgICBhc2lkZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvZ2dsZUZvcm1PbkJ0bkFkZENsaWNrKCkge1xuICBjb25zdCBpbnB1dHMgPSBbXCJwcm9qZWN0XCIsIFwidGFza1wiXTtcbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgY29uc3QgYnRuQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1hZGQtJHtpbnB1dH1gKTtcbiAgICBidG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi9vYmovUHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4uL29iai9UYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERhdGEoKSB7XG4gIGxldCBkYXRhID0gW107XG4gIGNvbnN0IHByb2plY3QxID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDFcIik7XG4gIHByb2plY3QxLmFkZFRhc2sobmV3IFRhc2soXCJUYXNrIDFcIiwgXCIyMDI0LTAyLTE4XCIsIFwiTG93XCIpKTtcbiAgcHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIlRhc2sgMlwiLCBcIjIwMjQtMDItMjRcIiwgXCJNZWRpdW1cIikpO1xuICBwcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiVGFzayAzXCIsIFwiMjAyNC0wMi0yOFwiLCBcIkhpZ2hcIikpO1xuICBkYXRhLnB1c2gocHJvamVjdDEpO1xuXG4gIGNvbnN0IHByb2plY3QyID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDJcIik7XG4gIHByb2plY3QyLmFkZFRhc2sobmV3IFRhc2soXCJUYXNrIDFcIiwgXCIyMDI0LTAyLTI4XCIsIFwiTWVkaXVtXCIpKTtcbiAgZGF0YS5wdXNoKHByb2plY3QyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsImltcG9ydCByZW5kZXJTZWN0aW9uIGZyb20gXCIuL3JlbmRlclNlY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyQXNpZGUoKSB7XG4gIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFzaWRlXCIpO1xuICBhc2lkZS5jbGFzc0xpc3QuYWRkKFwiYXNpZGVcIik7XG5cbiAgLy8gY29uc3QgZmlsdGVyU2VjdGlvbiA9IHJlbmRlclNlY3Rpb24oXCJmaWx0ZXJzXCIpO1xuICAvLyBhc2lkZS5hcHBlbmRDaGlsZChmaWx0ZXJTZWN0aW9uKTtcblxuICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IHJlbmRlclNlY3Rpb24oXCJwcm9qZWN0c1wiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdFNlY3Rpb24pO1xuXG4gIHJldHVybiBhc2lkZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci5pbm5lckhUTUwgPSBgXG4gICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS92aW5lc2svb2Rpbi10b2RvLWxpc3RcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEtYnJhbmRzIGZhLWdpdGh1YlwiPjwvaT4gdmluZXNrXG4gICAgPC9hPmA7XG5cbiAgcmV0dXJuIGZvb3Rlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XG5cbiAgY29uc3QgdGl0bGUgPSByZW5kZXJUaXRsZSgpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIGNvbnN0IHRvZ2dsZUFzaWRlID0gcmVuZGVyVG9nZ2xlQXNpZGUoKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRvZ2dsZUFzaWRlKTtcblxuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUaXRsZSgpIHtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gXCJUb2RvIExpc3RcIjtcblxuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRvZ2dsZUFzaWRlKCkge1xuICBjb25zdCB0b2dnbGVBc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB0b2dnbGVBc2lkZS5pZCA9IFwiYnRuLWFzaWRlXCI7XG4gIHRvZ2dsZUFzaWRlLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJhcnNcIj48L2k+YDtcblxuICByZXR1cm4gdG9nZ2xlQXNpZGU7XG59XG4iLCJpbXBvcnQgcmVuZGVySGVhZGVyIGZyb20gXCIuL3JlbmRlckhlYWRlclwiO1xuaW1wb3J0IHJlbmRlckFzaWRlIGZyb20gXCIuL3JlbmRlckFzaWRlXCI7XG5pbXBvcnQgcmVuZGVyTWFpbiBmcm9tIFwiLi9yZW5kZXJNYWluXCI7XG5pbXBvcnQgcmVuZGVyRm9vdGVyIGZyb20gXCIuL3JlbmRlckZvb3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJMYXlvdXQoKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJIZWFkZXIoKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJBc2lkZSgpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlck1haW4oKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJGb290ZXIoKSk7XG59XG4iLCJpbXBvcnQgcmVuZGVyU2VjdGlvbiBmcm9tIFwiLi9yZW5kZXJTZWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlck1haW4oKSB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgbWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpblwiKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IHJlbmRlclNlY3Rpb24oXCJ0YXNrc1wiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZCh0YXNrU2VjdGlvbik7XG5cbiAgcmV0dXJuIG1haW47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKHNlY3Rpb25OYW1lKSB7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwic2VjdGlvblwiKTtcblxuICBjb25zdCB0aXRsZSA9IHJlbmRlclRpdGxlKHNlY3Rpb25OYW1lKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgY29uc3QgaXRlbXMgPSByZW5kZXJJdGVtcyhzZWN0aW9uTmFtZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoaXRlbXMpO1xuXG4gIGNvbnN0IGJ0bkFkZCA9IHJlbmRlckJ0bkFkZChzZWN0aW9uTmFtZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYnRuQWRkKTtcblxuICBjb25zdCBmb3JtID0gcmVuZGVyRm9ybShzZWN0aW9uTmFtZSk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgcmV0dXJuIHNlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRpdGxlKHNlY3Rpb25OYW1lKSB7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gIHRpdGxlLnRleHRDb250ZW50ID1cbiAgICBzZWN0aW9uTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgc2VjdGlvbk5hbWUuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcblxuICByZXR1cm4gdGl0bGU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1zKHNlY3Rpb25OYW1lKSB7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaXRlbXMuY2xhc3NMaXN0LmFkZChcIml0ZW1zXCIpO1xuICBpdGVtcy5pZCA9IHNlY3Rpb25OYW1lO1xuXG4gIHJldHVybiBpdGVtcztcbn1cblxuZnVuY3Rpb24gcmVuZGVyQnRuQWRkKHNlY3Rpb25OYW1lKSB7XG4gIGxldCBidG5BZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidG5BZGQuY2xhc3NMaXN0LmFkZChcImJ0bi1hZGRcIik7XG4gIGJ0bkFkZC5pZCA9IGBidG4tYWRkLSR7c2VjdGlvbk5hbWUuc2xpY2UoMCwgLTEpfWA7XG5cbiAgc3dpdGNoIChzZWN0aW9uTmFtZSkge1xuICAgIGNhc2UgXCJwcm9qZWN0c1wiOlxuICAgICAgYnRuQWRkLnRleHRDb250ZW50ID0gXCJBZGQgYSBwcm9qZWN0XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwidGFza3NcIjpcbiAgICAgIGJ0bkFkZC50ZXh0Q29udGVudCA9IFwiQWRkIGEgdGFza1wiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYnRuQWRkO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGb3JtKHNlY3Rpb25OYW1lKSB7XG4gIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGZvcm0uY2xhc3NMaXN0LmFkZChcImZvcm1cIiwgXCJoaWRkZW5cIik7XG4gIGZvcm0uaWQgPSBgZm9ybS0ke3NlY3Rpb25OYW1lLnNsaWNlKDAsIC0xKX1gO1xuXG4gIGZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIFwiI1wiKTtcbiAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgXCJwb3N0XCIpO1xuXG4gIHN3aXRjaCAoc2VjdGlvbk5hbWUpIHtcbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIGZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICA8bGFiZWwgZm9yPVwicHJvamVjdC1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInByb2plY3QtbmFtZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2xzXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcInRhc2tzXCI6XG4gICAgICBmb3JtLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiByZXF1aXJlZCAvPlxuICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1kdWUtZGF0ZVwiPkR1ZSBkYXRlOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwidGFzay1kdWUtZGF0ZVwiIHJlcXVpcmVkIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXByaW9yaXR5XCI+UHJpb3JpdHk6PC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBpZD1cInRhc2stcHJpb3JpdHlcIj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbHNcIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gZm9ybTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cblxuICBhZGRUYXNrKHRhc2spIHtcbiAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gIH1cblxuICByZW1vdmVUYXNrKHRhc2tOYW1lKSB7XG4gICAgdGhpcy50YXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLm5hbWUgIT09IHRhc2tOYW1lKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBnZXREYXRhIGZyb20gXCIuL2RhdGEvZ2V0ZGF0YVwiO1xuaW1wb3J0IHJlbmRlckxheW91dCBmcm9tIFwiLi9sYXlvdXQvcmVuZGVyTGF5b3V0XCI7XG5pbXBvcnQgcmVuZGVyQXBwIGZyb20gXCIuL2FwcC9yZW5kZXJBcHBcIjtcblxuKCgpID0+IHtcbiAgLy8gRGF0YVxuICBjb25zdCBwcm9qZWN0cyA9IGdldERhdGEoKTtcblxuICAvLyBMYXlvdXRcbiAgcmVuZGVyTGF5b3V0KCk7XG5cbiAgLy8gQXBwXG4gIHJlbmRlckFwcChwcm9qZWN0cyk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9