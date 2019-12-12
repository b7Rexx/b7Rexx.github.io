class TextTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.textTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.textContentBlock = undefined;
    this.alignBlock = undefined;
    this.lineHeightBlock = undefined;
    this.textSpacingBlock = undefined;
    this.fontSizeBlock = undefined;
    this.fontColorBlock = undefined;
    this.backgroundColorBlock = undefined;
    this.paddingBlock = undefined;
    this.borderBlock = undefined;
    this.broderOptions = undefined;
    this.fullBorderBlock = undefined;
    this.partialBorderBlock = undefined;
    this.positionBlock = undefined;
    this.opacityBlock = undefined;

    this.init();
  }

  init() {
    this.textTool = document.createElement('div');
    this.textTool.classList.add('text-style-block');
    this.parentElement.appendChild(this.textTool);
    // this.textContent();
    this.textSizeTool();
    this.lineHeightTool();
    this.textSpacingTool();
    this.alignTool();
    this.paddingTool();

    this.textColorTool();
    this.backgroundColorTool();
    this.opacityTool();

    this.borderTool();
    this.positionTool();
  }

  updateStyleTools(component) {
    this.componentEditElement = component;
    this.getStyleProperty();
  }

  getStyleProperty() {
    this.componentProps = super.getComponentProperty(this.componentEditElement);
    this.updateChanges();
  }

  updateChanges() {
    let that = this;
    //text align
    Object.values(this.alignBlock.children[1].children).forEach(function (val) {
      val.classList.remove('active');
      if (that.componentProps.textAlign === val.getAttribute('data-align')) {
        val.classList.add('active');
      }
    });

    // this.textContentBlock.innerHTML = this.componentProps.text;
    this.lineHeightBlock.children[1].value = this.componentProps.lineHeight;
    this.textSpacingBlock.children[1].value = this.componentProps.letterSpacing;
    this.fontSizeBlock.children[1].value = this.componentProps.fontSize;
    this.fontColorBlock.children[1].value = this.componentProps.color;
    this.backgroundColorBlock.children[1].value = this.componentProps.background;
    this.opacityBlock.children[1].value = this.componentProps.opacity;
    this.paddingBlock.children[1].value = this.componentProps.padding;

    /*
    border update
     */
    this.fullBorderBlock.style.display = 'none';
    this.partialBorderBlock.style.display = 'none';
    document.getElementById('full-border-text-value').value = this.componentProps.border;
    document.getElementById('top-border-text').value = this.componentProps.borderTop;
    document.getElementById('right-border-text').value = this.componentProps.borderRight;
    document.getElementById('bottom-border-text').value = this.componentProps.borderBottom;
    document.getElementById('left-border-text').value = this.componentProps.borderLeft;
    if (this.componentProps.border !== 'none') {
      document.getElementById('full-border-text').checked = true;
      document.getElementById('partial-border-text').checked = false;
      this.fullBorderBlock.style.display = 'block';
    } else {
      if (this.componentProps.borderTop === 'none' && this.componentProps.borderRight === 'none'
        && this.componentProps.borderBottom === 'none' && this.componentProps.borderLeft === 'none') {
        document.getElementById('full-border-text').checked = false;
        document.getElementById('partial-border-text').checked = false;
      } else {
        document.getElementById('full-border-text').checked = false;
        document.getElementById('partial-border-text').checked = true;
        this.partialBorderBlock.style.display = 'block';
      }
    }

    /*
    position update
     */
    this.positionValueBlock.style.display = 'none';
    if (this.componentProps.position === 'absolute') {
      this.positionBlock.children[0].checked = true;
      this.positionValueBlock.style.display = 'block';
    } else
      this.positionBlock.children[0].checked = false;

    document.getElementById('top-position-text').value = this.componentProps.top;
    document.getElementById('right-position-text').value = this.componentProps.right;
    document.getElementById('bottom-position-text').value = this.componentProps.bottom;
    document.getElementById('left-position-text').value = this.componentProps.left;
    document.getElementById('z-position-text').value = this.componentProps.zIndex;
  }

  textContent() {
    let that = this;
    this.textContentBlock = document.createElement('textarea');
    this.textContentBlock.classList.add('text-style');
    this.textContentBlock.classList.add('textcontent-block-text');
    this.textTool.appendChild(this.textContentBlock);
    this.textContentBlock.oninput = function (event) {
      that.textContentBlock.innerHTML = event.target.value;
      // console.log(that.textContentBlock.innerHTML,event.target.value);
    };
  }

  alignTool() {
    let that = this;
    this.alignBlock = document.createElement('div');
    this.alignBlock.classList.add('text-style');
    this.alignBlock.classList.add('align-block-text');
    this.alignBlock.innerHTML =
      '<span>Align</span>' +
      '<div class="align-button-text">' +
      '<button data-align="left"><i class="fa fa-align-left"></i></button>' +
      '<button data-align="center"><i class="fa fa-align-center"></i></button>' +
      '<button data-align="right"><i class="fa fa-align-right"></i></button>' +
      '<button data-align="justify"><i class="fa fa-align-justify"></i></button>' +
      '</div>';
    this.textTool.appendChild(this.alignBlock);
    Object.values(this.alignBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.componentEditElement !== undefined) {
          that.componentEditElement.style.textAlign = val.getAttribute('data-align');
          Object.values(that.alignBlock.children[1].children).forEach(function (val1) {
            val1.classList.remove('active');
          });
          val.classList.add('active');
        }
      }
    });
  }

  lineHeightTool() {
    let that = this;
    this.lineHeightBlock = document.createElement('div');
    this.lineHeightBlock.classList.add('text-style');
    this.lineHeightBlock.classList.add('lineheight-block-text');
    this.lineHeightBlock.innerHTML =
      '<span>Line height</span>' +
      '<input type="number">';
    this.textTool.appendChild(this.lineHeightBlock);
    this.lineHeightBlock.children[1].onchange = function () {
      that.componentEditElement.style.lineHeight = this.value;
    };
  }

  textSpacingTool() {
    let that = this;
    this.textSpacingBlock = document.createElement('div');
    this.textSpacingBlock.classList.add('text-style');
    this.textSpacingBlock.classList.add('textspacing-block-text');
    this.textSpacingBlock.innerHTML =
      '<span>Letter Spacing</span>' +
      '<input type="text">';
    this.textTool.appendChild(this.textSpacingBlock);
    this.textSpacingBlock.children[1].onchange = function () {
      that.componentEditElement.style.letterSpacing = this.value;
    };
  }

  textSizeTool() {
    let that = this;
    this.fontSizeBlock = document.createElement('div');
    this.fontSizeBlock.classList.add('text-style');
    this.fontSizeBlock.classList.add('fontsize-block-text');
    this.fontSizeBlock.innerHTML =
      '<span>Font size </span>' +
      '<input type="text">';
    this.textTool.appendChild(this.fontSizeBlock);
    this.fontSizeBlock.children[1].onchange = function () {
      that.componentEditElement.style.fontSize = this.value;
    };
  }

  textColorTool() {
    let that = this;
    this.fontColorBlock = document.createElement('div');
    this.fontColorBlock.classList.add('text-style');
    this.fontColorBlock.classList.add('fontcolor-block-text');
    this.fontColorBlock.innerHTML =
      '<span>Font color </span>' +
      '<input type="color">';
    this.textTool.appendChild(this.fontColorBlock);
    this.fontColorBlock.children[1].onchange = function () {
      that.componentEditElement.style.color = this.value;
    };
  }

  backgroundColorTool() {
    let that = this;
    this.backgroundColorBlock = document.createElement('div');
    this.backgroundColorBlock.classList.add('text-style');
    this.backgroundColorBlock.classList.add('backgroundcolor-block-text');
    this.backgroundColorBlock.innerHTML =
      '<span>Background color </span>' +
      '<input type="color">';
    this.textTool.appendChild(this.backgroundColorBlock);
    this.backgroundColorBlock.children[1].onchange = function () {
      that.componentEditElement.style.background = this.value;
    };
  }

  opacityTool() {
    let that = this;
    this.opacityBlock = document.createElement('div');
    this.opacityBlock.classList.add('text-style');
    this.opacityBlock.classList.add('opacity-block-text');
    this.opacityBlock.innerHTML =
      '<span>Opacity</span>' +
      '<input type="range" min="0" max="1" step="0.1">';
    this.textTool.appendChild(this.opacityBlock);
    this.opacityBlock.children[1].onchange = function () {
      that.componentEditElement.style.opacity = this.value;
    };
  }

  paddingTool() {
    let that = this;
    this.paddingBlock = document.createElement('div');
    this.paddingBlock.classList.add('text-style');
    this.paddingBlock.classList.add('padding-block-text');
    this.paddingBlock.innerHTML =
      '<span>Padding </span>' +
      '<input type="text">';
    this.textTool.appendChild(this.paddingBlock);
    this.paddingBlock.children[1].onchange = function () {
      that.componentEditElement.style.padding = this.value;
    };
  }

  borderTool() {
    let that = this;
    this.borderBlock = document.createElement('div');
    this.borderBlock.classList.add('text-style');
    this.borderBlock.classList.add('border-block-text');
    this.borderBlock.innerHTML =
      '<span>Border </span>' +
      '<input type="radio" name="border-text" id="full-border-text" value="full">' +
      '<label for="full-border-text">Full</label>' +
      '<input type="radio" name="border-text" id="partial-border-text" value="partial">' +
      '<label for="partial-border-text">Partial</label>';
    this.fullBorderBlock = document.createElement('div');
    this.fullBorderBlock.innerHTML = '<span>Full </span> <input type="text" id="full-border-text-value">';
    this.fullBorderBlock.style.display = 'none';

    this.partialBorderBlock = document.createElement('div');
    this.partialBorderBlock.innerHTML =
      '<span>Top </span> <input type="text" data-border="top" id="top-border-text"><br>' +
      '<span>Right </span> <input type="text" data-border="right" id="right-border-text"><br>' +
      '<span>Bottom </span> <input type="text" data-border="bottom" id="bottom-border-text"><br>' +
      '<span>Left </span> <input type="text" data-border="left" id="left-border-text"><br>';
    this.partialBorderBlock.style.display = 'none';

    this.textTool.appendChild(this.borderBlock);
    this.borderBlock.appendChild(this.fullBorderBlock);
    this.borderBlock.appendChild(this.partialBorderBlock);

    this.broderOptions = this.borderBlock.querySelectorAll('input[type="radio"]');
    Object.values(this.broderOptions).forEach(function (value) {
      value.onclick = function (event) {
        that.fullBorderBlock.style.display = 'none';
        that.partialBorderBlock.style.display = 'none';
        if (event.target.value === 'full') {
          that.fullBorderBlock.style.display = 'block';
        } else {
          that.partialBorderBlock.style.display = 'block';
        }
      };
    });

    this.fullBorderBlock.children[1].onchange = function () {
      that.componentEditElement.style.border = this.value;
    };

    let partialBorders = this.partialBorderBlock.querySelectorAll('input[type="text"]');
    Object.values(partialBorders).forEach(function (value) {
      value.onchange = function () {
        switch (value.getAttribute('data-border')) {
          case 'top':
            that.componentEditElement.style.borderTop = this.value;
            break;
          case 'right':
            that.componentEditElement.style.borderRight = this.value;
            break;
          case 'bottom':
            that.componentEditElement.style.borderBottom = this.value;
            break;
          case 'left':
            that.componentEditElement.style.borderLeft = this.value;
            break;
          default:
            break;
        }
      }
    });
  }

  positionTool() {
    let that = this;
    this.positionBlock = document.createElement('div');
    this.positionBlock.classList.add('text-style');
    this.positionBlock.classList.add('position-block-text');
    this.positionBlock.innerHTML =
      '<input type="checkbox" id="text-position">' +
      '<label for="text-position"> Position Absolute  </label>';

    this.positionValueBlock = document.createElement('div');
    this.positionValueBlock.classList.add('position-value-text');

    this.textTool.appendChild(this.positionBlock);
    this.positionBlock.appendChild(this.positionValueBlock);

    this.positionValueBlock.innerHTML =
      '<span>Top </span> <input type="text" data-position="top" id="top-position-text"><br>' +
      '<span>Right </span> <input type="text" data-position="right" id="right-position-text"><br>' +
      '<span>Bottom </span> <input type="text" data-position="bottom" id="bottom-position-text"><br>' +
      '<span>Left </span> <input type="text" data-position="left" id="left-position-text"><br>' +
      '<span>Z Index </span> <input type="text" data-position="zIndex" id="z-position-text"><br>';
    this.positionValueBlock.style.display = 'none';

    if (this.checked) {
      that.positionValueBlock.style.position = 'absolute';
      that.positionValueBlock.style.display = 'block';
    } else {
      that.positionValueBlock.style.position = 'static';
      that.positionValueBlock.style.display = 'none';
    }

    this.positionBlock.children[0].onchange = function () {
      if (this.checked) {
        that.componentEditElement.style.position = 'absolute';
        that.positionValueBlock.style.display = 'block';
      } else {
        that.componentEditElement.style.position = 'static';
        that.positionValueBlock.style.display = 'none';
      }
    };

    let positions = this.positionValueBlock.querySelectorAll('input[type="text"]');
    Object.values(positions).forEach(function (value) {
      value.onchange = function () {
        switch (value.getAttribute('data-position')) {
          case 'top':
            that.componentEditElement.style.top = this.value;
            break;
          case 'right':
            that.componentEditElement.style.right = this.value;
            break;
          case 'bottom':
            that.componentEditElement.style.bottom = this.value;
            break;
          case 'left':
            that.componentEditElement.style.left = this.value;
            break;
          case 'zIndex':
            that.componentEditElement.style.zIndex = this.value;
            break;
          default:
            break;
        }
      }
    });

  }
}