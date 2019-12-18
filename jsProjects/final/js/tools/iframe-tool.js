class IframeTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.iframeTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.iframeTool = document.createElement('div');
    this.iframeTool.classList.add('sidebar-style-block');
    this.iframeTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.iframeTool);
    this.moveComponentTool();

    this.textContent();
    this.iframeSize();
    this.displayTool();

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
    this.textContentBlock.innerHTML = this.componentEditElement.innerHTML;
    this.displaySelect.value = this.componentProps.display;
    this.imageHeightBlock.children[1].value = this.componentProps.height;
    this.imageWidthBlock.children[1].value = this.componentProps.width;


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
  }

  textContent() {
    let that = this;
    this.iframeTool.append('Code here');
    this.textContentBlock = document.createElement('textarea');
    this.textContentBlock.classList.add('text-style');
    this.textContentBlock.classList.add('textcontent-block-text');
    this.iframeTool.appendChild(this.textContentBlock);
    this.textContentBlock.oninput = function (event) {
      that.componentEditElement.innerHTML = event.target.value;
      // console.log(that.textContentBlock.innerHTML,event.target.value);
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
    this.iframeTool.appendChild(this.displayBlock);
  }

  iframeSize() {
    let that = this;
    this.iframeHeightBlock = document.createElement('div');
    this.iframeHeightBlock.classList.add('text-style');
    this.iframeHeightBlock.classList.add('imageheight-block-text');
    this.iframeHeightBlock.innerHTML =
      '<span>Height</span>' +
      '<input type="text">';
    this.iframeTool.appendChild(this.iframeHeightBlock);
    this.iframeHeightBlock.children[1].onchange = function () {
      that.componentEditElement.style.height = this.value;
    };
    this.iframeHeightBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.height = this.value;
    };

    this.iframeWidthBlock = document.createElement('div');
    this.iframeWidthBlock.classList.add('text-style');
    this.iframeWidthBlock.classList.add('imagewidth-block-text');
    this.iframeWidthBlock.innerHTML =
      '<span>Width</span>' +
      '<input type="text">';
    this.iframeTool.appendChild(this.iframeWidthBlock);
    this.iframeWidthBlock.children[1].onchange = function () {
      that.componentEditElement.style.width = this.value;
    };
    this.iframeWidthBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.width = this.value;
    };
  }


  removeAll() {
    let that = this;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-comp');
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove iframe';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.iframeTool.appendChild(removeBtn);
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
    this.iframeTool.appendChild(this.moveComponentBlock);

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
}
