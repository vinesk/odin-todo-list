export default function renderHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const title = renderTitle();
  header.appendChild(title);

  const toggleAside = renderToggleAside();
  header.appendChild(toggleAside);

  return header;
}

function renderTitle() {
  const title = document.createElement("h1");
  title.textContent = "Todo List";

  return title;
}

function renderToggleAside() {
  const toggleAside = document.createElement("span");
  toggleAside.id = "btn-aside";
  toggleAside.innerHTML = `<i class="fa-solid fa-bars"></i>`;

  return toggleAside;
}
