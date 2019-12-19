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

  /**
   * Get random number of 6 digits for unique label
   * @returns {number}
   */
  static getRandom() {
    return Math.ceil(Math.random(100000, 999999) * 1000000);
  }

}
