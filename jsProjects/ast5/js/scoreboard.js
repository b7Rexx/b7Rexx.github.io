function Scoreboard(parentElement) {
  var scoreList = undefined;
  var scoreValue = undefined;
  var bulletSpan = undefined;
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
    scoreList = document.createElement('ul');
    this.scoreboard.appendChild(this.currentScoreAppend);
    this.scoreboard.appendChild(scoreList);
    return this;
  };

  this.initPlayerScore = function (player) {
    scoreValue = document.createElement('span');
    this.currentScore(scoreValue, player);
    this.currentScoreAppend.appendChild(scoreValue);
    return scoreValue;
  };

  this.initBulletCharge = function () {
    bulletSpan = document.createElement('span');
    bulletSpan.classList.add('bullet-charge');
    bulletSpan.innerHTML = ' ';
    this.currentScoreAppend.appendChild(bulletSpan);
    return bulletSpan;
  };

  this.currentScore = function (scoreSpan, player) {
    scoreSpan.innerHTML = player + ' Score  : ' + this.currentScoreValue;
  };

  this.addScore = function (scoreSpan, player, playerStat, status) {
    var scoreListAppend = document.createElement('li');

    if (playerStat === 1) {
      scoreListAppend.innerHTML =
        '#' + (this.scoreListArray.length) + '| Level ' + this.scoreListArray[this.scoreListArray.length - 1].type +
        '<br>' + status + ' ' + player + ' |Score : ' + this.scoreListArray[this.scoreListArray.length - 1].score;
    } else if (playerStat === 2) {
      scoreListAppend.innerHTML =
        status + ' ' + player + ' |Score : ' + this.scoreListArray[this.scoreListArray.length - 1].score + '<hr>';
    } else {
      scoreListAppend.innerHTML =
        '#' + (this.scoreListArray.length) + '| Level ' + this.scoreListArray[this.scoreListArray.length - 1].type +
        '|Score : ' + this.scoreListArray[this.scoreListArray.length - 1].score;
    }
    scoreList.appendChild(scoreListAppend);
    this.currentScoreValue = 0;
    this.currentScore(scoreSpan, player);
  };
}
