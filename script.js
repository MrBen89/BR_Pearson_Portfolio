const input = document.getElementById("selection")
const contentBox = document.getElementById("content")
const bio = document.getElementById("bio").innerHTML
const stack = document.getElementById("stack").innerHTML
const projects = document.getElementById("projects").innerHTML
const contact = document.getElementById("contact").innerHTML
const snake = document.getElementById("snake").innerHTML
const snake_box = document.getElementById("snake-box")
const options = document.getElementById("options")
const optionsInner = document.getElementById("options-inner").innerHTML
let mode = "input";
let direction = "up";
let snake_arr = [[5,5],[6,5],[7,5],[8,5]];
let snake_elements = [];
let food = [2,7];

let charArray = []
let selectionText = []

const elementDraw = (element) => {
  const list = element.split("<br>")
  console.log(list)
  options.innerHTML = "";
  for (let i = 0; i<list.length; i++) {
    setTimeout(() => {
      contentBox.innerHTML += list[i].replace(">", "") + "<br>";
      document.getElementById("end-block").scrollIntoView({ behavior: "instant", block: "end" });
    }, i*100);
  }
}

document.addEventListener("keydown", (event) => {
  key = event.keyCode
  if (mode == "input"){
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
          contentBox.innerHTML = projects;
          elementDraw(optionsInner)
          break;
        case "CONTACT":
          contentBox.innerHTML = "";
          input.innerText = ""
          selectionText = []
          elementDraw(contact + optionsInner)
          break;
        case "SNAKE":
          contentBox.innerHTML = "";
          input.innerText = ""
          selectionText = []
          contentBox.innerHTML = snake;
          mode = "snake"
          snek()
          break;
        default:
          input.innerText += "\nCommand Not Recognised\n"
          break;
      }

    }
  } else if (mode == "snake"){
    if (key == 37) {
      direction = "left";
      event.preventDefault();
    } else if (key == 38) {
      direction = "up";
      event.preventDefault();
    } else if (key == 39) {
      direction = "right";
      event.preventDefault();
    } else if (key == 40) {
      direction = "down";
      event.preventDefault();
    } else if (key == 81) {
      direction = "left"
    }
  }

})

const snek_start = (() => {
  snake_elements = [];
  createBlock([5,5])
  snek()
})

const createBlock = ((coords) => {
  let segment = document.createElement("div");
    segment.classList.add("snake-block")
    segment.innerText = "";
    moveBlock(segment, coords)
    snake_elements.push(segment)
    snake_arr.push(coords)
    document.querySelector(".snake-box").appendChild(segment)
})

const moveBlock = ((block, coords) => {
  block.style.top = `${coords[1] * 25}`
  block.style.left = `${coords[0] * 25}`
})

const snek = (() => {
  let temp_x = snake_arr[0][1]
  let temp_y = snake_arr[0][0]
  document.querySelector(".snake-box").innerHTML = ""
  if (direction == "up") {
    snake_arr[0][0] -= 1;
  } else if (direction == "down") {
    snake_arr[0][0] += 1;
  } else if (direction == "left") {
    snake_arr[0][1] -= 1;
  } else if (direction == "right") {
    snake_arr[0][1] += 1;
  }

  for (let x=1; x<snake_arr.length; x++){
    let temp2_x = snake_arr[x][1];
    let temp2_y = snake_arr[x][0];
    snake_arr[x] = [temp_x, temp_y];
    temp_x = temp2_x;
    temp_y = temp2_y;
  }

  snake_arr.forEach((element) => {
    let segment = document.createElement("div");
    segment.classList.add("snake-block")
    segment.innerText = "";
    segment.style.top = `${element[0] * 25}`
    segment.style.left = `${element[1] * 25}`
    document.querySelector(".snake-box").appendChild(segment)
    console.log(element)
  })
  setTimeout((snek), (2000 - snake_arr.length * 20))
})
