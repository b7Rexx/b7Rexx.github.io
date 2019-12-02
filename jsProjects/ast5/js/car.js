function Car(parentElement) {
  var that = this;
  this.car = undefined;
  this.carPosition = 'center';
  this.bullet = null;
  this.bulletLane = null;
  this.bulletPosition = null;
  this.parentElement = parentElement;

  this.init = function (pos, player) {
    var playerCar = player || 1;
    this.car = document.createElement('div');
    this.car.classList.add('car');
    this.car.style.backgroundImage = 'url("images/car-' + playerCar + '.png")';
    this.parentElement.appendChild(this.car);
    if (pos === 'left')
      this.positionLeft();
    else if (pos === 'right')
      this.positionRight();
    else
      this.positionCenter();
  };

  this.newBullet = function () {
    this.bullet = document.createElement('div');
    this.bullet.classList.add('bullet');
    this.bulletPosition = 60;
    this.bulletLane = this.carPosition;
    this.bullet.style.backgroundImage = 'url("images/bullet.png")';
    this.bullet.style.left = setCarPosition() + 'px';
    this.bullet.style.bottom = this.bulletPosition + 'px';
  };


  this.positionLeft = function () {
    this.carPosition = 'left';
    that.car.style.left = setCarPosition() + 'px';
  };
  this.positionCenter = function () {
    this.carPosition = 'center';
    that.car.style.left = setCarPosition() + 'px';
  };
  this.positionRight = function () {
    this.carPosition = 'right';
    that.car.style.left = setCarPosition() + 'px';
  };

  /*
  set player position by parent block width
@return {int} position of car from left
   */
  function setCarPosition() {
    var totalWidth = parseInt(that.parentElement.style.width.replace('px', ''));
    var pos = 0;
    switch (that.carPosition) {
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
    return pos;
  }
}
