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

//game timer functions and variables
let sec = 0;
let min = 0;
let timer;

startTimer function() { // starts the timer and sets the interval for it's count
  timer = setInterval(gameTimer, 1000);
}

stopTimer function(){
  clearInterval(timer);
  sec = 0;
  min = 0;
}

gameTimer function (){  //adds secs and minutes to html class .gameTimer
  sec++

  if (sec < 10) {
    sec = '0${sec}';
  }

  if (sec >= 60) {
    min++
    sec = "00";
  }
  document.querySelector('game-timer').innerHTML = "0" + min + ":" + sec;
}



//creates card element html to use in grid
function makeCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

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

       if (openCards.length == 2){
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
         openCards = []; //clears openCards after a non-match
        }, 1000);
      }
     }
    }
   });
 });

//Counting moves function


//reset function
