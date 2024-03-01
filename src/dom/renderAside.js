import renderSection from "./renderSection";

export default function renderAside() {
  const aside = document.createElement("aside");
  aside.classList.add("aside");

  const projectSection = renderSection("projects");
  aside.appendChild(projectSection);

  return aside;
}
