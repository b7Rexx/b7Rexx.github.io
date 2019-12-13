class LayoutTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.layoutTool = undefined;

    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.rowEditElement = undefined;
    this.colEditElement = undefined;

    this.layoutWrapperTool = undefined;
    this.layoutContainerTool = undefined;
    this.layoutColumnTool = undefined;

    this.wrapperProps = undefined;
    this.containerProps = undefined;
    this.rowProps = undefined;
    this.colProps = undefined;

    this.backgroundColorBlock = undefined;
    this.containerBackgroundColorBlock = undefined;
    this.containerPaddingBlock = undefined;
    this.colBackgroundColorBlock = undefined;
    this.colHeightBlock = undefined;
    this.containerPositionBlock = undefined;
    this.positionValueBlock = undefined;
    this.moveWrapperUp = undefined;
    this.moveWrapperDown = undefined;
 this.moveRowUp = undefined;
    this.moveRowDown = undefined;

    this.init();
  }

  init() {
    this.layoutTool = document.createElement('div');
    this.layoutTool.classList.add('sidebar-style-block');
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
    let hrLine3 = document.createElement('hr');

    this.layoutWrapperTool.append('WRAPPER');
    this.moveWrapperTool();
    this.backgroundColorTool();
    this.layoutWrapperTool.appendChild(hrLine1);

    this.layoutContainerTool.append('CONTAINER');
    this.containerBackgroundColorTool();
    this.containerPaddingTool();
    // this.containerPositionTool();
    this.layoutContainerTool.appendChild(hrLine2);

    this.layoutContainerTool.append('ROW');
    this.moveRowTool();

    this.layoutColumnTool.append('COLUMN');
    this.columnBackgroundColorTool();
    this.columnHeightTool();
  }

  updateStyleTools(wrapper, container, row, col) {
    this.wrapperEditElement = wrapper;
    this.containerEditElement = container;
    this.rowEditElement = row;
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

    if (this.wrapperEditElement !== undefined) {
      let rowIndex = DomHelper.getIndexOfElement(this.wrapperEditElement);
      let childrenLength = this.wrapperEditElement.parentNode.childNodes.length;
      this.moveWrapperUp = undefined;
      this.moveWrapperDown = undefined;
      if (this.wrapperEditElement.parentNode.childNodes.hasOwnProperty(rowIndex - 1))
        this.moveWrapperUp = this.wrapperEditElement.parentNode.childNodes[rowIndex - 1];
      if (this.wrapperEditElement.parentNode.childNodes.hasOwnProperty(rowIndex + 2))
        this.moveWrapperDown = this.wrapperEditElement.parentNode.childNodes[rowIndex + 2];
      if (rowIndex === 0) {
        this.moveWrapperUp = undefined;
      }
      if (rowIndex === (childrenLength - 1)) {
        this.moveWrapperDown = undefined;
      }
      if (rowIndex === (childrenLength - 2)) {
        this.moveWrapperDown = 'last';
      }

      Object.values(this.moveWrapperBlock.children[1].children).forEach(function (val) {
        val.style.pointerEvents = 'none';
        switch (val.getAttribute('data-move')) {
          case 'top':
            if (that.moveWrapperUp !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
          case 'bottom':
            if (that.moveWrapperDown !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
        }
      });
    }

    if (this.rowEditElement !== undefined) {
      let rowIndex = DomHelper.getIndexOfElement(this.rowEditElement);
      let childrenLength = this.rowEditElement.parentNode.childNodes.length;
      this.moveRowUp = undefined;
      this.moveRowDown = undefined;
      if (this.rowEditElement.parentNode.childNodes.hasOwnProperty(rowIndex - 1))
        this.moveRowUp = this.rowEditElement.parentNode.childNodes[rowIndex - 1];
      if (this.rowEditElement.parentNode.childNodes.hasOwnProperty(rowIndex + 2))
        this.moveRowDown = this.rowEditElement.parentNode.childNodes[rowIndex + 2];
      if (rowIndex === 0) {
        this.moveRowUp = undefined;
      }
      if (rowIndex === (childrenLength - 1)) {
        this.moveRowDown = undefined;
      }
      if (rowIndex === (childrenLength - 2)) {
        this.moveRowDown = 'last';
      }

      Object.values(this.moveRowBlock.children[1].children).forEach(function (val) {
        val.style.pointerEvents = 'none';
        switch (val.getAttribute('data-move')) {
          case 'top':
            if (that.moveRowUp !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
          case 'bottom':
            if (that.moveRowDown !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
        }
      });
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

  moveWrapperTool() {
    let that = this;
    this.moveWrapperBlock = document.createElement('div');
    this.moveWrapperBlock.classList.add('text-style');
    this.moveWrapperBlock.classList.add('moverow-block-layout');
    this.moveWrapperBlock.innerHTML =
      '<span>Move</span>' +
      '<div class="move-button-row">' +
      '<button data-move="top"><i class="fa fa-angle-up"></i></button>' +
      '<button data-move="bottom"><i class="fa fa-angle-down"></i></button>' +
      '</div>';
    this.layoutWrapperTool.appendChild(this.moveWrapperBlock);

    Object.values(this.moveWrapperBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.wrapperEditElement !== undefined) {
          switch (val.getAttribute('data-move')) {
            case 'top':
              if (that.moveWrapperUp !== undefined) {
                that.wrapperEditElement.parentNode.insertBefore(that.wrapperEditElement, that.moveWrapperUp);
                that.updateChanges();
              }
              break;
            case 'bottom':
              if (that.moveWrapperDown === 'last') {
                that.wrapperEditElement.parentNode.appendChild(that.wrapperEditElement);
                that.updateChanges();
              } else {
                if (that.moveWrapperDown !== undefined) {
                  that.wrapperEditElement.parentNode.insertBefore(that.wrapperEditElement, that.moveWrapperDown);
                  that.updateChanges();
                }
              }
              break;
          }

        }
      }
    });
  }
  moveRowTool() {
    let that = this;
    this.moveRowBlock = document.createElement('div');
    this.moveRowBlock.classList.add('text-style');
    this.moveRowBlock.classList.add('moverow-block-layout');
    this.moveRowBlock.innerHTML =
      '<span>Move</span>' +
      '<div class="move-button-row">' +
      '<button data-move="top"><i class="fa fa-angle-up"></i></button>' +
      '<button data-move="bottom"><i class="fa fa-angle-down"></i></button>' +
      '</div>';
    this.layoutColumnTool.appendChild(this.moveRowBlock);

    Object.values(this.moveRowBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.rowEditElement !== undefined) {
          switch (val.getAttribute('data-move')) {
            case 'top':
              if (that.moveRowUp !== undefined) {
                that.rowEditElement.parentNode.insertBefore(that.rowEditElement, that.moveRowUp);
                that.updateChanges();
              }
              break;
            case 'bottom':
              if (that.moveRowDown === 'last') {
                that.rowEditElement.parentNode.appendChild(that.rowEditElement);
                that.updateChanges();
              } else {
                if (that.moveRowDown !== undefined) {
                  that.rowEditElement.parentNode.insertBefore(that.rowEditElement, that.moveRowDown);
                  that.updateChanges();
                }
              }
              break;
          }

        }
      }
    });
  }
}
