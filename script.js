// targeting elements on the page
var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");

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

// starts the game
function start() {
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

    window.timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + "seconds left."

        if (secondsLeft === 0) {
            clearInterval(window.timerInterval);
            endGame();
        }
    }, 1000);

    nextQuestion();
}

// ends game
function endGame() {
    console.log("game over");
    console.log(secondsLeft);
    clearInterval(window.timerInterval);
}

// function for correct answer just console logs and goes to the next question
function correct() {
    console.log("correct");
    nextQuestion();
}

// function for wrong answer console logs wrong and deducts five seconds
function wrong() {
    console.log("wrong");
    secondsLeft -= 5;
}

// dislays question content and verifies if the answer is correct or not then runs the appropriate function
function nextQuestion() {
    questionNumber++;
    q = questionNumber + 1;

    if (questionNumber > questions.length -1) {
        endGame();
        return;
    }

    var quizContent = "<h1>Question Number " + q + "<h1> <h2>" + questions[questionNumber].title + "</h2>"

    for (var i = 0; i < questions[questionNumber].choices.length; i++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[questionNumber].choices[i]);
        if (questions[questionNumber].choices[i] == questions[questionNumber].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "wrong()");
        }
        quizContent += buttonCode
    }
    questionsEl.innerHTML = quizContent;
}

// initiates the quiz when player presses start
startBtn.addEventListener("click", function () {
    start();
})