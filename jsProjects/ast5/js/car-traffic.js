function CarTraffic(appElement) {
  //CarTraffic extends Scoreboard
  Scoreboard.call(this, appElement);
  //level up speed control
  var LEVELS = 24; //ms
  var GAME_LOOP_PX = 12; //px
  var LEVEL_UP_TIMER = 15000; //ms
  var OBSTACLE_DIFFERENCE = 360; //ms
  var BULLET_CHARGE_TIME = 2000; //ms

  var that = this;
  var moveLane = 0;
  var totalMoveLane = 0;
  var moveBullet = 0;
  var currentBullet = null;
  var buttonStart = undefined;
  var crashImage = undefined;
  var levelCount = undefined;
  var initNewCar = undefined;
  var initNewLane = undefined;
  var gameInterval = undefined;
  var gameLevelTimeout = undefined;
  var buttonObstacleChoose = undefined;
  var guideLines = undefined;

  //LEVEL {enum} 1,2,3
  this.obstacleType = 1;

  //Game Key Setup
  this.leftKey = 'ArrowLeft';
  this.rightKey = 'ArrowRight';
  this.startKey = 'ArrowUp';
  this.bulletKey = 'ArrowDown';

  this.gameStatus = 'start';
  this.blockHeight = 600;
  this.blockWidth = 300;
  this.speedLevelCount = 1;
  this.intervalSpeedLevel = LEVELS;
  this.appElement = appElement;
  this.obstacleArray = [];
  this.clearObstacleArray = [];
  this.carTraffic = document.createElement('div');

  //Two player bullet, score
  this.playerOneBullet = undefined;
  this.playerOneScore = undefined;
  this.playerTwoBullet = undefined;
  this.playerTwoScore = undefined;

  this.init = function () {
    this.carTraffic.classList.add('car-traffic-block');
    this.carTraffic.style.height = this.blockHeight + 'px';
    this.carTraffic.style.width = this.blockWidth + 'px';
    this.appElement.appendChild(this.carTraffic);

    this.newGame();
    this.setScoreboard();
    loadCrashImage();
    guideLines = document.createElement('div');
    guideLines.classList.add('div-margin');
    guideLines.innerHTML =
      this.startKey + ' to start | switch lanes using ' + this.leftKey + ', ' + this.rightKey + '<br>'
      + this.bulletKey + ' to shoot bullets | careful bullets charges 1 sec if it collides';

    this.appElement.appendChild(guideLines);
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

  this.changeGameKeys = function (left, right, start, bullet) {
    this.leftKey = left;
    this.rightKey = right;
    this.startKey = start;
    this.bulletKey = bullet;
    guideLines.innerHTML =
      this.startKey + ' to start | switch lanes using ' + this.leftKey + ', ' + this.rightKey + '<br>'
      + this.bulletKey + ' to shoot bullets | careful bullets charges 1 sec if it collides';

    return this;
  };

  this.setScoreboard = function () {
    this.scoreHeight = this.blockHeight;
    this.newScoreboard(this.carTraffic);
    this.playerOneBullet = this.initBulletCharge();
    this.playerOneScore = this.initPlayerScore();
    // this.playerTwoBullet = this.initBulletCharge();
    // this.playerTwoScore = this.initPlayerScore();
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
    });
    document.addEventListener('keydown', spaceKeyStartGame);
    document.removeEventListener('keydown', carSwitchLaneFunc);
  };

  /*
  start/reset game
   */
  function startGame() {
    document.removeEventListener('keydown', spaceKeyStartGame);
    document.addEventListener('keydown', spaceKeyChooseObstacle);

    buttonStart.remove();
    buttonObstacleChoose = document.createElement('ul');
    buttonObstacleChoose.classList.add('button-obstacle-choose');
    buttonObstacleChoose.style.width = that.blockWidth + 'px';
    buttonObstacleChoose.style.top = parseInt(that.blockHeight / 2) + 'px';

    var buttonObstacleChoose1 = document.createElement('li');
    buttonObstacleChoose1.innerHTML = 'Single Obstacle';
    that.carTraffic.appendChild(buttonObstacleChoose);
    buttonObstacleChoose.appendChild(buttonObstacleChoose1);

    var buttonObstacleChoose2 = document.createElement('li');
    buttonObstacleChoose2.innerHTML = 'Double Obstacle';
    buttonObstacleChoose.appendChild(buttonObstacleChoose2);

    var buttonObstacleChoose3 = document.createElement('li');
    buttonObstacleChoose3.innerHTML = 'Random Obstacle';
    buttonObstacleChoose.appendChild(buttonObstacleChoose3);

    currentObstacleSelection();
    buttonObstacleChoose1.addEventListener('click', function () {
      buttonObstacleChoose.remove();
      that.obstacleType = 1;
      chooseObstacleLevel();
    });
    buttonObstacleChoose2.addEventListener('click', function () {
      buttonObstacleChoose.remove();
      that.obstacleType = 2;
      chooseObstacleLevel();
    });
    buttonObstacleChoose3.addEventListener('click', function () {
      buttonObstacleChoose.remove();
      that.obstacleType = 3;
      chooseObstacleLevel();
    });

  }

  function chooseObstacleLevel() {
    document.removeEventListener('keydown', spaceKeyChooseObstacle);
    startGameInterval();
    levelCountTimeout();
    document.addEventListener('keydown', carSwitchLaneFunc);
  }

  function spaceKeyStartGame(ev) {
    if (ev.key === that.startKey) {
      buttonStart.remove();
      startGame();
    }
  }

  function spaceKeyChooseObstacle(ev) {
    if (ev.key === that.leftKey) {
      if (that.obstacleType === 2)
        that.obstacleType = 1;
      else if (that.obstacleType === 3)
        that.obstacleType = 2;
    } else if (ev.key === that.rightKey) {
      if (that.obstacleType === 2)
        that.obstacleType = 3;
      else if (that.obstacleType === 1)
        that.obstacleType = 2;
    }
    currentObstacleSelection();
    if (ev.key === that.startKey) {
      buttonObstacleChoose.remove();
      chooseObstacleLevel();
    }
  }

  /*
  Obstacle choose option after start
   */
  function currentObstacleSelection() {
    Object.values(buttonObstacleChoose.getElementsByTagName('li')).forEach(function (value, index) {
      value.style.background = 'lightseagreen';
      if (index === (that.obstacleType - 1))
        value.style.background = 'black';
    });
  }

  /*
  Switch player car lane
  @input {event} keydown event
   */
  function carSwitchLaneFunc(ev) {
    if (ev.key === that.leftKey) {
      if (initNewCar.carPosition === 'center')
        initNewCar.positionLeft();
      else if (initNewCar.carPosition === 'right')
        initNewCar.positionCenter();
    } else if (ev.key === that.rightKey) {
      if (initNewCar.carPosition === 'center')
        initNewCar.positionRight();
      else if (initNewCar.carPosition === 'left')
        initNewCar.positionCenter();
    }

    //bullet on space
    if (ev.key === that.bulletKey) {
      if (currentBullet === null && initNewCar.bullet === null) {
        moveBullet = 0;
        initNewCar.newBullet(initNewCar.carPosition);
        currentBullet = initNewCar.bullet;
        that.carTraffic.appendChild(currentBullet);
        that.playerOneBullet.style.opacity = 0;
      }
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
        if (totalMoveLane % OBSTACLE_DIFFERENCE === 0) {

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

        /*
        bullet
         */
        if (initNewCar.bullet !== null) {
          if (currentBullet === null) {
            initNewCar.bulletPosition -= GAME_LOOP_PX;
            moveBullet -= GAME_LOOP_PX;
          } else {
            initNewCar.bulletPosition += GAME_LOOP_PX;
            moveBullet += GAME_LOOP_PX;
          }
          initNewCar.bullet.style.bottom = initNewCar.bulletPosition + 'px';
          if (moveBullet > (that.blockHeight + 60)) {
            initNewCar.bullet.remove();
            currentBullet = null;
            initNewCar.bullet = null;
            that.playerOneBullet.style.opacity = 1;
          }
        }
        that.obstacleArray.forEach(function (value, index) {
          value.totalHeightTravel -= GAME_LOOP_PX;
          value.topPosition += GAME_LOOP_PX;
          value.obstacle.style.top = value.topPosition + 'px';
          if (value.totalHeightTravel < 0) {
            var removedObstacle = that.obstacleArray.splice(index, 1);
            that.clearObstacleArray.push(removedObstacle[0]);
            value.obstacle.remove();
            that.currentScoreValue += 1;
            that.currentScore(that.playerOneScore);
          }
          if ((value.totalHeightTravel <= 210 && value.totalHeightTravel >= 30)) {
            //  collision detected
            if (initNewCar.carPosition === value.obstaclePosition) {
              carCrashed(value.obstacle.style.top, value.obstaclePosition);
            }
          }
          if (currentBullet !== null) {
            if (((that.blockHeight - value.topPosition) <= (initNewCar.bulletPosition + 150) && (that.blockHeight - value.topPosition) >= (initNewCar.bulletPosition))) {
              if (initNewCar.bulletLane === value.obstaclePosition) {
                var removedObstacleByBullet = that.obstacleArray.splice(index, 1);
                that.clearObstacleArray.push(removedObstacleByBullet[0]);
                value.obstacle.remove();
                that.currentScoreValue += 1;
                that.currentScore(that.playerOneScore);

                currentBullet = null;
                that.playerOneBullet.style.opacity = 0.2;

                initNewCar.bullet.style.backgroundImage = 'url("images/explode.png")';
                var clearExplosion = setTimeout(function () {
                  initNewCar.bullet.remove();
                  initNewCar.bullet = null;
                  clearTimeout(clearExplosion);
                  that.playerOneBullet.style.opacity = 1;
                }, BULLET_CHARGE_TIME);
              }
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
      levelCount.innerHTML = 'GGWP<br>Try other obstacle Levels';
      levelCountTimeout();
    }
  }

  /*
after collision
@param {int} pos
@param {enum} lane - left,right,center
   */
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
      crashImage.style.bottom = '10px';
      crashImage.style.display = 'block';
    }
    that.scoreListArray.push({type: that.obstacleType, score: that.clearObstacleArray.length});
    that.addScore(that.playerOneScore);
    document.removeEventListener('keydown', carSwitchLaneFunc);
    var crashImageTimeout = setTimeout(function () {
      currentBullet = null;
      if (initNewCar.bullet !== null) {
        initNewCar.bullet.remove();
        initNewCar.bullet = null;
        that.playerOneBullet.style.opacity = 1;
      }
      initNewCar.car.style.display = 'none';
      that.newGame();
      crashImage.style.display = 'none';
      clearTimeout(crashImageTimeout);
    }, 1500);
  }

  /*
  load crash image on collision
   */
  function loadCrashImage() {
    crashImage = document.createElement('div');
    crashImage.classList.add('crash-image');
    that.carTraffic.appendChild(crashImage);
  }

  /*
  hide speed counter
   */
  function levelCountTimeout() {
    var levelCountTimeout = setTimeout(function () {
      levelCount.innerHTML = '';
      clearTimeout(levelCountTimeout);
    }, 1000);
  }

}
