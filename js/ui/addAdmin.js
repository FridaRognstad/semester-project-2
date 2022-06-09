import { getUsername } from "../utils/storage.js";

const addAdminBtnBurger = document.querySelector(".addAdmin-burger");
const addAdminBtn = document.querySelector(".addAdmin");

export function addAdmin() {
  const username = getUsername();

  if (username) {
    addAdminBtn.style.display = "block";
    addAdminBtnBurger.style.display = "block";
  } else {
    addAdminBtn.style.display = "none";
    addAdminBtnBurger.style.display = "none";
  }
}
