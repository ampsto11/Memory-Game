/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-diamond", "fa-diamond",
             "fa-paper-plane-o", "fa-paper-plane-o",
             "fa-anchor","fa-anchor",
             "fa-bolt", "fa-bolt",
             "fa-cube", "fa-cube",
             "fa-bomb", "fa-bomb",
             "fa-leaf", "fa-leaf",
             "fa-bicycle", "fa-bicycle"];

let moves = 0; //variable forthe move counter

let clockOff = true;
let time = 0;
let clockId;
//const minutes = Math.floor(time / 60);
//const seconds = time % 60;

//creates card element html to use in grid


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 function startGame() {
   let deck = document.querySelector('.deck');
   const cardHTML = shuffle(cards).map(function(card){  // shuffles cards and creates grid for cards on page
       return makeCard(card);
   });

   deck.innerHTML = cardHTML.join('');  //actually adds html to pages using data from makeCard
 }
startGame();

let allCards = document.querySelectorAll('.card'); // grabs all the cards by their class .card
let openCards = [];

allCards.forEach(function(card){
   card.addEventListener('click', function(e){
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
       openCards.push(card);
       card.classList.add('open', 'show');
       if (clockOff) {
         startClock();
         clockOff = false;
       }

       if (openCards.length > 2){
         if (openCards[0].dataset.card == openCards[1].dataset.card){
             openCards[0].classList.add('.match');
             openCards[0].classList.add('.open');
             openCards[0].classList.add('.show');

             openCards[1].classList.add('.match');
             openCards[1].classList.add('.open');
             openCards[1].classList.add('.show');

             openCards = []; //clears openCards for the rest of the function
           } else { //runs when cards don't match. can still click more than 2 cards if clicked quickly
             setTimeout(function(){
             openCards.forEach(function(card){
             card.classList.remove('open', 'show');
         });
         addMove();
         checkScore();
         openCards = []; //clears openCards after a non-match
        }, 1000);
      }
     }
    }
   });
 });

 function makeCard(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }

//timer function

function startClock() {
    clockId = setInterval(() => {
    time++;
    displayTime();
    }, 1000);
    console.log(startClock);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  clock.innerHTML = time;
  console.log(time);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    clock.innerHTML = '${minutes}:0${seconds}';
  } else {
    clock.innerHTML = '${minutes}:${seconds}';
  }
  console.log(displayTime);
}

function stopClock(){
  clearInterval(clockId);
}

//Counting moves function
function addMove(){
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//Score function
function checkScore() {
  if (moves === 16 || moves === 24) {
    hideStar();
  }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

//modal funtions

function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}
writeModalStats();
toggleModal(); //open modal
toggleModal(); //closes modal

function writeModalStats(){
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;

  timeStat.innerHTML = 'Time = ${clockTime}';
}
//reset function
