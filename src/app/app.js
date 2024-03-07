import addItemOnSubmit from "./assets/addItemOnSubmit";
import renderProjectItems from "./assets/renderProjectItems";
import { renderTaskItems } from "./assets/renderTaskItems";
import toggleAsideOnClick from "./assets/toggleAsideOnClick";
import toggleFormOnClick from "./assets/toggleFormOnClick";

export default function app(data) {
  toggleFormOnClick();
  toggleAsideOnClick();

  renderProjectItems(data);
  renderTaskItems(data);
  addItemOnSubmit(data);
}
