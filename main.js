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

  // const filterSection = section("filters");
  // aside.appendChild(filterSection);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVxQztBQUNGO0FBQ0Y7QUFDSTs7QUFFdEI7QUFDZjs7QUFFQSx3QkFBd0IsMERBQU07QUFDOUIsd0JBQXdCLHlEQUFLO0FBQzdCLHdCQUF3Qix3REFBSTtBQUM1Qix3QkFBd0IsMERBQU07QUFDOUI7Ozs7Ozs7Ozs7Ozs7OztBQ1plO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ1BBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNOO0FBQ0g7O0FBRTVCO0FBQ0EsRUFBRSwwREFBTTtBQUNSLEVBQUUsb0RBQUcsQ0FBQyxzREFBSTtBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9hcHAvYXBwLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hc3NldHMvYWRkSXRlbU9uU3VibWl0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hc3NldHMvcmVuZGVyUHJvamVjdEl0ZW1zLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hc3NldHMvcmVuZGVyVGFza0l0ZW1zLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hc3NldHMvdG9nZ2xlQXNpZGVPbkNsaWNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2FwcC9hc3NldHMvdG9nZ2xlRm9ybU9uQ2xpY2suanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9hc3NldHMvZGVmYXVsdERhdGEuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9hc3NldHMvZ2V0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9kYXRhL2Fzc2V0cy9zZXRTdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2RhdGEvYXNzZXRzL3N0b3JhZ2VBdmFpbGFibGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvZGF0YS9kYXRhLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9hc3NldHMvYXNpZGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9mb290ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvbGF5b3V0L2Fzc2V0cy9tYWluLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2xheW91dC9hc3NldHMvc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC8uL3NyYy9sYXlvdXQvbGF5b3V0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL29iai9Qcm9qZWN0LmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL29iai9UYXNrLmpzIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZEl0ZW1PblN1Ym1pdCBmcm9tIFwiLi9hc3NldHMvYWRkSXRlbU9uU3VibWl0XCI7XG5pbXBvcnQgcmVuZGVyUHJvamVjdEl0ZW1zIGZyb20gXCIuL2Fzc2V0cy9yZW5kZXJQcm9qZWN0SXRlbXNcIjtcbmltcG9ydCB7IHJlbmRlclRhc2tJdGVtcyB9IGZyb20gXCIuL2Fzc2V0cy9yZW5kZXJUYXNrSXRlbXNcIjtcbmltcG9ydCB0b2dnbGVBc2lkZU9uQ2xpY2sgZnJvbSBcIi4vYXNzZXRzL3RvZ2dsZUFzaWRlT25DbGlja1wiO1xuaW1wb3J0IHRvZ2dsZUZvcm1PbkNsaWNrIGZyb20gXCIuL2Fzc2V0cy90b2dnbGVGb3JtT25DbGlja1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHAoZGF0YSkge1xuICB0b2dnbGVGb3JtT25DbGljaygpO1xuICB0b2dnbGVBc2lkZU9uQ2xpY2soKTtcblxuICByZW5kZXJQcm9qZWN0SXRlbXMoZGF0YSk7XG4gIHJlbmRlclRhc2tJdGVtcyhkYXRhKTtcbiAgYWRkSXRlbU9uU3VibWl0KGRhdGEpO1xufVxuIiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uLy4uL29iai9Qcm9qZWN0XCI7XG5pbXBvcnQgVGFzayBmcm9tIFwiLi4vLi4vb2JqL1Rhc2tcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0SXRlbXMgZnJvbSBcIi4vcmVuZGVyUHJvamVjdEl0ZW1zXCI7XG5pbXBvcnQgeyByZW5kZXJUYXNrSXRlbXMsIGdldFRhc2tzIH0gZnJvbSBcIi4vcmVuZGVyVGFza0l0ZW1zXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZEl0ZW1PblN1Ym1pdChwcm9qZWN0cykge1xuICBjb25zdCBpbnB1dHMgPSBbXCJwcm9qZWN0XCIsIFwidGFza1wiXTtcblxuICBpbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm0tJHtpbnB1dH1gKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aW5wdXR9LW5hbWVgKTtcbiAgICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWUudHJpbSgpO1xuXG4gICAgICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgICAgIGNhc2UgXCJwcm9qZWN0XCI6XG4gICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgICAgbmFtZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInRhc2tcIjpcbiAgICAgICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tZHVlLWRhdGVgKTtcbiAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZHVlRGF0ZUlucHV0LnZhbHVlO1xuXG4gICAgICAgICAgY29uc3QgcHJpb3JpdHlTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dH0tcHJpb3JpdHlgKTtcbiAgICAgICAgICBjb25zdCBwcmlvcml0eSA9XG4gICAgICAgICAgICBwcmlvcml0eVNlbGVjdC52YWx1ZVswXS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgIHByaW9yaXR5U2VsZWN0LnZhbHVlLnNsaWNlKDEpO1xuXG4gICAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgIG5hbWVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgZHVlRGF0ZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBwcmlvcml0eVNlbGVjdC52YWx1ZSA9IFwibG93XCI7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHN0b3JhZ2VBdmFpbGFibGUgZnJvbSBcIi4uLy4uL2RhdGEvYXNzZXRzL3N0b3JhZ2VBdmFpbGFibGVcIjtcbmltcG9ydCBzZXRTdG9yYWdlIGZyb20gXCIuLi8uLi9kYXRhL2Fzc2V0cy9zZXRTdG9yYWdlXCI7XG5pbXBvcnQgeyByZW5kZXJUYXNrSXRlbXMgfSBmcm9tIFwiLi9yZW5kZXJUYXNrSXRlbXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKSB7XG4gIGlmIChzdG9yYWdlQXZhaWxhYmxlKFwibG9jYWxTdG9yYWdlXCIpKSB7XG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgc2V0U3RvcmFnZShwcm9qZWN0cyk7XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG4gIGl0ZW1zLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBpdGVtID0gcmVuZGVyUHJvamVjdEl0ZW0ocHJvamVjdCk7XG4gICAgaXRlbS5kYXRhc2V0LmlkID0gaW5kZXg7XG5cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xuICAgIH1cblxuICAgIGl0ZW1zLmFwcGVuZENoaWxkKGl0ZW0pO1xuICB9KTtcblxuICBjaGFuZ2VTZWxlY3RlZFByb2plY3RPbkNsaWNrKHByb2plY3RzKTtcbiAgZWRpdFByb2plY3RPbkNsaWNrKHByb2plY3RzKTtcbiAgZGVsZXRlUHJvamVjdE9uQ2xpY2socHJvamVjdHMpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0SXRlbShwcm9qZWN0KSB7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIsIFwicHJvamVjdFwiKTtcblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xuXG4gIGNvbnN0IGl0ZW1OYW1lID0gcmVuZGVySXRlbU5hbWUocHJvamVjdCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuXG4gIGNvbnN0IGVkaXRCdG4gPSByZW5kZXJFZGl0QnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XG5cbiAgY29uc3QgZGVsZXRlQnRuID0gcmVuZGVyRGVsZXRlQnRuKCk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICByZXR1cm4gaXRlbTtcbn1cblxuZnVuY3Rpb24gcmVuZGVySXRlbUljb24oKSB7XG4gIGNvbnN0IGl0ZW1JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1JY29uLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWljb25cIik7XG4gIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3QtY2hlY2tcIj48L2k+YDtcblxuICByZXR1cm4gaXRlbUljb247XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1OYW1lKHByb2plY3QpIHtcbiAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbU5hbWUuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG5cbiAgcmV0dXJuIGl0ZW1OYW1lO1xufVxuXG5mdW5jdGlvbiByZW5kZXJFZGl0QnRuKCkge1xuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtYnRuXCIpO1xuICBlZGl0QnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIj48L2k+YDtcblxuICByZXR1cm4gZWRpdEJ0bjtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRGVsZXRlQnRuKCkge1xuICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtYnRuXCIpO1xuICBkZWxldGVCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2hcIj48L2k+YDtcblxuICByZXR1cm4gZGVsZXRlQnRuO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VTZWxlY3RlZFByb2plY3RPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuICBjb25zdCBpdGVtTmFtZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QgLml0ZW0tbmFtZVwiKTtcblxuICBpdGVtTmFtZXMuZm9yRWFjaCgoaXRlbU5hbWUsIGluZGV4KSA9PiB7XG4gICAgaXRlbU5hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICB9KTtcbiAgICAgIGl0ZW1zW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWRpdFByb2plY3RPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0XCIpO1xuICBjb25zdCBlZGl0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuZWRpdC1idG5cIik7XG5cbiAgZWRpdEJ0bnMuZm9yRWFjaCgoZWRpdEJ0biwgaW5kZXgpID0+IHtcbiAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHNbaW5kZXhdO1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgY29uc3QgaXRlbUljb24gPSByZW5kZXJJdGVtSWNvbigpO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChpdGVtSWNvbik7XG5cbiAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IHJlbmRlck5hbWVJbnB1dChwcm9qZWN0KTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcblxuICAgICAgY29uc3QgY29uZmlybUJ0biA9IHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIGluZGV4KTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cyk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJOYW1lSW5wdXQocHJvamVjdCkge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICBuYW1lSW5wdXQudmFsdWUgPSBwcm9qZWN0Lm5hbWU7XG5cbiAgcmV0dXJuIG5hbWVJbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29uZmlybUJ0bihwcm9qZWN0cywgaW5kZXgpIHtcbiAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBjb25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJjb25maXJtLWJ0blwiKTtcbiAgY29uZmlybUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jaGVja1wiPjwvaT5gO1xuICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgaXRlbU5hbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0IC5pdGVtLW5hbWVcIik7XG4gICAgY29uc3QgbmV3SXRlbU5hbWUgPSBpdGVtTmFtZXNbaW5kZXhdLnZhbHVlLnRyaW0oKTtcbiAgICBwcm9qZWN0c1tpbmRleF0ubmFtZSA9IG5ld0l0ZW1OYW1lO1xuICAgIHJlbmRlclByb2plY3RJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maXJtQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpIHtcbiAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2hlY2stYnRuXCIpO1xuICBjYW5jZWxCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEteG1hcmtcIj48L2k+YDtcbiAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyUHJvamVjdEl0ZW1zKHByb2plY3RzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNhbmNlbEJ0bjtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdE9uQ2xpY2socHJvamVjdHMpIHtcbiAgY29uc3QgZGVsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdCAuZGVsZXRlLWJ0blwiKTtcblxuICBkZWxldGVCdG5zLmZvckVhY2goKGRlbGV0ZUJ0biwgaW5kZXgpID0+IHtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHByb2plY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZW5kZXJQcm9qZWN0SXRlbXMocHJvamVjdHMpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBzdG9yYWdlQXZhaWxhYmxlIGZyb20gXCIuLi8uLi9kYXRhL2Fzc2V0cy9zdG9yYWdlQXZhaWxhYmxlXCI7XG5pbXBvcnQgc2V0U3RvcmFnZSBmcm9tIFwiLi4vLi4vZGF0YS9hc3NldHMvc2V0U3RvcmFnZVwiO1xuXG5mdW5jdGlvbiByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpIHtcbiAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBzZXRTdG9yYWdlKHByb2plY3RzKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcbiAgaXRlbXMuaW5uZXJIVE1MID0gXCJcIjtcblxuICBpZiAocHJvamVjdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgY29uc3QgdGFza3MgPSBnZXRUYXNrcyhwcm9qZWN0cyk7XG4gICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSByZW5kZXJUYXNrSXRlbSh0YXNrKTtcbiAgICAgIGl0ZW0uZGF0YXNldC5pZCA9IGluZGV4O1xuICAgICAgaXRlbXMuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBjaGFuZ2VJdGVtSWNvbk9uQ2xpY2socHJvamVjdHMpO1xuICAgIGRlbGV0ZVRhc2tPbkNsaWNrKHByb2plY3RzKTtcbiAgICBlZGl0VGFza09uQ2xpY2socHJvamVjdHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tzKHByb2plY3RzKSB7XG4gIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC5zZWxlY3RlZFwiKTtcbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0SWQgPSBzZWxlY3RlZFByb2plY3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcblxuICByZXR1cm4gcHJvamVjdHNbc2VsZWN0ZWRQcm9qZWN0SWRdLnRhc2tzO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrSXRlbSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJpdGVtXCIsIFwidGFza1wiKTtcblxuICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XG4gIH1cblxuICBjb25zdCBpdGVtSWNvbiA9IHJlbmRlckl0ZW1JY29uKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICBjb25zdCBpdGVtTmFtZSA9IHJlbmRlckl0ZW1OYW1lKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcblxuICBjb25zdCBpdGVtRHVlRGF0ZSA9IHJlbmRlckl0ZW1EdWVEYXRlKHRhc2spO1xuICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1EdWVEYXRlKTtcblxuICBjb25zdCBpdGVtUHJpb3JpdHkgPSByZW5kZXJJdGVtUHJpb3JpdHkodGFzayk7XG4gIGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbVByaW9yaXR5KTtcblxuICBjb25zdCBlZGl0QnRuID0gcmVuZGVyRWRpdEJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGVkaXRCdG4pO1xuXG4gIGNvbnN0IGRlbGV0ZUJ0biA9IHJlbmRlckRlbGV0ZUJ0bigpO1xuICBpdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1JY29uKHRhc2spIHtcbiAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbUljb24uY2xhc3NMaXN0LmFkZChcIml0ZW0taWNvblwiKTtcblxuICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICBpdGVtSWNvbi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1yZWd1bGFyIGZhLWNpcmNsZS1jaGVja1wiPjwvaT5gO1xuICB9IGVsc2Uge1xuICAgIGl0ZW1JY29uLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI+PC9pPmA7XG4gIH1cblxuICByZXR1cm4gaXRlbUljb247XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1OYW1lKHRhc2spIHtcbiAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaXRlbU5hbWUuY2xhc3NMaXN0LmFkZChcIml0ZW0tbmFtZVwiKTtcbiAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG5cbiAgcmV0dXJuIGl0ZW1OYW1lO1xufVxuXG5mdW5jdGlvbiByZW5kZXJJdGVtRHVlRGF0ZSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1EdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGl0ZW1EdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJpdGVtLWR1ZS1kYXRlXCIpO1xuICBpdGVtRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcblxuICByZXR1cm4gaXRlbUR1ZURhdGU7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckl0ZW1Qcmlvcml0eSh0YXNrKSB7XG4gIGNvbnN0IGl0ZW1Qcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBpdGVtUHJpb3JpdHkuY2xhc3NMaXN0LmFkZChcIml0ZW0tcHJpb3JpdHlcIiwgYCR7dGFzay5wcmlvcml0eS50b0xvd2VyQ2FzZSgpfWApO1xuICBpdGVtUHJpb3JpdHkudGV4dENvbnRlbnQgPSB0YXNrLnByaW9yaXR5O1xuXG4gIHJldHVybiBpdGVtUHJpb3JpdHk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckVkaXRCdG4oKSB7XG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgZWRpdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1idG5cIik7XG4gIGVkaXRCdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiPjwvaT5gO1xuXG4gIHJldHVybiBlZGl0QnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJEZWxldGVCdG4oKSB7XG4gIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1idG5cIik7XG4gIGRlbGV0ZUJ0bi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS10cmFzaFwiPjwvaT5gO1xuXG4gIHJldHVybiBkZWxldGVCdG47XG59XG5cbmZ1bmN0aW9uIGNoYW5nZUl0ZW1JY29uT25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgY29uc3QgaXRlbUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrIC5pdGVtLWljb25cIik7XG5cbiAgaXRlbUljb25zLmZvckVhY2goKGl0ZW1JY29uLCBpbmRleCkgPT4ge1xuICAgIGl0ZW1JY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gdGFza3NbaW5kZXhdO1xuICAgICAgdGFzay5jb21wbGV0ZWQgPSB0YXNrLmNvbXBsZXRlZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrT25DbGljayhwcm9qZWN0cykge1xuICBjb25zdCB0YXNrcyA9IGdldFRhc2tzKHByb2plY3RzKTtcbiAgY29uc3QgZGVsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuZGVsZXRlLWJ0blwiKTtcblxuICBkZWxldGVCdG5zLmZvckVhY2goKGRlbGV0ZUJ0biwgaW5kZXgpID0+IHtcbiAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICByZW5kZXJUYXNrSXRlbXMocHJvamVjdHMpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZWRpdFRhc2tPbkNsaWNrKHByb2plY3RzKSB7XG4gIGNvbnN0IHRhc2tzID0gZ2V0VGFza3MocHJvamVjdHMpO1xuICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFza1wiKTtcbiAgY29uc3QgZWRpdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2sgLmVkaXQtYnRuXCIpO1xuXG4gIGVkaXRCdG5zLmZvckVhY2goKGVkaXRCdG4sIGluZGV4KSA9PiB7XG4gICAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdGFzayA9IHRhc2tzW2luZGV4XTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICBpdGVtLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIGNvbnN0IGl0ZW1JY29uID0gcmVuZGVySXRlbUljb24odGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcblxuICAgICAgY29uc3QgbmFtZUlucHV0ID0gcmVuZGVyTmFtZUlucHV0KHRhc2spO1xuICAgICAgaXRlbS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuXG4gICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSByZW5kZXJEdWVEYXRlSW5wdXQodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGR1ZURhdGVJbnB1dCk7XG5cbiAgICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gcmVuZGVyUHJpb3JpdHlTZWxlY3QodGFzayk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKHByaW9yaXR5U2VsZWN0KTtcblxuICAgICAgY29uc3QgY29uZmlybUJ0biA9IHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHRhc2ssIGluZGV4KTtcbiAgICAgIGl0ZW0uYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IHJlbmRlckNhbmNlbEJ0bihwcm9qZWN0cyk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJOYW1lSW5wdXQodGFzaykge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKFwiaXRlbS1uYW1lXCIpO1xuICBuYW1lSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICBuYW1lSW5wdXQudmFsdWUgPSB0YXNrLm5hbWU7XG5cbiAgcmV0dXJuIG5hbWVJbnB1dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyRHVlRGF0ZUlucHV0KHRhc2spIHtcbiAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBkdWVEYXRlSW5wdXQuY2xhc3NMaXN0LmFkZChcIml0ZW0tZHVlLWRhdGVcIik7XG4gIGR1ZURhdGVJbnB1dC50eXBlID0gXCJkYXRlXCI7XG4gIGR1ZURhdGVJbnB1dC52YWx1ZSA9IHRhc2suZHVlRGF0ZTtcblxuICByZXR1cm4gZHVlRGF0ZUlucHV0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcmlvcml0eVNlbGVjdCh0YXNrKSB7XG4gIGNvbnN0IHByaW9yaXR5U2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgcHJpb3JpdHlTZWxlY3QuY2xhc3NMaXN0LmFkZChcIml0ZW0tcHJpb3JpdHlcIik7XG4gIGNvbnN0IG9wdGlvbnMgPSBbXCJMb3dcIiwgXCJNZWRpdW1cIiwgXCJIaWdoXCJdO1xuICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgIGNvbnN0IHByaW9yaXR5U2VsZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi52YWx1ZSA9IG9wdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChvcHRpb24gPT09IHRhc2sucHJpb3JpdHkpIHtcbiAgICAgIHByaW9yaXR5U2VsZWN0T3B0aW9uLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIFwiXCIpO1xuICAgIH1cbiAgICBwcmlvcml0eVNlbGVjdE9wdGlvbi50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICBwcmlvcml0eVNlbGVjdC5hcHBlbmRDaGlsZChwcmlvcml0eVNlbGVjdE9wdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcHJpb3JpdHlTZWxlY3Q7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbmZpcm1CdG4ocHJvamVjdHMsIHRhc2ssIGluZGV4KSB7XG4gIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwiY29uZmlybS1idG5cIik7XG4gIGNvbmZpcm1CdG4uaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2hlY2tcIj48L2k+YDtcbiAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1OYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1uYW1lXCIpO1xuICAgIGNvbnN0IGl0ZW1EdWVEYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1kdWUtZGF0ZVwiKTtcbiAgICBjb25zdCBpdGVtUHJpb3JpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzayAuaXRlbS1wcmlvcml0eVwiKTtcblxuICAgIGNvbnN0IG5ld0l0ZW1OYW1lID0gaXRlbU5hbWVzW2luZGV4XS52YWx1ZS50cmltKCk7XG4gICAgY29uc3QgbmV3SXRlbUR1ZURhdGUgPSBpdGVtRHVlRGF0ZXNbaW5kZXhdLnZhbHVlO1xuICAgIGNvbnN0IG5ld0l0ZW1Qcmlvcml0eSA9IGl0ZW1Qcmlvcml0aWVzW2luZGV4XS52YWx1ZTtcblxuICAgIHRhc2submFtZSA9IG5ld0l0ZW1OYW1lO1xuICAgIHRhc2suZHVlRGF0ZSA9IG5ld0l0ZW1EdWVEYXRlO1xuICAgIHRhc2sucHJpb3JpdHkgPSBuZXdJdGVtUHJpb3JpdHlbMF0udG9VcHBlckNhc2UoKSArIG5ld0l0ZW1Qcmlvcml0eS5zbGljZSgxKTtcblxuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maXJtQnRuO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDYW5jZWxCdG4ocHJvamVjdHMpIHtcbiAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2FuY2VsLWJ0blwiKTtcbiAgY2FuY2VsQnRuLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrXCI+PC9pPmA7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlbmRlclRhc2tJdGVtcyhwcm9qZWN0cyk7XG4gIH0pO1xuXG4gIHJldHVybiBjYW5jZWxCdG47XG59XG5cbmV4cG9ydCB7IHJlbmRlclRhc2tJdGVtcywgZ2V0VGFza3MgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvZ2dsZUFzaWRlT25DbGljaygpIHtcbiAgY29uc3QgYnRuQXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bi1hc2lkZVwiKTtcbiAgYnRuQXNpZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhc2lkZVwiKTtcbiAgICBhc2lkZS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvZ2dsZUZvcm1PbkNsaWNrKCkge1xuICBjb25zdCBpbnB1dHMgPSBbXCJwcm9qZWN0XCIsIFwidGFza1wiXTtcbiAgaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgY29uc3QgYnRuQWRkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2J0bi1hZGQtJHtpbnB1dH1gKTtcbiAgICBidG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybS0ke2lucHV0fWApO1xuICAgICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi8uLi9vYmovUHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4uLy4uL29iai9UYXNrXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmF1bHREYXRhKCkge1xuICBjb25zdCBkYXRhID0gW107XG5cbiAgY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgMVwiKTtcbiAgcHJvamVjdDEudGFza3MucHVzaChuZXcgVGFzayhcIlRhc2sgMVwiLCBcIjIwMjQtMDMtMDZcIiwgXCJMb3dcIikpO1xuICBwcm9qZWN0MS50YXNrcy5wdXNoKG5ldyBUYXNrKFwiVGFzayAyXCIsIFwiMjAyNC0wMy0xNFwiLCBcIk1lZGl1bVwiKSk7XG4gIGRhdGEucHVzaChwcm9qZWN0MSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTdG9yYWdlKCkge1xuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIikpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U3RvcmFnZShkYXRhKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgdHJ5IHtcbiAgICBsZXQgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXSxcbiAgICAgIHggPSBcIl9fc3RvcmFnZV90ZXN0X19cIjtcbiAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiZcbiAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgIChlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJRdW90YUV4Y2VlZGVkRXJyb3JcIiB8fFxuICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgIGUubmFtZSA9PT0gXCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiKSAmJlxuICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgIHN0b3JhZ2UubGVuZ3RoICE9PSAwXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHN0b3JhZ2VBdmFpbGFibGUgZnJvbSBcIi4vYXNzZXRzL3N0b3JhZ2VBdmFpbGFibGVcIjtcbmltcG9ydCBnZXRTdG9yYWdlIGZyb20gXCIuL2Fzc2V0cy9nZXRTdG9yYWdlXCI7XG5pbXBvcnQgc2V0U3RvcmFnZSBmcm9tIFwiLi9hc3NldHMvc2V0U3RvcmFnZVwiO1xuaW1wb3J0IGRlZmF1bHREYXRhIGZyb20gXCIuL2Fzc2V0cy9kZWZhdWx0RGF0YVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRhKCkge1xuICBsZXQgZGF0YTtcbiAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoXCJsb2NhbFN0b3JhZ2VcIikpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBkYXRhID0gZGVmYXVsdERhdGEoKTtcbiAgICAgIHNldFN0b3JhZ2UoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBnZXRTdG9yYWdlKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRhdGEgPSBkZWZhdWx0RGF0YSgpO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHNlY3Rpb24gZnJvbSBcIi4vc2VjdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc2lkZSgpIHtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG5cbiAgLy8gY29uc3QgZmlsdGVyU2VjdGlvbiA9IHNlY3Rpb24oXCJmaWx0ZXJzXCIpO1xuICAvLyBhc2lkZS5hcHBlbmRDaGlsZChmaWx0ZXJTZWN0aW9uKTtcblxuICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IHNlY3Rpb24oXCJwcm9qZWN0c1wiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdFNlY3Rpb24pO1xuXG4gIHJldHVybiBhc2lkZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvb3RlcigpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLmlubmVySFRNTCA9IGBcbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3ZpbmVzay9vZGluLXRvZG8tbGlzdFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgPGkgY2xhc3M9XCJmYS1icmFuZHMgZmEtZ2l0aHViXCI+PC9pPiB2aW5lc2tcbiAgICA8L2E+YDtcblxuICByZXR1cm4gZm9vdGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGVhZGVyKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuXG4gIGhlYWRlci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMT5Ub2RvIExpc3Q8L2gxPlxuICAgICAgICA8c3BhbiBpZD1cImJ0bi1hc2lkZVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtYmFyc1wiPjwvaT5cbiAgICAgICAgPC9zcGFuPmA7XG5cbiAgcmV0dXJuIGhlYWRlcjtcbn1cbiIsImltcG9ydCBzZWN0aW9uIGZyb20gXCIuL3NlY3Rpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuXG4gIGNvbnN0IHRhc2tTZWN0aW9uID0gc2VjdGlvbihcInRhc2tzXCIpO1xuICBtYWluLmFwcGVuZENoaWxkKHRhc2tTZWN0aW9uKTtcblxuICByZXR1cm4gbWFpbjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlY3Rpb24oc2VjdGlvbk5hbWUpIHtcbiAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcblxuICBzd2l0Y2ggKHNlY3Rpb25OYW1lKSB7XG4gICAgY2FzZSBcImZpbHRlcnNcIjpcbiAgICAgIHNlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPkZpbHRlcnM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cImZpbHRlcnNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci1hbGxcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtaW5ib3hcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPkFsbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbSBmaWx0ZXJcIiBpZD1cImZpbHRlci10b2RheVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWljb25cIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci1kYXlcIj48L2k+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPlRvZGF5PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtIGZpbHRlclwiIGlkPVwiZmlsdGVyLXdlZWtcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1pY29uXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLW5hbWVcIj5UaGlzIHdlZWs8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgXCJwcm9qZWN0c1wiOlxuICAgICAgc2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+UHJvamVjdHM8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbXNcIiBpZD1cInByb2plY3RzXCI+PC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYWRkXCIgaWQ9XCJidG4tYWRkLXByb2plY3RcIj5BZGQgYSBwcm9qZWN0PC9idXR0b24+XG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybSBoaWRkZW5cIiBpZD1cImZvcm0tcHJvamVjdFwiIGFjdGlvbj1cIiNcIiBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInByb2plY3QtbmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInByb2plY3QtbmFtZVwiIHJlcXVpcmVkPVwiXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBcInRhc2tzXCI6XG4gICAgICBzZWN0aW9uLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwidGl0bGVcIj5UYXNrczwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtc1wiIGlkPVwidGFza3NcIj48L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hZGRcIiBpZD1cImJ0bi1hZGQtdGFza1wiPkFkZCBhIHRhc2s8L2J1dHRvbj5cbiAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtIGhpZGRlblwiIGlkPVwiZm9ybS10YXNrXCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay1uYW1lXCI+TmFtZTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay1uYW1lXCIgcmVxdWlyZWQ9XCJcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLWR1ZS1kYXRlXCI+RHVlIGRhdGU6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cInRhc2stZHVlLWRhdGVcIiByZXF1aXJlZD1cIlwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stcHJpb3JpdHlcIj5Qcmlvcml0eTo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgaWQ9XCJ0YXNrLXByaW9yaXR5XCI+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibG93XCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWVkaXVtXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaGlnaFwiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250cm9sc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIj5SZXNldDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+YDtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb247XG59XG4iLCJpbXBvcnQgaGVhZGVyIGZyb20gXCIuL2Fzc2V0cy9oZWFkZXJcIjtcbmltcG9ydCBhc2lkZSBmcm9tIFwiLi9hc3NldHMvYXNpZGVcIjtcbmltcG9ydCBtYWluIGZyb20gXCIuL2Fzc2V0cy9tYWluXCI7XG5pbXBvcnQgZm9vdGVyIGZyb20gXCIuL2Fzc2V0cy9mb290ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGF5b3V0KCkge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRhaW5lclwiKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXNpZGUoKSk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluKCkpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9vdGVyKCkpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMudGFza3MgPSBbXTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsYXlvdXQgZnJvbSBcIi4vbGF5b3V0L2xheW91dFwiO1xuaW1wb3J0IGRhdGEgZnJvbSBcIi4vZGF0YS9kYXRhXCI7XG5pbXBvcnQgYXBwIGZyb20gXCIuL2FwcC9hcHBcIjtcblxuKCgpID0+IHtcbiAgbGF5b3V0KCk7XG4gIGFwcChkYXRhKCkpO1xufSkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==