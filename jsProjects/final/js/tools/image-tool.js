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
    this.uploadImageBlock = undefined;
    this.linkDiv = undefined;
    this.init();
  }

  init() {
    this.imageTool = document.createElement('div');
    this.imageTool.classList.add('sidebar-style-block');
    this.imageTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.imageTool);
    this.moveComponentTool();

    this.uploadImage();
    this.imageUrl();
    this.imageSize();
    this.displayTool();
    this.setLink();
    this.removeAll();
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
    this.linkDiv.children[1].value = this.componentEditElement.getAttribute('data-href');
    this.displaySelect.value = this.componentProps.display;

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

  uploadImage() {
    let that = this;
    this.uploadImageBlock = document.createElement('div');
    this.uploadImageBlock.classList.add('text-style');

    let linkSpan = document.createElement('span');
    linkSpan.innerHTML = 'Upload Image: ';
    let linkInput = document.createElement('input');
    linkInput.setAttribute('type', 'file');
    linkInput.onchange = function () {
      if (this.files.hasOwnProperty(0)) {
        let reader = new FileReader();
        reader.onload = function () {
          that.componentEditImage.src = reader.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
    };
    this.uploadImageBlock.appendChild(linkSpan);
    this.uploadImageBlock.appendChild(linkInput);
    this.imageTool.appendChild(this.uploadImageBlock);
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
    this.imageTool.appendChild(this.linkDiv);
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
    this.imageHeightBlock.children[1].onkeyup = function () {
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
    this.imageWidthBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.width = this.value;
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
      '<option value="inherit">inherit</option>';

    this.displaySelect.onchange = function () {
      that.componentEditElement.style.display = this.value;
    };
    this.displayBlock.appendChild(displaySpan);
    this.displayBlock.appendChild(this.displaySelect);
    this.imageTool.appendChild(this.displayBlock);
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
    this.imageTool.appendChild(this.moveComponentBlock);

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
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove image';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.imageTool.appendChild(removeBtn);
  }

}
