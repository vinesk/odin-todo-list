export default function toggleFormOnBtnAddClick() {
  const inputs = ["project", "task"];
  inputs.forEach((input) => {
    const btnAdd = document.querySelector(`#btn-add-${input}`);
    btnAdd.addEventListener("click", () => {
      const form = document.querySelector(`#form-${input}`);
      form.classList.toggle("hidden");
    });
  });
}
