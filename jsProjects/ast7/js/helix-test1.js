const RADIUS = 10;
const DIAMETER = 20;
const CIRCLE_COUNT = 15;

class Helix {
  constructor(parentElement) {
    this._element = undefined;
    this._canvasBlock = undefined;
    this._parentElement = parentElement;

    this._frameIndex = 0;
    this._tickCount = 0;
    this._ticksPerFrame = 10;
    this.init();
    this.canvasMotion();
  }

  init() {
    this._element = document.createElement('canvas');
    this._element.height = CIRCLE_COUNT * DIAMETER;
    this._element.width = CIRCLE_COUNT * DIAMETER;
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

        if (that._frameIndex < (CIRCLE_COUNT - 1))
          that._frameIndex += 1;
        else
          that._frameIndex = 0;
        that._canvasBlock.clearRect(0, 0, that._element.width, that._element.height);
        that.accumulateCircleClockWise();
        that.accumulateCircleAntiClockWise();
      }
    }
  }

  /*
  Clockwise circle accumulation
   */
  accumulateCircleClockWise() {
    for (let i = 0; i < CIRCLE_COUNT; i++) {
      for (let j = 0; j < CIRCLE_COUNT; j++) {
        var diff = i - j + this._frameIndex;

        if (diff <= 0)
          diff = diff + CIRCLE_COUNT;

        if (diff > CIRCLE_COUNT)
          diff = diff - CIRCLE_COUNT;

        this.drawCircle(diff * (RADIUS / CIRCLE_COUNT), (i * DIAMETER + RADIUS), (j * DIAMETER + RADIUS), 'orange');
      }
    }
  }

  /*
  Anti clockwise circle accumulation
   */
  accumulateCircleAntiClockWise() {
    for (let i = 0; i < CIRCLE_COUNT; i++) {
      for (let j = 0; j < CIRCLE_COUNT; j++) {
        var diff = j - i + this._frameIndex;

        if (diff <= 0)
          diff = diff + CIRCLE_COUNT;

        if (diff > CIRCLE_COUNT)
          diff = diff - CIRCLE_COUNT;

        this.drawCircle(diff * (RADIUS / CIRCLE_COUNT), (i * DIAMETER + RADIUS), (j * DIAMETER + RADIUS), 'yellow');
      }
    }
  }

  drawCircle(r, x, y, color) {
    this._canvasBlock.fillStyle = color;
    this._canvasBlock.beginPath();
    this._canvasBlock.arc(x, y, r, 0, 2 * Math.PI);
    this._canvasBlock.fill();
  }

}