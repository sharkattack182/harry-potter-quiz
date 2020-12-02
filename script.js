// targeting elements on the page
var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");
var highscores = document.querySelector(".addHighscores")
var nameInput = document.querySelector("#name");
var addScoreBtn = document.querySelector(".addName");
var scoreDisp = document.querySelector(".score");
var scoreList = document.querySelector(".highscores");
var homepage = document.querySelector(".return");
var scorePage = document.querySelector(".scorepage");

// sets timer to start at 60 seconds
var secondsLeft = 60;
var questionNumber = -1;
var scores = [];

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

// display scores 
function displayScores() {
    var scoresString = localStorage.getItem("scores");
    var scoresArray = JSON.parse(scoresString);
    console.log(scoresArray)
    var list = document.createElement("ul");

    for (let i = 0; i < scoresArray.length; i++) {
        var score = scoresArray[i].score;
        var name = scoresArray[i].user;

        var li = document.createElement("li");
        li.textContent = "User: " + name + "------------- Score: " + score;
        list.appendChild(li);
        
    }

    document.querySelector(".scoreboard").append(list);
}

// redirects to highscore page
function highscoreRedirect() {
    highscores.style.display = "none";
    scoreList.style.display = "block";

    timerEl.textContent = "Code Quiz"

    displayScores();
}

// ends game
function endGame() {
    console.log(secondsLeft);

    questionsEl.style.display = "none";
    highscores.style.display = "block";

    scoreDisp.textContent = secondsLeft;

    addScoreBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var user = {
            user: nameInput.value.trim(),
            score: secondsLeft
        }
    
        if (nameInput.value === "") {
            alert("please enter a valid name");
            return;
        } else {
            var string = localStorage.getItem("scores")
            var scores = JSON.parse(string);
            scores.push(user);
            console.log(scores);
            
        }  
        localStorage.setItem("scores", JSON.stringify(scores));
    highscoreRedirect();
    })

    

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

    if (questionNumber > questions.length - 1) {
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

homepage.addEventListener("click", function() {
    scoreList.style.display = "none";
    welcomeEl.style.display = "block";
})

scorePage.addEventListener("click", function() {
    welcomeEl.style.display = "none";
    scoreList.style.display = "block";
    highscoreRedirect();
})