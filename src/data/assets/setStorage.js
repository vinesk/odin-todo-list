import getStorage from "./getStorage";

export default function setStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
  getStorage();
}
