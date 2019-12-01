function Scoreboard(parentElement) {
  var scoreList = undefined;
  this.scoreHeight = 400;
  this.scoreWidth = 250;

  this.currentScoreValue = 0;
  this.currentScoreAppend = [];
  this.scoreListArray = [];
  this.scoreboard = undefined;
  this.parentElement = parentElement;

  this.newScoreboard = function () {
    this.scoreboard = document.createElement('div');
    this.scoreboard.classList.add('scoreboard');
    this.scoreboard.style.height = this.scoreHeight + 'px';
    this.scoreboard.style.width = this.scoreWidth + 'px';
    this.parentElement.appendChild(this.scoreboard);

    var heading = document.createElement('h2');
    heading.innerHTML = 'Scoreboard';
    this.scoreboard.appendChild(heading);

    this.currentScoreAppend = document.createElement('h3');
    this.currentScoreAppend.innerHTML = 'Current Score  : ' + this.currentScoreValue;
    this.scoreboard.appendChild(this.currentScoreAppend);

    scoreList = document.createElement('ul');
    this.scoreboard.appendChild(scoreList);

    return this;
  };

  this.currentScore = function () {
    this.currentScoreAppend.innerHTML = 'Current Score  : ' + this.currentScoreValue;
  };
  this.addScore = function () {
    scoreList.innerHTML = '';
    this.scoreListArray.forEach(function (value, index) {
      var scoreListAppend = document.createElement('li');
      scoreListAppend.innerHTML = (index + 1) + '| Level ' + value.type + '|Score : ' + value.score;
      scoreList.appendChild(scoreListAppend);
    });
    this.currentScoreValue = 0;
    this.currentScoreAppend.innerHTML = 'Current Score  : ' + this.currentScoreValue;
  }
}
