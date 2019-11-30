function Car(parentElement) {
  var that = this;
  this.car = undefined;
  this.carPosition = 'center';
  this.parentElement = parentElement;

  this.init = function () {
    this.car = document.createElement('div');
    this.car.classList.add('car');
    this.parentElement.appendChild(this.car);
    // this.positionLeft();
    this.positionCenter();
    // this.positionRight();
  };

  this.positionLeft = function () {
    this.carPosition = 'left';
    setCarPosition();
  };
  this.positionCenter = function () {
    this.carPosition = 'center';
    setCarPosition();
  };
  this.positionRight = function () {
    this.carPosition = 'right';
    setCarPosition();
  };

  /*
  set player position by parent block width
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
    that.car.style.left = pos + 'px';
  }
}
