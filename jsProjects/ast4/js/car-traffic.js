function CarTraffic(appElement) {
  //CarTraffic extends Scoreboard
  Scoreboard.call(this, appElement);
  //level up speed control
  var LEVEL_UP_TIMER = 5000; //ms
  var GAME_LOOP_PX = 10; //px
  var LEVELS = 25; //ms

  var that = this;
  var moveLane = 0;
  var buttonStart = undefined;
  var totalMoveLane = 0;
  var levelCount = undefined;
  var initNewCar = undefined;
  var initNewLane = undefined;
  var gameInterval = undefined;
  var gameLevelTimeout = undefined;
  var crashImage = undefined;

  //LEVEL {enum} 1,2,3
  this.obstacleType = 3;

  this.gameStatus = 'start';
  this.blockHeight = 600;
  this.blockWidth = 300;
  this.speedLevelCount = 1;
  this.intervalSpeedLevel = LEVELS;
  this.appElement = appElement;
  this.obstacleArray = [];
  this.clearObstacleArray = [];
  this.carTraffic = document.createElement('div');

  this.init = function () {
    this.carTraffic.classList.add('car-traffic-block');
    this.carTraffic.style.height = this.blockHeight + 'px';
    this.carTraffic.style.width = this.blockWidth + 'px';
    this.appElement.appendChild(this.carTraffic);
    this.newGame();
    this.setScoreboard();
    loadCrashImage();
    return this;
  };

  this.setHeightWidth = function (height, width) {
    this.blockHeight = height || 600;
    this.blockWidth = width || 300;
    if (height < 600)
      this.blockHeight = 600;
    if (width < 300)
      this.blockWidth = 300;
    this.carTraffic.style.height = this.blockHeight + 'px';
    this.carTraffic.style.width = this.blockWidth + 'px';
    return this;
  };

  this.setScoreboard = function () {
    this.scoreWidth = 200;
    this.scoreHeight = this.blockHeight;
    this.newScoreboard(this.carTraffic);
  };

  this.newGame = function () {
    //reset game values
    this.gameStatus = 'start';
    this.speedLevelCount = 1;
    this.intervalSpeedLevel = LEVELS;
    this.obstacleArray = [];
    this.clearObstacleArray = [];
    this.currentScoreValue = 0;
    this.startButton();

    initNewLane = new Lane(this.carTraffic);
    initNewLane.width = this.blockWidth;
    initNewLane.height = this.blockHeight;
    initNewLane.init();

    initNewCar = new Car(this.carTraffic);
    initNewCar.init();
  };

  this.startButton = function () {
    buttonStart = document.createElement('button');
    buttonStart.classList.add('start-button');
    buttonStart.innerHTML = 'Start Engine';
    buttonStart.style.width = this.blockWidth + 'px';
    buttonStart.style.top = parseInt(this.blockHeight / 2) + 'px';
    this.carTraffic.appendChild(buttonStart);

    //Level Count
    levelCount = document.createElement('span');
    levelCount.classList.add('level-count');
    levelCount.style.width = this.blockWidth + 'px';
    levelCount.style.top = parseInt(this.blockHeight / 2) + 'px';
    levelCount.innerHTML = 'SPEED ' + this.speedLevelCount;
    this.carTraffic.appendChild(levelCount);

    clearInterval(gameInterval);
    buttonStart.addEventListener('click', function () {
      buttonStart.remove();
      startGame();
      levelCountTimeout();
    });
    document.addEventListener('keydown', upKeyStartGame);
    document.removeEventListener('keydown', carSwitchLaneFunc);
  };

  /*
  start/reset game
   */
  function startGame() {
    document.addEventListener('keydown', upKeyStartGame);
    startGameInterval();
    document.addEventListener('keydown', carSwitchLaneFunc);
    document.removeEventListener('keydown', upKeyStartGame);
  }

  function upKeyStartGame(ev) {
    if (ev.which === 38) {
      buttonStart.remove();
      startGame();
      levelCountTimeout();
    }
  }

  /*
  Switch player car lane
  @input {event} keydown event
   */
  function carSwitchLaneFunc(ev) {
    if (ev.which === 37) {
      if (initNewCar.carPosition === 'center')
        initNewCar.positionLeft();
      else if (initNewCar.carPosition === 'right')
        initNewCar.positionCenter();
    } else if (ev.which === 39) {
      if (initNewCar.carPosition === 'center')
        initNewCar.positionRight();
      else if (initNewCar.carPosition === 'left')
        initNewCar.positionCenter();
    }
  }

  /*
  game main interval
   */
  function startGameInterval() {
    clearInterval(gameInterval);
    if (that.intervalSpeedLevel > 0) {
      gameInterval = setInterval(function () {
        initNewLane.lane.style.top = initNewLane.positionLane + moveLane + 'px';
        moveLane += GAME_LOOP_PX;
        if (moveLane > that.blockHeight)
          moveLane = 0;

        /*
        Calculate lane move distance to create new Obstacle
         */
        totalMoveLane += GAME_LOOP_PX;
        if (totalMoveLane % 300 === 0) {

          var obstacleTypeCount = that.obstacleType;
          if (obstacleTypeCount === 3) {
            obstacleTypeCount = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
          }
          if (obstacleTypeCount === 1) {
            var newObstacle = new Obstacle(that.carTraffic);
            newObstacle.init();
            that.obstacleArray.push(newObstacle);
          } else {
            var chooseLane = [1, 2, 3];
            var randomOpenLane = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            chooseLane.splice(chooseLane.indexOf(randomOpenLane), 1);
            var newObstacle1 = new Obstacle(that.carTraffic);
            newObstacle1.init(chooseLane[0]);
            that.obstacleArray.push(newObstacle1);
            var newObstacle2 = new Obstacle(that.carTraffic);
            newObstacle2.init(chooseLane[1]);
            that.obstacleArray.push(newObstacle2);
          }
        }
        that.obstacleArray.forEach(function (value, index) {
          value.totalHeightTravel -= GAME_LOOP_PX;
          value.topPosition += GAME_LOOP_PX;
          value.obstacle.style.top = value.topPosition + 'px';
          if (value.totalHeightTravel < 0) {
            var removedObstacle = that.obstacleArray.splice(index, 1);
            that.clearObstacleArray.push(removedObstacle[0]);
            value.obstacle.style.display = 'none';
            that.currentScoreValue += 1;
            that.currentScore();
          }
          if ((value.totalHeightTravel <= 210 && value.totalHeightTravel >= 30)) {
            //  collision detected
            if (initNewCar.carPosition === value.obstaclePosition) {
              carCrashed(value.obstacle.style.top, value.obstaclePosition);
            }
          }
        });
      }, that.intervalSpeedLevel);
    }
    speedUpgrade(startGameInterval);
  }

  /*
  timeout for intervalSpeedLevel update
   */
  function speedUpgrade(callback) {
    //Speed increase every
    if (that.intervalSpeedLevel > 0) {
      gameLevelTimeout = setTimeout(function () {
        that.intervalSpeedLevel -= 1;
        that.speedLevelCount += 1;
        levelCount.innerHTML = 'SPEED ' + that.speedLevelCount;
        levelCountTimeout();
        callback();
      }, LEVEL_UP_TIMER);
    } else {
      clearTimeout(gameLevelTimeout);
    }
  }

  function carCrashed(pos, lane) {
    clearInterval(gameInterval);
    clearTimeout(gameLevelTimeout);
    that.gameStatus = 'crashed';
    if (that.gameStatus === 'crashed') {
      var positionLeft = 0;
      switch (lane) {
        case "left":
          positionLeft = (18 * that.blockWidth - 2500) / 100;
          break;
        case "right":
          positionLeft = (82 * that.blockWidth - 2500) / 100;
          break;
        default:
          positionLeft = (that.blockWidth - 50) / 2;
          break;
      }
      crashImage.style.left = positionLeft + 'px';
      // crashImage.style.top = pos;
      crashImage.style.bottom = '10px';
      crashImage.style.display = 'block';
    }
    that.scoreListArray.push({type: that.obstacleType, score: that.clearObstacleArray.length});
    that.addScore();
    document.removeEventListener('keydown', carSwitchLaneFunc);
    var crashImageTimeout = setTimeout(function () {
      that.newGame();
      crashImage.style.display = 'none';
      clearTimeout(crashImageTimeout);
    }, 2000);
  }

  function loadCrashImage() {
    crashImage = document.createElement('div');
    crashImage.classList.add('crash-image');
    that.carTraffic.appendChild(crashImage);
  }

  function levelCountTimeout() {
    var levelCountTimeout = setTimeout(function () {
      levelCount.innerHTML = '';
      clearTimeout(levelCountTimeout);
    }, 1000);
  }
}
