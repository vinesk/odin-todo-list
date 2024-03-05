import header from "./assets/header";
import aside from "./assets/aside";
import main from "./assets/main";
import footer from "./assets/footer";

export default function layout() {
  const container = document.querySelector("#container");

  container.appendChild(header());
  container.appendChild(aside());
  container.appendChild(main());
  container.appendChild(footer());
}
