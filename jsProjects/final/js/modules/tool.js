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
        text: elem.innerHTML,
        height: elem.style.height,
        width: elem.style.width,
        background: elem.style.background,
        textAlign: elem.style.textAlign || 'left',
        lineHeight: elem.style.lineHeight || 1,
        fontSize: elem.style.fontSize || 16,
        color: elem.style.color || '#000000',
        backgroundColor: elem.style.backgroundColor || '#ffffff',
        padding: elem.style.padding || '0px 0px 0px 0px',
        border: elem.style.border || 'none',
        borderTop: elem.style.borderTop || 'none',
        borderRight: elem.style.borderRight || 'none',
        borderBottom: elem.style.borderBottom || 'none',
        borderLeft: elem.style.borderLeft || 'none',
      };
    }
    return undefined;
  }

}
