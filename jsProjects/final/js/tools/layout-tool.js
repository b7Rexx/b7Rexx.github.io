class LayoutTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.layoutTool = undefined;

    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.colEditElement = undefined;

    this.layoutWrapperTool = undefined;
    this.layoutContainerTool = undefined;
    this.layoutColumnTool = undefined;

    this.wrapperProps = undefined;
    this.containerProps = undefined;
    this.colProps = undefined;

    this.backgroundColorBlock = undefined;
    this.containerBackgroundColorBlock = undefined;
    this.containerPaddingBlock = undefined;
    this.colBackgroundColorBlock = undefined;
    this.colHeightBlock = undefined;
    this.containerPositionBlock = undefined;
    this.positionValueBlock = undefined;

    this.init();
  }

  init() {
    this.layoutTool = document.createElement('div');
    this.layoutTool.classList.add('layout-style-block');
    this.parentElement.appendChild(this.layoutTool);

    this.layoutWrapperTool = document.createElement('div');
    this.layoutContainerTool = document.createElement('div');
    this.layoutColumnTool = document.createElement('div');
    this.layoutTool.appendChild(this.layoutWrapperTool);
    this.layoutTool.appendChild(this.layoutContainerTool);
    this.layoutTool.appendChild(this.layoutColumnTool);

    let hrLine1 = document.createElement('hr');
    let hrLine2 = document.createElement('hr');

    this.layoutWrapperTool.append('Wrapper');
    this.backgroundColorTool();
    this.layoutWrapperTool.appendChild(hrLine1);

    this.layoutContainerTool.append('Container');
    this.containerBackgroundColorTool();
    this.containerPaddingTool();
    // this.containerPositionTool();
    this.layoutContainerTool.appendChild(hrLine2);

    this.layoutColumnTool.append('Column');
    this.columnBackgroundColorTool();
    this.columnHeightTool();
  }

  updateStyleTools(wrapper, container, col) {
    this.wrapperEditElement = wrapper;
    this.containerEditElement = container;
    this.colEditElement = col;
    this.getStyleProperty();
  }

  getStyleProperty() {
    this.wrapperProps = super.getWrapperProperty(this.wrapperEditElement);
    this.containerProps = super.getContainerProperty(this.containerEditElement);
    this.colProps = super.getColProperty(this.colEditElement);
    this.updateChanges();
  }

  updateChanges() {
    let that = this;
    if (this.wrapperProps !== undefined) {
      this.backgroundColorBlock.children[1].value = this.wrapperProps.background;
      this.layoutWrapperTool.style.display = 'block';
    } else {
      this.layoutWrapperTool.style.display = 'none';
    }
    if (this.containerProps !== undefined) {
      this.containerBackgroundColorBlock.children[1].value = this.containerProps.background;
      this.containerPaddingBlock.children[1].value = this.containerProps.padding;

      this.layoutContainerTool.style.display = 'block';
    } else {
      this.layoutContainerTool.style.display = 'none';
    }
    if (this.colProps !== undefined) {
      this.colBackgroundColorBlock.children[1].value = this.colProps.background;
      this.colHeightBlock.children[1].value = this.colProps.height;
      this.layoutColumnTool.style.display = 'block';
    } else {
      this.layoutColumnTool.style.display = 'none';
    }
  }


  backgroundColorTool() {
    let that = this;
    this.backgroundColorBlock = document.createElement('div');
    this.backgroundColorBlock.classList.add('text-style');
    this.backgroundColorBlock.classList.add('backgroundcolor-block-text');
    this.backgroundColorBlock.innerHTML =
      '<span>Background color </span>' +
      '<input type="color">';
    this.layoutWrapperTool.appendChild(this.backgroundColorBlock);
    this.backgroundColorBlock.children[1].onchange = function (event) {
      that.wrapperEditElement.style.background = event.target.value;
    };
  }

  containerBackgroundColorTool() {
    let that = this;
    this.containerBackgroundColorBlock = document.createElement('div');
    this.containerBackgroundColorBlock.classList.add('text-style');
    this.containerBackgroundColorBlock.classList.add('backgroundcolor-block-text');
    this.containerBackgroundColorBlock.innerHTML =
      '<span>Background color </span>' +
      '<input type="color">';
    this.layoutContainerTool.appendChild(this.containerBackgroundColorBlock);
    this.containerBackgroundColorBlock.children[1].onchange = function (event) {
      that.containerEditElement.style.background = event.target.value;
    };
  }

  containerPaddingTool() {
    let that = this;
    this.containerPaddingBlock = document.createElement('div');
    this.containerPaddingBlock.classList.add('text-style');
    this.containerPaddingBlock.classList.add('padding-block-text');
    this.containerPaddingBlock.innerHTML =
      '<span>Padding </span>' +
      '<input type="text">';
    this.layoutContainerTool.appendChild(this.containerPaddingBlock);
    this.containerPaddingBlock.children[1].onchange = function () {
      that.containerEditElement.style.padding = this.value;
    };

  }

  containerPositionTool() {
    let that = this;
    this.containerPositionBlock = document.createElement('div');
    this.containerPositionBlock.classList.add('text-style');
    this.containerPositionBlock.classList.add('position-block-text');
    this.containerPositionBlock.innerHTML =
      '<input type="checkbox" id="container-position">' +
      '<label for="container-position"> Position Absolute  </label>';

    this.positionValueBlock = document.createElement('div');
    this.positionValueBlock.classList.add('position-value-text');

    this.layoutContainerTool.appendChild(this.containerPositionBlock);
    this.containerPositionBlock.appendChild(this.positionValueBlock);

    this.positionValueBlock.innerHTML =
      '<span>Top </span> <input type="text" data-position="top" id="top-position-container"><br>' +
      '<span>Right </span> <input type="text" data-position="right" id="right-position-container"><br>' +
      '<span>Bottom </span> <input type="text" data-position="bottom" id="bottom-position-container"><br>' +
      '<span>Left </span> <input type="text" data-position="left" id="left-position-container"><br>' +
      '<span>Z Index </span> <input type="text" data-position="zIndex" id="z-position-container"><br>';
    this.positionValueBlock.style.display = 'none';

    if (that.containerEditElement !== undefined) {
      if (this.checked) {
        that.containerEditElement.style.position = 'absolute';
        that.positionValueBlock.style.display = 'block';
      } else {
        that.containerEditElement.style.position = 'static';
        that.positionValueBlock.style.display = 'none';
      }
    }

    this.containerPositionBlock.children[0].onchange = function () {
      if (this.checked) {
        that.containerEditElement.style.position = 'absolute';
        that.positionValueBlock.style.display = 'block';
      } else {
        that.containerEditElement.style.position = 'static';
        that.positionValueBlock.style.display = 'none';
      }
    };

    let positions = this.positionValueBlock.querySelectorAll('input[type="text"]');
    Object.values(positions).forEach(function (value) {
      value.onchange = function () {
        switch (value.getAttribute('data-position')) {
          case 'top':
            that.containerEditElement.style.top = this.value;
            break;
          case 'right':
            that.containerEditElement.style.right = this.value;
            break;
          case 'bottom':
            that.containerEditElement.style.bottom = this.value;
            break;
          case 'left':
            that.containerEditElement.style.left = this.value;
            break;
          case 'zIndex':
            that.containerEditElement.style.zIndex = this.value;
            break;
          default:
            break;
        }
      }
    });
  }


  columnBackgroundColorTool() {
    let that = this;
    this.colBackgroundColorBlock = document.createElement('div');
    this.colBackgroundColorBlock.classList.add('text-style');
    this.colBackgroundColorBlock.classList.add('backgroundcolor-block-text');
    this.colBackgroundColorBlock.innerHTML =
      '<span>Background color </span>' +
      '<input type="color">';
    this.layoutColumnTool.appendChild(this.colBackgroundColorBlock);
    this.colBackgroundColorBlock.children[1].onchange = function (event) {
      that.colEditElement.style.background = event.target.value;
    };
  }

  columnHeightTool() {
    let that = this;
    this.colHeightBlock = document.createElement('div');
    this.colHeightBlock.classList.add('text-style');
    this.colHeightBlock.classList.add('backgroundcolor-block-text');
    this.colHeightBlock.innerHTML =
      '<span>Column Height</span>' +
      '<input type="text">';
    this.layoutColumnTool.appendChild(this.colHeightBlock);
    this.colHeightBlock.children[1].onchange = function () {
      that.colEditElement.style.height = this.value;
    };
  }
}
