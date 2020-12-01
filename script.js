// targeting elements on the page
var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");

// targeting options
var header = questionsEl.querySelector(".header")
var questionDisplay = questionsEl.querySelector(".question")
var optionA = questionsEl.querySelector(".a");
var optionB = questionsEl.querySelector(".b");
var optionC = questionsEl.querySelector(".c");
var optionD = questionsEl.querySelector(".d");

// sets timer to start at 60 seconds
var secondsLeft = 60;
var questionNumber = -1;

// questions objects with options and answers
var questions = [
    {
        title: "which of the following is F?",
        choices: ["1", "2", "3", "F"],
        answer: "F"
    },
    {
        title: "which of the following is B?",
        choices: ["1", "B", "3", "4"],
        answer: "B"
    },
    {
        title: "which of the following is D?",
        choices: ["D", "2", "3", "4"],
        answer: "D"
    },
    {
        title: "which of the following is K?",
        choices: ["1", "2", "K", "4"],
        answer: "K"
    },
];

// ends game
function endGame() {
    console.log("game over")
}

// starts the game
function start() {
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + "seconds left."

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);

    nextQuestion();
}

function correct() {
    console.log("correct");
    nextQuestion();
}

function wrong() {
    console.log("wrong");
    secondsLeft = -5;
}

function nextQuestion() {
    questionNumber++;

    if (questionNumber > 3) {
        endGame();
        return;
    }

    header.textContent = "Question Number " + questions[questionNumber].number;
    questionDisplay.textContent = questions[questionNumber].question;
    optionA.textContent = questions[questionNumber].a;
    optionB.textContent = questions[questionNumber].b;
    optionC.textContent = questions[questionNumber].c;
    optionD.textContent = questions[questionNumber].d;

    var options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {

        // add an event listener to all the buttons
        options[i].addEventListener("click", function () {

            // check the value of the button to the answer key in the object if its correct the question number increases
            if (this.value === questions[questionNumber].answer) {
                correct();

                // if the answer is wrong the user loses 5 seconds
            } else {
                wrong();
            }
        })
    }

}

// initiates the quiz when player presses start
startBtn.addEventListener("click", function () {
    start();
})