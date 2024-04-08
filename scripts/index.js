let directToWelcome = document.querySelector(".direct-to-welcome");
//From sign up to login
let fromSignUpTo = document.querySelector(".from-sign-up-to");
let fromLoginTo = document.querySelector(".from-login-to");
let userName = document.querySelector(".username");
let nameInput = document.querySelector(".name-input");
let emailInput = document.querySelector(".email");
let passwordInput = document.querySelector(".password");
let successMsg = document.querySelector(".success-msg");
let errorMsg = document.querySelector(".error-msg");

let userLogin = JSON.parse(localStorage.getItem("userId")) || "why you here";
console.log(userLogin);
if (userName !== null) {
  userName.textContent = `${userLogin}`;
}

let usersList = JSON.parse(localStorage.getItem("usersData")) || [];
// For login
if (directToWelcome !== null) {
  directToWelcome.addEventListener("click", function (e) {
    e.preventDefault();
    if (emailInput.value === "" && passwordInput.value === "") {
      document
        .querySelector(".error-msg")
        .classList.replace("d-none", "d-block");
    }
  });
}

//Implement Direct From sign up to Welcome page
if (fromSignUpTo !== null) {
  fromSignUpTo.addEventListener("click", function () {
    if (
      nameInput.value === "" &&
      emailInput.value === "" &&
      passwordInput.value === ""
    ) {
      document
        .querySelector(".error-msg")
        .classList.replace("d-none", "d-block");
    } else if (
      nameInput.value === "" ||
      emailInput.value === "" ||
      passwordInput.value === ""
    ) {
      errorMsg.classList.replace("d-none", "d-block");
    }
    if (
      nameInput.value !== "" &&
      emailInput.value !== "" &&
      passwordInput.value !== ""
    ) {
      let newUser = {
        name: nameInput.value.toLowerCase(),
        password: passwordInput.value.toLowerCase(),
        email: emailInput.value.toLowerCase(),
      };

      for (let i = 0; i < usersList.length; i++) {
        if (newUser.email === usersList[i].email) {
          errorMsg.classList.replace("d-none", "d-block");
          errorMsg.textContent = `User is already exist try to login`;
          return;
        }
      }
      usersList.push(newUser);
      localStorage.setItem("usersData", JSON.stringify(usersList));
      userLogin = nameInput.value.toLowerCase();
      localStorage.setItem("userId", JSON.stringify(userLogin));
      successMsg.classList.replace("d-none", "d-block");
      fromSignUpTo.href = "./welcome.html";
      setTimeout(function () {}, 500);
    }
  });
}

//Implment Direct From sign in to Welcome page
if (fromLoginTo !== null) {
  fromLoginTo.addEventListener("click", function (e) {
    for (let i = 0; i < usersList.length; i++) {
      if (
        emailInput.value.toLowerCase() === usersList[i].email &&
        passwordInput.value.toLowerCase() === usersList[i].password
      ) {
        fromLoginTo.href = "./welcome.html";
        return;
      }
    }
    errorMsg.classList.replace("d-none", "d-block");
    errorMsg.textContent = `Invalid Email or Password`;
    e.preventDefault();
  });
}
