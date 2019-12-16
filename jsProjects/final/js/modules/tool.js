class Tool {
  getWrapperProperty(elem) {
    if (elem !== undefined) {
      return {
        height: Tool.getComputed(elem, 'height ') || 'auto',
        width: Tool.getComputed(elem, 'width ') || 'auto',
        padding: Tool.getComputed(elem, 'padding ') || 0,
        background: elem.style.background ? this.rgbToHex(elem.style.background) : '#ffffff',
        position: Tool.getComputed(elem, 'position ') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'zIndex'),
        overflow: Tool.getComputed(elem, 'overflow'),
      };
    }
    return undefined;
  }

  getContainerProperty(elem) {
    if (elem !== undefined) {
      return {
        height: Tool.getComputed(elem, 'height ') || 'auto',
        width: Tool.getComputed(elem, 'width ') || 'auto',
        padding: Tool.getComputed(elem, 'padding ') || 0,
        position: Tool.getComputed(elem, 'position ') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'zIndex'),
        opacity: Tool.getComputed(elem, 'opacity ') || 1,
        background: (elem.style.background) ? this.rgbToHex(elem.style.background) : '#ffffff',
      };
    }
    return undefined;
  }

  getColProperty(elem) {
    if (elem !== undefined) {
      return {
        height: Tool.getComputed(elem, 'height ') || 'auto',
        width: Tool.getComputed(elem, 'width ') || 'auto',
        padding: Tool.getComputed(elem, 'padding ') || 0,
        background: (elem.style.background) ? this.rgbToHex(elem.style.background) : '#ffffff',
      };
    }
    return undefined;
  }

  getComponentProperty(elem) {
    if (elem !== undefined) {
      return {
        text: elem.innerHTML,
        src: elem.src,
        alt: elem.alt,
        height: Tool.getComputed(elem, 'height') || 'auto',
        width: Tool.getComputed(elem, 'width') || 'auto',
        textAlign: Tool.getComputed(elem, 'textAlign') || 'left',
        lineHeight: Tool.getComputed(elem, 'lineHeight') || 1,
        letterSpacing: Tool.getComputed(elem, 'letterSpacing') || '0px',
        fontSize: Tool.getComputed(elem, 'fontSize') || '16px',
        color: (elem.style.color) ? this.rgbToHex(elem.style.color) : '#000000',
        background: (elem.style.background) ? this.rgbToHex(elem.style.background) : '#ffffff',
        padding: Tool.getComputed(elem, 'padding ') || '0px 0px 0px 0px',
        border: Tool.getComputed(elem, 'border ') || 'none',
        borderTop: Tool.getComputed(elem, 'borderTop ') || 'none',
        borderRight: Tool.getComputed(elem, 'borderRight ') || 'none',
        borderBottom: Tool.getComputed(elem, 'borderBottom ') || 'none',
        borderLeft: Tool.getComputed(elem, 'borderLeft ') || 'none',
        position: Tool.getComputed(elem, 'position ') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'zIndex'),
        opacity: Tool.getComputed(elem, 'opacity ') || 1,
        fontWeight: Tool.getComputed(elem, 'fontWeight ') || 'normal',
        fontStyle: Tool.getComputed(elem, 'fontStyle ') || 'normal',
        textDecoration: Tool.getComputed(elem, 'textDecoration ') || 'none',
        listStyle: Tool.getComputed(elem, 'listStyle ') || 'none',
      };
    }
    return undefined;
  }

  rgbToHex(rgb) {
    let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

//Function to convert rgb color to hex format
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);

    function hex(x) {
      return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
  }

  /*
  @param {object} elem
  @param {string} propertyName
  @return property value

  getComputed if inline is empty
   */
  static getComputed(elem, propertyName) {
    return elem.style.getPropertyValue(propertyName) || window.getComputedStyle(elem).getPropertyValue(propertyName);
  }
}
