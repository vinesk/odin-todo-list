import renderItems from "./renderItems";
import renderBtnAdd from "./renderBtnAdd";
import renderForm from "./renderForm";

export default function renderSection(sectionName) {
  const section = document.createElement("section");
  section.classList.add("section");
  section.id = sectionName;

  const title = renderTitle(sectionName);
  section.appendChild(title);

  const items = renderItems(sectionName);
  section.appendChild(items);

  const btnAdd = renderBtnAdd(sectionName);
  section.appendChild(btnAdd);

  const form = renderForm(sectionName);
  section.appendChild(form);

  return section;
}

function renderTitle(sectionName) {
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent =
    sectionName[0].toUpperCase() + sectionName.slice(1).toLowerCase();

  return title;
}
