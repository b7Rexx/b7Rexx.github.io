const RADIUS = 20;
const CIRCLE_COLUMN_COUNT = 15;
const CIRCLE_ROW_COUNT = 15;

class Helix {
  constructor(parentElement) {
    this._element = undefined;
    this._canvasBlock = undefined;
    this._frameIndex = 0;
    this._frameIndexReverse = 0;
    this._tickCount = 0;
    this._ticksPerFrame = 1;
    this._parentElement = parentElement;
    this._circles = [];
    this._circlesReverse = [];

    this.init();
    this.generateCircles();
    // this.generateReverseCircles();
    // this.canvasMotion();
  }

  init() {
    this._element = document.createElement('canvas');
    this._element.width = CIRCLE_COLUMN_COUNT * 2 * RADIUS;
    this._element.height = CIRCLE_COLUMN_COUNT * 2 * RADIUS;
    this._canvasBlock = this._element.getContext("2d");
    this._parentElement.appendChild(this._element);
  }

  canvasMotion() {
    var that = this;
    canvasLoop();

    function canvasLoop() {
      window.requestAnimationFrame(canvasLoop);
      that._tickCount += 1;
      if (that._tickCount > that._ticksPerFrame) {
        that._tickCount = 0;

        if (that._frameIndex <= RADIUS)
          that._frameIndex += 1;
        else
          that._frameIndex = 0;
        that._canvasBlock.clearRect(0, 0, that._element.width, that._element.height);

        that._circles.forEach(function (value) {
          value.shiftCircle();
        });

        that._circlesReverse.forEach(function (value) {
          value.shiftCircleReverse();
        })
      }
    }
  }

  generateCircles() {
    for (let i = 0; i < (CIRCLE_ROW_COUNT); i++) {
      for (let j = 0; j < (CIRCLE_COLUMN_COUNT - 5); j++) {
        var diff = (i - j);
        if (diff <= 0)
          diff = diff + CIRCLE_COLUMN_COUNT;
        if (diff > CIRCLE_COLUMN_COUNT)
          diff = diff - CIRCLE_COLUMN_COUNT;
        var circle = new Circle(
          this._canvasBlock,
          RADIUS,
          diff * (RADIUS / CIRCLE_COLUMN_COUNT),
          ((i * (2 * RADIUS)) + RADIUS),
          ((j * (2 * RADIUS)) + RADIUS),
          '#F1948A'
        );
        this._circles.push(circle);
      }
    }
  }

  generateReverseCircles() {
    for (let i = 0; i < CIRCLE_ROW_COUNT; i++) {
      for (let j = 5; j < CIRCLE_COLUMN_COUNT; j++) {
        var diff = (j - i);
        if (diff <= 0)
          diff = diff + CIRCLE_COLUMN_COUNT;
        if (diff > CIRCLE_COLUMN_COUNT)
          diff = diff - CIRCLE_COLUMN_COUNT;
        var circle = new Circle(
          this._canvasBlock,
          RADIUS,
          diff * (RADIUS / CIRCLE_COLUMN_COUNT),
          ((i * (2 * RADIUS)) + RADIUS),
          ((j * (2 * RADIUS)) + RADIUS),
          '#F8C471'
        );
        this._circlesReverse.push(circle);
      }
    }
  }
}