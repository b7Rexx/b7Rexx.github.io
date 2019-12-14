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

    this.textContent();
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
    this.textContentBlock.innerHTML=this.componentEditElement.innerHTML;
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

  removeAll() {
    let that = this;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-comp');
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove list';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.iframeTool.appendChild(removeBtn);
  }

}
