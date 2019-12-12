class Tool {
  getWrapperProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height || 'auto',
        width: elem.style.width || 'auto',
        padding: elem.style.padding || 0,
        background: (elem.style.background)? this.rgbToHex(elem.style.background): '#ffffff',
      };
    }
    return undefined;
  }

  getContainerProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height || 'auto',
        width: elem.style.width || 'auto',
        padding: elem.style.padding || 0,
        position: elem.style.position || 'static',
        top: elem.style.top,
        right: elem.style.right,
        bottom: elem.style.bottom,
        left: elem.style.left,
        zIndex: elem.style.zIndex,
        opacity: elem.style.opacity || 1,
        background: (elem.style.background)? this.rgbToHex(elem.style.background): '#ffffff',
      };
    }
    return undefined;
  }

  getColProperty(elem) {
    if (elem !== undefined) {
      return {
        height: elem.style.height || 'auto',
        width: elem.style.width || 'auto',
        padding: elem.style.padding || 0,
        background: (elem.style.background)? this.rgbToHex(elem.style.background): '#ffffff',
      };
    }
    return undefined;
  }

  getComponentProperty(elem) {
    if (elem !== undefined) {
      return {
        text: elem.innerHTML,
        height: elem.style.height || 'auto',
        width: elem.style.width || 'auto',
        textAlign: elem.style.textAlign || 'left',
        lineHeight: elem.style.lineHeight || 1,
        letterSpacing: elem.style.letterSpacing || '0px',
        fontSize: elem.style.fontSize || '16px',
        color: (elem.style.color)? this.rgbToHex(elem.style.color): '#000000',
        background: (elem.style.background)? this.rgbToHex(elem.style.background): '#ffffff',
        padding: elem.style.padding || '0px 0px 0px 0px',
        border: elem.style.border || 'none',
        borderTop: elem.style.borderTop || 'none',
        borderRight: elem.style.borderRight || 'none',
        borderBottom: elem.style.borderBottom || 'none',
        borderLeft: elem.style.borderLeft || 'none',
        position: elem.style.position || 'static',
        top: elem.style.top,
        right: elem.style.right,
        bottom: elem.style.bottom,
        left: elem.style.left,
        zIndex: elem.style.zIndex,
        opacity: elem.style.opacity || 1,
        fontWeight: elem.style.fontWeight || 'normal',
        fontStyle: elem.style.fontStyle || 'normal',
        textDecoration: elem.style.textDecoration || 'none',
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
}
