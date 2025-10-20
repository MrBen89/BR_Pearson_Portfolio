const input = document.getElementById("selection")
const contentBox = document.getElementById("content")
const bio = document.getElementById("bio").innerHTML
const biojp = document.getElementById("bio-jp").innerHTML
const stack = document.getElementById("stack").innerHTML
const projects = document.getElementById("projects").innerHTML
const projectsjp = document.getElementById("projects-jp").innerHTML
const contact = document.getElementById("contact").innerHTML
const snake = document.getElementById("snake").innerHTML
const snake_box = document.getElementById("snake-box")
const options = document.getElementById("options")
const optionsInnerjp = document.getElementById("options-inner-jp").innerHTML
const optionsInner = document.getElementById("options-inner").innerHTML
let mode = "input";
let lang = "english"
let direction = "up";
let snake_arr = [[5,5]];
let food = [2,7];
let score = 0;

let charArray = []
let textHistory = []
let selectionText = []
browserlang = navigator.language

if (browserlang == "ja" || browserlang == "ja-JP") {
  lang = "japanese"
}

const elementDraw = (element) => {
  const list = element.split("<br>")
  options.innerHTML = "";
  for (let i = 0; i<list.length; i++) {
    setTimeout(() => {
      contentBox.innerHTML += list[i] + "<br>";
      document.getElementById("end-block").scrollIntoView({ behavior: "instant", block: "end" });
    }, i*100);
  }
}

if (lang == "japanese") {
  contentBox.classList.add("japanese")
  contentBox.innerHTML = "";
  input.innerText = ""
  textHistory = "";
  selectionText = []
  elementDraw(optionsInnerjp)
}

document.addEventListener("keydown", (event) => {
  key = event.keyCode
  if (mode == "input"){
    if (key >= 65 && key <= 90 || (key >= 48 && key <= 57) || (key >= 97 && key <= 122)) {
      selectionText.push(event.key)
      input.innerText = textHistory
      input.innerText += selectionText.join("")
    } else if (key == 8){
      selectionText.pop()
      input.innerText = textHistory
      input.innerText += selectionText.join("")
    } else if (key == 13) {
      switch (selectionText.join("").toUpperCase()) {
        case "BIO":
          contentBox.innerHTML = "";
          input.innerText = "";
          textHistory = "";
          selectionText = [];
          if (lang == "english"){
            contentBox.classList.remove("japanese")
            elementDraw(bio + optionsInner)
          } else {
            contentBox.classList.add("japanese")
            elementDraw(biojp + optionsInnerjp)
          }
          break;
        case "STACK":
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          contentBox.innerHTML = stack;
          elementDraw(optionsInner)
          break;
        case "PROJECTS":
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          if (lang == "english"){
            contentBox.classList.remove("japanese")
            contentBox.innerHTML = projects
            elementDraw(optionsInner)
          } else {
            contentBox.classList.add("japanese")
            contentBox.innerHTML = projectsjp;
            elementDraw(optionsInnerjp)
          }


          break;
        case "CONTACT":
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          contentBox.classList.remove("japanese")
          elementDraw(contact + optionsInner)
          break;
        case "SNAKE":
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          contentBox.innerHTML = snake;
          mode = "snake"
          snake_arr = [[5,5]];
          food = [2,7];
          snek()
          break;
        case "JAPANESE":
          lang = "japanese"
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          contentBox.classList.add("japanese")
          elementDraw(optionsInnerjp)
          break;
        case "ENGLISH":
          lang = "english"
          contentBox.innerHTML = "";
          input.innerText = ""
          textHistory = "";
          selectionText = []
          contentBox.classList.remove("japanese")
          elementDraw(optionsInner)
          break;
        default:
          input.innerText += "\nCommand Not Recognised\n"
          textHistory = input.innerText
          selectionText = []
          document.getElementById("end-block").scrollIntoView({ behavior: "instant", block: "end" });
          break;
      }

    }
  } else if (mode == "snake"){
    if (key == 37 && direction != "right") {
      direction = "left";
      event.preventDefault();
    } else if (key == 38&& direction != "down") {
      direction = "up";
      event.preventDefault();
    } else if (key == 39 && direction != "left") {
      direction = "right";
      event.preventDefault();
    } else if (key == 40 && direction != "up") {
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
    ctx.fillStyle = "rgb(223, 228, 90)";
    snake_arr.forEach((element) => {
      ctx.fillRect(element[0]*25, element[1]*25, 25, 25)
    })

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect((food[0] *25) + 5, (food[1] * 25) + 5, 15, 15);
})

const eat_food = (() => {
  food[0] = Math.floor(Math.random() *10);
  food[1] = Math.floor(Math.random() *10);
  snake_arr.forEach((element) => {
    if (food[0] == element[0] && food[1] == element[1]){
      eat_food();
    };
  });
});

const is_gameover = (() => {
  if (snake_arr[0][0] < 0 || snake_arr[0][0] > 10 || snake_arr[0][1] < 0 || snake_arr[0][1] > 10){
    return true;
  };
  let string_arr = []
  snake_arr.forEach(element => {
    string_arr.push(element.toString())
  });
  let unique = Array.from(new Set(string_arr))
  return (unique.length != string_arr.length)
});

const game_over = (() => {
  const canvas = document.getElementById("snake-can");
  canvas.width = 250;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  ctx.font = ("20px Amstrad")
  ctx.fillStyle = "rgb(223, 228, 90)";
  ctx.fillText("GAME OVER", 37, 100);
  ctx.fillText(score, 120, 150);
  mode = "input";
});

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
  if (is_gameover()) {
    game_over();
  } else if (snake_arr[0][0] == food[0] && snake_arr[0][1] == food[1]){
    eat_food();
    score ++;
    draw(snake_arr);
    setTimeout((snek), (800 - snake_arr.length * 20))
  } else {
    snake_arr.pop();
    draw(snake_arr);
    setTimeout((snek), (800 - snake_arr.length * 20))
  }

})
