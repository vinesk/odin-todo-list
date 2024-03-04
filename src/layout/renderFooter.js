export default function renderFooter() {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
    <a href="https://github.com/vinesk/odin-todo-list" target="_blank">
      <i class="fa-brands fa-github"></i> vinesk
    </a>`;

  return footer;
}
