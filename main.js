/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _assets_addItemOnSubmit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/addItemOnSubmit */ "./src/app/assets/addItemOnSubmit.js");
/* harmony import */ var _assets_renderProjectItems__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/renderProjectItems */ "./src/app/assets/renderProjectItems.js");
/* harmony import */ var _assets_renderTaskItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/renderTaskItems */ "./src/app/assets/renderTaskItems.js");
/* harmony import */ var _assets_toggleAsideOnClick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/toggleAsideOnClick */ "./src/app/assets/toggleAsideOnClick.js");
/* harmony import */ var _assets_toggleFormOnClick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/toggleFormOnClick */ "./src/app/assets/toggleFormOnClick.js");






function app(data) {
  (0,_assets_toggleFormOnClick__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_assets_toggleAsideOnClick__WEBPACK_IMPORTED_MODULE_3__["default"])();

  (0,_assets_renderProjectItems__WEBPACK_IMPORTED_MODULE_1__["default"])(data);
  (0,_assets_renderTaskItems__WEBPACK_IMPORTED_MODULE_2__.renderTaskItems)(data);
  (0,_assets_addItemOnSubmit__WEBPACK_IMPORTED_MODULE_0__["default"])(data);
}


/***/ }),

/***/ "./src/app/assets/addItemOnSubmit.js":
/*!*******************************************!*\
  !*** ./src/app/assets/addItemOnSubmit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addItemOnSubmit)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../obj/Task */ "./src/obj/Task.js");
/* harmony import */ var _renderProjectItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderProjectItems */ "./src/app/assets/renderProjectItems.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/assets/renderTaskItems.js");





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

/***/ "./src/app/assets/renderProjectItems.js":
/*!**********************************************!*\
  !*** ./src/app/assets/renderProjectItems.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderProjectItems)
/* harmony export */ });
/* harmony import */ var _data_assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/assets/storageAvailable */ "./src/data/assets/storageAvailable.js");
/* harmony import */ var _data_assets_setStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/assets/setStorage */ "./src/data/assets/setStorage.js");
/* harmony import */ var _renderTaskItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderTaskItems */ "./src/app/assets/renderTaskItems.js");




function renderProjectItems(projects) {
  if ((0,_data_assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__["default"])("localStorage")) {
    localStorage.clear();
    (0,_data_assets_setStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(projects);
  }

  const items = document.querySelector("#projects");
  items.innerHTML = "";

  projects.forEach((project, index) => {
    const item = renderProjectItem(project);
    item.dataset.id = index;

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
      (0,_renderTaskItems__WEBPACK_IMPORTED_MODULE_2__.renderTaskItems)(projects);
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

/***/ "./src/app/assets/renderTaskItems.js":
/*!*******************************************!*\
  !*** ./src/app/assets/renderTaskItems.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTasks: () => (/* binding */ getTasks),
/* harmony export */   renderTaskItems: () => (/* binding */ renderTaskItems)
/* harmony export */ });
/* harmony import */ var _data_assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/assets/storageAvailable */ "./src/data/assets/storageAvailable.js");
/* harmony import */ var _data_assets_setStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/assets/setStorage */ "./src/data/assets/setStorage.js");



function renderTaskItems(projects) {
  if ((0,_data_assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__["default"])("localStorage")) {
    localStorage.clear();
    (0,_data_assets_setStorage__WEBPACK_IMPORTED_MODULE_1__["default"])(projects);
  }

  const items = document.querySelector("#tasks");
  items.innerHTML = "";

  const tasks = getTasks(projects);
  tasks.forEach((task, index) => {
    const item = renderTaskItem(task);
    item.dataset.id = index;
    items.appendChild(item);
  });

  changeItemIconOnClick(projects);
  deleteTaskOnClick(projects);
  editTaskOnClick(projects);
}

function getTasks(projects) {
  const selectedProject = document.querySelector(".project.selected");
  const selectedProjectId = selectedProject.getAttribute("data-id");

  return projects[selectedProjectId].tasks;
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

/***/ "./src/app/assets/toggleAsideOnClick.js":
/*!**********************************************!*\
  !*** ./src/app/assets/toggleAsideOnClick.js ***!
  \**********************************************/
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

/***/ "./src/app/assets/toggleFormOnClick.js":
/*!*********************************************!*\
  !*** ./src/app/assets/toggleFormOnClick.js ***!
  \*********************************************/
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

/***/ "./src/data/assets/defaultData.js":
/*!****************************************!*\
  !*** ./src/data/assets/defaultData.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultData)
/* harmony export */ });
/* harmony import */ var _obj_Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../obj/Project */ "./src/obj/Project.js");
/* harmony import */ var _obj_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../obj/Task */ "./src/obj/Task.js");



function defaultData() {
  const data = [];

  const project1 = new _obj_Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Project 1");
  project1.tasks.push(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 1", "2024-03-06", "Low"));
  project1.tasks.push(new _obj_Task__WEBPACK_IMPORTED_MODULE_1__["default"]("Task 2", "2024-03-14", "Medium"));
  data.push(project1);

  return data;
}


/***/ }),

/***/ "./src/data/assets/getStorage.js":
/*!***************************************!*\
  !*** ./src/data/assets/getStorage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getStorage)
/* harmony export */ });
function getStorage() {
  return JSON.parse(localStorage.getItem("data"));
}


/***/ }),

/***/ "./src/data/assets/setStorage.js":
/*!***************************************!*\
  !*** ./src/data/assets/setStorage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setStorage)
/* harmony export */ });
/* harmony import */ var _getStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getStorage */ "./src/data/assets/getStorage.js");


function setStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
  (0,_getStorage__WEBPACK_IMPORTED_MODULE_0__["default"])();
}


/***/ }),

/***/ "./src/data/assets/storageAvailable.js":
/*!*********************************************!*\
  !*** ./src/data/assets/storageAvailable.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ storageAvailable)
/* harmony export */ });
function storageAvailable(type) {
  try {
    let storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
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
/* harmony import */ var _assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/storageAvailable */ "./src/data/assets/storageAvailable.js");
/* harmony import */ var _assets_getStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/getStorage */ "./src/data/assets/getStorage.js");
/* harmony import */ var _assets_setStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/setStorage */ "./src/data/assets/setStorage.js");
/* harmony import */ var _assets_defaultData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/defaultData */ "./src/data/assets/defaultData.js");





function data() {
  let data;
  if ((0,_assets_storageAvailable__WEBPACK_IMPORTED_MODULE_0__["default"])("localStorage")) {
    data = localStorage.getItem("data")
      ? (0,_assets_getStorage__WEBPACK_IMPORTED_MODULE_1__["default"])()
      : (0,_assets_setStorage__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_assets_defaultData__WEBPACK_IMPORTED_MODULE_3__["default"])());
  } else {
    data = (0,_assets_defaultData__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
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
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/data */ "./src/data/data.js");
/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app */ "./src/app/app.js");




(() => {
  (0,_layout_layout__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_app_app__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_data_data__WEBPACK_IMPORTED_MODULE_1__["default"])());
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFcUM7QUFDRjtBQUNGO0FBQ0k7O0FBRXRCO0FBQ2Y7O0FBRUEsd0JBQXdCLDBEQUFNO0FBQzlCLHdCQUF3Qix5REFBSztBQUM3Qix3QkFBd0Isd0RBQUk7QUFDNUIsd0JBQXdCLDBEQUFNO0FBQzlCOzs7Ozs7Ozs7Ozs7Ozs7QUNaZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0xlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDTjtBQUNIOztBQUU1QjtBQUNBLEVBQUUsMERBQU07QUFDUixFQUFFLG9EQUFHLENBQUMsc0RBQUk7QUFDVixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXNzZXRzL2FkZEl0ZW1PblN1Ym1pdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXNzZXRzL3JlbmRlclByb2plY3RJdGVtcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXNzZXRzL3JlbmRlclRhc2tJdGVtcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXNzZXRzL3RvZ2dsZUFzaWRlT25DbGljay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXNzZXRzL3RvZ2dsZUZvcm1PbkNsaWNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvYXNzZXRzL2RlZmF1bHREYXRhLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvYXNzZXRzL2dldFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9hc3NldHMvc2V0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9zdG9yYWdlQXZhaWxhYmxlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvZGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2FzaWRlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9hc3NldHMvZm9vdGVyLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9hc3NldHMvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9hc3NldHMvbWFpbi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL3NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2xheW91dC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9vYmovUHJvamVjdC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9vYmovVGFzay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGRJdGVtT25TdWJtaXQgZnJvbSBcIi4vYXNzZXRzL2FkZEl0ZW1PblN1Ym1pdFwiO1xuaW1wb3J0IHJlbmRlclByb2plY3RJdGVtcyBmcm9tIFwiLi9hc3NldHMvcmVuZGVyUHJvamVjdEl0ZW1zXCI7XG5pbXBvcnQgeyByZW5kZXJUYXNrSXRlbXMgfSBmcm9tIFwiLi9hc3NldHMvcmVuZGVyVGFza0l0ZW1zXCI7XG5pbXBvcnQgdG9nZ2xlQXNpZGVPbkNsaWNrIGZyb20gXCIuL2Fzc2V0cy90b2dnbGVBc2lkZU9uQ2xpY2tcIjtcbmltcG9ydCB0b2dnbGVGb3JtT25DbGljayBmcm9tIFwiLi9hc3NldHMvdG9nZ2xlRm9ybU9uQ2xpY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwKGRhdGEpIHtcbiAgdG9nZ2xlRm9ybU9uQ2xpY2soKTtcbiAgdG9nZ2xlQXNpZGVPbkNsaWNrKCk7XG5cbiAgcmVuZGVyUHJvamVjdEl0ZW1zKGRhdGEpO1xuICByZW5kZXJUYXNrSXRlbXMoZGF0YSk7XG4gIGFkZEl0ZW1PblN1Ym1pdChkYXRhKTtcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi8uLi9vYmovUHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4uLy4uL29iai9UYXNrXCI7XG5pbXBvcnQgcmVuZGVyUHJvamVjdEl0ZW1zIGZyb20gXCIuL3JlbmRlclByb2plY3RJdGVtc1wiO1xuaW1wb3J0IHsgcmVuZGVyVGFza0l0ZW1zLCBnZXRUYXNrcyB9IGZyb20gXCIuL3JlbmRlclRhc2tJdGVtc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRJdGVtT25TdWJtaXQocHJvamVjdHMpIHtcbiAgY29uc3QgaW5wdXRzID0gW1wicHJvamVjdFwiLCBcInRhc2tcIl07XG5cbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLSR7aW5wdXR9YCk7XG4gICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1uYW1lYCk7XG4gICAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcblxuICAgICAgc3dpdGNoIChpbnB1dCkge1xuICAgICAgICBjYXNlIFwicHJvamVjdFwiOlxuICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ0YXNrXCI6XG4gICAgICAgICAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXR9LWR1ZS1kYXRlYCk7XG4gICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGR1ZURhdGVJbnB1dC52YWx1ZTtcblxuICAgICAgICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXR9LXByaW9yaXR5YCk7XG4gICAgICAgICAgY29uc3QgcHJpb3JpdHkgPVxuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWVbMF0udG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICBwcmlvcml0eVNlbGVjdC52YWx1ZS5zbGljZSgxKTtcblxuICAgICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gICAgICAgICAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gICAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIGR1ZURhdGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWUgPSBcImxvd1wiO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBzdG9yYWdlQXZhaWxhYmxlIGZyb20gXCIuLi8uLi9kYXRhL2Fzc2V0cy9zdG9yYWdlQXZhaWxhYmxlXCI7XG5pbXBvcnQgc2V0U3RvcmFnZSBmcm9tIFwiLi4vLi4vZGF0YS9hc3NldHMvc2V0U3RvcmFnZVwiO1xuaW1wb3J0IHsgcmVuZGVyVGFza0l0ZW1zIH0gZnJvbSBcIi4vcmVuZGVyVGFza0l0ZW1zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cykge1xuICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHNldFN0b3JhZ2UocHJvamVjdHMpO1xuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xuICBpdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IHJlbmRlclByb2plY3RJdGVtKHByb2plY3QpO1xuICAgIGl0ZW0uZGF0YXNldC5pZCA9IGluZGV4O1xuXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICB9XG5cbiAgICBpdGVtcy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfSk7XG5cbiAgY2hhbmdlU2VsZWN0ZWRQcm9qZWN0T25DbGljayhwcm9qZWN0cyk7XG4gIGVkaXRQcm9qZWN0T25DbGljayhwcm9qZWN0cyk7XG4gIGRlbGV0ZVByb2plY3RPbkNsaWNrKHByb2plY3RzKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJvamVjdEl0ZW0ocHJvamVjdCkge1xuICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiLCBcInByb2plY3RcIik7XG5cbiAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICBjb25zdCBpdGVtTmFtZSA9IHJlbmRlckl0ZW1OYW1lKHByb2plY3QpO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcblxuICBjb25zdCBlZGl0QnRuID0gcmVuZGVyRWRpdEJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xuXG4gIGNvbnN0IGRlbGV0ZUJ0biA9IHJlbmRlckRlbGV0ZUJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1JY29uKCkge1xuICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pY29uXCIpO1xuICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LWNoZWNrXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGl0ZW1JY29uO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtTmFtZShwcm9qZWN0KSB7XG4gIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1OYW1lLmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuXG4gIHJldHVybiBpdGVtTmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRWRpdEJ0bigpIHtcbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ0blwiKTtcbiAgZWRpdEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGVkaXRCdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRlbGV0ZUJ0bigpIHtcbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGRlbGV0ZUJ0bjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlU2VsZWN0ZWRQcm9qZWN0T25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgY29uc3QgaXRlbU5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5pdGVtLW5hbWVcIik7XG5cbiAgaXRlbU5hbWVzLmZvckVhY2goKGl0ZW1OYW1lLCBpbmRleCkgPT4ge1xuICAgIGl0ZW1OYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgfSk7XG4gICAgICBpdGVtc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRQcm9qZWN0T25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdFwiKTtcbiAgY29uc3QgZWRpdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLmVkaXQtYnRuXCIpO1xuXG4gIGVkaXRCdG5zLmZvckVhY2goKGVkaXRCdG4sIGluZGV4KSA9PiB7XG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzW2luZGV4XTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICBpdGVtLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24oKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSByZW5kZXJOYW1lSW5wdXQocHJvamVjdCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cbiAgICAgIGNvbnN0IGNvbmZpcm1CdG4gPSByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCBpbmRleCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNvbmZpcm1CdG4pO1xuXG4gICAgICBjb25zdCBjYW5jZWxCdG4gPSByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTmFtZUlucHV0KHByb2plY3QpIHtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgbmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgbmFtZUlucHV0LnZhbHVlID0gcHJvamVjdC5uYW1lO1xuXG4gIHJldHVybiBuYW1lSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIGluZGV4KSB7XG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiY29uZmlybS1idG5cIik7XG4gIGNvbmZpcm1CdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L2k+YDtcbiAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuaXRlbS1uYW1lXCIpO1xuICAgIGNvbnN0IG5ld0l0ZW1OYW1lID0gaXRlbU5hbWVzW2luZGV4XS52YWx1ZS50cmltKCk7XG4gICAgcHJvamVjdHNbaW5kZXhdLm5hbWUgPSBuZXdJdGVtTmFtZTtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlybUJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKSB7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcImNoZWNrLWJ0blwiKTtcbiAgY2FuY2VsQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPmA7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjYW5jZWxCdG47XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLmRlbGV0ZS1idG5cIik7XG5cbiAgZGVsZXRlQnRucy5mb3JFYWNoKChkZWxldGVCdG4sIGluZGV4KSA9PiB7XG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgc3RvcmFnZUF2YWlsYWJsZSBmcm9tIFwiLi4vLi4vZGF0YS9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZVwiO1xuaW1wb3J0IHNldFN0b3JhZ2UgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3NldFN0b3JhZ2VcIjtcblxuZnVuY3Rpb24gcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKSB7XG4gIGlmIChzdG9yYWdlQXZhaWxhYmxlKFwibG9jYWxTdG9yYWdlXCIpKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgc2V0U3RvcmFnZShwcm9qZWN0cyk7XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XG4gIGl0ZW1zLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IHJlbmRlclRhc2tJdGVtKHRhc2spO1xuICAgIGl0ZW0uZGF0YXNldC5pZCA9IGluZGV4O1xuICAgIGl0ZW1zLmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9KTtcblxuICBjaGFuZ2VJdGVtSWNvbk9uQ2xpY2socHJvamVjdHMpO1xuICBkZWxldGVUYXNrT25DbGljayhwcm9qZWN0cyk7XG4gIGVkaXRUYXNrT25DbGljayhwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tzKHByb2plY3RzKSB7XG4gIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC5zZWxlY3RlZFwiKTtcbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0SWQgPSBzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcblxuICByZXR1cm4gcHJvamVjdHNbc2VsZWN0ZWRQcm9qZWN0SWRdLnRhc2tzO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrSXRlbSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIsIFwidGFza1wiKTtcblxuICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gIH1cblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICBjb25zdCBpdGVtTmFtZSA9IHJlbmRlckl0ZW1OYW1lKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcblxuICBjb25zdCBpdGVtRHVlRGF0ZSA9IHJlbmRlckl0ZW1EdWVEYXRlKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1EdWVEYXRlKTtcblxuICBjb25zdCBpdGVtUHJpb3JpdHkgPSByZW5kZXJJdGVtUHJpb3JpdHkodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbVByaW9yaXR5KTtcblxuICBjb25zdCBlZGl0QnRuID0gcmVuZGVyRWRpdEJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xuXG4gIGNvbnN0IGRlbGV0ZUJ0biA9IHJlbmRlckRlbGV0ZUJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1JY29uKHRhc2spIHtcbiAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUljb24uY2xhc3NMaXN0LmFkZChcIml0ZW0taWNvblwiKTtcblxuICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZS1jaGVja1wiPjwvaT5gO1xuICB9IGVsc2Uge1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI+PC9pPmA7XG4gIH1cblxuICByZXR1cm4gaXRlbUljb247XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1OYW1lKHRhc2spIHtcbiAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbU5hbWUuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG5cbiAgcmV0dXJuIGl0ZW1OYW1lO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtRHVlRGF0ZSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1EdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWR1ZS1kYXRlXCIpO1xuICBpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcblxuICByZXR1cm4gaXRlbUR1ZURhdGU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1Qcmlvcml0eSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcIml0ZW0tcHJpb3JpdHlcIiwgYCR7dGFzay5wcmlvcml0eS50b0xvd2VyQ2FzZSgpfWApO1xuICBpdGVtUHJpb3JpdHkudGV4dENvbnRlbnQgPSB0YXNrLnByaW9yaXR5O1xuXG4gIHJldHVybiBpdGVtUHJpb3JpdHk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuXG4gIHJldHVybiBlZGl0QnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4oKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRlbGV0ZUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG5cbmZ1bmN0aW9uIGNoYW5nZUl0ZW1JY29uT25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgY29uc3QgaXRlbUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLWljb25cIik7XG5cbiAgaXRlbUljb25zLmZvckVhY2goKGl0ZW1JY29uLCBpbmRleCkgPT4ge1xuICAgIGl0ZW1JY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gdGFza3NbaW5kZXhdO1xuICAgICAgdGFzay5jb21wbGV0ZWQgPSB0YXNrLmNvbXBsZXRlZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrT25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgY29uc3QgZGVsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuZGVsZXRlLWJ0blwiKTtcblxuICBkZWxldGVCdG5zLmZvckVhY2goKGRlbGV0ZUJ0biwgaW5kZXgpID0+IHtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWRpdFRhc2tPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcbiAgY29uc3QgZWRpdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLmVkaXQtYnRuXCIpO1xuXG4gIGVkaXRCdG5zLmZvckVhY2goKGVkaXRCdG4sIGluZGV4KSA9PiB7XG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFzayA9IHRhc2tzW2luZGV4XTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICBpdGVtLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24odGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KHRhc2spO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSByZW5kZXJEdWVEYXRlSW5wdXQodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGR1ZURhdGVJbnB1dCk7XG5cbiAgICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gcmVuZGVyUHJpb3JpdHlTZWxlY3QodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcblxuICAgICAgY29uc3QgY29uZmlybUJ0biA9IHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHRhc2ssIGluZGV4KTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cyk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJOYW1lSW5wdXQodGFzaykge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICBuYW1lSW5wdXQudmFsdWUgPSB0YXNrLm5hbWU7XG5cbiAgcmV0dXJuIG5hbWVJbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRHVlRGF0ZUlucHV0KHRhc2spIHtcbiAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBkdWVEYXRlSW5wdXQuY2xhc3NMaXN0LmFkZChcIml0ZW0tZHVlLWRhdGVcIik7XG4gIGR1ZURhdGVJbnB1dC50eXBlID0gXCJkYXRlXCI7XG4gIGR1ZURhdGVJbnB1dC52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcblxuICByZXR1cm4gZHVlRGF0ZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcmlvcml0eVNlbGVjdCh0YXNrKSB7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgcHJpb3JpdHlTZWxlY3QuY2xhc3NMaXN0LmFkZChcIml0ZW0tcHJpb3JpdHlcIik7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJMb3dcIiwgXCJNZWRpdW1cIiwgXCJIaWdoXCJdO1xuICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi52YWx1ZSA9IG9wdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChvcHRpb24gPT09IHRhc2sucHJpb3JpdHkpIHtcbiAgICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgIH1cbiAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICBwcmlvcml0eVNlbGVjdC5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdE9wdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcHJpb3JpdHlTZWxlY3Q7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHRhc2ssIGluZGV4KSB7XG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiY29uZmlybS1idG5cIik7XG4gIGNvbmZpcm1CdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L2k+YDtcbiAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1uYW1lXCIpO1xuICAgIGNvbnN0IGl0ZW1EdWVEYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1kdWUtZGF0ZVwiKTtcbiAgICBjb25zdCBpdGVtUHJpb3JpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1wcmlvcml0eVwiKTtcblxuICAgIGNvbnN0IG5ld0l0ZW1OYW1lID0gaXRlbU5hbWVzW2luZGV4XS52YWx1ZS50cmltKCk7XG4gICAgY29uc3QgbmV3SXRlbUR1ZURhdGUgPSBpdGVtRHVlRGF0ZXNbaW5kZXhdLnZhbHVlO1xuICAgIGNvbnN0IG5ld0l0ZW1Qcmlvcml0eSA9IGl0ZW1Qcmlvcml0aWVzW2luZGV4XS52YWx1ZTtcblxuICAgIHRhc2submFtZSA9IG5ld0l0ZW1OYW1lO1xuICAgIHRhc2suZHVlRGF0ZSA9IG5ld0l0ZW1EdWVEYXRlO1xuICAgIHRhc2sucHJpb3JpdHkgPSBuZXdJdGVtUHJpb3JpdHlbMF0udG9VcHBlckNhc2UoKSArIG5ld0l0ZW1Qcmlvcml0eS5zbGljZSgxKTtcblxuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maXJtQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpIHtcbiAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsLWJ0blwiKTtcbiAgY2FuY2VsQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPmA7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjYW5jZWxCdG47XG59XG5cbmV4cG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0VGFza3MgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvZ2dsZUFzaWRlT25DbGljaygpIHtcbiAgY29uc3QgYnRuQXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1hc2lkZVwiKTtcbiAgYnRuQXNpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhc2lkZVwiKTtcbiAgICBhc2lkZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvZ2dsZUZvcm1PbkNsaWNrKCkge1xuICBjb25zdCBpbnB1dHMgPSBbXCJwcm9qZWN0XCIsIFwidGFza1wiXTtcbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgY29uc3QgYnRuQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1hZGQtJHtpbnB1dH1gKTtcbiAgICBidG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi8uLi9vYmovUHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4uLy4uL29iai9UYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmF1bHREYXRhKCkge1xuICBjb25zdCBkYXRhID0gW107XG5cbiAgY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMVwiKTtcbiAgcHJvamVjdDEudGFza3MucHVzaChuZXcgVGFzayhcIlRhc2sgMVwiLCBcIjIwMjQtMDMtMDZcIiwgXCJMb3dcIikpO1xuICBwcm9qZWN0MS50YXNrcy5wdXNoKG5ldyBUYXNrKFwiVGFzayAyXCIsIFwiMjAyNC0wMy0xNFwiLCBcIk1lZGl1bVwiKSk7XG4gIGRhdGEucHVzaChwcm9qZWN0MSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTdG9yYWdlKCkge1xuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIikpO1xufVxuIiwiaW1wb3J0IGdldFN0b3JhZ2UgZnJvbSBcIi4vZ2V0U3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRTdG9yYWdlKGRhdGEpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgZ2V0U3RvcmFnZSgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gIHRyeSB7XG4gICAgbGV0IHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV0sXG4gICAgICB4ID0gXCJfX3N0b3JhZ2VfdGVzdF9fXCI7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAoXG4gICAgICBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmXG4gICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAoZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiUXVvdGFFeGNlZWRlZEVycm9yXCIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLm5hbWUgPT09IFwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIikgJiZcbiAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICBzdG9yYWdlLmxlbmd0aCAhPT0gMFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBzdG9yYWdlQXZhaWxhYmxlIGZyb20gXCIuL2Fzc2V0cy9zdG9yYWdlQXZhaWxhYmxlXCI7XG5pbXBvcnQgZ2V0U3RvcmFnZSBmcm9tIFwiLi9hc3NldHMvZ2V0U3RvcmFnZVwiO1xuaW1wb3J0IHNldFN0b3JhZ2UgZnJvbSBcIi4vYXNzZXRzL3NldFN0b3JhZ2VcIjtcbmltcG9ydCBkZWZhdWx0RGF0YSBmcm9tIFwiLi9hc3NldHMvZGVmYXVsdERhdGFcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YSgpIHtcbiAgbGV0IGRhdGE7XG4gIGlmIChzdG9yYWdlQXZhaWxhYmxlKFwibG9jYWxTdG9yYWdlXCIpKSB7XG4gICAgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZGF0YVwiKVxuICAgICAgPyBnZXRTdG9yYWdlKClcbiAgICAgIDogc2V0U3RvcmFnZShkZWZhdWx0RGF0YSgpKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gZGVmYXVsdERhdGEoKTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cbiIsImltcG9ydCBzZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNpZGUoKSB7XG4gIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFzaWRlXCIpO1xuXG4gIGNvbnN0IGZpbHRlclNlY3Rpb24gPSBzZWN0aW9uKFwiZmlsdGVyc1wiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoZmlsdGVyU2VjdGlvbik7XG5cbiAgY29uc3QgcHJvamVjdFNlY3Rpb24gPSBzZWN0aW9uKFwicHJvamVjdHNcIik7XG4gIGFzaWRlLmFwcGVuZENoaWxkKHByb2plY3RTZWN0aW9uKTtcblxuICByZXR1cm4gYXNpZGU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb290ZXIoKSB7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci5pbm5lckhUTUwgPSBgXG4gICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS92aW5lc2svb2Rpbi10b2RvLWxpc3RcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEtYnJhbmRzIGZhLWdpdGh1YlwiPjwvaT4gdmluZXNrXG4gICAgPC9hPmA7XG5cbiAgcmV0dXJuIGZvb3Rlcjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcblxuICBoZWFkZXIuaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDE+VG9kbyBMaXN0PC9oMT5cbiAgICAgICAgPHNwYW4gaWQ9XCJidG4tYXNpZGVcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJhcnNcIj48L2k+XG4gICAgICAgIDwvc3Bhbj5gO1xuXG4gIHJldHVybiBoZWFkZXI7XG59XG4iLCJpbXBvcnQgc2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IHNlY3Rpb24oXCJ0YXNrc1wiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZCh0YXNrU2VjdGlvbik7XG5cbiAgcmV0dXJuIG1haW47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWN0aW9uKHNlY3Rpb25OYW1lKSB7XG4gIGxldCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5cbiAgc3dpdGNoIChzZWN0aW9uTmFtZSkge1xuICAgIGNhc2UgXCJmaWx0ZXJzXCI6XG4gICAgICBzZWN0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5GaWx0ZXJzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgaWQ9XCJmaWx0ZXJzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gZmlsdGVyXCIgaWQ9XCJmaWx0ZXItYWxsXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0taWNvblwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWluYm94XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5BbGw8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gZmlsdGVyXCIgaWQ9XCJmaWx0ZXItdG9kYXlcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5Ub2RheTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci13ZWVrXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0taWNvblwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLWRheVwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+VGhpcyB3ZWVrPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwicHJvamVjdHNcIjpcbiAgICAgIHNlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlByb2plY3RzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgaWQ9XCJwcm9qZWN0c1wiPjwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFkZFwiIGlkPVwiYnRuLWFkZC1wcm9qZWN0XCI+QWRkIGEgcHJvamVjdDwvYnV0dG9uPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0gaGlkZGVuXCIgaWQ9XCJmb3JtLXByb2plY3RcIiBhY3Rpb249XCIjXCIgbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcm9qZWN0LW5hbWVcIj5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwcm9qZWN0LW5hbWVcIiByZXF1aXJlZD1cIlwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPmA7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJ0YXNrc1wiOlxuICAgICAgc2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+VGFza3M8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cInRhc2tzXCI+PC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWRkXCIgaWQ9XCJidG4tYWRkLXRhc2tcIj5BZGQgYSB0YXNrPC9idXR0b24+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybSBoaWRkZW5cIiBpZD1cImZvcm0tdGFza1wiIGFjdGlvbj1cIiNcIiBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stbmFtZVwiIHJlcXVpcmVkPVwiXCIgLz5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1kdWUtZGF0ZVwiPkR1ZSBkYXRlOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJ0YXNrLWR1ZS1kYXRlXCIgcmVxdWlyZWQ9XCJcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXByaW9yaXR5XCI+UHJpb3JpdHk6PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGlkPVwidGFzay1wcmlvcml0eVwiPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxvd1wiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImhpZ2hcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+UmVzZXQ8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPmA7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBzZWN0aW9uO1xufVxuIiwiaW1wb3J0IGhlYWRlciBmcm9tIFwiLi9hc3NldHMvaGVhZGVyXCI7XG5pbXBvcnQgYXNpZGUgZnJvbSBcIi4vYXNzZXRzL2FzaWRlXCI7XG5pbXBvcnQgbWFpbiBmcm9tIFwiLi9hc3NldHMvbWFpblwiO1xuaW1wb3J0IGZvb3RlciBmcm9tIFwiLi9hc3NldHMvZm9vdGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxheW91dCgpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIik7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlcigpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFzaWRlKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWFpbigpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvb3RlcigpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnRhc2tzID0gW107XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbGF5b3V0IGZyb20gXCIuL2xheW91dC9sYXlvdXRcIjtcbmltcG9ydCBkYXRhIGZyb20gXCIuL2RhdGEvZGF0YVwiO1xuaW1wb3J0IGFwcCBmcm9tIFwiLi9hcHAvYXBwXCI7XG5cbigoKSA9PiB7XG4gIGxheW91dCgpO1xuICBhcHAoZGF0YSgpKTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=