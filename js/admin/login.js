import { authUrl } from "../api/url.js";
import { saveToken, saveUser } from "../utils/storage.js";

const loginForm = document.querySelector(".login-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const loginWarning = document.querySelector(".login-warning");

const emailValue = email.value.trim();
const passwordValue = password.value.trim();

loginForm.addEventListener("submit", formValidation);

function formValidation(event) {
  event.preventDefault();

  loginWarning.innerHTML = "";

  if (emailValidation(emailValue) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (passwordValidation(passwordValue) === true) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  login(emailValue, passwordValue);
}

async function login(email, password) {
  const data = JSON.stringify({ identifier: email, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(authUrl, options);
    const json = await response.json();
    loginWarning.innerHTML = "";

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "../index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

function emailValidation(email) {
  const emailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const emailMatch = emailRegEx.test(email);
  return emailMatch;
}

function passwordValidation(password) {
  const passwordRegEx =
    /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
  const passwordMatch = passwordRegEx.test(password);
  return passwordMatch;
}
