import renderHeader from "./dom/renderHeader";
import renderAside from "./dom/renderAside";
import renderMain from "./dom/renderMain";
import renderFooter from "./dom/renderFooter";

const app = (() => {
  const container = document.querySelector(".container");

  container.appendChild(renderHeader());
  container.appendChild(renderAside());
  container.appendChild(renderMain());
  container.appendChild(renderFooter());
})();
