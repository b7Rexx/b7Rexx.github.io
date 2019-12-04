const RADIUS = 10;
const DIAMETER = 20;
const CIRCLE_COUNT = 15;
const CIRCLE_CIRCLE_COUNT = 10;

class HelixTest2 {
  constructor(parentElement) {
    this._element = undefined;
    this._canvasBlock = undefined;
    this._element1 = undefined;
    this._canvasBlock1 = undefined;
    this._parentElement = parentElement;

    this._frameIndex = 0;
    this._frameIndex1 = 2;
    this._tickCount = 0;
    this._ticksPerFrame = 15;
    this.init();
    this.canvasMotion();
  }

  init() {
    this._element = document.createElement('canvas');
    this._element.height = CIRCLE_COUNT * DIAMETER;
    this._element.width = CIRCLE_COUNT * DIAMETER;
    this._canvasBlock = this._element.getContext("2d");
    this._parentElement.appendChild(this._element);

    this._element1 = document.createElement('canvas');
    this._element1.height = CIRCLE_COUNT * DIAMETER;
    this._element1.width = CIRCLE_COUNT * DIAMETER;
    this._canvasBlock1 = this._element1.getContext("2d");
    this._parentElement.appendChild(this._element1);
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
        if (that._frameIndex1 < (CIRCLE_COUNT - 1))
          that._frameIndex1 += 1;
        else
          that._frameIndex1 = 0;

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

        if (diff <5)
          diff = 0;

        this.drawCircle(diff * (RADIUS / CIRCLE_COUNT), (i * DIAMETER + RADIUS), (j * DIAMETER + RADIUS), '#F1948A');
      }
    }
  }

  /*
  Anti clockwise circle accumulation
   */
  accumulateCircleAntiClockWise() {
    var canvas_diff = 0;
    // var canvas_diff = CIRCLE_COUNT - CIRCLE_COUNT_HEIGHT;

    for (let i = 0; i < CIRCLE_COUNT; i++) {
      for (let j = 0; j < CIRCLE_COUNT; j++) {
        var diff = j-i + this._frameIndex1;

        if (diff <= 0)
          diff = diff + CIRCLE_COUNT;

        if (diff > CIRCLE_COUNT)
          diff = diff - CIRCLE_COUNT;

        if (diff <5)
          diff = 0;

        this.drawCircle(diff * (RADIUS / CIRCLE_COUNT), (i * DIAMETER + RADIUS), (j * DIAMETER + RADIUS + (canvas_diff)), '#F1948A');
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