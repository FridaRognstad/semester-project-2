import { removeFromStorage } from "../utils/storage.js";

export default function logOut() {
  const logoutBtn = document.querySelector(".logout-btn");
  const logoutBtnWide = document.querySelector(".logout-btn-wide");
  console.log(logoutBtn.onclick);

  logoutBtn.onclick = function () {
    removeFromStorage();
    location.href = "/";
  };

  logoutBtnWide.onclick = function () {
    removeFromStorage();
    location.href = "/";
  };
}
