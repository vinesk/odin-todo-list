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

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

let projects = [];

document.getElementById("addProjectBtn").addEventListener("click", () => {
  addProject();
});

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const selectedProjectIndex =
    document.getElementById("projects").selectedIndex;
  if (selectedProjectIndex === -1) {
    alert("Please select a project first.");
    return;
  }
  const project = projects[selectedProjectIndex];
  addTask(project);
});

function addProject() {
  const projectInput = document.getElementById("projectInput");
  const projectName = projectInput.value.trim();
  if (projectName === "") return;
  const project = new Project(projectName);
  projects.push(project);
  renderProjects();
  projectInput.value = "";
}

function renderProjects() {
  const projectList = document.getElementById("projects");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.textContent = project.name;
    projectList.appendChild(option);
  });
}

function addTask(project) {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  const taskDueDate = document.getElementById("taskDueDate").value;
  const taskPriority = document.getElementById("taskPriority").value;

  if (taskName === "" || taskDueDate === "" || taskPriority === "") return;

  const task = new Task(taskName, taskDueDate, taskPriority);
  project.addTask(task);
  renderTasks(project);
  taskInput.value = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskPriority").value = "";
}

function renderTasks(project) {
  const taskList = document.getElementById("tasks");
  taskList.innerHTML = "";
  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    li.addEventListener("click", () => toggleTaskCompletion(task));
    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(task) {
  task.toggleCompleted();
  renderTasks();
}

renderProjects();
