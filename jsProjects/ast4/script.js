function Box(parentElement) {
  var that = this;
  this.posX = 10;
  this.posY = 10;
  this.speed = 10;
  this.dx = 1;
  this.dy = 1;
  this.width = 10;
  this.height = 10;
  this.color = 'cornflowerblue';
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

   */
  this.customDefineBox = function (defineObj) {
    if (defineObj.height !== undefined)
      this.height = defineObj.height;
    if (defineObj.width !== undefined)
      this.width = defineObj.width;
    if (defineObj.posX !== undefined)
      this.posX = defineObj.posX;
    if (defineObj.posY !== undefined)
      this.posY = defineObj.posY;
    if (defineObj.color !== undefined)
      this.color = defineObj.color;
    if (defineObj.speed !== undefined)
      this.speed = defineObj.speed;
    this.element.style.top = this.posY + 'px';
    this.element.style.left = this.posX + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.background = this.color;
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
        if (
          that.posX < value.posX + value.width
          && that.posX + that.width > value.posX
          && that.posY < value.posY + value.height
          && that.posY + that.height > value.posY) {

          collisionStatus = true;
        }
      }
    });
    return collisionStatus;
  };

  /*
    move boxes and change direction on collision
   */
  this.moveBox = function (boxArray, parentHeight, parentWidth, callbackSmashed) {
    that.boxInterval = setInterval(function () {
      if (that.smashStatus) {
        clearInterval(that.boxInterval);
        callbackSmashed(that);
      }
      //Box Collision
      boxArray.forEach(function (value) {
        if (that !== value) {
          if (
            that.posX < value.posX + value.width
            && that.posX + that.width > value.posX
            && that.posY < value.posY + value.height
            && that.posY + that.height > value.posY) {
            /*
              Change dx dy w.r.t. collision side
           */
            if (that.posX > value.posX) {
              that.dx = Math.abs(that.dx);
              value.dx = (-1) * Math.abs(value.dx);
            } else {
              that.dx = (-1) * Math.abs(that.dx);
              value.dx = Math.abs(value.dx);
            }

            if (that.posY > value.posY) {
              that.dy = Math.abs(that.dy);
              value.dy = (-1) * Math.abs(value.dy);
            } else {
              that.dy = (-1) * Math.abs(that.dy);
              value.dy = Math.abs(value.dy);
            }
          }
        }
      });

      //Border Collision
      if (that.posX < 0)
        that.dx = Math.abs(that.dx);
      else if (that.posX > (parentWidth - that.width))
        that.dx = (-1) * Math.abs(that.dx);

      if (that.posY < 0)
        that.dy = Math.abs(that.dy);
      else if (that.posY > (parentHeight - that.height))
        that.dy = (-1) * Math.abs(that.dy);

      that.posX = that.dx + that.posX;
      that.posY = that.dy + that.posY;
      that.element.style.left = that.posX + 'px';
      that.element.style.top = that.posY + 'px';
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
    this.element.addEventListener('click', function () {
      that.element.style.backgroundImage = 'url("./ant-smash.png")';
      that.element.style.opacity = '0.2';
      that.smashStatus = true;
    });
    return this;
  };
}

function ScoreBoard(gameElement) {
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
  this.defineBoxes = [];
  this.removedBoxes = [];
  this.boxCount = boxCount || 10;
  this.element = undefined;
  this.origValues = undefined;

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
    saveInitial();
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

      if (that.defineBoxes[i] !== undefined) {
        newBox.customDefineBox(that.defineBoxes[i]);
      }
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
          antsScore += '<br>ant-' + (index + 1) + ' killed at  x: ' + value1.posX + ', y: ' + value1.posY;
        });
        if (that.scoreElement)
          that.scoreElement.innerHTML = '<h3>Ant Score</h3><hr><strong>' + that.boxes.length + '</strong> ants alive' + antsScore;
        if (that.boxes.length === 0) {
          var restartBtn = document.createElement('a');
          restartBtn.innerHTML = 'Congratulation! ants smash complete<br>Click to restart';
          restartBtn.classList.add('reset-btn');
          that.element.append(restartBtn);
          restartBtn.addEventListener('click', function (ev) {
            //reset ant smasher
            reset();
          })
        }
      });
    })
  }

  /*
  random integer between min and max
   */
  function getIntegerMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
   save initial values
   */
  function saveInitial() {
    var origValues = {};
    for (var prop in this) {
      if (this.hasOwnProperty(prop) && prop != "origValues") {
        origValues[prop] = this[prop];
      }
    }
    that.origValues = origValues;
  }

  /*
   restore initial values
   */
  function reset() {
    for (var prop in that.origValues) {
      this[prop] = that.origValues[prop];
    }
  }
}

var boxObject = [
  {posX: 10, posY: 10, height: 15, width: 45, color: 'blue', speed: 25},
  {posX: 10, posY: 10, color: 'green', speed: 1},
  {posX: 10, posY: 10, color: 'black', speed: 100}
];

var app = document.getElementById('app-wrapper');
var boxCollision = new Game(app, 10);
// var boxCollision = new Game(app, 1000);
boxCollision.defineBoxes = boxObject;
// boxCollision.height = 2500;
// boxCollision.width = 2500;
boxCollision.init();

var customAnts = [
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15},
  {posX: 10, posY: 10, height: 40, width: 40, speed: 15}
];

var antSmasherCustom = new Game(app, 5);
antSmasherCustom.defineBoxes = customAnts;
antSmasherCustom.init().antSmasher();
