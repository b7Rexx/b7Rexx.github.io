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
    this.containerPositionTool();
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
      this.layoutWrapperTool.style.display='block';
    }else{
      this.layoutWrapperTool.style.display='none';
    }
    if (this.containerProps !== undefined) {
      this.containerBackgroundColorBlock.children[1].value = this.containerProps.background;
      this.containerPaddingBlock.children[1].value = this.containerProps.padding;
      this.layoutContainerTool.style.display='block';
    }else{
      this.layoutContainerTool.style.display='none';
    }
    if (this.colProps !== undefined) {
      this.colBackgroundColorBlock.children[1].value = this.colProps.background;
      this.colHeightBlock.children[1].value = this.colProps.height;
      this.layoutColumnTool.style.display='block';
    }else{
      this.layoutColumnTool.style.display='none';
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
