const gameContainer = document.getElementById("game");
let wait = false; // will be used in the funtion to disable clicking
firstCard = null;
secondCard = null;
cardsFlipped = 0;
let errors = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if(wait) return; // prevents clicking
  if(event.target.classList.contains("flipped")) return; // checks the clicked card

  let currentCard = event.target; // clicked card
  currentCard.style.backgroundColor = currentCard.classList[0]; // reveals color

  if(!firstCard || !secondCard) {
    currentCard.classList.add("flipped"); // checks if the card has been flipped or not
    firstCard = firstCard || currentCard;
    secondCard = currentCard === firstCard ? null : currentCard; // logic that keeps track of the cards currently flipped
  }

  if(firstCard && secondCard) {
    wait = true; // prevents clicking more than two cards at a time 
    let firstColor = firstCard.className;
    let secondColor = secondCard.className;

    // resets the wait function and keeps the cards flipped if there's a match
    if(firstColor === secondColor) {
      cardsFlipped +=2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      wait = false;
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = ""; // hides the color aka flips it backover
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        wait = false;
        errors ++; // add errors count
        document.getElementById("errors").innerText = errors; // updates error inner text
      }, 1000);
    }
  }
  if(cardsFlipped === COLORS.length) alert("You did it!")
}

// when the DOM loads
createDivsForColors(shuffledColors);
