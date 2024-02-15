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
  }
}

// Data
let projects = [];
projects.push(new Project("Project 1"));
projects.push(new Project("Project 2"));

// Projects
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

function renderProjects() {
  const projectItems = document.querySelector("#projects .items");
  projectItems.innerHTML = "";

  const taskProject = document.querySelector("#task-project");
  taskProject.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "");
  defaultOption.textContent = "Select a project";
  taskProject.appendChild(defaultOption);

  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("item");

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

    const option = document.createElement("option");
    option.setAttribute("value", project.name);
    option.textContent = project.name;
    taskProject.appendChild(option);
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
    if (project) {
      project.name = newProjectName;
    }
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

// Task
const taskBtnAdd = document.querySelector("#tasks .btn-add");
taskBtnAdd.addEventListener("click", () => {
  const taskForm = document.querySelector("#tasks .form");
  taskForm.classList.toggle("hidden");
});

const taskForm = document.querySelector("#tasks .form");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskNameInput = document.querySelector("#task-name");
  const taskName = taskNameInput.value.trim();

  const taskDueDateInput = document.querySelector("#task-due-date");
  const taskDueDate = taskDueDateInput.value;

  const taskPrioritySelect = document.querySelector("#task-priority");
  taskPriority = taskPrioritySelect.value;

  const taskProjectSelect = document.querySelector("#task-project");
  const taskProject = taskProjectSelect.value;

  // const project = new Project(projectName);
  // projects.push(project);
  // createTaskItems();
  // projectNameInput.value = "";
  // projectForm.classList.add("hidden");
});

// const taskForm = document.querySelector("#task-form");
// const taskNameInput = document.querySelector("#task-name");
// const taskDueDateInput = document.querySelector("#task-due-date");
// const taskPriorityInput = document.querySelector("#task-priority");
// const taskProjectSelect = document.querySelector("#task-project-select");
// const taskError = document.querySelector("#task-error");
// const taskList = document.querySelector("#task-list");

// taskForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const taskName = taskNameInput.value.trim();
//   const dueDate = taskDueDateInput.value;
//   const priority = taskPriorityInput.value.trim();
//   const projectName = taskProjectSelect.value;
//   if (!taskName || !projectName) {
//     taskError.textContent = "Task name and project must be specified";
//   } else {
//     const task = new Task(taskName, dueDate, priority);
//     const selectedProject = projects.find(
//       (project) => project.name === projectName
//     );
//     if (selectedProject) {
//       selectedProject.addTask(task);
//       renderTasks(selectedProject.tasks);
//       taskNameInput.value = "";
//       taskDueDateInput.value = "";
//       taskPriorityInput.value = "";
//       taskError.textContent = "";
//     } else {
//       taskError.textContent = "Project not found";
//     }
//   }
// });

// function displayTasksForProject(project) {
//   const mainTitle = document.querySelector("main h2");
//   mainTitle.textContent = project.name;

//   const tasks = project.tasks;
//   renderTasks(tasks);
// }

// // Tasks

// function renderTasks(tasks) {
//   taskList.innerHTML = "";
//   tasks.forEach((task) => {
//     const taskItem = document.createElement("li");
//     taskItem.textContent = task.name + " - Priority: " + task.priority;
//     taskList.appendChild(taskItem);

//     const deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.addEventListener("click", () => {
//       deleteTask(task.name);
//     });
//     taskItem.appendChild(deleteBtn);

//     const editBtn = document.createElement("button");
//     editBtn.textContent = "Edit";
//     editBtn.addEventListener("click", () => {
//       editTask(task.name, taskItem);
//     });
//     taskItem.appendChild(editBtn);
//   });
// }

// function deleteTask(taskName) {
//   const projectName = taskProjectSelect.value;
//   if (!projectName) {
//     taskError.textContent = "Please select a project";
//     return;
//   }
//   const project = projects.find((project) => project.name === projectName);
//   if (project) {
//     project.removeTask(taskName);
//     renderTasks(project.tasks);
//   } else {
//     taskError.textContent = "Project not found";
//   }
// }

// function editTask(taskName, taskItem) {
//   const project = projects.find(
//     (project) => project.name === taskProjectSelect.value
//   );
//   if (!project) {
//     taskError.textContent = "Please select a project";
//     return;
//   }
//   const task = project.tasks.find((task) => task.name === taskName);
//   if (!task) {
//     taskError.textContent = "Task not found";
//     return;
//   }

//   const nameInput = document.createElement("input");
//   nameInput.type = "text";
//   nameInput.value = taskName;

//   const taskDueDateInput = document.createElement("input");
//   taskDueDateInput.type = "date";
//   taskDueDateInput.value = task.dueDate;

//   const taskPriorityInput = document.createElement("select");
//   taskPriorityInput.innerHTML = `
//     <option value="low">Low</option>
//     <option value="medium">Medium</option>
//     <option value="high">High</option>
//   `;
//   taskPriorityInput.value = task.priority;

//   const projectInput = document.createElement("select");
//   projects.forEach((proj) => {
//     const option = document.createElement("option");
//     option.textContent = proj.name;
//     option.value = proj.name;
//     if (proj.name === project.name) option.selected = true;
//     projectInput.appendChild(option);
//   });

//   const saveBtn = document.createElement("button");
//   saveBtn.textContent = "Save";
//   saveBtn.addEventListener("click", () => {
//     const newName = nameInput.value.trim();
//     const newDueDate = taskDueDateInput.value;
//     const newPriority = taskPriorityInput.value;
//     const newProjectName = projectInput.value;
//     if (newName && newDueDate && newPriority && newProjectName) {
//       if (
//         newName !== taskName &&
//         project.tasks.some((task) => task.name === newName)
//       ) {
//         taskError.textContent =
//           "Task with this name already exists in the project";
//         return;
//       }
//       task.name = newName;
//       task.dueDate = newDueDate;
//       task.priority = newPriority;
//       if (newProjectName !== project.name) {
//         project.removeTask(taskName);
//         const newProject = projects.find(
//           (proj) => proj.name === newProjectName
//         );
//         if (newProject) {
//           newProject.addTask(task);
//           projectError.textContent = "";
//         } else {
//           taskError.textContent = "Project not found";
//           return;
//         }
//       }
//       renderTasks(project.tasks);
//     } else {
//       taskError.textContent = "All fields are required";
//     }
//   });

//   const cancelBtn = document.createElement("button");
//   cancelBtn.textContent = "Cancel";
//   cancelBtn.addEventListener("click", () => {
//     renderTasks(project.tasks);
//   });

//   taskItem.innerHTML = "";
//   taskItem.appendChild(nameInput);
//   taskItem.appendChild(taskDueDateInput);
//   taskItem.appendChild(taskPriorityInput);
//   taskItem.appendChild(projectInput);
//   taskItem.appendChild(saveBtn);
//   taskItem.appendChild(cancelBtn);
// }

// // Filters
// const filters = document.querySelectorAll("#filters .item");

// filters.forEach((filter) => {
//   filter.addEventListener("click", () => {
//     switch (filter.textContent) {
//       case "All":
//         filterTasks("All");
//         break;
//       case "Today":
//         filterTasks("Today");
//         break;
//       case "This week":
//         filterTasks("This week");
//         break;
//     }
//   });
// });

// function filterTasks(filterName) {
//   const today = new Date();
//   const todayDate = today.toISOString().split("T")[0];
//   const weekEndDate = new Date(today.setDate(today.getDate() + 6))
//     .toISOString()
//     .split("T")[0];

//   let filteredTasks = [];
//   switch (filterName) {
//     case "All":
//       projects.forEach((project) => {
//         filteredTasks = filteredTasks.concat(project.tasks);
//       });
//       break;
//     case "Today":
//       projects.forEach((project) => {
//         project.tasks.forEach((task) => {
//           if (task.dueDate === todayDate) {
//             filteredTasks.push(task);
//           }
//         });
//       });
//       break;
//     case "This week":
//       projects.forEach((project) => {
//         project.tasks.forEach((task) => {
//           if (task.dueDate >= todayDate && task.dueDate <= weekEndDate) {
//             filteredTasks.push(task);
//           }
//         });
//       });
//       break;
//   }

//   const mainTitle = document.querySelector("main h2");
//   mainTitle.textContent = filterName;
//   renderTasks(filteredTasks);
// }

// // Initial render
renderProjects();
