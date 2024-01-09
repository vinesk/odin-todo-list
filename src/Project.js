// import { toDate, isToday, isThisWeek, subDays } from 'date-fns'

export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setTasks() {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskTitle) {
    return this.tasks.find((task) => task.getTitle() === taskTitle);
  }

  containTask(taskTitle) {
    return this.tasks.some((task) => task.getTitle() === taskTitle);
  }

  addTask(newTask) {
    if (this.tasks.some((task) => task.getTitle() === newTask.title)) return;
    this.tasks.push(newTask);
  }

  deleteTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.getTitle() !== taskTitle);
  }

  getTasksToday() {
    //   return this.tasks.filter((task) => {
    //     const taskDate = new Date(task.getDateFormatted())
    //     return isToday(toDate(taskDate))
    //   })
  }

  getTasksThisWeek() {
    //   return this.tasks.filter((task) => {
    //     const taskDate = new Date(task.getDateFormatted())
    //     return isThisWeek(subDays(toDate(taskDate), 1))
    //   })
  }
}
