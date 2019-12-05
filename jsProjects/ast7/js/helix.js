const RADIUS = 20;
const CIRCLE_ROW_COUNT = 10;
const CIRCLE_COLUMN_COUNT = 30;

class Helix {
  constructor(parentElement) {
    this._element = undefined;
    this._canvasBlock = undefined;

    this._frameInterval = 0;
    this._parentElement = parentElement;
    this._circles = [];
    this._circlesReverse = [];

    this.init();
    // this.generateCircles();
    this.canvasMotion();
  }

  init() {
    this._element = document.createElement('canvas');
    this._element.width = CIRCLE_COLUMN_COUNT * 2 * RADIUS;
    this._element.height = CIRCLE_ROW_COUNT * 2 * RADIUS;
    this._canvasBlock = this._element.getContext("2d");
    this._parentElement.appendChild(this._element);
  }

  canvasMotion() {
    var that = this;
    var testInterval = setInterval(function () {
      if (that._frameInterval < (CIRCLE_COLUMN_COUNT - 1))
        that._frameInterval += 1;
      else {
        that._frameInterval = 0;
        // clearInterval(testInterval);
      }
      that._canvasBlock.clearRect(0, 0, that._element.width, that._element.height);
      that.generateCircles();
    }, 150);
  }

  generateCircles() {
    for (let i = 0; i < (CIRCLE_ROW_COUNT); i++) {
      for (let j = 0; j < (CIRCLE_COLUMN_COUNT); j++) {
        var angle = 2 * Math.PI * (j / CIRCLE_COLUMN_COUNT);

        //radius
        var diff = (j - i) + this._frameInterval;
        if (diff <= 0)
          diff = diff + CIRCLE_COLUMN_COUNT;
        if (diff > CIRCLE_COLUMN_COUNT)
          diff = diff - CIRCLE_COLUMN_COUNT;

        var radius = RADIUS;
        // if (diff < 10) {
          radius = diff * (RADIUS / (CIRCLE_COLUMN_COUNT + 1));
        // }

        //Reverse radius
        var diff1 = (j - i) + this._frameInterval;
        if (diff1 <= 0)
          diff1 = diff1 + CIRCLE_COLUMN_COUNT;
        if (diff1 > CIRCLE_COLUMN_COUNT)
          diff1 = diff1 - CIRCLE_COLUMN_COUNT;

        var radiusReverse = RADIUS;
        // if (diff1 < 10) {
          radiusReverse = diff1 * (RADIUS / (CIRCLE_COLUMN_COUNT + 1));
        // }

        // else if (diff > 0) {
        //   radius = 0;
        //   radiusReverse = 0;
        // }

        this.drawCircle(
          (j * 2 * RADIUS) + RADIUS,
          (RADIUS * Math.sin(angle)) + (i * 2 * RADIUS) + RADIUS,
          radius,
          '#F1948A'
        );
        this.drawCircle(
          (j * 2 * RADIUS) + RADIUS,
          (RADIUS * Math.cos(angle)) + (i * 2 * RADIUS) + RADIUS,
          radiusReverse,
          '#F1948A'
        );
      }
    }
  }

  drawCircle(x, y, r, color) {
    this._canvasBlock.fillStyle = color;
    this._canvasBlock.beginPath();
    this._canvasBlock.arc(x, y, r, 0, 2 * Math.PI);
    this._canvasBlock.fill();

  }
}