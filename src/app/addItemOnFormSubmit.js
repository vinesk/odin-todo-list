import Project from "../obj/Project";
import Task from "../obj/Task";
import renderProjectItems from "./renderProjectItems";
import { getSelectedProject, renderTaskItems } from "./renderTaskItems";

export default function addItemOnFormSubmit(projects) {
  const inputs = ["project", "task"];

  inputs.forEach((input) => {
    const form = document.querySelector(`#form-${input}`);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.querySelector(`#${input}-name`);
      const name = nameInput.value.trim();

      switch (input) {
        case "project":
          const project = new Project(name);
          projects.push(project);
          nameInput.value = "";
          form.classList.add("hidden");
          renderProjectItems(projects);
          break;
        case "task":
          const dueDateInput = document.querySelector(`#${input}-due-date`);
          const dueDate = dueDateInput.value;

          const prioritySelect = document.querySelector(`#${input}-priority`);
          const priority =
            prioritySelect.value[0].toUpperCase() +
            prioritySelect.value.slice(1);

          const task = new Task(name, dueDate, priority);
          const selectedProject = getSelectedProject(projects);
          selectedProject.addTask(task);
          nameInput.value = "";
          dueDateInput.value = "";
          prioritySelect.value = "low";
          form.classList.add("hidden");
          renderTaskItems(projects);
          break;
      }
    });
  });
}
