var FLY_TIMEOUT = 200;
var GAME_INTERVAL = 15;
var GRAVITY_COUNTER = 10;
var OBSTACLE__DIFFERENCE = 200;

class Game {
  constructor(parentElement, scoreboard, playKey) {
    this._bird = undefined;
    this._appHeight = 500;
    this._appWidth = 500;
    this._gameInterval = undefined;
    this._timeoutFly = undefined;
    this._gravity = 1;
    this._gravityCounter = 1;
    this._obstacles = [];
    this._obstacleCounter = 200;

    this._splash = undefined;
    this._parentElement = parentElement;

    this._score = 0;
    this.scoreboard = scoreboard;

    //Event Handlers
    this.splashKeyDownEvent = undefined;
    this.startKeyDownEvent = undefined;
    this.gameoverKeyDownEvent = undefined;
    this.playEventKey = playKey || ' ';

    this.init();
    this.splash();
  }

  init() {
    this._parentElement.style.height = this._appHeight + 'px';
    this._parentElement.style.width = this._appWidth + 'px';
  }

  splash() {
    this._bird = undefined;
    this._gameInterval = undefined;
    this._timeoutFly = undefined;
    this._gravity = 1;
    this._gravityCounter = 1;
    this._obstacles = [];
    this._obstacleCounter = 200;
    this._splash = undefined;
    this._score = 0;

    this._splash = document.createElement('img');
    this._splash.classList.add('splash-img');
    this._splash.src = 'images/message.png';
    this._parentElement.appendChild(this._splash);
    this.splashKeyDownEvent = this.splashStartEventFunc.bind(this);
    document.addEventListener('keydown', this.splashKeyDownEvent);
    this._parentElement.addEventListener('click', this.splashKeyDownEvent);
  }

  start() {
    this._bird = new Bird(this._parentElement, this._appHeight);
    var that = this;
    this.startKeyDownEvent = this.playEvent.bind(this);
    document.addEventListener('keydown', this.startKeyDownEvent);
    this._parentElement.addEventListener('click', this.startKeyDownEvent);

    /*
    Start game interval
     */
    this._gameInterval = setInterval(function () {
      var topPosition = that._bird.topPosition + that._gravity;
      if (topPosition < (that._appHeight - that._bird.height)) {
        if (that._bird.fly === false) {
          that._bird.topPosition = topPosition;
          /*
          Gravity
           */
          if (that._gravityCounter > GRAVITY_COUNTER) {
            that._gravity += 1;
            that._gravityCounter = 1;
          }
          that._gravityCounter += 1;

        } else {
          that._bird.topPosition = topPosition - 4;
        }

      } else {
        that.gameOver();
      }

      /*
      Obstacle
       */
      if (that._obstacleCounter > OBSTACLE__DIFFERENCE) {
        var newObstacle = new Obstacle(that._parentElement, that._appHeight, that._appWidth);
        that._obstacleCounter = 1;
        that._obstacles.push(newObstacle);
      }
      that._obstacleCounter += 1;

      that._obstacles.forEach(function (value, index) {
        value.xPosition = value.xPosition - 1;

        if (value.xPosition <= 234 && value.xPosition >= 200) {
          if (!(value.topPipePos < that._bird.topPosition && value.bottomPipePos > (that._bird.topPosition + 24))) {
            that.gameOver();
          }
        }
        if (value.xPosition === 198) {
          that._score += 1;
          that.scoreboard.score = that._score;
        }
        if (value.xPosition < (-50)) {
          that._obstacles.splice(index, 1);
          value.removeElement();
        }
      })
    }, GAME_INTERVAL);
    /*
  End game interval
   */
  }

  gameOver() {
    var that = this;
    this._bird.birdFall();
    clearInterval(this._gameInterval);
    document.removeEventListener('keydown', this.startKeyDownEvent);
    this._parentElement.removeEventListener('click', this.startKeyDownEvent);
    if (this._bird.topPosition <= this._appHeight) {
      var gameOverInterval = setInterval(function () {
        var gameOverBirdPos = that._bird.topPosition;
        that._bird.topPosition = gameOverBirdPos + 3;
        if (that._bird.topPosition > (that._appHeight - that._bird.height)) {
          clearInterval(gameOverInterval);
          that.scoreRecord();
        }
      }, 10);
    } else {
      this.scoreRecord();
    }
  }

  scoreRecord() {
    this._bird.removeElement();
    this._obstacles.forEach(function (value) {
      value.removeElement();
    });
    this.scoreboard.score = this._score;
    this.scoreboard.showElement();
    this.gameoverKeyDownEvent = this.gameOverEventFunc.bind(this);
    document.addEventListener('keydown', this.gameoverKeyDownEvent);
    this._parentElement.addEventListener('click', this.gameoverKeyDownEvent);
  }

  splashStartEventFunc(ev) {
    if (ev.key === this.playEventKey || ev.type === 'click') {
      this._splash.remove();
      this.start();
      document.removeEventListener('keydown', this.splashKeyDownEvent);
      this._parentElement.removeEventListener('click', this.splashKeyDownEvent);
    }
  }

  gameOverEventFunc(ev) {
    if (ev.key === this.playEventKey || ev.type === 'click') {
      this.scoreboard.score = 0;
      this.scoreboard.hideElement();
      this.splash();
      document.removeEventListener('keydown', this.gameoverKeyDownEvent);
      this._parentElement.removeEventListener('click', this.gameoverKeyDownEvent);
    }
  }

  playEvent(ev) {
    var that = this;
    this._bird.fly = false;
    clearTimeout(this._timeoutFly);
    if (ev.key === this.playEventKey || ev.type === 'click') {
      this._bird.moveWings();
      this._gravity = 1;
      this._gravityCounter = 1;
      this._bird.fly = true;
      that._timeoutFly = setTimeout(function () {
        that._bird.fly = false;
        clearTimeout(that._timeoutFly);
      }, FLY_TIMEOUT);
    }
  }
}
