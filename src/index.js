import getData from "./data/getdata";
import renderLayout from "./layout/renderLayout";
import renderApp from "./app/renderApp";

(() => {
  // Data
  const projects = getData();

  // Layout
  renderLayout();

  // App
  renderApp(projects);
})();
