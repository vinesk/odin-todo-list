import { renderTaskItems } from "./renderTaskItems";

export default function renderProjectItems(projects) {
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
    renderTaskItems(projects);
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
    renderTaskItems(projects);
  });

  return deleteBtn;
}
