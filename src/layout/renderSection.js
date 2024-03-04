export default function renderSection(sectionName) {
  const section = document.createElement("section");
  section.classList.add("section");

  const title = renderTitle(sectionName);
  section.appendChild(title);

  const items = renderItems(sectionName);
  section.appendChild(items);

  const btnAdd = renderBtnAdd(sectionName);
  section.appendChild(btnAdd);

  const form = renderForm(sectionName);
  section.appendChild(form);

  return section;
}

function renderTitle(sectionName) {
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent =
    sectionName[0].toUpperCase() + sectionName.slice(1).toLowerCase();

  return title;
}

function renderItems(sectionName) {
  const items = document.createElement("div");
  items.classList.add("items");
  items.id = sectionName;

  return items;
}

function renderBtnAdd(sectionName) {
  let btnAdd = document.createElement("button");
  btnAdd.classList.add("btn-add");
  btnAdd.id = `btn-add-${sectionName.slice(0, -1)}`;

  switch (sectionName) {
    case "projects":
      btnAdd.textContent = "Add a project";
      break;
    case "tasks":
      btnAdd.textContent = "Add a task";
      break;
  }

  return btnAdd;
}

function renderForm(sectionName) {
  let form = document.createElement("form");
  form.classList.add("form", "hidden");
  form.id = `form-${sectionName.slice(0, -1)}`;

  form.setAttribute("action", "#");
  form.setAttribute("method", "post");

  switch (sectionName) {
    case "projects":
      form.innerHTML = `
        <label for="project-name">Name:</label>
        <input type="text" id="project-name" required />
        <div class="form-controls">
          <button type="submit">Confirm</button>
          <button type="reset">Reset</button>
        </div>`;
      break;

    case "tasks":
      form.innerHTML = `
        <label for="task-name">Name:</label>
        <input type="text" id="task-name" required />
        <label for="task-due-date">Due date:</label>
        <input type="date" id="task-due-date" required />
        <label for="task-priority">Priority:</label>
        <select id="task-priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div class="form-controls">
          <button type="submit">Confirm</button>
          <button type="reset">Reset</button>
        </div>`;
      break;
  }

  return form;
}
