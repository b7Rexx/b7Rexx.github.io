class CanvasSprite {
  constructor(context, height, width, image) {
    this._context = context;
    this._height = height;
    this._width = width;
    this._frameIndex = 0;
    this._tickCount = 0;
    this._image = image;
    this._ticksPerFrame = 0;
    this._numberOfFrames = 1;
    this._loop = false;
    this._loopCount = 0;
  }

  canvasOptions(ticksPerFrame, numberOfFrames, loop) {
    this._frameIndex = 0;
    this._tickCount = 0;
    this._ticksPerFrame = ticksPerFrame || 0;
    this._numberOfFrames = numberOfFrames || 1;

    this._loop = loop || 1;
  }

  render() {
    // Clear the canvas
    this._context.clearRect(0, 0, this._width, this._height);
    /*
     Draw Image
     @params
     img	Source image object	Sprite sheet
     sx	Source x	Frame index times frame width
     sy	Source y	0
     sw	Source width	Frame width
     sh	Source height	Frame height
     dx	Destination x	0
     dy	Destination y	0
     dw	Destination width	Frame width
     dh	Destination height	Frame height
    */
    this._context.drawImage(
      this._image,
      this._frameIndex * this._width / this._numberOfFrames,
      0,
      this._width / this._numberOfFrames,
      this._height,
      0,
      0,
      this._width / this._numberOfFrames,
      this._height
    );
  }

  update() {
    this._tickCount += 1;
    if (this._tickCount > this._ticksPerFrame) {
      this._tickCount = 0;

      // If the current frame index is in range
      if (this._frameIndex < this._numberOfFrames - 1) {
        // Go to the next frame
        this._frameIndex += 1;
      } else if (this._loop) {
        if (this._loop === 'infinite')
          this._frameIndex = 0;
        else if (this._loopCount < this._loop) {
          this._loopCount += 1;
          this._frameIndex = 0;
        }
      }
    }
  };

  resetLoopCount() {
    this._loopCount = 0
  }

  changeImage(image) {
    this._image = image;
  }
}