const input = document.getElementById("selection")
const contentBox = document.getElementById("content")
const bio = document.getElementById("bio").innerHTML
const stack = document.getElementById("stack").innerHTML
const projects = document.getElementById("projects").innerHTML
const contact = document.getElementById("contact").innerHTML


let charArray = []
let selectionText = []

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
        input.innerText = "";
        selectionText = [];
        contentBox.innerHTML = bio;
        console.log(bio)
        break;
      case "STACK":
        input.innerText = ""
        selectionText = []
        contentBox.innerHTML = stack;
        break;
      case "PROJECTS":
        input.innerText = ""
        selectionText = []
        contentBox.innerHTML = projects;
        break;
      case "CONTACT":
        input.innerText = ""
        selectionText = []
        contentBox.innerHTML = contact;
        break;
      default:
        input.innerText += "\nCommand Not Recognised\n"
        break;
    }

  }

})
