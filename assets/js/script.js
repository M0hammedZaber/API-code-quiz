// Firstly I will create and declare the Document Object Model elements.
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Here I am creating the quiz state variables with a little detailed timer initiation.
var questionIndex = 0;
var time = questions.length * 10;
var timing;

function startQuiz() {
    // starting with the hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // using the formula to un-hide the questions section
    questionsEl.removeAttribute("class");
  
    // Here I will set the timer details i want
    clockTimer = setInterval(timing, 1000);

    // This will be needed to show the starting time
  timerEl.textContent = time;

  getQuestions();
}

function getQuestions() {
  // fetching the current question object from array
  var currentQuestion = questions[questionIndex];

  // A quick update of the title with the current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // the formula to remove the older choices of questions.
  choicesEl.innerHTML = "";

  // A loop will be created to go over the choices.
  
  currentQuestion.choices.forEach(function(choice, i) {
    // will make sense to create a new button for each avialable choice.
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // An event listener will be attached to each available choice.
    choiceNode.onclick = questionSelection;

    choicesEl.appendChild(choiceNode);
  });
}

  function questionSelection() {
    // Time will be penalized if a quessed is answered incorrectly, this will be checked here.
    if (this.value !== questions[questionIndex].answer) {
      // How the time will be calcualted for wrong answer and penalized.
      time -= 10;
  
      if (time < 0) {
        time = 0;
      }
      // New time will be shown on the page.
      timerEl.textContent = time;
      feedbackEl.textContent = "Oh no! That's wrong!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "200%";
    } else {
      feedbackEl.textContent = "Yay! That's correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "200%";
    }
  
    // feedback will be given/flashed whether right or wrong.
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  // Going through the questions, next question
  questionIndex++;

  // The time checker
  if (questionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestions();
  }
}

function quizEnd() {
  // Need a stopper for the timer.
  clearInterval(clockTimer);

  // Need to use this to show the final end screen.
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Need to show the final resul/ score. 
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Here will be hiding the questions section.
  questionsEl.setAttribute("class", "hide");
}

function timing() {
  // Here the timing function will update the time.
  time--;
  timerEl.textContent = time;

  // Does the user have enough time or has it elapsed.
  if (time <= 0) {
    quizEnd();
  }
}

function savingScores() {
  // Need to have the data inputted within the box.
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Retreiving saved scores from the localstorage. Here if no scores are retrived then set to an empty array.
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // New score for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // Localstorage saved here.
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // push to another page.
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    savingScores();
  }
}

submitBtn.onclick = savingScores;

startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;