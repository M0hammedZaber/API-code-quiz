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