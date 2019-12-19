class TextTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.textTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.textTool = document.createElement('div');
    this.textTool.classList.add('sidebar-style-block');
    this.parentElement.appendChild(this.textTool);
    this.moveComponentTool();
    this.setLink();
    this.headingTool();
    this.textSizeTool();
    this.textStyleTool();
    this.lineHeightTool();
    this.textSpacingTool();
    this.alignTool();
    this.paddingTool();
    this.textColorTool();
    this.backgroundColorTool();
    this.opacityTool();
    this.textBlockSize();
    this.displayTool();
    this.borderRadiusTool();
    this.borderTool();
    this.positionTool();
    this.removeAll();
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
    this.headingSelect.value = 'none';
    if (this.componentEditElement.children[0] !== undefined) {
      this.headingSelect.value = (this.componentEditElement.children[0].tagName).toLowerCase();
    }
    this.displaySelect.value = this.componentProps.display;
// this.headingSelect.value =
    // this.textContentBlock.innerHTML = this.componentProps.text;
    this.linkDiv.children[1].value = this.componentEditElement.getAttribute('data-href');
    this.lineHeightBlock.children[1].value = this.componentProps.lineHeight;
    this.textSpacingBlock.children[1].value = this.componentProps.letterSpacing;
    this.fontSizeBlock.children[1].value = this.componentProps.fontSize;
    this.fontColorBlock.children[1].value = this.componentProps.color;
    this.backgroundColorBlock.children[1].value = this.componentProps.background;
    this.opacityBlock.children[1].value = this.componentProps.opacity;
    this.paddingBlock.children[1].value = this.componentProps.padding;
    this.borderRadiusBlock.children[1].value = this.componentProps.borderRadius;
    this.textHeightBlock.children[1].value = this.componentProps.height;
    this.textWidthBlock.children[1].value = this.componentProps.width;

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

    /*
    font style
     */

    Object.values(this.fontStyleBlock.children[1].children).forEach(function (val) {
      switch (val.getAttribute('data-style')) {
        case 'bold':
          if (that.componentProps.fontWeight === 'bold') {
            val.classList.add('active');
          } else {
            val.classList.remove('active');
          }
          break;
        case 'italic':
          if (that.componentProps.fontStyle === 'italic') {
            val.classList.add('active');
          } else {
            val.classList.remove('active');
          }
          break;
        case 'underlined':
          if (that.componentProps.textDecoration === 'underline') {
            val.classList.add('active');
          } else {
            val.classList.remove('active');
          }
          break;
        default:
          break;
      }
    });

    //move component
    if (this.componentEditElement !== undefined) {
      let rowIndex = DomHelper.getIndexOfElement(this.componentEditElement);
      if (rowIndex !== 'parentNodeEmpty') {
        let childrenLength = this.componentEditElement.parentNode.childNodes.length;
        this.moveComponentUp = undefined;
        this.moveComponentDown = undefined;
        if (this.componentEditElement.parentNode.childNodes.hasOwnProperty(rowIndex - 1))
          this.moveComponentUp = this.componentEditElement.parentNode.childNodes[rowIndex - 1];
        if (this.componentEditElement.parentNode.childNodes.hasOwnProperty(rowIndex + 2))
          this.moveComponentDown = this.componentEditElement.parentNode.childNodes[rowIndex + 2];
        if (rowIndex === 0) {
          this.moveComponentUp = undefined;
        }
        if (rowIndex === (childrenLength - 1)) {
          this.moveComponentDown = undefined;
        }
        if (rowIndex === (childrenLength - 2)) {
          this.moveComponentDown = 'last';
        }
      }

      Object.values(this.moveComponentBlock.children[1].children).forEach(function (val) {
        val.style.pointerEvents = 'none';
        switch (val.getAttribute('data-move')) {
          case 'top':
            if (that.moveComponentUp !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
          case 'bottom':
            if (that.moveComponentDown !== undefined) {
              val.style.pointerEvents = 'auto';
            }
            break;
        }
      });
    }
  }

  textContent() {
    let that = this;
    this.textContentBlock = document.createElement('textarea');
    this.textContentBlock.classList.add('text-style');
    this.textContentBlock.classList.add('textcontent-block-text');
    this.textTool.appendChild(this.textContentBlock);
    this.textContentBlock.oninput = function (event) {
      that.componentEditElement.innerHTML = event.target.value;
      // console.log(that.textContentBlock.innerHTML,event.target.value);
    };
  }

  setLink() {
    let that = this;
    this.linkDiv = document.createElement('div');
    this.linkDiv.classList.add('text-style');

    let linkSpan = document.createElement('span');
    linkSpan.innerHTML = '<i class="fa fa-link"></i> href : ';
    let linkInput = document.createElement('input');
    linkInput.classList.add('style-href');
    linkInput.onkeyup = function () {
      that.componentEditElement.setAttribute('data-href', this.value);
    };
    this.linkDiv.appendChild(linkSpan);
    this.linkDiv.appendChild(linkInput);
    this.textTool.appendChild(this.linkDiv);
  }

  headingTool() {
    let that = this;
    this.headingBlock = document.createElement('div');
    this.headingBlock.classList.add('text-style');

    let headingSpan = document.createElement('span');
    headingSpan.innerHTML = 'Text tags : ';
    this.headingSelect = document.createElement('select');
    this.headingSelect.innerHTML =
      '<option value="none">None</option>' +
      '<option value="p">Paragraph P</option>' +
      '<option value="h1">Heading H1</option>' +
      '<option value="h2">Heading H2</option>' +
      '<option value="h3">Heading H3</option>' +
      '<option value="h4">Heading H4</option>' +
      '<option value="h5">Heading H5</option>';

    this.headingSelect.onchange = function () {
      if (this.value === 'none') {
        that.componentEditElement.innerHTML = that.componentEditElement.innerText;
      } else {
        that.componentEditElement.innerHTML = `<${this.value}>${that.componentEditElement.innerText}</${this.value}>`;
      }
    };
    this.headingBlock.appendChild(headingSpan);
    this.headingBlock.appendChild(this.headingSelect);
    this.textTool.appendChild(this.headingBlock);
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

  textStyleTool() {
    let that = this;
    this.fontStyleBlock = document.createElement('div');
    this.fontStyleBlock.classList.add('text-style');
    this.fontStyleBlock.classList.add('fontstyle-block-text');
    this.fontStyleBlock.innerHTML =
      '<span>Font Style</span>' +
      '<div class="fontstyle-button-text">' +
      '<button data-style="bold"><i class="fa fa-bold"></i></button>' +
      '<button data-style="italic"><i class="fa fa-italic"></i></button>' +
      '<button data-style="underlined"><i class="fa fa-underline"></i></button>' +
      '</div>';
    this.textTool.appendChild(this.fontStyleBlock);
    Object.values(this.fontStyleBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.componentEditElement !== undefined) {
          switch (val.getAttribute('data-style')) {
            case 'bold':
              if (val.classList.contains('active')) {
                that.componentEditElement.style.fontWeight = 'normal';
                val.classList.remove('active');
              } else {
                that.componentEditElement.style.fontWeight = 'bold';
                val.classList.add('active');
              }
              break;
            case 'italic':
              if (val.classList.contains('active')) {
                that.componentEditElement.style.fontStyle = 'normal';
                val.classList.remove('active');
              } else {
                that.componentEditElement.style.fontStyle = 'italic';
                val.classList.add('active');
              }
              break;
            case 'underlined':
              if (val.classList.contains('active')) {
                that.componentEditElement.style.textDecoration = 'none';
                val.classList.remove('active');
              } else {
                that.componentEditElement.style.textDecoration = 'underline';
                val.classList.add('active');
              }
              break;
            default:
              break;
          }
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
    this.lineHeightBlock.children[1].onkeyup = function () {
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
    this.textSpacingBlock.children[1].onkeyup = function () {
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
    this.fontSizeBlock.children[1].onkeyup = function () {
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
    this.paddingBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.padding = this.value;
    };
  }

  borderRadiusTool() {
    let that = this;
    this.borderRadiusBlock = document.createElement('div');
    this.borderRadiusBlock.classList.add('text-style');
    this.borderRadiusBlock.classList.add('fontsize-block-text');
    this.borderRadiusBlock.innerHTML =
      '<span>Border radius </span>' +
      '<input type="text">';
    this.textTool.appendChild(this.borderRadiusBlock);
    this.borderRadiusBlock.children[1].onchange = function () {
      that.componentEditElement.style.borderRadius = this.value;
    };
    this.borderRadiusBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.borderRadius = this.value;
    };
  }

  displayTool() {
    let that = this;
    this.displayBlock = document.createElement('div');
    this.displayBlock.classList.add('text-style');

    let displaySpan = document.createElement('span');
    displaySpan.innerHTML = 'Display : ';
    this.displaySelect = document.createElement('select');
    this.displaySelect.innerHTML =
      '<option value="block">block</option>' +
      '<option value="inline-block">inline-block</option>' +
      '<option value="inline">inline</option>' +
      '<option value="inherit">inherit</option>';

    this.displaySelect.onchange = function () {
        that.componentEditElement.style.display = this.value;
      };
    this.displayBlock.appendChild(displaySpan);
    this.displayBlock.appendChild(this.displaySelect);
    this.textTool.appendChild(this.displayBlock);
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
      '<span>Top </span> <input type="text" data-position="top" id="top-position-text">' +
      '<span>Right </span> <input type="text" data-position="right" id="right-position-text">' +
      '<span>Bottom </span> <input type="text" data-position="bottom" id="bottom-position-text">' +
      '<span>Left </span> <input type="text" data-position="left" id="left-position-text">' +
      '<span>Z Index </span> <input type="text" data-position="zIndex" id="z-position-text">';
    this.positionValueBlock.style.display = 'none';

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
      };
      value.onkeyup = function () {
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
      };
    });

  }


  textBlockSize() {
    let that = this;
    this.textHeightBlock = document.createElement('div');
    this.textHeightBlock.classList.add('text-style');
    this.textHeightBlock.classList.add('textheight-block-text');
    this.textHeightBlock.innerHTML =
      '<span>Height</span>' +
      '<input type="text">';
    this.textTool.appendChild(this.textHeightBlock);
    this.textHeightBlock.children[1].onchange = function () {
      that.componentEditElement.style.height = this.value;
    };
    this.textHeightBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.height = this.value;
    };

    this.textWidthBlock = document.createElement('div');
    this.textWidthBlock.classList.add('text-style');
    this.textWidthBlock.classList.add('textwidth-block-text');
    this.textWidthBlock.innerHTML =
      '<span>Width</span>' +
      '<input type="text">';
    this.textTool.appendChild(this.textWidthBlock);
    this.textWidthBlock.children[1].onchange = function () {
      that.componentEditElement.style.width = this.value;
    };
    this.textWidthBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.width = this.value;
    };
  }


  moveComponentTool() {
    let that = this;
    this.moveComponentBlock = document.createElement('div');
    this.moveComponentBlock.classList.add('text-style');
    this.moveComponentBlock.classList.add('moverow-block-layout');
    this.moveComponentBlock.innerHTML =
      '<span>Move</span>' +
      '<div class="move-button-row">' +
      '<button data-move="top"><i class="fa fa-angle-up"></i></button>' +
      '<button data-move="bottom"><i class="fa fa-angle-down"></i></button>' +
      '</div>';
    this.textTool.appendChild(this.moveComponentBlock);

    Object.values(this.moveComponentBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.componentEditElement !== undefined) {
          switch (val.getAttribute('data-move')) {
            case 'top':
              if (that.moveComponentUp !== undefined) {
                that.componentEditElement.parentNode.insertBefore(that.componentEditElement, that.moveComponentUp);
                that.updateChanges();
              }
              break;
            case 'bottom':
              if (that.moveComponentDown === 'last') {
                that.componentEditElement.parentNode.appendChild(that.componentEditElement);
                that.updateChanges();
              } else {
                if (that.moveComponentDown !== undefined) {
                  that.componentEditElement.parentNode.insertBefore(that.componentEditElement, that.moveComponentDown);
                  that.updateChanges();
                }
              }
              break;
          }

        }
      }
    });
  }

  removeAll() {
    let that = this;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-comp');
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove text';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.textTool.appendChild(removeBtn);
  }
}