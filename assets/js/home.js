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

const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
const loggedInUser = usersList.find((u) => u.loggedIn === true);
document.getElementById("userName").textContent = loggedInUser.name;

/*----------------------------------------
  01. Events
----------------------------------------*/
document.getElementById("logout").addEventListener("click", () => {
  loggedInUser.loggedIn = false;
  updateLocalStorage();
  location = "./index.html";
});
/*----------------------------------------
  02. Functions
----------------------------------------*/
function updateLocalStorage() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
}
