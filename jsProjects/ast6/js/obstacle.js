class Obstacle {
  constructor(parentElement, appHeight, appWidth) {

    this._topPipePos = undefined;
    this._bottomPipePos = undefined;
    this._xPosition = appWidth;
    this._appHeight = appHeight;
    this._element = undefined;
    this._parentElement = parentElement;

    this.init();
  }

  init() {
    var randomPipe = Math.floor(Math.random() * (7)) + 1;

    this._element = document.createElement('div');
    this._element.classList.add('pipe-block');
    this._element.style.left = this._xPosition + 'px';
    this.randomPipe(randomPipe);
    this._parentElement.appendChild(this._element);
  }

  randomPipe(pos) {
    var pipeTop = undefined;
    var pipeBottom = undefined;
    var pipePositions = {
      1: {top: 50, bottom: 150},
      2: {top: 100, bottom: 200},
      3: {top: 150, bottom: 250},
      4: {top: 200, bottom: 300},
      5: {top: 250, bottom: 350},
      6: {top: 300, bottom: 400},
      7: {top: 350, bottom: 450},
    };
    pipeTop = document.createElement('span');
    pipeTop.classList.add('pipe-top');
    pipeTop.style.bottom = (-pipePositions[pos].top) + 'px';
    // pipeTop.style.bottom =   '100px';
    this._element.appendChild(pipeTop);
    this._topPipePos = pipePositions[pos].top;

    pipeBottom = document.createElement('span');
    pipeBottom.classList.add('pipe-bottom');
    pipeBottom.style.top = (pipePositions[pos].bottom) + 'px';
    this._element.appendChild(pipeBottom);
    this._bottomPipePos = pipePositions[pos].bottom;
  }

  removeElement() {
    this._element.remove();
  }

  get xPosition() {
    return this._xPosition;
  }

  set xPosition(value) {
    this._xPosition = value;
    this._element.style.left = this._xPosition + 'px';
  }

  get topPipePos() {
    return this._topPipePos;
  }

  get bottomPipePos() {
    return this._bottomPipePos;
  }
}