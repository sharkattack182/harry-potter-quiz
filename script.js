var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");
var timerEl = document.querySelector(".timer");

var secondsLeft = 60;

function startGame() {
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";

    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + "seconds left."

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}


startBtn.addEventListener("click", function() {
    startGame();
})