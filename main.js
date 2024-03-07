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
    if (
      !localStorage.getItem("data") ||
      localStorage.getItem("data") === "undefined"
    ) {
      data = (0,_assets_setStorage__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_assets_defaultData__WEBPACK_IMPORTED_MODULE_3__["default"])());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRXFDO0FBQ0Y7QUFDRjtBQUNJOztBQUV0QjtBQUNmOztBQUVBLHdCQUF3QiwwREFBTTtBQUM5Qix3QkFBd0IseURBQUs7QUFDN0Isd0JBQXdCLHdEQUFJO0FBQzVCLHdCQUF3QiwwREFBTTtBQUM5Qjs7Ozs7Ozs7Ozs7Ozs7O0FDWmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFDO0FBQ047QUFDSDs7QUFFNUI7QUFDQSxFQUFFLDBEQUFNO0FBQ1IsRUFBRSxvREFBRyxDQUFDLHNEQUFJO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9hZGRJdGVtT25TdWJtaXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9yZW5kZXJQcm9qZWN0SXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy9yZW5kZXJUYXNrSXRlbXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy90b2dnbGVBc2lkZU9uQ2xpY2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvYXBwL2Fzc2V0cy90b2dnbGVGb3JtT25DbGljay5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9kZWZhdWx0RGF0YS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9nZXRTdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvYXNzZXRzL3NldFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9hc2lkZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2Zvb3Rlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvYXNzZXRzL21haW4uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9zZWN0aW9uLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9sYXlvdXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvb2JqL1Rhc2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkSXRlbU9uU3VibWl0IGZyb20gXCIuL2Fzc2V0cy9hZGRJdGVtT25TdWJtaXRcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0SXRlbXMgZnJvbSBcIi4vYXNzZXRzL3JlbmRlclByb2plY3RJdGVtc1wiO1xuaW1wb3J0IHsgcmVuZGVyVGFza0l0ZW1zIH0gZnJvbSBcIi4vYXNzZXRzL3JlbmRlclRhc2tJdGVtc1wiO1xuaW1wb3J0IHRvZ2dsZUFzaWRlT25DbGljayBmcm9tIFwiLi9hc3NldHMvdG9nZ2xlQXNpZGVPbkNsaWNrXCI7XG5pbXBvcnQgdG9nZ2xlRm9ybU9uQ2xpY2sgZnJvbSBcIi4vYXNzZXRzL3RvZ2dsZUZvcm1PbkNsaWNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcChkYXRhKSB7XG4gIHRvZ2dsZUZvcm1PbkNsaWNrKCk7XG4gIHRvZ2dsZUFzaWRlT25DbGljaygpO1xuXG4gIHJlbmRlclByb2plY3RJdGVtcyhkYXRhKTtcbiAgcmVuZGVyVGFza0l0ZW1zKGRhdGEpO1xuICBhZGRJdGVtT25TdWJtaXQoZGF0YSk7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi4vLi4vb2JqL1Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuLi8uLi9vYmovVGFza1wiO1xuaW1wb3J0IHJlbmRlclByb2plY3RJdGVtcyBmcm9tIFwiLi9yZW5kZXJQcm9qZWN0SXRlbXNcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0VGFza3MgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSXRlbU9uU3VibWl0KHByb2plY3RzKSB7XG4gIGNvbnN0IGlucHV0cyA9IFtcInByb2plY3RcIiwgXCJ0YXNrXCJdO1xuXG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tbmFtZWApO1xuICAgICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgIHN3aXRjaCAoaW5wdXQpIHtcbiAgICAgICAgY2FzZSBcInByb2plY3RcIjpcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSk7XG4gICAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICBuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwidGFza1wiOlxuICAgICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1kdWUtZGF0ZWApO1xuICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XG5cbiAgICAgICAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0fS1wcmlvcml0eWApO1xuICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID1cbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlWzBdLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgcHJpb3JpdHlTZWxlY3QudmFsdWUuc2xpY2UoMSk7XG5cbiAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICAgICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBkdWVEYXRlSW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlID0gXCJsb3dcIjtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgc3RvcmFnZUF2YWlsYWJsZSBmcm9tIFwiLi4vLi4vZGF0YS9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZVwiO1xuaW1wb3J0IHNldFN0b3JhZ2UgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3NldFN0b3JhZ2VcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcyB9IGZyb20gXCIuL3JlbmRlclRhc2tJdGVtc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpIHtcbiAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBzZXRTdG9yYWdlKHByb2plY3RzKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcbiAgaXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcblxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJQcm9qZWN0SXRlbShwcm9qZWN0KTtcbiAgICBpdGVtLmRhdGFzZXQuaWQgPSBpbmRleDtcblxuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgfVxuXG4gICAgaXRlbXMuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH0pO1xuXG4gIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xuICBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RJdGVtKHByb2plY3QpIHtcbiAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcIml0ZW1cIiwgXCJwcm9qZWN0XCIpO1xuXG4gIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZShwcm9qZWN0KTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XG5cbiAgY29uc3QgZWRpdEJ0biA9IHJlbmRlckVkaXRCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbigpIHtcbiAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUljb24uY2xhc3NMaXN0LmFkZChcIml0ZW0taWNvblwiKTtcbiAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC1jaGVja1wiPjwvaT5gO1xuXG4gIHJldHVybiBpdGVtSWNvbjtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbU5hbWUocHJvamVjdCkge1xuICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtTmFtZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gaXRlbU5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuXG4gIHJldHVybiBlZGl0QnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4oKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRlbGV0ZUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVNlbGVjdGVkUHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuaXRlbS1uYW1lXCIpO1xuXG4gIGl0ZW1OYW1lcy5mb3JFYWNoKChpdGVtTmFtZSwgaW5kZXgpID0+IHtcbiAgICBpdGVtTmFtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgIH0pO1xuICAgICAgaXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZGl0UHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG4gIGNvbnN0IGVkaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5lZGl0LWJ0blwiKTtcblxuICBlZGl0QnRucy5mb3JFYWNoKChlZGl0QnRuLCBpbmRleCkgPT4ge1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0c1tpbmRleF07XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgaXRlbS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KHByb2plY3QpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICBjb25zdCBjb25maXJtQnRuID0gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgaW5kZXgpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgY29uc3QgY2FuY2VsQnRuID0gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlck5hbWVJbnB1dChwcm9qZWN0KSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIG5hbWVJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHByb2plY3QubmFtZTtcblxuICByZXR1cm4gbmFtZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCBpbmRleCkge1xuICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm0tYnRuXCIpO1xuICBjb25maXJtQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPmA7XG4gIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpdGVtTmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLml0ZW0tbmFtZVwiKTtcbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IGl0ZW1OYW1lc1tpbmRleF0udmFsdWUudHJpbSgpO1xuICAgIHByb2plY3RzW2luZGV4XS5uYW1lID0gbmV3SXRlbU5hbWU7XG4gICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpcm1CdG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cykge1xuICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJjaGVjay1idG5cIik7XG4gIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5gO1xuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY2FuY2VsQnRuO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCBkZWxldGVCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5kZWxldGUtYnRuXCIpO1xuXG4gIGRlbGV0ZUJ0bnMuZm9yRWFjaCgoZGVsZXRlQnRuLCBpbmRleCkgPT4ge1xuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgcHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHN0b3JhZ2VBdmFpbGFibGUgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3N0b3JhZ2VBdmFpbGFibGVcIjtcbmltcG9ydCBzZXRTdG9yYWdlIGZyb20gXCIuLi8uLi9kYXRhL2Fzc2V0cy9zZXRTdG9yYWdlXCI7XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cykge1xuICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIHNldFN0b3JhZ2UocHJvamVjdHMpO1xuICB9XG5cbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xuICBpdGVtcy5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJUYXNrSXRlbSh0YXNrKTtcbiAgICBpdGVtLmRhdGFzZXQuaWQgPSBpbmRleDtcbiAgICBpdGVtcy5hcHBlbmRDaGlsZChpdGVtKTtcbiAgfSk7XG5cbiAgY2hhbmdlSXRlbUljb25PbkNsaWNrKHByb2plY3RzKTtcbiAgZGVsZXRlVGFza09uQ2xpY2socHJvamVjdHMpO1xuICBlZGl0VGFza09uQ2xpY2socHJvamVjdHMpO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrcyhwcm9qZWN0cykge1xuICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3Quc2VsZWN0ZWRcIik7XG4gIGNvbnN0IHNlbGVjdGVkUHJvamVjdElkID0gc2VsZWN0ZWRQcm9qZWN0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG5cbiAgcmV0dXJuIHByb2plY3RzW3NlbGVjdGVkUHJvamVjdElkXS50YXNrcztcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza0l0ZW0odGFzaykge1xuICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlbVwiLCBcInRhc2tcIik7XG5cbiAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVkXCIpO1xuICB9XG5cbiAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbih0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgY29uc3QgaXRlbU5hbWUgPSByZW5kZXJJdGVtTmFtZSh0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XG5cbiAgY29uc3QgaXRlbUR1ZURhdGUgPSByZW5kZXJJdGVtRHVlRGF0ZSh0YXNrKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChpdGVtRHVlRGF0ZSk7XG5cbiAgY29uc3QgaXRlbVByaW9yaXR5ID0gcmVuZGVySXRlbVByaW9yaXR5KHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1Qcmlvcml0eSk7XG5cbiAgY29uc3QgZWRpdEJ0biA9IHJlbmRlckVkaXRCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChlZGl0QnRuKTtcblxuICBjb25zdCBkZWxldGVCdG4gPSByZW5kZXJEZWxldGVCdG4oKTtcbiAgaXRlbS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gIHJldHVybiBpdGVtO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtSWNvbih0YXNrKSB7XG4gIGNvbnN0IGl0ZW1JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1JY29uLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWljb25cIik7XG5cbiAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgaXRlbUljb24uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtcmVndWxhciBmYS1jaXJjbGUtY2hlY2tcIj48L2k+YDtcbiAgfSBlbHNlIHtcbiAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiPjwvaT5gO1xuICB9XG5cbiAgcmV0dXJuIGl0ZW1JY29uO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtTmFtZSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1OYW1lLmNsYXNzTGlzdC5hZGQoXCJpdGVtLW5hbWVcIik7XG4gIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuXG4gIHJldHVybiBpdGVtTmFtZTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUR1ZURhdGUodGFzaykge1xuICBjb25zdCBpdGVtRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwiaXRlbS1kdWUtZGF0ZVwiKTtcbiAgaXRlbUR1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG5cbiAgcmV0dXJuIGl0ZW1EdWVEYXRlO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtUHJpb3JpdHkodGFzaykge1xuICBjb25zdCBpdGVtUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbVByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJpdGVtLXByaW9yaXR5XCIsIGAke3Rhc2sucHJpb3JpdHkudG9Mb3dlckNhc2UoKX1gKTtcbiAgaXRlbVByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcblxuICByZXR1cm4gaXRlbVByaW9yaXR5O1xufVxuXG5mdW5jdGlvbiByZW5kZXJFZGl0QnRuKCkge1xuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtYnRuXCIpO1xuICBlZGl0QnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIj48L2k+YDtcblxuICByZXR1cm4gZWRpdEJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRGVsZXRlQnRuKCkge1xuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnRuXCIpO1xuICBkZWxldGVCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L2k+YDtcblxuICByZXR1cm4gZGVsZXRlQnRuO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VJdGVtSWNvbk9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gIGNvbnN0IGl0ZW1JY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1pY29uXCIpO1xuXG4gIGl0ZW1JY29ucy5mb3JFYWNoKChpdGVtSWNvbiwgaW5kZXgpID0+IHtcbiAgICBpdGVtSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFzayA9IHRhc2tzW2luZGV4XTtcbiAgICAgIHRhc2suY29tcGxldGVkID0gdGFzay5jb21wbGV0ZWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFza09uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gIGNvbnN0IGRlbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLmRlbGV0ZS1idG5cIik7XG5cbiAgZGVsZXRlQnRucy5mb3JFYWNoKChkZWxldGVCdG4sIGluZGV4KSA9PiB7XG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgcmVuZGVyVGFza0l0ZW1zKHByb2plY3RzKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRUYXNrT25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2tcIik7XG4gIGNvbnN0IGVkaXRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5lZGl0LWJ0blwiKTtcblxuICBlZGl0QnRucy5mb3JFYWNoKChlZGl0QnRuLCBpbmRleCkgPT4ge1xuICAgIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1tpbmRleF07XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaW5kZXhdO1xuICAgICAgaXRlbS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHRhc2spO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IHJlbmRlck5hbWVJbnB1dCh0YXNrKTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblxuICAgICAgY29uc3QgZHVlRGF0ZUlucHV0ID0gcmVuZGVyRHVlRGF0ZUlucHV0KHRhc2spO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQpO1xuXG4gICAgICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IHJlbmRlclByaW9yaXR5U2VsZWN0KHRhc2spO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdCk7XG5cbiAgICAgIGNvbnN0IGNvbmZpcm1CdG4gPSByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCB0YXNrLCBpbmRleCk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNvbmZpcm1CdG4pO1xuXG4gICAgICBjb25zdCBjYW5jZWxCdG4gPSByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTmFtZUlucHV0KHRhc2spIHtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgbmFtZUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgbmFtZUlucHV0LnZhbHVlID0gdGFzay5uYW1lO1xuXG4gIHJldHVybiBuYW1lSW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckR1ZURhdGVJbnB1dCh0YXNrKSB7XG4gIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgZHVlRGF0ZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLWR1ZS1kYXRlXCIpO1xuICBkdWVEYXRlSW5wdXQudHlwZSA9IFwiZGF0ZVwiO1xuICBkdWVEYXRlSW5wdXQudmFsdWUgPSB0YXNrLmR1ZURhdGU7XG5cbiAgcmV0dXJuIGR1ZURhdGVJbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyUHJpb3JpdHlTZWxlY3QodGFzaykge1xuICBjb25zdCBwcmlvcml0eVNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gIHByaW9yaXR5U2VsZWN0LmNsYXNzTGlzdC5hZGQoXCJpdGVtLXByaW9yaXR5XCIpO1xuICBjb25zdCBvcHRpb25zID0gW1wiTG93XCIsIFwiTWVkaXVtXCIsIFwiSGlnaFwiXTtcbiAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICBjb25zdCBwcmlvcml0eVNlbGVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgcHJpb3JpdHlTZWxlY3RPcHRpb24udmFsdWUgPSBvcHRpb24udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAob3B0aW9uID09PSB0YXNrLnByaW9yaXR5KSB7XG4gICAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBcIlwiKTtcbiAgICB9XG4gICAgcHJpb3JpdHlTZWxlY3RPcHRpb24udGV4dENvbnRlbnQgPSBvcHRpb247XG4gICAgcHJpb3JpdHlTZWxlY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHlTZWxlY3RPcHRpb24pO1xuICB9KTtcbiAgcmV0dXJuIHByaW9yaXR5U2VsZWN0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb25maXJtQnRuKHByb2plY3RzLCB0YXNrLCBpbmRleCkge1xuICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcImNvbmZpcm0tYnRuXCIpO1xuICBjb25maXJtQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNoZWNrXCI+PC9pPmA7XG4gIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBpdGVtTmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLml0ZW0tbmFtZVwiKTtcbiAgICBjb25zdCBpdGVtRHVlRGF0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLml0ZW0tZHVlLWRhdGVcIik7XG4gICAgY29uc3QgaXRlbVByaW9yaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLml0ZW0tcHJpb3JpdHlcIik7XG5cbiAgICBjb25zdCBuZXdJdGVtTmFtZSA9IGl0ZW1OYW1lc1tpbmRleF0udmFsdWUudHJpbSgpO1xuICAgIGNvbnN0IG5ld0l0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVzW2luZGV4XS52YWx1ZTtcbiAgICBjb25zdCBuZXdJdGVtUHJpb3JpdHkgPSBpdGVtUHJpb3JpdGllc1tpbmRleF0udmFsdWU7XG5cbiAgICB0YXNrLm5hbWUgPSBuZXdJdGVtTmFtZTtcbiAgICB0YXNrLmR1ZURhdGUgPSBuZXdJdGVtRHVlRGF0ZTtcbiAgICB0YXNrLnByaW9yaXR5ID0gbmV3SXRlbVByaW9yaXR5WzBdLnRvVXBwZXJDYXNlKCkgKyBuZXdJdGVtUHJpb3JpdHkuc2xpY2UoMSk7XG5cbiAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlybUJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2FuY2VsQnRuKHByb2plY3RzKSB7XG4gIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcImNhbmNlbC1idG5cIik7XG4gIGNhbmNlbEJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS14bWFya1wiPjwvaT5gO1xuICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICB9KTtcblxuICByZXR1cm4gY2FuY2VsQnRuO1xufVxuXG5leHBvcnQgeyByZW5kZXJUYXNrSXRlbXMsIGdldFRhc2tzIH07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b2dnbGVBc2lkZU9uQ2xpY2soKSB7XG4gIGNvbnN0IGJ0bkFzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tYXNpZGVcIik7XG4gIGJ0bkFzaWRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXNpZGVcIik7XG4gICAgYXNpZGUuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b2dnbGVGb3JtT25DbGljaygpIHtcbiAgY29uc3QgaW5wdXRzID0gW1wicHJvamVjdFwiLCBcInRhc2tcIl07XG4gIGlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGNvbnN0IGJ0bkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNidG4tYWRkLSR7aW5wdXR9YCk7XG4gICAgYnRuQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tJHtpbnB1dH1gKTtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi4vLi4vb2JqL1Byb2plY3RcIjtcbmltcG9ydCBUYXNrIGZyb20gXCIuLi8uLi9vYmovVGFza1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZhdWx0RGF0YSgpIHtcbiAgY29uc3QgZGF0YSA9IFtdO1xuXG4gIGNvbnN0IHByb2plY3QxID0gbmV3IFByb2plY3QoXCJQcm9qZWN0IDFcIik7XG4gIHByb2plY3QxLnRhc2tzLnB1c2gobmV3IFRhc2soXCJUYXNrIDFcIiwgXCIyMDI0LTAzLTA2XCIsIFwiTG93XCIpKTtcbiAgcHJvamVjdDEudGFza3MucHVzaChuZXcgVGFzayhcIlRhc2sgMlwiLCBcIjIwMjQtMDMtMTRcIiwgXCJNZWRpdW1cIikpO1xuICBkYXRhLnB1c2gocHJvamVjdDEpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3RvcmFnZSgpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpKTtcbn1cbiIsImltcG9ydCBnZXRTdG9yYWdlIGZyb20gXCIuL2dldFN0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U3RvcmFnZShkYXRhKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIGdldFN0b3JhZ2UoKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICB0cnkge1xuICAgIGxldCBzdG9yYWdlID0gd2luZG93W3R5cGVdLFxuICAgICAgeCA9IFwiX19zdG9yYWdlX3Rlc3RfX1wiO1xuICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJlxuICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgKGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIlF1b3RhRXhjZWVkZWRFcnJvclwiIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5uYW1lID09PSBcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCIpICYmXG4gICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgc3RvcmFnZS5sZW5ndGggIT09IDBcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgc3RvcmFnZUF2YWlsYWJsZSBmcm9tIFwiLi9hc3NldHMvc3RvcmFnZUF2YWlsYWJsZVwiO1xuaW1wb3J0IGdldFN0b3JhZ2UgZnJvbSBcIi4vYXNzZXRzL2dldFN0b3JhZ2VcIjtcbmltcG9ydCBzZXRTdG9yYWdlIGZyb20gXCIuL2Fzc2V0cy9zZXRTdG9yYWdlXCI7XG5pbXBvcnQgZGVmYXVsdERhdGEgZnJvbSBcIi4vYXNzZXRzL2RlZmF1bHREYXRhXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGEoKSB7XG4gIGxldCBkYXRhO1xuICBpZiAoc3RvcmFnZUF2YWlsYWJsZShcImxvY2FsU3RvcmFnZVwiKSkge1xuICAgIGlmIChcbiAgICAgICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIikgfHxcbiAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZGF0YVwiKSA9PT0gXCJ1bmRlZmluZWRcIlxuICAgICkge1xuICAgICAgZGF0YSA9IHNldFN0b3JhZ2UoZGVmYXVsdERhdGEoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBnZXRTdG9yYWdlKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRhdGEgPSBkZWZhdWx0RGF0YSgpO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc2lkZSgpIHtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG5cbiAgY29uc3QgZmlsdGVyU2VjdGlvbiA9IHNlY3Rpb24oXCJmaWx0ZXJzXCIpO1xuICBhc2lkZS5hcHBlbmRDaGlsZChmaWx0ZXJTZWN0aW9uKTtcblxuICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IHNlY3Rpb24oXCJwcm9qZWN0c1wiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdFNlY3Rpb24pO1xuXG4gIHJldHVybiBhc2lkZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLmlubmVySFRNTCA9IGBcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZpbmVzay9vZGluLXRvZG8tbGlzdFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgPGkgY2xhc3M9XCJmYS1icmFuZHMgZmEtZ2l0aHViXCI+PC9pPiB2aW5lc2tcbiAgICA8L2E+YDtcblxuICByZXR1cm4gZm9vdGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuXG4gIGhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMT5Ub2RvIExpc3Q8L2gxPlxuICAgICAgICA8c3BhbiBpZD1cImJ0bi1hc2lkZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYmFyc1wiPjwvaT5cbiAgICAgICAgPC9zcGFuPmA7XG5cbiAgcmV0dXJuIGhlYWRlcjtcbn1cbiIsImltcG9ydCBzZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuXG4gIGNvbnN0IHRhc2tTZWN0aW9uID0gc2VjdGlvbihcInRhc2tzXCIpO1xuICBtYWluLmFwcGVuZENoaWxkKHRhc2tTZWN0aW9uKTtcblxuICByZXR1cm4gbWFpbjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlY3Rpb24oc2VjdGlvbk5hbWUpIHtcbiAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcblxuICBzd2l0Y2ggKHNlY3Rpb25OYW1lKSB7XG4gICAgY2FzZSBcImZpbHRlcnNcIjpcbiAgICAgIHNlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPkZpbHRlcnM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cImZpbHRlcnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci1hbGxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtaW5ib3hcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPkFsbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci10b2RheVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWljb25cIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci1kYXlcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPlRvZGF5PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtIGZpbHRlclwiIGlkPVwiZmlsdGVyLXdlZWtcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5UaGlzIHdlZWs8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJwcm9qZWN0c1wiOlxuICAgICAgc2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+UHJvamVjdHM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cInByb2plY3RzXCI+PC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWRkXCIgaWQ9XCJidG4tYWRkLXByb2plY3RcIj5BZGQgYSBwcm9qZWN0PC9idXR0b24+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybSBoaWRkZW5cIiBpZD1cImZvcm0tcHJvamVjdFwiIGFjdGlvbj1cIiNcIiBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInByb2plY3QtbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInByb2plY3QtbmFtZVwiIHJlcXVpcmVkPVwiXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcInRhc2tzXCI6XG4gICAgICBzZWN0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5UYXNrczwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtc1wiIGlkPVwidGFza3NcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hZGRcIiBpZD1cImJ0bi1hZGQtdGFza1wiPkFkZCBhIHRhc2s8L2J1dHRvbj5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtIGhpZGRlblwiIGlkPVwiZm9ybS10YXNrXCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgcmVxdWlyZWQ9XCJcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLWR1ZS1kYXRlXCI+RHVlIGRhdGU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cInRhc2stZHVlLWRhdGVcIiByZXF1aXJlZD1cIlwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stcHJpb3JpdHlcIj5Qcmlvcml0eTo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ0YXNrLXByaW9yaXR5XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb247XG59XG4iLCJpbXBvcnQgaGVhZGVyIGZyb20gXCIuL2Fzc2V0cy9oZWFkZXJcIjtcbmltcG9ydCBhc2lkZSBmcm9tIFwiLi9hc3NldHMvYXNpZGVcIjtcbmltcG9ydCBtYWluIGZyb20gXCIuL2Fzc2V0cy9tYWluXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCIuL2Fzc2V0cy9mb290ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGF5b3V0KCkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXNpZGUoKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsYXlvdXQgZnJvbSBcIi4vbGF5b3V0L2xheW91dFwiO1xuaW1wb3J0IGRhdGEgZnJvbSBcIi4vZGF0YS9kYXRhXCI7XG5pbXBvcnQgYXBwIGZyb20gXCIuL2FwcC9hcHBcIjtcblxuKCgpID0+IHtcbiAgbGF5b3V0KCk7XG4gIGFwcChkYXRhKCkpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==