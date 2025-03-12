input = document.getElementById("selection")
console.log(input)

charArray = []
selectionText = []

document.addEventListener("keydown", (event) => {
  console.log(event)
  key = event.keyCode
  if (key >= 65 && key <= 90 || (key >= 48 && key <= 57) || (key >= 97 && key <= 122)) {
    selectionText.push(event.key)
    input.innerText = selectionText.join("")
  } else if (key == 8){
    selectionText.pop()
    input.innerText = selectionText.join("")
  } else if (key == 13) {
    console.log(selectionText.join().toUpperCase())
    switch (selectionText.join("").toUpperCase()) {
      case "STACK":
        input.innerText += "\n RUBY!"
      case "PROJECTS":

      case "CONTACT":

    }

  }

})
