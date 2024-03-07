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

  if (projects.length !== 0) {
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
function setStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
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
    if (localStorage.getItem("data") === "undefined") {
      data = (0,_assets_defaultData__WEBPACK_IMPORTED_MODULE_3__["default"])();
      (0,_assets_setStorage__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
    } else {
      data = (0,_assets_getStorage__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVEO0FBQ007QUFDRjtBQUNFO0FBQ0Y7O0FBRTVDO0FBQ2YsRUFBRSxxRUFBaUI7QUFDbkIsRUFBRSxzRUFBa0I7O0FBRXBCLEVBQUUsc0VBQWtCO0FBQ3BCLEVBQUUsd0VBQWU7QUFDakIsRUFBRSxtRUFBZTtBQUNqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2J3QztBQUNOO0FBQ29CO0FBQ1E7O0FBRS9DO0FBQ2Y7O0FBRUE7QUFDQSxpREFBaUQsTUFBTTtBQUN2RDtBQUNBOztBQUVBLG1EQUFtRCxNQUFNO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsb0RBQU87QUFDckM7QUFDQTtBQUNBO0FBQ0EsVUFBVSwrREFBa0I7QUFDNUI7QUFDQTtBQUNBLDBEQUEwRCxNQUFNO0FBQ2hFOztBQUVBLDREQUE0RCxNQUFNO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsaURBQUk7QUFDL0Isd0JBQXdCLDBEQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlFQUFlO0FBQ3pCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q2tFO0FBQ1o7QUFDRjs7QUFFckM7QUFDZixNQUFNLHlFQUFnQjtBQUN0QjtBQUNBLElBQUksbUVBQVU7QUFDZDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNLGlFQUFlO0FBQ3JCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25La0U7QUFDWjs7QUFFdEQ7QUFDQSxNQUFNLHlFQUFnQjtBQUN0QjtBQUNBLElBQUksbUVBQVU7QUFDZDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRXFDOzs7Ozs7Ozs7Ozs7Ozs7QUNoUHRCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ05lO0FBQ2Y7QUFDQTtBQUNBLHNEQUFzRCxNQUFNO0FBQzVEO0FBQ0EsbURBQW1ELE1BQU07QUFDekQ7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1R3QztBQUNOOztBQUVuQjtBQUNmOztBQUVBLHVCQUF1QixvREFBTztBQUM5QiwwQkFBMEIsaURBQUk7QUFDOUIsMEJBQTBCLGlEQUFJO0FBQzlCOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1plO0FBQ2Y7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNGZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCeUQ7QUFDWjtBQUNBO0FBQ0U7O0FBRWhDO0FBQ2Y7QUFDQSxNQUFNLG9FQUFnQjtBQUN0QjtBQUNBLGFBQWEsK0RBQVc7QUFDeEIsTUFBTSw4REFBVTtBQUNoQixNQUFNO0FBQ04sYUFBYSw4REFBVTtBQUN2QjtBQUNBLElBQUk7QUFDSixXQUFXLCtEQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCZ0M7O0FBRWpCO0FBQ2Y7O0FBRUEsd0JBQXdCLG9EQUFPO0FBQy9COztBQUVBLHlCQUF5QixvREFBTztBQUNoQzs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUmU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWZ0M7O0FBRWpCO0FBQ2Y7O0FBRUEsc0JBQXNCLG9EQUFPO0FBQzdCOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1RlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRXFDO0FBQ0Y7QUFDRjtBQUNJOztBQUV0QjtBQUNmOztBQUVBLHdCQUF3QiwwREFBTTtBQUM5Qix3QkFBd0IseURBQUs7QUFDN0Isd0JBQXdCLHdEQUFJO0FBQzVCLHdCQUF3QiwwREFBTTtBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7O0FDWmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ047QUFDSDs7QUFFNUI7QUFDQSxFQUFFLDBEQUFNO0FBQ1IsRUFBRSxvREFBRyxDQUFDLHNEQUFJO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9hZGRJdGVtT25TdWJtaXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9yZW5kZXJQcm9qZWN0SXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9yZW5kZXJUYXNrSXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy90b2dnbGVBc2lkZU9uQ2xpY2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy90b2dnbGVGb3JtT25DbGljay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9kZWZhdWx0RGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9nZXRTdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvYXNzZXRzL3NldFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9hc2lkZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL21haW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9zZWN0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkSXRlbU9uU3VibWl0IGZyb20gXCIuL2Fzc2V0cy9hZGRJdGVtT25TdWJtaXRcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0SXRlbXMgZnJvbSBcIi4vYXNzZXRzL3JlbmRlclByb2plY3RJdGVtc1wiO1xuaW1wb3J0IHsgcmVuZGVyVGFza0l0ZW1zIH0gZnJvbSBcIi4vYXNzZXRzL3JlbmRlclRhc2tJdGVtc1wiO1xuaW1wb3J0IHRvZ2dsZUFzaWRlT25DbGljayBmcm9tIFwiLi9hc3NldHMvdG9nZ2xlQXNpZGVPbkNsaWNrXCI7XG5pbXBvcnQgdG9nZ2xlRm9ybU9uQ2xpY2sgZnJvbSBcIi4vYXNzZXRzL3RvZ2dsZUZvcm1PbkNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcChkYXRhKSB7XG4gIHRvZ2dsZUZvcm1PbkNsaWNrKCk7XG4gIHRvZ2dsZUFzaWRlT25DbGljaygpO1xuXG4gIHJlbmRlclByb2plY3RJdGVtcyhkYXRhKTtcbiAgcmVuZGVyVGFza0l0ZW1zKGRhdGEpO1xuICBhZGRJdGVtT25TdWJtaXQoZGF0YSk7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi4vLi4vb2JqL1Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuLi8uLi9vYmovVGFza1wiO1xuaW1wb3J0IHJlbmRlclByb2plY3RJdGVtcyBmcm9tIFwiLi9yZW5kZXJQcm9qZWN0SXRlbXNcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0VGFza3MgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSXRlbU9uU3VibWl0KHByb2plY3RzKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuXG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tbmFtZWApO1xuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgICAgY2FzZSBcInByb2plY3RcIjpcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFza1wiOlxuICAgICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1kdWUtZGF0ZWApO1xuICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1wcmlvcml0eWApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID1cbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlWzBdLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBkdWVEYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlID0gXCJsb3dcIjtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgc3RvcmFnZUF2YWlsYWJsZSBmcm9tIFwiLi4vLi4vZGF0YS9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZVwiO1xuaW1wb3J0IHNldFN0b3JhZ2UgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3NldFN0b3JhZ2VcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcyB9IGZyb20gXCIuL3JlbmRlclRhc2tJdGVtc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpIHtcbiAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBzZXRTdG9yYWdlKHByb2plY3RzKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcbiAgaXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcblxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJQcm9qZWN0SXRlbShwcm9qZWN0KTtcbiAgICBpdGVtLmRhdGFzZXQuaWQgPSBpbmRleDtcblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaXRlbXMuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH0pO1xuXG4gIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RJdGVtKHByb2plY3QpIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIiwgXCJwcm9qZWN0XCIpO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZShwcm9qZWN0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XG5cbiAgY29uc3QgZWRpdEJ0biA9IHJlbmRlckVkaXRCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbigpIHtcbiAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUljb24uY2xhc3NMaXN0LmFkZChcIml0ZW0taWNvblwiKTtcbiAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5gO1xuXG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUocHJvamVjdCkge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuXG4gIHJldHVybiBlZGl0QnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4oKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRlbGV0ZUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuaXRlbS1uYW1lXCIpO1xuXG4gIGl0ZW1OYW1lcy5mb3JFYWNoKChpdGVtTmFtZSwgaW5kZXgpID0+IHtcbiAgICBpdGVtTmFtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH0pO1xuICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGVkaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5lZGl0LWJ0blwiKTtcblxuICBlZGl0QnRucy5mb3JFYWNoKChlZGl0QnRuLCBpbmRleCkgPT4ge1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1tpbmRleF07XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgaXRlbS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KHByb2plY3QpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICBjb25zdCBjb25maXJtQnRuID0gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgaW5kZXgpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dChwcm9qZWN0KSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCBpbmRleCkge1xuICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm0tYnRuXCIpO1xuICBjb25maXJtQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPmA7XG4gIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpdGVtTmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLml0ZW0tbmFtZVwiKTtcbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IGl0ZW1OYW1lc1tpbmRleF0udmFsdWUudHJpbSgpO1xuICAgIHByb2plY3RzW2luZGV4XS5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5gO1xuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY2FuY2VsQnRuO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5kZWxldGUtYnRuXCIpO1xuXG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZGVsZXRlQnRuLCBpbmRleCkgPT4ge1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHN0b3JhZ2VBdmFpbGFibGUgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3N0b3JhZ2VBdmFpbGFibGVcIjtcbmltcG9ydCBzZXRTdG9yYWdlIGZyb20gXCIuLi8uLi9kYXRhL2Fzc2V0cy9zZXRTdG9yYWdlXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cykge1xuICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHNldFN0b3JhZ2UocHJvamVjdHMpO1xuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xuICBpdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGlmIChwcm9qZWN0cy5sZW5ndGggIT09IDApIHtcbiAgICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IHJlbmRlclRhc2tJdGVtKHRhc2spO1xuICAgICAgaXRlbS5kYXRhc2V0LmlkID0gaW5kZXg7XG4gICAgICBpdGVtcy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICB9KTtcblxuICAgIGNoYW5nZUl0ZW1JY29uT25DbGljayhwcm9qZWN0cyk7XG4gICAgZGVsZXRlVGFza09uQ2xpY2socHJvamVjdHMpO1xuICAgIGVkaXRUYXNrT25DbGljayhwcm9qZWN0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGFza3MocHJvamVjdHMpIHtcbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LnNlbGVjdGVkXCIpO1xuICBjb25zdCBzZWxlY3RlZFByb2plY3RJZCA9IHNlbGVjdGVkUHJvamVjdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuXG4gIHJldHVybiBwcm9qZWN0c1tzZWxlY3RlZFByb2plY3RJZF0udGFza3M7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tJdGVtKHRhc2spIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIiwgXCJ0YXNrXCIpO1xuXG4gIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlZFwiKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24odGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gIGNvbnN0IGl0ZW1OYW1lID0gcmVuZGVySXRlbU5hbWUodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuXG4gIGNvbnN0IGl0ZW1EdWVEYXRlID0gcmVuZGVySXRlbUR1ZURhdGUodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUR1ZURhdGUpO1xuXG4gIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IHJlbmRlckl0ZW1Qcmlvcml0eSh0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtUHJpb3JpdHkpO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSByZW5kZXJFZGl0QnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gcmVuZGVyRGVsZXRlQnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUljb24odGFzaykge1xuICBjb25zdCBpdGVtSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiaXRlbS1pY29uXCIpO1xuXG4gIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlLWNoZWNrXCI+PC9pPmA7XG4gIH0gZWxzZSB7XG4gICAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jaXJjbGVcIj48L2k+YDtcbiAgfVxuXG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUodGFzaykge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1EdWVEYXRlKHRhc2spIHtcbiAgY29uc3QgaXRlbUR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUR1ZURhdGUuY2xhc3NMaXN0LmFkZChcIml0ZW0tZHVlLWRhdGVcIik7XG4gIGl0ZW1EdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuXG4gIHJldHVybiBpdGVtRHVlRGF0ZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbVByaW9yaXR5KHRhc2spIHtcbiAgY29uc3QgaXRlbVByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1Qcmlvcml0eS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1wcmlvcml0eVwiLCBgJHt0YXNrLnByaW9yaXR5LnRvTG93ZXJDYXNlKCl9YCk7XG4gIGl0ZW1Qcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XG5cbiAgcmV0dXJuIGl0ZW1Qcmlvcml0eTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRWRpdEJ0bigpIHtcbiAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LWJ0blwiKTtcbiAgZWRpdEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGVkaXRCdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckRlbGV0ZUJ0bigpIHtcbiAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLWJ0blwiKTtcbiAgZGVsZXRlQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoXCI+PC9pPmA7XG5cbiAgcmV0dXJuIGRlbGV0ZUJ0bjtcbn1cblxuZnVuY3Rpb24gY2hhbmdlSXRlbUljb25PbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBpdGVtSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLml0ZW0taWNvblwiKTtcblxuICBpdGVtSWNvbnMuZm9yRWFjaCgoaXRlbUljb24sIGluZGV4KSA9PiB7XG4gICAgaXRlbUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1tpbmRleF07XG4gICAgICB0YXNrLmNvbXBsZXRlZCA9IHRhc2suY29tcGxldGVkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2tPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5kZWxldGUtYnRuXCIpO1xuXG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZGVsZXRlQnRuLCBpbmRleCkgPT4ge1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZGl0VGFza09uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrXCIpO1xuICBjb25zdCBlZGl0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuZWRpdC1idG5cIik7XG5cbiAgZWRpdEJ0bnMuZm9yRWFjaCgoZWRpdEJ0biwgaW5kZXgpID0+IHtcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gdGFza3NbaW5kZXhdO1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbih0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSByZW5kZXJOYW1lSW5wdXQodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG5cbiAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IHJlbmRlckR1ZURhdGVJbnB1dCh0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoZHVlRGF0ZUlucHV0KTtcblxuICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSByZW5kZXJQcmlvcml0eVNlbGVjdCh0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3QpO1xuXG4gICAgICBjb25zdCBjb25maXJtQnRuID0gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgdGFzaywgaW5kZXgpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dCh0YXNrKSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHRhc2submFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJEdWVEYXRlSW5wdXQodGFzaykge1xuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGR1ZURhdGVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1kdWUtZGF0ZVwiKTtcbiAgZHVlRGF0ZUlucHV0LnR5cGUgPSBcImRhdGVcIjtcbiAgZHVlRGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlO1xuXG4gIHJldHVybiBkdWVEYXRlSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByaW9yaXR5U2VsZWN0KHRhc2spIHtcbiAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICBwcmlvcml0eVNlbGVjdC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1wcmlvcml0eVwiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IFtcIkxvd1wiLCBcIk1lZGl1bVwiLCBcIkhpZ2hcIl07XG4gIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgY29uc3QgcHJpb3JpdHlTZWxlY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnZhbHVlID0gb3B0aW9uLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG9wdGlvbiA9PT0gdGFzay5wcmlvcml0eSkge1xuICAgICAgcHJpb3JpdHlTZWxlY3RPcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJcIik7XG4gICAgfVxuICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgIHByaW9yaXR5U2VsZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0T3B0aW9uKTtcbiAgfSk7XG4gIHJldHVybiBwcmlvcml0eVNlbGVjdDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgdGFzaywgaW5kZXgpIHtcbiAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJjb25maXJtLWJ0blwiKTtcbiAgY29uZmlybUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVja1wiPjwvaT5gO1xuICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgaXRlbU5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLW5hbWVcIik7XG4gICAgY29uc3QgaXRlbUR1ZURhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLWR1ZS1kYXRlXCIpO1xuICAgIGNvbnN0IGl0ZW1Qcmlvcml0aWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLXByaW9yaXR5XCIpO1xuXG4gICAgY29uc3QgbmV3SXRlbU5hbWUgPSBpdGVtTmFtZXNbaW5kZXhdLnZhbHVlLnRyaW0oKTtcbiAgICBjb25zdCBuZXdJdGVtRHVlRGF0ZSA9IGl0ZW1EdWVEYXRlc1tpbmRleF0udmFsdWU7XG4gICAgY29uc3QgbmV3SXRlbVByaW9yaXR5ID0gaXRlbVByaW9yaXRpZXNbaW5kZXhdLnZhbHVlO1xuXG4gICAgdGFzay5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgdGFzay5kdWVEYXRlID0gbmV3SXRlbUR1ZURhdGU7XG4gICAgdGFzay5wcmlvcml0eSA9IG5ld0l0ZW1Qcmlvcml0eVswXS50b1VwcGVyQ2FzZSgpICsgbmV3SXRlbVByaW9yaXR5LnNsaWNlKDEpO1xuXG4gICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjYW5jZWwtYnRuXCIpO1xuICBjYW5jZWxCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+YDtcbiAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNhbmNlbEJ0bjtcbn1cblxuZXhwb3J0IHsgcmVuZGVyVGFza0l0ZW1zLCBnZXRUYXNrcyB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9nZ2xlQXNpZGVPbkNsaWNrKCkge1xuICBjb25zdCBidG5Bc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLWFzaWRlXCIpO1xuICBidG5Bc2lkZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFzaWRlXCIpO1xuICAgIGFzaWRlLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9nZ2xlRm9ybU9uQ2xpY2soKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBjb25zdCBidG5BZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYnRuLWFkZC0ke2lucHV0fWApO1xuICAgIGJ0bkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtLSR7aW5wdXR9YCk7XG4gICAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uLy4uL29iai9Qcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi4vLi4vb2JqL1Rhc2tcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmYXVsdERhdGEoKSB7XG4gIGNvbnN0IGRhdGEgPSBbXTtcblxuICBjb25zdCBwcm9qZWN0MSA9IG5ldyBQcm9qZWN0KFwiUHJvamVjdCAxXCIpO1xuICBwcm9qZWN0MS50YXNrcy5wdXNoKG5ldyBUYXNrKFwiVGFzayAxXCIsIFwiMjAyNC0wMy0wNlwiLCBcIkxvd1wiKSk7XG4gIHByb2plY3QxLnRhc2tzLnB1c2gobmV3IFRhc2soXCJUYXNrIDJcIiwgXCIyMDI0LTAzLTE0XCIsIFwiTWVkaXVtXCIpKTtcbiAgZGF0YS5wdXNoKHByb2plY3QxKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFN0b3JhZ2UoKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZGF0YVwiKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRTdG9yYWdlKGRhdGEpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICB0cnkge1xuICAgIGxldCBzdG9yYWdlID0gd2luZG93W3R5cGVdLFxuICAgICAgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgKGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG4gICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgc3RvcmFnZUF2YWlsYWJsZSBmcm9tIFwiLi9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZVwiO1xuaW1wb3J0IGdldFN0b3JhZ2UgZnJvbSBcIi4vYXNzZXRzL2dldFN0b3JhZ2VcIjtcbmltcG9ydCBzZXRTdG9yYWdlIGZyb20gXCIuL2Fzc2V0cy9zZXRTdG9yYWdlXCI7XG5pbXBvcnQgZGVmYXVsdERhdGEgZnJvbSBcIi4vYXNzZXRzL2RlZmF1bHREYXRhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGEoKSB7XG4gIGxldCBkYXRhO1xuICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIikgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGRhdGEgPSBkZWZhdWx0RGF0YSgpO1xuICAgICAgc2V0U3RvcmFnZShkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGdldFN0b3JhZ2UoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGF0YSA9IGRlZmF1bHREYXRhKCk7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgc2VjdGlvbiBmcm9tIFwiLi9zZWN0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzaWRlKCkge1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcblxuICBjb25zdCBmaWx0ZXJTZWN0aW9uID0gc2VjdGlvbihcImZpbHRlcnNcIik7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGZpbHRlclNlY3Rpb24pO1xuXG4gIGNvbnN0IHByb2plY3RTZWN0aW9uID0gc2VjdGlvbihcInByb2plY3RzXCIpO1xuICBhc2lkZS5hcHBlbmRDaGlsZChwcm9qZWN0U2VjdGlvbik7XG5cbiAgcmV0dXJuIGFzaWRlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9vdGVyKCkge1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIuaW5uZXJIVE1MID0gYFxuICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdmluZXNrL29kaW4tdG9kby1saXN0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICA8aSBjbGFzcz1cImZhLWJyYW5kcyBmYS1naXRodWJcIj48L2k+IHZpbmVza1xuICAgIDwvYT5gO1xuXG4gIHJldHVybiBmb290ZXI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFkZXIoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG5cbiAgaGVhZGVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgxPlRvZG8gTGlzdDwvaDE+XG4gICAgICAgIDxzcGFuIGlkPVwiYnRuLWFzaWRlXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1iYXJzXCI+PC9pPlxuICAgICAgICA8L3NwYW4+YDtcblxuICByZXR1cm4gaGVhZGVyO1xufVxuIiwiaW1wb3J0IHNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWluKCkge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG5cbiAgY29uc3QgdGFza1NlY3Rpb24gPSBzZWN0aW9uKFwidGFza3NcIik7XG4gIG1haW4uYXBwZW5kQ2hpbGQodGFza1NlY3Rpb24pO1xuXG4gIHJldHVybiBtYWluO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VjdGlvbihzZWN0aW9uTmFtZSkge1xuICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuXG4gIHN3aXRjaCAoc2VjdGlvbk5hbWUpIHtcbiAgICBjYXNlIFwiZmlsdGVyc1wiOlxuICAgICAgc2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+RmlsdGVyczwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtc1wiIGlkPVwiZmlsdGVyc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtIGZpbHRlclwiIGlkPVwiZmlsdGVyLWFsbFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWljb25cIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1pbmJveFwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+QWxsPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtIGZpbHRlclwiIGlkPVwiZmlsdGVyLXRvZGF5XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0taWNvblwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLWRheVwiPjwvaT5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+VG9kYXk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0gZmlsdGVyXCIgaWQ9XCJmaWx0ZXItd2Vla1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWljb25cIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci1kYXlcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPlRoaXMgd2Vlazwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcInByb2plY3RzXCI6XG4gICAgICBzZWN0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5Qcm9qZWN0czwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtc1wiIGlkPVwicHJvamVjdHNcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hZGRcIiBpZD1cImJ0bi1hZGQtcHJvamVjdFwiPkFkZCBhIHByb2plY3Q8L2J1dHRvbj5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtIGhpZGRlblwiIGlkPVwiZm9ybS1wcm9qZWN0XCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvamVjdC1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicHJvamVjdC1uYW1lXCIgcmVxdWlyZWQ9XCJcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2xzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5gO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIFwidGFza3NcIjpcbiAgICAgIHNlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPlRhc2tzPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgaWQ9XCJ0YXNrc1wiPjwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWFkZFwiIGlkPVwiYnRuLWFkZC10YXNrXCI+QWRkIGEgdGFzazwvYnV0dG9uPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0gaGlkZGVuXCIgaWQ9XCJmb3JtLXRhc2tcIiBhY3Rpb249XCIjXCIgbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLW5hbWVcIj5OYW1lOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLW5hbWVcIiByZXF1aXJlZD1cIlwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stZHVlLWRhdGVcIj5EdWUgZGF0ZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwidGFzay1kdWUtZGF0ZVwiIHJlcXVpcmVkPVwiXCIgLz5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1wcmlvcml0eVwiPlByaW9yaXR5OjwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCBpZD1cInRhc2stcHJpb3JpdHlcIj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJsb3dcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoaWdoXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRyb2xzXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiPlJlc2V0PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9ybT5gO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbjtcbn1cbiIsImltcG9ydCBoZWFkZXIgZnJvbSBcIi4vYXNzZXRzL2hlYWRlclwiO1xuaW1wb3J0IGFzaWRlIGZyb20gXCIuL2Fzc2V0cy9hc2lkZVwiO1xuaW1wb3J0IG1haW4gZnJvbSBcIi4vYXNzZXRzL21haW5cIjtcbmltcG9ydCBmb290ZXIgZnJvbSBcIi4vYXNzZXRzL2Zvb3RlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYXlvdXQoKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpO1xuXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIoKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhc2lkZSgpKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1haW4oKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIoKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50YXNrcyA9IFtdO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxheW91dCBmcm9tIFwiLi9sYXlvdXQvbGF5b3V0XCI7XG5pbXBvcnQgZGF0YSBmcm9tIFwiLi9kYXRhL2RhdGFcIjtcbmltcG9ydCBhcHAgZnJvbSBcIi4vYXBwL2FwcFwiO1xuXG4oKCkgPT4ge1xuICBsYXlvdXQoKTtcbiAgYXBwKGRhdGEoKSk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9