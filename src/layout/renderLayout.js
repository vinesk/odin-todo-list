import renderHeader from "./renderHeader";
import renderAside from "./renderAside";
import renderMain from "./renderMain";
import renderFooter from "./renderFooter";

export default function renderLayout() {
  const container = document.querySelector("#container");

  container.appendChild(renderHeader());
  container.appendChild(renderAside());
  container.appendChild(renderMain());
  container.appendChild(renderFooter());
}
