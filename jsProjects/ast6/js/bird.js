class Bird {
  constructor(parentElement, appHeight) {
    this._height = 24;
    this._width = 34;
    this._topPosition = 100;
    this._color = 'yellow';
    this._fly = false;
    this._appHeight = appHeight;
    this._element = undefined;
    this._canvasSprite = undefined;
    this._parentElement = parentElement;

    this.init();
  }

  init() {
    this._element = document.createElement('canvas');
    this._element.classList.add('bird');
    this._element.height = 24;
    this._element.width = 34;
    this._element.style.position = 'absolute';
    this._element.style.top = this.topPosition + 'px';
    this._element.style.left = '200px';
    this._parentElement.appendChild(this._element);
    this.setBirdSprite();
  }

  setBirdSprite() {
    var that = this;
    var spriteFrame = 3;
    var spriteHeight = this._height;
    var spriteWidth = this._width * spriteFrame;

    var birdSprite = new Image();
    birdSprite.src = 'images/' + this._color + '-bird-sprite_34x24.png';

    this._canvasSprite = new CanvasSprite(this._element.getContext("2d"), spriteHeight, spriteWidth, birdSprite);
    this._canvasSprite.canvasOptions(5, spriteFrame, 1);

    // birdSprite.addEventListener('load', birdSpriteLoop);
    birdSpriteLoop();

    function birdSpriteLoop() {
      window.requestAnimationFrame(birdSpriteLoop);
      that._canvasSprite.update();
      that._canvasSprite.render();
    }
  }

  moveWings() {
    // var that = this;
    // var birdSprite = new Image();
    // birdSprite.src = 'images/' + this._color + '-bird-sprite_34x24_anim.png';
    //
    // this._canvasSprite.changeImage(birdSprite);
    // this._canvasSprite.resetLoopCount();
    // birdSpriteLoop();
    //
    // function birdSpriteLoop() {
    //   window.requestAnimationFrame(birdSpriteLoop);
    //   that._canvasSprite.update();
    //   that._canvasSprite.render();
    // }

    this._canvasSprite.resetLoopCount();
  }

  birdFall() {
    var that = this;
    var birdSprite = new Image();
    birdSprite.src = 'images/' + this._color + '-bird-sprite_34x24_fall.png';

    this._canvasSprite.changeImage(birdSprite);
    this._canvasSprite.resetLoopCount();
    birdSpriteLoop();

    function birdSpriteLoop() {
      window.requestAnimationFrame(birdSpriteLoop);
      that._canvasSprite.update();
      that._canvasSprite.render();
    }
  }

  removeElement() {
    this._element.remove();
  }

  get topPosition() {
    return this._topPosition;
  }

  set topPosition(value) {
    this._topPosition = value;
    if (value < 0)
      this._topPosition = 0;
    if (value >= this._appHeight)
      this._topPosition = (this._appHeight - this._height);
    this._element.style.top = this.topPosition + 'px';
  }

  get height() {
    return this._height;
  }

  get fly() {
    return this._fly;
  }

  set fly(value) {
    this._fly = value;
  }
}
