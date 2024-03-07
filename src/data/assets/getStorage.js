export default function getStorage() {
  return JSON.parse(localStorage.getItem("data"));
}
