// targeting elements on the page
var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");

// targeting options
var questionDisplay = document.querySelector(".question")
var optionA = questionsEl.querySelector(".a");
var optionB = questionsEl.querySelector(".b");
var optionC = questionsEl.querySelector(".c");
var optionD = questionsEl.querySelector(".d");

// sets timer to start at 60 seconds
var secondsLeft = 60;

// questions objects with options and answers
var questions = {
    question: "which of the following is not not G?",
    a: "1",
    b: "2",
    c: "3",
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

    console.log(questions.question)
    questionDisplay.textContent = questions.question;
    optionA.textContent = questions.a;
    optionB.textContent = questions.b;
    optionC.textContent = questions.c;
    optionD.textContent = questions.d;


// checks the answer
var options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function() {
        if (this.value === questions.answer) {
            console.log("correct")
            questionNumber++;
            console.log(questionNumber);
        } else {
            console.log("you are wrong");
            secondsLeft-5;
        }
    })   
    }
    

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