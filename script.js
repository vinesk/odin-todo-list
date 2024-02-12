// Class Project
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

// Class Task
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

// DOM elements
const projectList = document.getElementById("project-list");
const taskList = document.getElementById("task-list");
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const projectInput = document.getElementById("project-input");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date-input");
const priorityInput = document.getElementById("priority-input");
const projectSelect = document.getElementById("project-select");
const projectError = document.getElementById("project-error");
const taskError = document.getElementById("task-error");

// Functions
function renderProjects() {
  projectList.innerHTML = "";
  projectSelect.innerHTML = '<option value="">Select project</option>';
  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.textContent = project.name;
    projectList.appendChild(projectItem);

    const option = document.createElement("option");
    option.textContent = project.name;
    option.value = project.name;
    projectSelect.appendChild(option);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteProject(project.name);
    });
    projectItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editProject(project.name, projectItem);
    });
    projectItem.appendChild(editBtn);
  });
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.name + " - Priority: " + task.priority;
    taskList.appendChild(taskItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.name);
    });
    taskItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editTask(task.name, taskItem);
    });
    taskItem.appendChild(editBtn);
  });
}

function validateProjectName(name) {
  if (!name) {
    projectError.textContent = "Project name cannot be empty";
    return false;
  }
  return true;
}

function validateTaskInputs(name, projectName) {
  if (!name || !projectName) {
    taskError.textContent = "Task name and project must be specified";
    return false;
  }
  return true;
}

function deleteProject(projectName) {
  projects = projects.filter((project) => project.name !== projectName);
  renderProjects();
}

function editProject(projectName, projectItem) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = projectName;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const newName = input.value.trim();
    if (newName !== projectName && validateProjectName(newName)) {
      const project = projects.find((project) => project.name === projectName);
      if (project) {
        project.name = newName;
        renderProjects();
      }
    }
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    renderProjects();
  });

  projectItem.innerHTML = "";
  projectItem.appendChild(input);
  projectItem.appendChild(saveBtn);
  projectItem.appendChild(cancelBtn);
}

function deleteTask(taskName) {
  const projectName = projectSelect.value;
  if (!projectName) {
    taskError.textContent = "Please select a project";
    return;
  }
  const project = projects.find((project) => project.name === projectName);
  if (project) {
    project.removeTask(taskName);
    renderTasks(project.tasks);
  } else {
    taskError.textContent = "Project not found";
  }
}

function editTask(taskName, taskItem) {
  const project = projects.find(
    (project) => project.name === projectSelect.value
  );
  if (!project) {
    taskError.textContent = "Please select a project";
    return;
  }
  const task = project.tasks.find((task) => task.name === taskName);
  if (!task) {
    taskError.textContent = "Task not found";
    return;
  }

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = taskName;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = task.dueDate;

  const priorityInput = document.createElement("select");
  priorityInput.innerHTML = `
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  `;
  priorityInput.value = task.priority;

  const projectInput = document.createElement("select");
  projects.forEach((proj) => {
    const option = document.createElement("option");
    option.textContent = proj.name;
    option.value = proj.name;
    if (proj.name === project.name) option.selected = true;
    projectInput.appendChild(option);
  });

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", () => {
    const newName = nameInput.value.trim();
    const newDueDate = dueDateInput.value;
    const newPriority = priorityInput.value;
    const newProjectName = projectInput.value;
    if (newName && newDueDate && newPriority && newProjectName) {
      if (
        newName !== taskName &&
        project.tasks.some((task) => task.name === newName)
      ) {
        taskError.textContent =
          "Task with this name already exists in the project";
        return;
      }
      task.name = newName;
      task.dueDate = newDueDate;
      task.priority = newPriority;
      if (newProjectName !== project.name) {
        project.removeTask(taskName);
        const newProject = projects.find(
          (proj) => proj.name === newProjectName
        );
        if (newProject) {
          newProject.addTask(task);
          projectError.textContent = "";
        } else {
          taskError.textContent = "Project not found";
          return;
        }
      }
      renderTasks(project.tasks);
    } else {
      taskError.textContent = "All fields are required";
    }
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    renderTasks(project.tasks);
  });

  taskItem.innerHTML = "";
  taskItem.appendChild(nameInput);
  taskItem.appendChild(dueDateInput);
  taskItem.appendChild(priorityInput);
  taskItem.appendChild(projectInput);
  taskItem.appendChild(saveBtn);
  taskItem.appendChild(cancelBtn);
}

// Event listeners
addProjectBtn.addEventListener("click", () => {
  const projectName = projectInput.value.trim();
  if (validateProjectName(projectName)) {
    const project = new Project(projectName);
    projects.push(project);
    renderProjects();
    projectInput.value = "";
    projectError.textContent = "";
  }
});

addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value.trim();
  const projectName = projectSelect.value;
  if (validateTaskInputs(taskName, projectName)) {
    const task = new Task(taskName, dueDate, priority);
    const selectedProject = projects.find(
      (project) => project.name === projectName
    );
    if (selectedProject) {
      selectedProject.addTask(task);
      renderTasks(selectedProject.tasks);
      taskInput.value = "";
      dueDateInput.value = "";
      priorityInput.value = "";
      taskError.textContent = "";
    } else {
      taskError.textContent = "Project not found";
    }
  }
});

// Initial render
renderProjects();
