function Box(parentElement) {
  //Game extends IntegerHelper
  IntegerHelper.call(this);

  var that = this;
  this.posX = 10;
  this.posY = 10;
  this.speed = 10;
  this.dx = this.getIntegerMinMax(1, 2);
  this.dy = this.getIntegerMinMax(1, 2);
  this.width = 10;
  this.height = 10;
  this.color = 'cornflowerblue';
  this.element = undefined;
  this.smashStatus = false;
  this.boxInterval = undefined;

  /*
  initialize box with default config
   @return this
   */
  this.init = function () {
    var box = document.createElement('span');
    box.style.position = 'absolute';
    box.style.top = this.posY + 'px';
    box.style.left = this.posX + 'px';
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    box.style.background = this.color;
    parentElement.appendChild(box);
    this.element = box;
    return this;
  };

  /*

   */
  this.customDefineBox = function (defineObj) {
    if (defineObj.height !== undefined)
      this.height = defineObj.height;
    if (defineObj.width !== undefined)
      this.width = defineObj.width;
    if (defineObj.posX !== undefined)
      this.posX = defineObj.posX;
    if (defineObj.posY !== undefined)
      this.posY = defineObj.posY;
    if (defineObj.color !== undefined)
      this.color = defineObj.color;
    if (defineObj.speed !== undefined)
      this.speed = defineObj.speed;
    this.element.style.top = this.posY + 'px';
    this.element.style.left = this.posX + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.background = this.color;
    return this;
  };
  /*
    change size of box
    @param {int} px height
    @param {int} px width
    @return this
   */
  this.changeBoxSize = function (height, width) {
    this.width = width;
    this.height = height;
    this.element.style.height = height + 'px';
    this.element.style.width = width + 'px';
    return this;
  };

  /*
  change position of box
  @param {int} px x
  @param {int} px y
  @return this
 */
  this.changePos = function (x, y) {
    this.posX = x;
    this.posY = y;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px';
    return this;
  };
  /*
  Collision detection
  @param {array} array of Object boxes
  @return {boolean} Collision status
   */
  this.checkCollision = function (boxArray) {
    var collisionStatus = false;
    boxArray.forEach(function (value) {
      if (that !== value) {
        if (
          that.posX < value.posX + value.width
          && that.posX + that.width > value.posX
          && that.posY < value.posY + value.height
          && that.posY + that.height > value.posY) {

          collisionStatus = true;
        }
      }
    });
    return collisionStatus;
  };

  /*
  Change box to ant smasher
  @return this
   */
  this.changeBoxToAnt = function () {
    this.element.style.background = 'transparent';
    this.element.style.backgroundImage = 'url("./ant.png")';
    this.element.style.backgroundSize = '100% 100%';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.addEventListener('click', function () {
      that.element.style.backgroundImage = 'url("./ant-smash.png")';
      that.element.style.opacity = '0.2';
      that.smashStatus = true;
    });
    return this;
  };

  /*
    move boxes and change direction on collision
   */
  this.moveBox = function (boxArray, parentHeight, parentWidth, callbackSmashed) {
    intervalOnBoxMove(boxArray, parentHeight, parentWidth, function () {
      callbackSmashed(that);
    })
  };

  function intervalOnBoxMove(boxArray, parentHeight, parentWidth, callbackSmashed) {
    that.boxInterval = setInterval(function () {
      if (that.smashStatus) {
        clearInterval(that.boxInterval);
        callbackSmashed();
      }

      //Box Collision
      boxArray.forEach(function (value) {
        if (that !== value) {
          if (
            that.posX < value.posX + value.width
            && that.posX + that.width > value.posX
            && that.posY < value.posY + value.height
            && that.posY + that.height > value.posY) {
            /*
              Change dx dy w.r.t. collision side
           */
            if (that.posX > value.posX) {
              that.dx = Math.abs(that.dx);
              value.dx = (-1) * Math.abs(value.dx);
            } else {
              that.dx = (-1) * Math.abs(that.dx);
              value.dx = Math.abs(value.dx);
            }
            if (that.posY > value.posY) {
              that.dy = Math.abs(that.dy);
              value.dy = (-1) * Math.abs(value.dy);
            } else {
              that.dy = (-1) * Math.abs(that.dy);
              value.dy = Math.abs(value.dy);
            }

            if ((that.height * that.width === value.height * value.width)) {
              var changeSpeed = that.speed;
              that.speed = value.speed;
              value.speed = changeSpeed;
              clearInterval(that.boxInterval);
              clearInterval(value.boxInterval);
              that.moveBox(boxArray, parentHeight, parentWidth, callbackSmashed);
              value.moveBox(boxArray, parentHeight, parentWidth, callbackSmashed);
            }
          }
        }
      });

      //Border Collision
      if (that.posX < 0)
        that.dx = Math.abs(that.dx);
      else if (that.posX > (parentWidth - that.width))
        that.dx = (-1) * Math.abs(that.dx);

      if (that.posY < 0)
        that.dy = Math.abs(that.dy);
      else if (that.posY > (parentHeight - that.height))
        that.dy = (-1) * Math.abs(that.dy);

      that.posX = that.dx + that.posX;
      that.posY = that.dy + that.posY;
      that.element.style.left = that.posX + 'px';
      that.element.style.top = that.posY + 'px';
    }, that.speed);
  }
}
