/*----------------------------------------

    Project: Login System
    
    JS INDEX
    ===================
    00. Variables
    01. Events
    02. Functions

----------------------------------------*/

/*----------------------------------------
  00. Variables
----------------------------------------*/
const form = document.forms[0];
const formInputs = document.querySelectorAll("input");
const nameInput = document.querySelector("#signupName");
const emailInput = document.querySelector("#signupEmail");
const pwInput = document.querySelector("#signupPassword");

const signUpButton = document.getElementById("signUpButton");
const successReport = document.getElementById("success");
const invalidEmailReport = document.getElementById("invalidEmailReport");

const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

/*----------------------------------------
  01. Events
----------------------------------------*/

form.addEventListener("submit", (e) => e.preventDefault());

formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const inputValue = input.value.trim();
    let isValid = false;
    switch (input) {
      case nameInput:
        isValid = validateName(inputValue);
        break;

      case emailInput:
        isValid = validateEmail(inputValue);
        break;

      case pwInput:
        isValid = validatePW(inputValue);
        break;

      default:
        throw new Error("None of the inputs");
    }
    input.classList.remove("is-valid", "is-invalid");
    isValid
      ? input.classList.add("is-valid")
      : input.classList.add("is-invalid");
  });
});

signUpButton.addEventListener("click", () => {
  if (!nameInput.classList.contains("is-valid")) {
    report(nameInput.nextElementSibling);
  } else if (!emailInput.classList.contains("is-valid")) {
    invalidEmailReport.textContent = "Invalid email!";
    report(emailInput.nextElementSibling);
  } else if (alreadyUsedEmail()) {
    invalidEmailReport.textContent = "Email already used before.";
    report(emailInput.nextElementSibling);
  } else if (!pwInput.classList.contains("is-valid")) {
    report(pwInput.nextElementSibling);
  } else {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      pw: pwInput.value,
      loggedIn: false,
    };
    usersList.push(newUser);
    updateLocalStorage();
    report(successReport);

    formInputs.forEach((el) => {
      el.value = "";
      el.classList.remove("is-valid", "is-invalid");
    });
  }
});

/*----------------------------------------
  02. Functions
----------------------------------------*/

function validateName(value) {
  return /^[a-zA-Z]{2,}( [a-zA-Z]*)*$/.test(value);
}
function validateEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}
function validatePW(value) {
  return /^.+$/.test(value);
}

function updateLocalStorage() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
}

let isReporting = false;
function report(element) {
  if (!isReporting) {
    isReporting = true;
    element.classList.add("reporting");
    // Prevent user from spamming the button
    setTimeout(() => {
      element.classList.remove("reporting");
      isReporting = false;
    }, 4000);
  }
}

function alreadyUsedEmail() {
  return usersList.some((u) => u.email == emailInput.value);
}
