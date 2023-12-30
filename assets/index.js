const CardsArray = [
  "🍟",
  "🍟",
  "🎈",
  "🛹",
  "🧀",
  "🎈",
  "🎠",
  "🛴",
  "🛹",
  "🎠",
  "🛴",
  "🧀",
];
const gameGrid = document.getElementById("game");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const textInfos = document.getElementById("textInfos");
const restart = document.getElementById("restart");
let scoreJ1 = 0;
let scoreJ2 = 0;
let j1 = true;
let j2 = false;
let cardIndex;
let cardContent;
let isClickable = true;
let cardReturned = 0;

gameGrid.innerHTML = CardsArray.map(
  (card, index) => `
  <div class="card" id=${index}> ${card} </div>
  `
).join("");

const cards = document.querySelectorAll(".card");

const Play = (card) => {
  if (isClickable) {
    card.classList.add("cardOpen");
    if (!cardContent) {
      cardIndex = card.id;
      cardContent = card.textContent;
    } else {
      isClickable = false;
      if (cardContent == card.textContent) {
        if (j1) {
          scoreJ1++;
          score1.textContent = scoreJ1;
          textInfos.textContent = "bravo J1";
          j1 = true;
          j2 = false;
        } else if (j2) {
          scoreJ2++;
          score2.textContent = scoreJ2;
          textInfos.textContent = "bravo J2";
          j2 = true;
          j1 = false;
        }
        textInfos.style.display = "block";
        cardReturned = cardReturned + 2;
        setTimeout(() => {
          textInfos.style.display = "none";
          isClickable = true;
        }, 1500);
      } else {
        if (j1) {
          j1 = false;
          j2 = true;
        } else {
          j1 = true;
          j2 = false;
        }
        setTimeout(() => {
          card.classList.remove("cardOpen");
          cards[cardIndex].classList.remove("cardOpen");
          isClickable = true;
        }, 1500);
      }
      setTimeout(() => {
        cardContent = "";
        cardIndex = "";
      }, 1500);
    }
    if (cardReturned >= cards.length) {
      isClickable = false;
      textInfos.textContent = "fini !";
    }
  }
};

cards.forEach((card) => {
  card.addEventListener("click", () => Play(card));
});
restart.addEventListener("click", () => {
  scoreJ1 = 0;
  scoreJ2 = 0;
  j1 = true;
  j2 = false;
  cardIndex;
  cardContent;
  isClickable = true;
  cardReturned = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  cards.forEach((card) => {
    card.classList.remove("cardOpen");
  });
});
