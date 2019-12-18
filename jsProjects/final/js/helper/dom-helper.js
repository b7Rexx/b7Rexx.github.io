class DomHelper {
  /**
   *
   * @param el {object} dom element of which index calculated
   * @returns {string|number} number if success, string if fail
   */
  static getIndexOfElement(el) {
    if (!el.parentNode)
      return 'parentNodeEmpty';
    let children = el.parentNode.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (children[i] == el) {
        return i;
      }
    }
    return -1;
  }
}
