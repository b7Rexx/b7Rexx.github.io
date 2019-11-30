function Lane(parentElement) {
  var that = this;
  this.width = 300;
  this.height = 600;
  this.lane = undefined;
  this.positionLane = undefined;
  this.parentElement = parentElement;

  this.init = function () {
    this.positionLane = -this.height;
    this.lane = document.createElement('div');
    this.lane.classList.add('lane');
    this.lane.style.height = (2 * this.height) + 'px';
    this.lane.style.width = this.width + 'px';
    this.lane.style.top = this.positionLane + 'px';
    this.parentElement.appendChild(this.lane);
  };

  this.singleObstacle = function () {

  };

  /*
  set obstacle position by parent block width
 */
  function setObstaclePosition() {
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
