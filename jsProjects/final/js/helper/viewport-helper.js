class ViewportHelper {
  /*
  @return {int} viewport height in px
   */
  static height() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  /*
@return {int} viewport width in px
 */
  static width() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
}