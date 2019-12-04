class Circle {
  constructor(canvasElement, maxRadius, radius, x, y, color) {
    this.canvasElement = canvasElement;

    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;

    this.maxRadius = maxRadius;
    //true => increase|false=>decrease
    this.sizeState = true;
    //true => down|false=>up
    this.posState = true;

    //position of center of circle
    this.minPositionY = y;
    this.zeroPositionY = (y + 4 * maxRadius);
    this.maxPositionY = (y + 8 * maxRadius);

    this.drawCircle(this.radius);
  }

  drawCircle(radius) {
    this.canvasElement.fillStyle = this.color;
    this.canvasElement.beginPath();
    this.canvasElement.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    this.canvasElement.fill();
  }

  shiftCircle() {
    if (this.y > this.zeroPositionY) {
      if (this.posState)
        this.sizeState = false;
      else
        this.sizeState = true;
    } else {
      if (this.posState)
        this.sizeState = true;
      else
        this.sizeState = false;
    }

    if (this.y > this.maxPositionY)
      this.posState = false;
    else if (this.y < this.minPositionY)
      this.posState = true;

    if (this.posState) {
      this.y += 4;
      if (this.sizeState) {
        this.radius += 4 / 8;
      } else {
        this.radius -= 4 / 8;
      }
    } else {
      this.y -= 4;
      if (this.sizeState) {
        this.radius -= 4 / 8;
      } else {
        this.radius += 4 / 8;
      }
    }
    if (this.radius < 0)
      this.drawCircle(0);
    else if (this.radius > 20)
      this.drawCircle(20);
    else
      this.drawCircle(this.radius);

    // if (this.radius > 20)
    //   this.radius = 20;

    // this.color = color;
  }

  shiftCircleReverse() {
    if (this.y < this.zeroPositionY) {
      if (this.posState)
        this.sizeState = false;
      else
        this.sizeState = true;
    } else {
      if (this.posState)
        this.sizeState = true;
      else
        this.sizeState = false;
    }

    if (this.y > this.maxPositionY)
      this.posState = false;
    else if (this.y < this.minPositionY)
      this.posState = true;

    if (this.posState) {
      this.y += 4;
      if (this.sizeState) {
        this.radius += 4 / 8;
      } else {
        this.radius -= 4 / 8;
      }
    } else {
      this.y -= 4;
      if (this.sizeState) {
        this.radius -= 4 / 8;
      } else {
        this.radius += 4 / 8;
      }
    }
    // if (this.radius < 0)
    //   this.radius = 0;
    // if (this.radius > 20)
    //   this.radius = 20;

    // this.color = color;

    if (this.radius < 0)
      this.drawCircle(0);
    else if (this.radius > 20)
      this.drawCircle(20);
    else
      this.drawCircle(this.radius);
  }
}