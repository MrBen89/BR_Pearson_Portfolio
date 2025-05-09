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
let snake_arr = [[5,5],[5,4]];
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

const draw = ((snake_arr) => {
    const canvas = document.getElementById("snake-can");
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.fillStyle = "rgb(223, 228, 90)"
    snake_arr.forEach((element) => {
      ctx.fillRect(element[0]*25, element[1]*25, 25, 25)
    })
})

const snek = (() => {
  let temp_x = snake_arr[0][0]
  let temp_y = snake_arr[0][1]

  if (direction == "up") {
    snake_arr.unshift([temp_x,temp_y-1]);
  } else if (direction == "down") {
    snake_arr.unshift([temp_x,temp_y+1]);
  } else if (direction == "left") {
    snake_arr.unshift([temp_x-1,temp_y]);
  } else if (direction == "right") {
    snake_arr.unshift([temp_x+1,temp_y]);
  }
  snake_arr.pop();
  draw(snake_arr);

  setTimeout((snek), (2000 - snake_arr.length * 20))
})
