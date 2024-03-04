import renderSection from "./renderSection";

export default function renderAside() {
  const aside = document.createElement("aside");
  aside.classList.add("aside");

  // const filterSection = renderSection("filters");
  // aside.appendChild(filterSection);

  const projectSection = renderSection("projects");
  aside.appendChild(projectSection);

  return aside;
}
