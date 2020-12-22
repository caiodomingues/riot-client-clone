const inputs = [...document.getElementsByTagName("input")];
const labels = [...document.getElementsByTagName("label")];
const button = document.getElementById("submit");
const buttonImg = document.getElementById("button-img");
const form = document.getElementById("form");
const errorMessage = document.getElementById("error-message");

const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

inputs.forEach((input) => {
  let label = labels.filter((label) => label.htmlFor === input.id)[0];
  if (input.type !== "checkbox") {
    input.onchange = (e) => {
      if (e.target.value) {
        label.classList.add("has-content");

        if (input.type === "text") {
          if (e.target.value.length < 2) {
            input.classList.add("error");
            label.classList.add("error");
            errorMessage.style.display = "block";
            button.style.marginTop = "70px";
            errorMessage.innerHTML = "Deve ter pelo menos 2 caracteres";
          } else if (regex.test(e.target.value)) {
            input.classList.add("error");
            label.classList.add("error");
            errorMessage.style.display = "block";
            button.style.marginTop = "60px";
            errorMessage.innerHTML =
              "Caracteres especiais não são permitidos no nome de usuário";
          } else {
            input.classList.remove("error");
            label.classList.remove("error");
            errorMessage.style.display = "none";
            button.style.marginTop = "100px";
          }
        }
      } else {
        let label = labels.filter((label) => label.htmlFor === input.id)[0];
        label.classList.remove("has-content");

        if (e.target.value == "") {
          input.classList.remove("error");
          label.classList.remove("error");
          errorMessage.style.display = "none";
          button.style.marginTop = "100px";
        }
      }

      if (buttonSwitch()) {
        button.setAttribute("disabled", "disabled");
        buttonImg.setAttribute("src", "img/inactive_arrow.png");
      } else {
        button.removeAttribute("disabled");
        buttonImg.setAttribute("src", "img/active_arrow.png");
      }
    };
  } else {
    input.onchange = (e) => {
      input.checked
        ? (input.parentElement.style.color = "#000000FF")
        : (input.parentElement.style.color = "#00000050");
    };
  }
});

const buttonSwitch = () => {
  return inputs.some((input) => input.value === "");
};

form.onsubmit = (e) => {
  e.preventDefault();
};
