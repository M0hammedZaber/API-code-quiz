function printHighscores() {
    // Here like script.js scores either get taken from the the localstorage or set to empty array.
    var highscores =
    
    JSON.parse(window.localStorage.getItem("highscores")) || [];
 
    // Allignment of scores sorted in descending order.
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
 
    highscores.forEach(function(score) {
      // li's will be created for all individual high scores.
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
 
      // what is going to be shown on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
 
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
 
  document.getElementById("clear").onclick = clearHighscores;
 
  // Need to have a function running when the page is loaded.
  printHighscores();