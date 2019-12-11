class Tool {
  getWrapperProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height,
        width: elem.style.width,
        background: elem.style.background,
      };
    }
    return undefined;
  }

  getContainerProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height,
        width: elem.style.width,
        background: elem.style.background,
      };
    }
    return undefined;
  }

  getColProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height,
        width: elem.style.width,
        background: elem.style.background,
      };
    }
    return undefined;
  }

  getComponentProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height,
        width: elem.style.width,
        background: elem.style.background,
        textAlign: elem.style.textAlign||'left',
      };
    }
    return undefined;
  }

}
