import storageAvailable from "./assets/storageAvailable";
import getStorage from "./assets/getStorage";
import setStorage from "./assets/setStorage";
import defaultData from "./assets/defaultData";

export default function data() {
  let data;
  if (storageAvailable("localStorage")) {
    if (
      !localStorage.getItem("data") ||
      localStorage.getItem("data") === "undefined"
    ) {
      data = setStorage(defaultData());
    } else {
      data = getStorage();
    }
  } else {
    data = defaultData();
  }
  return data;
}
