export default function renderBtnAdd(sectionName) {
  let btnAdd = document.createElement("button");
  btnAdd.classList.add("btn-add");

  switch (sectionName) {
    case "projects":
      btnAdd.textContent = "Add a project";
      break;
    case "tasks":
      btnAdd.textContent = "Add a task";
      break;
  }

  showFormOnClick(btnAdd, sectionName);

  return btnAdd;
}

function showFormOnClick(btnAdd, sectionName) {
  btnAdd.addEventListener("click", () => {
    const form = document.querySelector(`#${sectionName} .form`);
    form.classList.toggle("hidden");
  });
}
