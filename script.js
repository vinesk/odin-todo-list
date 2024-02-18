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
    this.completed = true;
  }
}

// Data
let projects = [new Project("Project 1"), new Project("Project 2")];
let tasks = [
  new Task("Task 1", "2024-02-18", "Low"),
  new Task("Task 2", "2024-02-24", "Medium"),
  new Task("Task 3", "2024-02-29", "High"),
];
tasks.forEach((task) => {
  projects[0].addTask(task);
});

// Functions
function renderProjects() {
  const projectItems = document.querySelector("#projects .items");
  projectItems.innerHTML = "";

  projects.forEach((project, index) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("item");
    if (index === 0) {
      projectItem.classList.add("selected");
    }

    const projectItemIcon = document.createElement("span");
    projectItemIcon.classList.add("item-icon");
    projectItemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;
    projectItem.appendChild(projectItemIcon);

    const projectItemName = document.createElement("span");
    projectItemName.classList.add("item-name");
    projectItemName.textContent = project.name;
    projectItem.appendChild(projectItemName);

    const editBtn = document.createElement("span");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    editBtn.addEventListener("click", () => {
      editProjectItem(projectItem, project.name);
    });
    projectItem.appendChild(editBtn);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.addEventListener("click", () => {
      deleteProjectItem(project.name);
    });
    projectItem.appendChild(deleteBtn);

    projectItems.appendChild(projectItem);
  });
}

function renderTasks() {
  const taskItems = document.querySelector("#tasks .items");
  taskItems.innerHTML = "";

  const selectedProject = projects[0];
  const tasks = selectedProject.tasks;

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("item");

    const taskItemIcon = document.createElement("span");
    taskItemIcon.classList.add("item-icon");
    if (!task.completed) {
      taskItemIcon.innerHTML = `<i class="fa-regular fa-circle"></i>`;
    } else {
      taskItemIcon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;
    }
    taskItem.appendChild(taskItemIcon);

    const taskItemName = document.createElement("span");
    taskItemName.classList.add("item-name");
    taskItemName.textContent = task.name;
    taskItem.appendChild(taskItemName);

    const taskItemDueDate = document.createElement("span");
    taskItemDueDate.classList.add("item-due-date");
    taskItemDueDate.textContent = task.dueDate;
    taskItem.appendChild(taskItemDueDate);

    const taskItemPriority = document.createElement("span");
    taskItemPriority.classList.add(
      "item-priority",
      `${task.priority.toLowerCase()}`
    );
    taskItemPriority.textContent = task.priority;
    taskItem.appendChild(taskItemPriority);

    const editBtn = document.createElement("span");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    // editBtn.addEventListener("click", () => {
    //   editProjectItem(projectItem, project.name);
    // });
    taskItem.appendChild(editBtn);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    // deleteBtn.addEventListener("click", () => {
    //   deleteProjectItem(project.name);
    // });
    taskItem.appendChild(deleteBtn);

    taskItems.appendChild(taskItem);
  });
}

function editProjectItem(projectItem, projectName) {
  projectItem.innerHTML = "";

  const projectItemIcon = document.createElement("span");
  projectItemIcon.classList.add("item-icon");
  projectItemIcon.innerHTML = `<i class="fa-solid fa-list-check"></i>`;
  projectItem.appendChild(projectItemIcon);

  const input = document.createElement("input");
  input.classList.add("item-name");
  input.type = "text";
  input.value = projectName;
  projectItem.appendChild(input);

  const checkBtn = document.createElement("span");
  checkBtn.classList.add("check-btn");
  checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  checkBtn.addEventListener("click", () => {
    const newProjectName = input.value.trim();
    const project = projects.find((project) => project.name === projectName);
    project.name = newProjectName;
    renderProjects();
  });
  projectItem.appendChild(checkBtn);

  const cancelBtn = document.createElement("span");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  cancelBtn.addEventListener("click", () => {
    renderProjects();
  });
  projectItem.appendChild(cancelBtn);
}

function deleteProjectItem(projectName) {
  projects = projects.filter((project) => project.name !== projectName);
  renderProjects();
}

const projectBtnAdd = document.querySelector("#projects .btn-add");
projectBtnAdd.addEventListener("click", () => {
  const projectForm = document.querySelector("#projects .form");
  projectForm.classList.toggle("hidden");
});

const projectForm = document.querySelector("#projects .form");
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectNameInput = document.querySelector("#project-name");
  const projectName = projectNameInput.value.trim();
  const project = new Project(projectName);
  projects.push(project);
  renderProjects();
  projectNameInput.value = "";
  projectForm.classList.add("hidden");
});

const taskBtnAdd = document.querySelector("#tasks .btn-add");
taskBtnAdd.addEventListener("click", () => {
  const taskForm = document.querySelector("#tasks .form");
  taskForm.classList.toggle("hidden");
});

const taskForm = document.querySelector("#tasks .form");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

renderProjects();
renderTasks();
