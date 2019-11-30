function Game(gameElement, boxCount) {
  //Game extends ScoreBoard
  ScoreBoard.call(this, gameElement);
  //Game extends IntegerHelper
  IntegerHelper.call(this);

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

  /*
 initialize game block with default config
  @return this
  */
  this.init = function (defineBoxes) {
    var gameBlock = document.createElement('div');
    gameBlock.style.position = 'relative';
    gameBlock.style.width = this.width + 'px';
    gameBlock.style.height = this.height + 'px';
    gameBlock.style.background = 'whitesmoke';
    gameElement.appendChild(gameBlock);
    this.element = gameBlock;
    this.defineBoxes = defineBoxes || [];
    this.startGameAddBoxes();
    this.moveBoxes();
    return this;
  };

  this.getBoxes = function () {
    return this.boxes;
  };

  /*
  Start by creating non collided boxes
   */
  this.startGameAddBoxes = function () {
    for (var i = 0; i < that.boxCount; i++) {
      var newBox = new Box(that.element).init();
      var newBoxSize = this.getIntegerMinMax(MIN_BOX_SIZE, MAX_BOX_SIZE);
      newBox.changeBoxSize(newBoxSize, newBoxSize);
      // newBox.speed = this.getIntegerMinMax(10,20);
      var collisionStatus = true;
      var xAxis = this.getIntegerMinMax(0, that.width - newBoxSize);
      var yAxis = this.getIntegerMinMax(0, that.height - newBoxSize);
      newBox.changePos(xAxis, yAxis);

      var newBoxSizeX = newBoxSize;
      var newBoxSizeY = newBoxSize;
      if (that.defineBoxes[i] !== undefined) {
        newBox.customDefineBox(that.defineBoxes[i]);
        if (that.defineBoxes[i].width)
          newBoxSizeX = that.defineBoxes[i].width;
        if (that.defineBoxes[i].height)
          newBoxSizeY = that.defineBoxes[i].height;
      }
      //create unique position box by collision detection
      do {
        collisionStatus = newBox.checkCollision(that.boxes);
        if (collisionStatus) {
          xAxis = this.getIntegerMinMax(0, that.width - newBoxSizeX);
          yAxis = this.getIntegerMinMax(0, that.height - newBoxSizeY);
          newBox.changePos(xAxis, yAxis);
        } else {
          that.boxes.push(newBox);
        }
      } while (collisionStatus);
    }
  };

  /*
  Move all boxes in random order
 */
  this.moveBoxes = function () {
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
      });
    })
  };
}
