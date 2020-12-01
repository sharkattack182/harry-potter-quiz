// targeting elements on the page
var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");

// targeting options
var optionA = questionsEl.querySelector(".a");
var optionB = questionsEl.querySelector(".b");
var optionC = questionsEl.querySelector(".c");
var optionD = questionsEl.querySelector(".d");

// sets timer to start at 60 seconds
var secondsLeft = 60;

// questions objects with options and answers
var questions = {
    question: "which of the following is not not G?",
    a: "A",
    b: "B",
    c: "C",
    d: "G",
    answer: "d"
}

// set the question number to zero will be incremented as the player answers questions
var questionNumber = 0;

// general funtion of the game
function startGame() {

// changes the dislay from the welcome page to the questions page
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

// setting a timer to end the game when it hits zero
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + "seconds left."

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// initiates the quiz when player presses start
startBtn.addEventListener("click", function() {
    startGame();
})