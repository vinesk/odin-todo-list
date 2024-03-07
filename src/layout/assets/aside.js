import section from "./section";

export default function aside() {
  const aside = document.createElement("aside");

  // const filterSection = section("filters");
  // aside.appendChild(filterSection);

  const projectSection = section("projects");
  aside.appendChild(projectSection);

  return aside;
}
