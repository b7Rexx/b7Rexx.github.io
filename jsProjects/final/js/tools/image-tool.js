class ImageTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.imageTool = undefined;
    this.componentProps = undefined;
    this.childComponentProps = undefined;
    this.componentEditElement = undefined;
    this.componentEditImage = undefined;

    this.imageSrcBlock = undefined;
    this.imageAltBlock = undefined;
    this.imageHeightBlock = undefined;
    this.imageWidthBlock = undefined;
    this.init();
  }

  init() {
    this.imageTool = document.createElement('div');
    this.imageTool.classList.add('sidebar-style-block');
    this.imageTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.imageTool);

    this.imageUrl();
    this.imageSize();
  }

  updateStyleTools(component) {
    this.componentEditElement = component;
    if (this.componentEditElement !== undefined) {
      this.componentEditImage = this.componentEditElement.firstChild;
    }
    this.getStyleProperty();
  }

  getStyleProperty() {
    this.componentProps = super.getComponentProperty(this.componentEditElement);
    this.childComponentProps = super.getComponentProperty(this.componentEditImage);
    this.updateChanges();
  }

  updateChanges() {
    let that = this;
    this.imageSrcBlock.children[1].value = this.childComponentProps.src;
    this.imageAltBlock.children[1].value = this.childComponentProps.alt;
    this.imageHeightBlock.children[1].value = this.componentProps.height;
    this.imageWidthBlock.children[1].value = this.componentProps.width;
  }

  imageUrl() {
    let that = this;
    this.imageSrcBlock = document.createElement('div');
    this.imageSrcBlock.classList.add('text-style');
    this.imageSrcBlock.classList.add('imagesrc-block-text');
    this.imageSrcBlock.innerHTML =
      '<span>Image src</span>' +
      '<input type="text">';
    this.imageTool.appendChild(this.imageSrcBlock);
    this.imageSrcBlock.children[1].onchange = function () {
      console.log(this.value);
      that.componentEditImage.src = this.value;
    };
    this.imageAltBlock = document.createElement('div');
    this.imageAltBlock.classList.add('text-style');
    this.imageAltBlock.classList.add('imagealt-block-text');
    this.imageAltBlock.innerHTML =
      '<span>Image Alt</span>' +
      '<input type="text">';
    this.imageTool.appendChild(this.imageAltBlock);
    this.imageAltBlock.children[1].onchange = function () {
      that.componentEditImage.alt = this.value;
    };
  }

  imageSize() {
    let that = this;
    this.imageHeightBlock = document.createElement('div');
    this.imageHeightBlock.classList.add('text-style');
    this.imageHeightBlock.classList.add('imageheight-block-text');
    this.imageHeightBlock.innerHTML =
      '<span>Height</span>' +
      '<input type="text">';
    this.imageTool.appendChild(this.imageHeightBlock);
    this.imageHeightBlock.children[1].onchange = function () {
      that.componentEditElement.style.height = this.value;
    };

    this.imageWidthBlock = document.createElement('div');
    this.imageWidthBlock.classList.add('text-style');
    this.imageWidthBlock.classList.add('imagewidth-block-text');
    this.imageWidthBlock.innerHTML =
      '<span>Width</span>' +
      '<input type="text">';
    this.imageTool.appendChild(this.imageWidthBlock);
    this.imageWidthBlock.children[1].onchange = function () {
      that.componentEditElement.style.width = this.value;
    };
  }
}
