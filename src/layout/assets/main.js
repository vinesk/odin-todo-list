import section from "./section";

export default function main() {
  const main = document.createElement("main");

  const taskSection = section("tasks");
  main.appendChild(taskSection);

  return main;
}
