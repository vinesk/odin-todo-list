import data from "../data/data";
import addItemOnSubmit from "./addItemOnSubmit";
import renderProjectItems from "./renderProjectItems";
import { renderTaskItems } from "./renderTaskItems";
import toggleAsideOnClick from "./toggleAsideOnClick";
import toggleFormOnClick from "./toggleFormOnClick";

export default function app() {
  const projects = data();

  toggleFormOnClick();
  toggleAsideOnClick();

  renderProjectItems(projects);
  renderTaskItems(projects);
  addItemOnSubmit(projects);
}
