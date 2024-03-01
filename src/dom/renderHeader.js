export default function renderHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const title = renderTitle();
  header.appendChild(title);

  return header;
}

function renderTitle() {
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Todo List";

  return title;
}
