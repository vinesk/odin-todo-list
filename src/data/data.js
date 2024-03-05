import Project from "../obj/Project";
import Task from "../obj/Task";

export default function data() {
  let data = [];
  const project1 = new Project("Project 1");
  project1.addTask(new Task("Task 1", "2024-02-18", "Low"));
  project1.addTask(new Task("Task 2", "2024-02-24", "Medium"));
  project1.addTask(new Task("Task 3", "2024-02-28", "High"));
  data.push(project1);

  const project2 = new Project("Project 2");
  project2.addTask(new Task("Task 1", "2024-02-28", "Medium"));
  data.push(project2);

  return data;
}
