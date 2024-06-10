/*----------------------------------------

    Project: Login System
    
    JS INDEX
    ===================
    00. Variables
    01. Pseudo code
    02. Events
    03. Functions

----------------------------------------*/

/*----------------------------------------
  00. Variables
----------------------------------------*/
const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signInButton = document.getElementById("signInButton");

const invalidReport = document.getElementById("success");

const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
// Check if there is a user logged-in already
const loggedInUser = usersList.find((u) => u.loggedIn === true);
loggedInUser && logIn();

/*----------------------------------------
  01. Pseudo code
----------------------------------------*/

/**
 * check if already signed-in go to homepage
 * if not signed-in go to sign-in
 * In case of registration >>> Validate
 */

/*----------------------------------------
  02. Events
----------------------------------------*/

form.addEventListener("submit", (e) => e.preventDefault());

signInButton.addEventListener("click", () => {
  const user = usersList.find(
    (u) => u.email === emailInput.value && u.pw === passwordInput.value
  );
  if (user) {
    user.loggedIn = true;
    updateLocalStorage();
    logIn();
  } else report(invalidReport);
});

/*----------------------------------------
  03. Functions
----------------------------------------*/

function logIn() {
  location = "./home.html";
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
function updateLocalStorage() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
}