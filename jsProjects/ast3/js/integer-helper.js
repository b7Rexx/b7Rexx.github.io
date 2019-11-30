function IntegerHelper() {
  /*
random integer between min and max
@param {int} min
@param {int} max
@return {int} value between or equal min and max
 */
  this.getIntegerMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
