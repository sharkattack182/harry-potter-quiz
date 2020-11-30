var startBtn = document.querySelector(".start");
var welcomeEl = document.querySelector(".welcome");
var questionsEl = document.querySelector(".questions");


startBtn.addEventListener("click", function() {
    welcomeEl.style.display = "none";
    questionsEl.style.display = "block";
})