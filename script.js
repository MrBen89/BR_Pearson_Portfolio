const input = document.getElementById("selection")
const contentBox = document.getElementById("content")
const bio = document.getElementById("bio").innerHTML
const stack = document.getElementById("stack").innerHTML
const projects = document.getElementById("projects").innerHTML
const contact = document.getElementById("contact").innerHTML
const options = document.getElementById("options")
const optionsInner = document.getElementById("options-inner").innerHTML

let charArray = []
let selectionText = []

const elementDraw = (element) => {
  const list = element.split("<br>")
  console.log(list)
  options.innerHTML = "";
  for (let i = 0; i<list.length; i++) {
    setTimeout(() => {
      contentBox.innerHTML += list[i].replace(">", "") + "<br>";
    }, i*100);
  }
}

document.addEventListener("keydown", (event) => {
  key = event.keyCode
  if (key >= 65 && key <= 90 || (key >= 48 && key <= 57) || (key >= 97 && key <= 122)) {
    selectionText.push(event.key)
    input.innerText = selectionText.join("")
  } else if (key == 8){
    selectionText.pop()
    input.innerText = selectionText.join("")
  } else if (key == 13) {
    switch (selectionText.join("").toUpperCase()) {
      case "BIO":
        contentBox.innerHTML = "";
        input.innerText = "";
        selectionText = [];
        elementDraw(bio + optionsInner)
        break;
      case "STACK":
        contentBox.innerHTML = "";
        input.innerText = ""
        selectionText = []
        contentBox.innerHTML = stack;
        elementDraw(optionsInner)
        break;
      case "PROJECTS":
        contentBox.innerHTML = "";
        input.innerText = ""
        selectionText = []
        elementDraw(projects + optionsInner)
        break;
      case "CONTACT":
        contentBox.innerHTML = "";
        input.innerText = ""
        selectionText = []
        elementDraw(contact + optionsInner)
        break;
      default:
        input.innerText += "\nCommand Not Recognised\n"
        break;
    }

  }

})
