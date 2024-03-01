export default function renderForm(sectionName) {
  let form = document.createElement("form");
  form.classList.add("form", "hidden");
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

  addItemOnSubmit(sectionName, form);

  return form;
}

function addItemOnSubmit(sectionName, form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // const nameInput = document.querySelector(`#${section.slice(0, -1)}-name`);
    // const name = nameInput.value.trim();

    // switch (sectionName) {
    //   case "projects":
    //     const project = new Project(name);
    //     projects.push(project);
    //     nameInput.value = "";
    //     break;
    //   case "tasks":
    //     const dueDateInput = document.querySelector(
    //       `#${section.slice(0, -1)}-due-date`
    //     );
    //     const dueDate = dueDateInput.value;
    //     const prioritySelect = document.querySelector(
    //       `#${section.slice(0, -1)}-priority`
    //     );
    //     const priority =
    //       prioritySelect.value[0].toUpperCase() + prioritySelect.value.slice(1);
    //     const task = new Task(name, dueDate, priority);
    //     const selectedProject = getSelectedProject();
    //     selectedProject.addTask(task);
    //     nameInput.value = "";
    //     dueDateInput.value = "";
    //     prioritySelect.value = "low";
    //     break;
    // }
    // renderItems(section);
    // form.classList.toggle("hidden");
  });
}
