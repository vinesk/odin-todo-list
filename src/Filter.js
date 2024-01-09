// import { compareAsc, toDate } from "date-fns";
import Project from "./Project";
import Task from "./Task";

export default class Filters {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("All"));
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("This week"));
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectTitle) {
    return this.projects.find((project) => project.getTitle() === projectTitle);
  }

  containProject(projectTitle) {
    return this.projects.some((project) => project.getTitle() === projectTitle);
  }

  addProject(newProject) {
    if (
      this.projects.some((project) => project.getTitle() === newProject.title)
    )
      return;
    this.projects.push(newProject);
  }

  deleteProject(projectTitle) {
    this.projects = this.projects.filter(
      (project) => project.getTitle() !== projectTitle
    );
  }

  updateProjectsToday() {
    this.getProject("Today").tasks = [];

    this.projects.forEach((project) => {
      if (project.getTitle() === "Today" || project.getTitle() === "This week")
        return;

      const tasks = project.getTasksToday();
      tasks.forEach((task) => {
        // const taskName = `${task.getName()} (${project.getName()})`;
        // this.getProject("Today").addTask(new Task(taskName, task.getDate()));
      });
    });
  }

  updateProjectsThisWeek() {
    this.getProject("This week").tasks = [];

    this.projects.forEach((project) => {
      if (project.getTitle() === "Today" || project.getTitle() === "This week")
        return;

      const tasks = project.getTasksThisWeek();
      tasks.forEach((task) => {
        //     const taskName = `${task.getName()} (${project.getName()})`;
        //     this.getProject("This week").addTask(
        //       new Task(taskName, task.getDate())
        //     );
      });

      // this.getProject("This week").setTasks(
      //   this.getProject("This week")
      //     .getTasks()
      //     .sort((taskA, taskB) =>
      //       compareAsc(
      //         toDate(new Date(taskA.getDateFormatted())),
      //         toDate(new Date(taskB.getDateFormatted()))
      //       )
      //     )
      // );
    });
  }
}
