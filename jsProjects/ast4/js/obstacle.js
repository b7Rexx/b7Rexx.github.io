function Obstacle(parentElement) {
  var that = this;
  this.obstacle = undefined;
  this.obstacleType = 1;
  this.topPosition = -100;
  this.totalHeightTravel = 100;
  this.obstaclePosition = 'center';
  this.parentElement = parentElement;

  this.init = function (laneChoose) {
    this.obstacle = document.createElement('div');
    this.totalHeightTravel = parseInt(that.parentElement.style.height.replace('px', '')) + 100;
    this.obstacle.style.top = this.topPosition + 'px';
    this.obstacleType = getIntegerMinMax(1, 5);
    this.obstacle.style.backgroundImage = 'url("images/obs-' + this.obstacleType + '.png")';
    this.obstacle.classList.add('obstacle');
    this.parentElement.appendChild(this.obstacle);

    var randomPos = laneChoose;
    if (laneChoose === undefined)
      randomPos = getIntegerMinMax(1, 3);
    if (randomPos === 1)
      this.positionLeft();
    else if (randomPos === 2)
      this.positionCenter();
    else
      this.positionRight();
  };

  this.positionLeft = function () {
    this.obstaclePosition = 'left';
    setObstaclePosition();
  };
  this.positionCenter = function () {
    this.obstaclePosition = 'center';
    setObstaclePosition();
  };
  this.positionRight = function () {
    this.obstaclePosition = 'right';
    setObstaclePosition();
  };

  /*
  set player position by parent block width
   */
  function setObstaclePosition() {
    var totalWidth = parseInt(that.parentElement.style.width.replace('px', ''));
    var pos = 0;
    switch (that.obstaclePosition) {
      case "left":
        pos = (18 * totalWidth - 2500) / 100;
        break;
      case "right":
        pos = (82 * totalWidth - 2500) / 100;
        break;
      default:
        pos = (totalWidth - 50) / 2;
        break;
    }
    that.obstacle.style.left = pos + 'px';
  }

  /*
  random integer between min and max
  @param {int} min
  @param {int} max
  @return {int} value between or equal min and max
   */
  function getIntegerMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
