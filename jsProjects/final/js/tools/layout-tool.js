class LayoutTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.layoutTool = undefined;

    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.colEditElement = undefined;

    this.wrapperProps = undefined;
    this.containerProps = undefined;
    this.colProps = undefined;

    this.backgroundColorBlock = undefined;


    this.init();
  }

  init() {
    this.layoutTool = document.createElement('div');
    this.layoutTool.classList.add('layout-style-block');
    this.parentElement.appendChild(this.layoutTool);
    this.backgroundColorTool();
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
    this.backgroundColorBlock.children[1].value = this.componentProps.backgroundColor;

  }


  backgroundColorTool() {
    let that = this;
    this.backgroundColorBlock = document.createElement('div');
    this.backgroundColorBlock.classList.add('text-style');
    this.backgroundColorBlock.classList.add('backgroundcolor-block-text');
    this.backgroundColorBlock.innerHTML =
      '<span>Background color </span>' +
      '<input type="color">';
    this.layoutTool.appendChild(this.backgroundColorBlock);
    this.backgroundColorBlock.children[1].onchange = function () {
      that.wrapperEditElement.style.backgroundColor = this.value;
    };
  }

}