import addItemOnFormSubmit from "./addItemOnFormSubmit";
import renderProjectItems from "./renderProjectItems";
import { renderTaskItems } from "./renderTaskItems";
import toggleAsideOnBtnAsideClick from "./toggleAsideOnBtnAsideClick";
import toggleFormOnBtnAddClick from "./toggleFormOnBtnAddClick";

export default function renderApp(projects) {
  toggleAsideOnBtnAsideClick();
  toggleFormOnBtnAddClick();
  renderProjectItems(projects);
  renderTaskItems(projects);
  addItemOnFormSubmit(projects);
}
