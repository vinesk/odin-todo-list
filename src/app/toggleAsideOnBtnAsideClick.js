export default function toggleAsideOnBtnAsideClick() {
  const btnAside = document.querySelector("#btn-aside");
  btnAside.addEventListener("click", () => {
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
  });
}
