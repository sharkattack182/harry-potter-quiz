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
var scores = [{
    user: "example",
    score: 100
}];

// questions objects with options and answers
var questions = [
    {
        title: "What does one say to close the Marauder’s Map and make it blank again?",
        choices: ["Mischief Managed", "Nothing to See Here", "All Done", "Hello Professor"],
        answer: "Mischief Managed"
    },
    {
        title: "Who has been stealing Harry’s letters from Ron and Hermione at the beginning of ‘Harry Potter and the Chamber of Secrets’?",
        choices: ["Dumbledore", "Draco Malfoy", "Dobby", "The Dursleys"],
        answer: "Dobby"
    },
    {
        title: "From what King’s Cross platform does the Hogwarts Express leave?",
        choices: ["Eight and One-quarter", "Nine and Three-quarters", "Five and a Half", "Eleven"],
        answer: "Nine and Three-quarters"
    },
    {
        title: "What are the names of Draco Malfoy’s two cronies?",
        choices: ["Huggs and Pucey", "Flint and Boyle", "Crabbe and Goyle", "Pike and Zabini"],
        answer: "Crabbe and Goyle"
    },
];

// starts the game
function start() {
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

    questionNumber = -1;
    window.timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds left."

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
    console.log(scoresArray);
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

    document.querySelector(".scoreboard").innerHTML = "";
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
            console.log(scores);
            scores.push(user);
            
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

    var quizContent = "<h1 class='question'>Question Number " + q + "<h1> <h2 class='question-content'>" + questions[questionNumber].title + "</h2>"

    for (var i = 0; i < questions[questionNumber].choices.length; i++) {
        var buttonCode = "<button class= 'choice' onclick=\"[ANS]\">[CHOICE]</button>";
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
    window.location.reload();

})

scorePage.addEventListener("click", function() {
    welcomeEl.style.display = "none";
    scoreList.style.display = "block";
    document.querySelector(".scoreboard").innerHTML = "";
    highscoreRedirect();
})