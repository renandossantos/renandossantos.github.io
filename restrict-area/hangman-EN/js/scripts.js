import getWord from "./words.js";

const contentBtns = document.querySelector(".btns");
const contentGuessWord = document.querySelector(".guess-word");
const img = document.querySelector("img");
const contentClue = document.querySelector(".clue");
const btnNew = document.querySelector("#new-game");
btnNew.onclick = () => init();

/* #################### */
const getElements = document.getElementById("game-screen");
const winImg = document.getElementById("win-img");
const loseImg = document.getElementById("lose-img");
/* #################### */

let indexImg;

function init() {
  btnNew.classList.add("hidden");
  getElements.classList.remove("hidden");
  winImg.classList.add("hidden");
  loseImg.classList.add("hidden");
  // -----------------
  indexImg = 1;
  img.src = `./images/img1.png`;

  generateGuessSection();
  generateButtons();
}

function generateGuessSection() {
  contentGuessWord.textContent = "";

  const { word, clue } = getWord();
  const wordWithoutAccent = word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  Array.from(wordWithoutAccent).forEach((letter) => {
    const span = document.createElement("span");

    span.textContent = "_";
    span.setAttribute("word", letter.toUpperCase());
    contentGuessWord.appendChild(span);
  });

  contentClue.textContent = `Dica: ${clue}`;
}

function wrongAnswer() {
  indexImg++;
  img.src = `./images/img${indexImg}.png`;

  if (indexImg === 7) {
    setTimeout(() => {
      /* alert("Perdeu!"); */
      getElements.classList.add("hidden");
      loseImg.classList.remove("hidden");
    }, 200);

    setTimeout(() => {
      /* alert("Perdeu!"); */
      init();
    }, 3000);
  }
}

function verifyLetter(letter) {
  const arr = document.querySelectorAll(`[word="${letter}"]`);

  if (!arr.length) wrongAnswer();

  arr.forEach((e) => {
    e.textContent = letter;
  });

  const spans = document.querySelectorAll(`.guess-word span`);
  const won = !Array.from(spans).find((span) => span.textContent === "_");

  if (won) {
    setTimeout(() => {
      /* alert("Perdeu!"); */
      getElements.classList.add("hidden");
      winImg.classList.remove("hidden");
    }, 200);

    setTimeout(() => {
      /* alert("Ganhou!!"); */
      init();
    }, 3000);
  }
}

function generateButtons() {
  contentBtns.textContent = "";

  for (let i = 97; i < 123; i++) {
    const btn = document.createElement("button");
    const letter = String.fromCharCode(i).toUpperCase();
    btn.textContent = letter;

    btn.onclick = () => {
      btn.disabled = true;
      btn.style.backgroundColor = "gray";
      verifyLetter(letter);
    };

    contentBtns.appendChild(btn);
  }
}
