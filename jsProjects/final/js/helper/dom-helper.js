class DomHelper {
  static getIndexOfElement(el) {
    var children = el.parentNode.childNodes,
      i = 0;
    for (; i < children.length; i++) {
      if (children[i] == el) {
        return i;
      }
    }
    return -1;
  }
}
