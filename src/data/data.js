import storageAvailable from "./assets/storageAvailable";
import getStorage from "./assets/getStorage";
import setStorage from "./assets/setStorage";
import defaultData from "./assets/defaultData";

export default function data() {
  let data;
  if (storageAvailable("localStorage")) {
    data = localStorage.getItem("data")
      ? getStorage()
      : setStorage(defaultData());
  } else {
    data = defaultData();
  }
  return data;
}
