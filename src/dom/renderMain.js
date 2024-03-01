import renderSection from "./renderSection";

export default function renderMain() {
  const main = document.createElement("main");
  main.classList.add("main");

  const taskSection = renderSection("tasks");
  main.appendChild(taskSection);

  return main;
}
