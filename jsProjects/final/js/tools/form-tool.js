class FormTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.formTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.formTool = document.createElement('div');
    this.formTool.classList.add('sidebar-style-block');
    this.formTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.formTool);

    this.formTool.append('Select the component');
    this.moveComponentTool();
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

    //move component
    if (this.componentEditElement !== undefined) {
      let rowIndex = DomHelper.getIndexOfElement(this.componentEditElement);
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
    this.formTool.appendChild(this.moveComponentBlock);

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
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove form';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.formTool.appendChild(removeBtn);
  }
}
