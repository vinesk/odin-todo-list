import layout from "./layout/layout";
import data from "./data/data";
import app from "./app/app";

(() => {
  layout();
  app(data());
})();
