import Project from "../../obj/Project";
import Task from "../../obj/Task";

export default function defaultData() {
  const data = [];

  const project1 = new Project("Project 1");
  project1.tasks.push(new Task("Task 1", "2024-03-06", "Low"));
  project1.tasks.push(new Task("Task 2", "2024-03-14", "Medium"));
  data.push(project1);

  return data;
}
