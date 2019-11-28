function Box(parentElement) {
  var that = this;
  this.posX = 10;
  this.posY = 10;
  this.speed = 10;
  this.dx = 1;
  this.dy = 1;

  //tan@ : 315 for 45 degree right down
  this.direction = 315;
  this.width = 10;
  this.height = 10;
  this.color = 'red';
  this.element = undefined;
  this.smashStatus = false;
  this.boxInterval = undefined;

  /*
  initialize box with default config
   @return this
   */
  this.init = function () {
    var box = document.createElement('span');
    box.style.position = 'absolute';
    box.style.top = this.posY + 'px';
    box.style.left = this.posX + 'px';
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    box.style.background = this.color;
    parentElement.appendChild(box);
    this.element = box;
    return this;
  };

  /*
    change size of box
    @param {int} px height
    @param {int} px width
    @return this
   */
  this.changeBoxSize = function (height, width) {
    this.width = width;
    this.height = height;
    this.element.style.height = height + 'px';
    this.element.style.width = width + 'px';
    return this;
  };

  /*
  change position of box
  @param {int} px x
  @param {int} px y
  @return this
 */
  this.changePos = function (x, y) {
    this.posX = x;
    this.posY = y;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    return this;
  };
  /*
  Collision detection
  @param {array} array of Object boxes
  @return {boolean} Collision status
   */
  this.checkCollision = function (boxArray) {
    var collisionStatus = false;
    boxArray.forEach(function (value) {
      if (that !== value) {
        if (that.posX < value.posX + value.width && that.posX + that.width > value.posX
          &&
          that.posY < value.posY + value.height && that.posY + that.height > value.posY) {
          collisionStatus = true;
        }
      }
    });
    return collisionStatus;
  };

  /*
  border Collision
 */
  this.borderCollision = function (parentHeight, parentWidth) {
    if (this.posX < 0) {
      if (this.direction === 225) {
        this.direction = 315;
        this.dx = Math.abs(this.dx);
        this.dy = Math.abs(this.dy);
      } else {
        this.dx = Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
        this.direction = 45;
      }
    } else if (this.posX > (parentWidth - this.width)) {
      if (this.direction === 315) {
        this.dx = -Math.abs(this.dx);
        this.dy = Math.abs(this.dy);
        this.direction = 225;
      } else {
        this.dx = -Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
        this.direction = 135;
      }
    }
    if (this.posY < 0) {
      if (this.direction === 45) {
        this.dx = Math.abs(this.dx);
        this.dy = Math.abs(this.dy);
        this.direction = 315;
      } else {
        this.dx = -Math.abs(this.dx);
        this.dy = Math.abs(this.dy);
        this.direction = 225;
      }
    } else if (this.posY > (parentHeight - this.height)) {
      if (this.direction === 225) {
        this.dx = -Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
        this.direction = 135;
      } else {
        this.dx = Math.abs(this.dx);
        this.dy = -Math.abs(this.dy);
        this.direction = 45;
      }
    }
  };

  /*
    move boxes and change direction on collision
   */
  this.moveBox = function (boxArray, parentHeight, parentWidth, callbackSmashed) {
    this.boxInterval = setInterval(function () {
      if (that.smashStatus) {
        clearInterval(that.boxInterval);
        callbackSmashed(that);
      }
      if (that.checkCollision(boxArray)) {
        that.dx = (-1) * that.dx;
        that.dy = (-1) * that.dy;
      } else
        that.borderCollision(parentHeight, parentWidth);

      that.posX = that.dx + that.posX;
      that.posY = that.dy + that.posY;
      that.element.style.left = (that.dx + that.posX) + 'px';
      that.element.style.top = (that.dy + that.posY) + 'px';
    }, this.speed);
  };

  /*
  Change box to ant smasher
  @return this
   */
  this.changeBoxToAnt = function () {
    this.element.style.background = 'transparent';
    this.element.style.backgroundImage = 'url("./ant.png")';
    this.element.style.backgroundSize = '100% 100%';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.addEventListener('click', function (ev) {
      that.element.style.backgroundImage = 'url("./ant-smash.png")';
      setTimeout(function () {
        that.element.style.opacity = 0.2;
        that.smashStatus = true;
      }, 250);
    });
    return this;
  };
}

function ScoreBoard(gameElement) {
  this.total = 0;
  this.records = undefined;
  this.scoreElement = undefined;

  /*
initialize scoreboard with default config
 @return this
 */
  this.initAntScore = function () {
    var board = document.createElement('div');
    board.classList.add('scoreboard');
    gameElement.appendChild(board);
    this.scoreElement = board;
  };
}

function Game(gameElement, boxCount) {
  //Game extends ScoreBoard
  ScoreBoard.call(this, gameElement);

  var that = this;
  var MIN_BOX_SIZE = 10;
  var MAX_BOX_SIZE = 50;

  this.width = 400;
  this.height = 400;
  this.boxes = [];
  this.removedBoxes = [];
  this.boxCount = boxCount || 10;
  this.element = undefined;

  /*
 initialize game block with default config
  @return this
  */
  this.init = function () {
    var gameBlock = document.createElement('div');
    gameBlock.style.position = 'relative';
    gameBlock.style.width = this.width + 'px';
    gameBlock.style.height = this.height + 'px';
    gameBlock.style.background = 'whitesmoke';
    gameElement.appendChild(gameBlock);
    this.element = gameBlock;

    startGame();
    moveBoxes();
    return this;
  };

  /*
  change size of box
  @param {int} px height
  @param {int} px width
  @return this
 */
  this.changeBlockSize = function (height, width) {
    this.element.style.height = height + 'px';
    this.element.style.width = width + 'px';
    return this;
  };

  /*
  initialize block collision as ant smasher
   */
  this.antSmasher = function () {
    this.initAntScore();
    this.scoreElement.innerHTML = '<h3>Ant Score</h3><hr>' + this.boxes.length + ' ants alive<br>';
    this.boxes.forEach(function (value) {
      value.changeBoxToAnt();
    });
  };

  /*
  Start by creating non collided boxes
   */
  function startGame() {
    for (var i = 0; i < that.boxCount; i++) {
      var newBox = new Box(that.element).init();
      var newBoxSize = getIntegerMinMax(MIN_BOX_SIZE, MAX_BOX_SIZE);
      newBox.changeBoxSize(newBoxSize, newBoxSize);
      // newBox.speed = getIntegerMinMax(10,20);
      var collisionStatus = true;
      var xAxis = getIntegerMinMax(0, that.width - newBoxSize);
      var yAxis = getIntegerMinMax(0, that.height - newBoxSize);
      newBox.changePos(xAxis, yAxis);
      //create unique position box by collision detection
      do {
        collisionStatus = newBox.checkCollision(that.boxes);
        if (collisionStatus) {
          xAxis = getIntegerMinMax(0, that.width - newBoxSize);
          yAxis = getIntegerMinMax(0, that.height - newBoxSize);
          newBox.changePos(xAxis, yAxis);
        } else {
          that.boxes.push(newBox);
        }
      } while (collisionStatus);
    }
  }

  /*
  Move all boxes in random order
 */
  function moveBoxes() {
    that.boxes.forEach(function (value) {
      value.moveBox(that.boxes, that.height, that.width, function (smashed) {
        var removedBox = that.boxes.splice(that.boxes.indexOf(smashed), 1);
        that.removedBoxes.push(removedBox[0]);
        var antsScore = '';
        that.removedBoxes.forEach(function (value1, index) {
          antsScore += '<br>ant ' + (index + 1) + '-  x: ' + value1.posX + ', y: ' + value.posY;
        });
        if (that.scoreElement)
          that.scoreElement.innerHTML = '<h3>Ant Score</h3><hr>' + that.boxes.length + ' ants alive' + antsScore;
      });
    })
  }

  /*
  random integer between min and max
   */
  function getIntegerMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

var app = document.getElementById('app-wrapper');
// var boxCollision = new Game(app).init();
var boxCollision = new Game(app, 10);
boxCollision.height = 600;
boxCollision.width = 600;
boxCollision.init();
boxCollision.antSmasher();