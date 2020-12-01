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

// questions objects with options and answers
var questions = [
    {
    number: 1,
    question: "which of the following is not not G?",
    a: "1",
    b: "2",
    c: "3",
    d: "G",
    answer: "d"
},
{
    number: 2,
    question: "which of the following is not not F?",
    a: "h",
    b: "F",
    c: "r",
    d: "k",
    answer: "b"
},
{
    number: 3,
    question: "which of the following is not not G?",
    a: "Z",
    b: "d",
    c: "j",
    d: "p",
    answer: "a"
},
]

// set the question number to zero will be incremented as the player answers questions
var questionNumber = 0;

// general funtion of the game
function startGame() {

// changes the dislay from the welcome page to the questions page
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

    var a = questionNumber;

    console.log(questions[a].question)
    header.textContent = "Question Number " + questions[a].number;
    questionDisplay.textContent = questions[a].question;
    optionA.textContent = questions[a].a;
    optionB.textContent = questions[a].b;
    optionC.textContent = questions[a].c;
    optionD.textContent = questions[a].d;


// checks the answer
// create an array of option buttons 
var options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {

// add an event listener to all the buttons
    options[i].addEventListener("click", function() {
// check the value of the button to the answer key in the object if its correct the question number increases
        if (this.value === questions[a].answer) {
            console.log("correct")
            questionNumber++;
            console.log(questionNumber);
// if the answer is wrong the user loses 5 seconds
        } else {
            console.log("you are wrong");
            secondsLeft-=5;
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