let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let playBtn = document.querySelector("#playBtn");

let menosBtn = document.querySelector("#menosBtn");
let maisBtn = document.querySelector("#maisBtn");

let scoreValue = document.querySelector("#score span");
let livesValue = document.querySelector("#lives span");
let score = 0;
let lives = 3;
scoreValue.textContent = score.toString().padStart(2, "0");
livesValue.textContent = lives.toString();

let gameOver = document.querySelector("#gameOver");
let newGameBtn = document.querySelector("#newGame");

// Reiniciar
playBtn.addEventListener("click", restartGame, false);

// dificuldade
function setDifficulty(level, button) {
  vel = level;
  // remove a classe ativa de todos os botões
  document
    .querySelectorAll(".levels")
    .forEach((btn) => btn.classList.remove("active"));
  // adiciona a classe 'ativo' ao botão clicado
  button.classList.add("active");
}
easy.addEventListener("click", () => setDifficulty(3, easy));
normal.addEventListener("click", () => setDifficulty(5, normal));
hard.addEventListener("click", () => setDifficulty(9, hard));
//
menosBtn.addEventListener("click", diminuirVel, false);
maisBtn.addEventListener("click", aumentarVel, false);
//
//canvas.addEventListener("click", lerDados, false);
canvas.addEventListener("click", ufoPosition, false);
canvas.addEventListener("click", fire, false);
canvas.addEventListener("click", target, false);
//
newGameBtn.addEventListener("click", newGame, false);
//
let ufo = new Image();
let x = 0;
let y = 30;
let vel = 5; // receber o valor definido em 'levels'
ufo.src = "ufo.png";

/* ufo.addEventListener("load", draw, false); */
let anim = setInterval(draw, 30);

function draw() {
  drawBackground();
  ctx.drawImage(ufo, x, y);
  x += vel;

  if (x > 401) {
    //301
    x = -50;
    y = Math.random() * 350; //250
  }

  if (x < -51) {
    x = 400; //300
    y = Math.random() * 350; //250
  }
}

function drawBackground() {
  //céu
  let lineGrad = ctx.createLinearGradient(0, 0, 0, 400); //(0, 0, 0, 300)
  lineGrad.addColorStop(0, "black");
  lineGrad.addColorStop(1, "#5498d1");
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, 400, 400); //(0, 0, 300, 300)

  //estrelas
  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.arc(55, 58, 3, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(227, 128, 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(214, 50, 1, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(138, 117, 1, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(43, 195, 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(294, 15, 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(185, 223, 1, 0, Math.PI * 2, false);
  ctx.fill();
  //
  ctx.beginPath();
  ctx.arc(260, 240, 3, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(370, 370, 1.7, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(87, 270, 1, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(36, 322, 2, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(153, 342, 3, 0, Math.PI * 2, false);
  ctx.fill();
  //
  ctx.beginPath();
  ctx.arc(271, 316, 1, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(320, 170, 1, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(371, 88, 1.5, 0, Math.PI * 2, false);
  ctx.fill();
}

function diminuirVel() {
  clearInterval(anim);
  anim = setInterval(draw, 30);
  vel -= 2;
}

function aumentarVel() {
  clearInterval(anim);
  anim = setInterval(draw, 30);
  vel += 2;
}

function restartGame() {
  clearInterval(anim);
  x = 0;
  y = 30;
  vel = 5;
  anim = setInterval(draw, 30);
  document
    .querySelectorAll(".levels")
    .forEach((btn) => btn.classList.remove("active"));
}

function newGame() {
  score = 0;
  lives = 3;
  scoreValue.textContent = "00";
  livesValue.textContent = "3";
  //document.getElementById("gameOver").style.display = "none";
  gameOver.style.display = "none";
  anim = setInterval(draw, 30); // retoma animação
}

// implementação de tiro
//
/* function lerDados(e) {
  console.log("Ler dados: ", e);
  // vel = 0;
  clearInterval(anim); // Para a sequência de movimento ao clicar
} */
//
let naveX = 0;
let naveY = 0;
let aimX = 0;
let aimY = 0;

function ufoPosition(e) {
  // posição da nave
  naveX = x;
  naveY = y;
  //console.log("UFO position X:", naveX);
  //console.log("UFO position Y:", naveY);
  clearInterval(anim); // Para a sequência de movimento ao clicar
}

function fire(e) {
  // posição do tiro
  aimX = e.offsetX;
  aimY = e.offsetY;
  //console.log("Aim X:", aimX);
  //console.log("Aim Y:", aimY);
  //console.log("-------------------------");
}

function showBang() {
  const bang = document.querySelector("#bang-message");
  bang.style.display = "block";
  setTimeout(() => {
    bang.style.display = "none";
  }, 800);
}

function showFail() {
  const fail = document.querySelector("#fail-message");
  fail.style.display = "block";
  setTimeout(() => {
    fail.style.display = "none";
  }, 800);
}

function target() {
  // compara a posição da nave x posição do tiro (com 30 de margem de erro)
  if (Math.abs(naveX - aimX) < 25 && Math.abs(naveY - aimY) < 25) {
    //alert("Bang!");
    showBang();
    score++;
    scoreValue.textContent = score.toString().padStart(2, "0");
  } else {
    //alert("Fail!");
    showFail();
    lives--;
    livesValue.textContent = lives.toString();
  }
  if (lives <= 0) {
    gameOver.style.display = "block";
    clearInterval(anim);
    //alert("Game Over!");
  }
}

console.log("Score", score);
