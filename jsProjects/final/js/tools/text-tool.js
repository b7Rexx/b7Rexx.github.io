class TextTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;

    this.textTool = undefined;
    this.alignBlock = undefined;

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
    this.alignTool();
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
  }

  alignTool() {
    let that = this;
    this.alignBlock = document.createElement('div');
    this.alignBlock.classList.add('align-block-text');
    this.alignBlock.innerHTML =
      '<span>Text Align</span>' +
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
}