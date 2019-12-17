class Tool {
  getWrapperProperty(elem) {
    if (elem !== undefined) {
      return {
        height: Tool.getComputed(elem, 'height') || 'auto',
        width: Tool.getComputed(elem, 'width') || 'auto',
        padding: Tool.getComputed(elem, 'padding') || 0,
        background: elem.style.background ? this.rgbToHex(elem.style.background) : '#ffffff',
        position: Tool.getComputed(elem, 'position') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'z-index'),
        overflow: Tool.getComputed(elem, 'overflow'),
        backgroundRepeat: Tool.getComputed(elem, 'background-repeat'),
        backgroundSize: Tool.getComputed(elem, 'background-size'),
        backgroundImage: Tool.getComputed(elem, 'background-image').slice(4, -1).replace(/"/g, ""),
      };
    }
    return undefined;
  }

  getContainerProperty(elem) {
    if (elem !== undefined) {
      return {
        height: Tool.getComputed(elem, 'height') || 'auto',
        width: Tool.getComputed(elem, 'width') || 'auto',
        padding: Tool.getComputed(elem, 'padding') || 0,
        position: Tool.getComputed(elem, 'position') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'z-index'),
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
        textAlign: Tool.getComputed(elem, 'text-align') || 'left',
        lineHeight: Tool.getComputed(elem, 'line-height') || 1,
        letterSpacing: Tool.getComputed(elem, 'letter-spacing') || '0px',
        fontSize: Tool.getComputed(elem, 'font-size') || '16px',
        color: (elem.style.color) ? this.rgbToHex(elem.style.color) : '#000000',
        background: (elem.style.background) ? this.rgbToHex(elem.style.background) : '#ffffff',
        padding: Tool.getComputed(elem, 'padding ') || '0px 0px 0px 0px',
        border: elem.style.border || 'none',
        borderTop: elem.style.borderTop || 'none',
        borderRight: elem.style.borderRight || 'none',
        borderBottom: elem.style.borderBottom || 'none',
        borderLeft: elem.style.borderLeft || 'none',
        position: Tool.getComputed(elem, 'position') || 'static',
        top: Tool.getComputed(elem, 'top'),
        right: Tool.getComputed(elem, 'right'),
        bottom: Tool.getComputed(elem, 'bottom'),
        left: Tool.getComputed(elem, 'left'),
        zIndex: Tool.getComputed(elem, 'z-index'),
        opacity: Tool.getComputed(elem, 'opacity') || 1,
        fontWeight: Tool.getComputed(elem, 'font-weight') || 'normal',
        fontStyle: Tool.getComputed(elem, 'font-style') || 'normal',
        textDecoration: Tool.getComputed(elem, 'text-decoration') || 'none',
        listStyle: Tool.getComputed(elem, 'list-style') || 'none',
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
  static getComputed(elem, propertyName, style) {
    // style = style || true;
    // if (style) {
    if (elem.style.getPropertyValue(propertyName))
      return elem.style.getPropertyValue(propertyName);
    else
      return window.getComputedStyle(elem).getPropertyValue(propertyName);
    // } else {
    // if (elem.getPropertyValue(propertyName))
    //   return elem.getPropertyValue(propertyName);
    // else
    //   return window.getComputedStyle(elem).getPropertyValue(propertyName);
    // }
  }
}
