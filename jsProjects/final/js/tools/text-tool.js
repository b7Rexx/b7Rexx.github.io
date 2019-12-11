class TextTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.textTool = undefined;

    this.textContentBlock = undefined;
    this.alignBlock = undefined;
    this.lineHeightBlock = undefined;
    this.fontSizeBlock = undefined;
    this.fontColorBlock = undefined;
    this.backgroundColorBlock = undefined;
    this.paddingBlock = undefined;
    this.borderBlock = undefined;
    this.broderOptions = undefined;
    this.fullBorderBlock = undefined;
    this.partialBorderBlock = undefined;
    this.positionBlock = undefined;

    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;

    this.wrapperProps = undefined;
    this.containerProps = undefined;
    this.colProps = undefined;
    this.componentProps = undefined;

    this.init();
  }

  init() {
    this.textTool = document.createElement('div');
    this.textTool.classList.add('text-style-block');
    this.parentElement.appendChild(this.textTool);
    this.textContent();
    this.textSizeTool();
    this.textColorTool();
    this.alignTool();
    this.lineHeightTool();
    this.backgroundColorTool();
    this.paddingTool();
    this.borderTool();
    this.positionTool();
  }

  updateStyleTools(wrapper, container, col, component) {
    this.wrapperEditElement = wrapper;
    this.containerEditElement = container;
    this.colEditElement = col;
    this.componentEditElement = component;
    this.getStyleProperty();
  }

  getStyleProperty() {
    this.wrapperProps = super.getWrapperProperty(this.wrapperEditElement);
    this.containerProps = super.getContainerProperty(this.containerEditElement);
    this.colProps = super.getColProperty(this.colEditElement);
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

    this.textContentBlock.innerHTML = this.componentProps.text;
    this.lineHeightBlock.children[1].value = this.componentProps.lineHeight;
    this.fontSizeBlock.children[1].value = this.componentProps.fontSize;
    this.fontColorBlock.children[1].value = this.componentProps.color;
    this.backgroundColorBlock.children[1].value = this.componentProps.backgroundColor;
    this.paddingBlock.children[1].value = this.componentProps.padding;

    document.getElementById('full-border-text-value').value = this.componentProps.border;
    document.getElementById('top-border-text').value = this.componentProps.borderTop;
    document.getElementById('right-border-text').value = this.componentProps.borderRight;
    document.getElementById('bottom-border-text').value = this.componentProps.borderBottom;
    document.getElementById('left-border-text').value = this.componentProps.borderLeft;
    if (this.componentProps.border !== 'none') {
      document.getElementById('full-border-text').checked = true;
      document.getElementById('partial-border-text').checked = false;
    } else if (this.componentProps.borderTop !== 'none' || this.componentProps.borderRight !== 'none'
      || this.componentProps.borderBottom !== 'none' || this.componentProps.borderLeft !== 'none') {
      document.getElementById('full-border-text').checked = false;
      document.getElementById('partial-border-text').checked = true;
    }
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

  textSizeTool() {
    let that = this;
    this.fontSizeBlock = document.createElement('div');
    this.fontSizeBlock.classList.add('text-style');
    this.fontSizeBlock.classList.add('fontsize-block-text');
    this.fontSizeBlock.innerHTML =
      '<span>Font size </span>' +
      '<input type="number">';
    this.textTool.appendChild(this.fontSizeBlock);
    this.fontSizeBlock.children[1].onchange = function () {
      that.componentEditElement.style.lineHeight = this.value;
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
      that.componentEditElement.style.backgroundColor = this.value;
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
      '<span>Top </span> <input type="text" id="top-border-text">' +
      '<span>Right </span> <input type="text" id="right-border-text">' +
      '<span>Bottom </span> <input type="text" id="bottom-border-text">' +
      '<span>Left </span> <input type="text" id="left-border-text">';
    this.partialBorderBlock.style.display = 'none';

    this.textTool.appendChild(this.borderBlock);
    this.borderBlock.appendChild(this.fullBorderBlock);
    this.borderBlock.appendChild(this.partialBorderBlock);

    // this.borderBlock.
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
    })
  }

  positionTool() {
    let that = this;
    this.positionBlock = document.createElement('div');
    this.positionBlock.classList.add('text-style');
    this.positionBlock.classList.add('position-block-text');
    this.positionBlock.innerHTML =
      '<input type="checkbox" id="text-position">' +
      '<label for="text-position"> Absolute Position </label>';

    this.positionValueBlock = document.createElement('div');
    this.positionValueBlock.classList.add('position-value-text');
    this.topPosition = document.createElement('input');
    this.rightPosition = document.createElement('input');
    this.bottomPosition = document.createElement('input');
    this.leftPosition = document.createElement('input');

    this.positionValueBlock.appendChild(this.topPosition);
    this.positionValueBlock.appendChild(this.rightPosition);
    this.positionValueBlock.appendChild(this.bottomPosition);
    this.positionValueBlock.appendChild(this.leftPosition);

    this.textTool.appendChild(this.positionBlock);
    this.positionBlock.appendChild(this.positionValueBlock);
  }
}