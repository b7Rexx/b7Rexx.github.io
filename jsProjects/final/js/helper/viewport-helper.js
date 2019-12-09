class ViewportHelper {
  static height() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  static width() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }
}