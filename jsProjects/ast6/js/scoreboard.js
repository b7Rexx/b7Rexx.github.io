class Scoreboard {
  constructor(parentElement) {

    this._highScore = 0;
    this._score = 0;
    this._element = undefined;
    this._highscoreElement = undefined;
    this._scoreElement = undefined;
    this._parentElement = parentElement;

    this.init();
  }

  init() {
    var parentScoreElement = document.createElement('div');
    parentScoreElement.classList.add('parent-score');
    this._parentElement.appendChild(parentScoreElement);

    this._highscoreElement = document.createElement('div');
    this._highscoreElement.classList.add('high-score');
    parentScoreElement.appendChild(this._highscoreElement);
    this.loadHighscore();

    this._scoreElement = document.createElement('div');
    this._scoreElement.classList.add('current-score');
    parentScoreElement.appendChild(this._scoreElement);
    this.loadCurrentscore();

    this._element = document.createElement('div');
    this._element.classList.add('game-over');
    this._element.style.display = 'none';
    this._parentElement.appendChild(this._element);


  }

  showElement() {
    var scoreToString = this._score.toString();
    var appendScoreHtml = '<img src="images/gameover.png" alt="game over"><br>';
    for (let i = 0; i < scoreToString.length; i++) {
      appendScoreHtml += '<img src="images/' + scoreToString.charAt(i) + '.png" alt="' + scoreToString.charAt(i) + '">';
    }
    this._element.innerHTML = appendScoreHtml;
    this._element.style.display = 'block';
  }

  hideElement() {
    this._element.style.display = 'none';
  }

  loadHighscore() {
    var scoreToString = this._highScore.toString();
    var appendScoreHtml = '';
    for (let i = 0; i < scoreToString.length; i++) {
      appendScoreHtml += '<img src="images/' + scoreToString.charAt(i) + '.png" alt="' + scoreToString.charAt(i) + '">';
    }
    this._highscoreElement.innerHTML = appendScoreHtml;
  }

  loadCurrentscore() {
    var scoreToString = this._score.toString();
    var appendScoreHtml = '';
    for (let i = 0; i < scoreToString.length; i++) {
      appendScoreHtml += '<img src="images/' + scoreToString.charAt(i) + '.png" alt="' + scoreToString.charAt(i) + '">';
    }
    this._scoreElement.innerHTML = appendScoreHtml;
  }

  set score(value) {
    this._score = value;
    if (this._highScore < this._score) {
      this._highScore = this._score;
      this.loadHighscore();
    }
    this.loadCurrentscore();
  }
}
