// new page 
const newEl = document.querySelector("#new");
const newQuizBtnEl = document.querySelector("#newQuiz");

//game
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");

//Scoring
const inputScoreEl = document.querySelector("#inputScore");
const initialsEl = document.querySelector("#initials");
const submitInitialsBtnEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");

//high score
const highScoreEl = document.querySelector("#highScore");
const ScoreEl = document.querySelector("#Score");
const playAgainBtnEl = document.querySelector("#playAgain");
const clearScoreBtnEl = document.querySelector("#clearScore");


const HighScoreBtnEl = document.querySelector("#HighScore");
const timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScore = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

//timer1 new
function newTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

//timer2 end
function stopTimer() {
    clearInterval(interval);
}

//Clears current question and calls for display of next question
//Calls for input score display if last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

//checks answer based on current question and updates the user score
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
        displayMessage("Correct!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Wrong...");
    }
}

//display message
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".main").appendChild(messageHr);
    document.querySelector(".main").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);

}

//hides 
function hide(element) {
    element.style.display = "none";
}

//display
function show(element) {
    element.style.display = "block";
}

//reset
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}



//Shows current question
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

//Renders high Score stored in local storage
function renderHighScore() {
    // Clear content
    ScoreEl.innerHTML = "";
    show(highScoreEl);
    highScore = JSON.parse(localStorage.getItem("Score"));
    for (let i = 0; i < highScore.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:PaleTurquoise;");
        scoreItem.textContent = `${(i + 1)}. ${highScore[i].username} - ${highScore[i].userScore}`;
        ScoreEl.appendChild(scoreItem);
    }
}


//displays high Score
HighScoreBtnEl.addEventListener("click", function () {
    hide(newEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScore();
    stopTimer();
    reset();
});

//news quiz from  new page
newQuizBtnEl.addEventListener("click", function () {
    hide(newEl);
    newTimer();
    renderQuestion();
    show(quizEl);
});

//Calls to check answer selected and calls to next question if button is clicked
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

//Creates a user score object to push to the local storage Score array calls to display high Score
//calls to render high Score
submitInitialsBtnEl.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScore = JSON.parse(localStorage.getItem("Score")) || [];
        highScore.push(userScore)
        localStorage.setItem("Score", JSON.stringify(highScore));
        hide(inputScoreEl);
        renderHighScore();
        reset();
    }
});

//Goes back to new page from high score 
playAgainBtnEl.addEventListener("click", function () {
    hide(highScoreEl);
    show(newEl);
});

//Clears saved Score from local storage
clearScoreBtnEl.addEventListener("click", function () {
    highScore = [];
    localStorage.setItem("Score", JSON.stringify(highScore));
    renderHighScore();
});




