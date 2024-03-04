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

export { renderTaskItems, getSelectedProject };
