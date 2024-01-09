export default class Task {
  constructor(title, dueDate, priority) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }

  // getDateFormatted() {
  //   const day = this.dueDate.split("/")[0];
  //   const month = this.dueDate.split("/")[1];
  //   const year = this.dueDate.split("/")[2];
  //   return `${month}/${day}/${year}`;
  // }
}
