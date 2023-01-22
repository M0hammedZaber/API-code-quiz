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
  // get current question object from array
  var currentQuestion = questions[questionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionSelection;

    // display on the page
    choicesEl.appendChild(choiceNode);
  });
}