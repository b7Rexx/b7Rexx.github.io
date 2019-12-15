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
    // this.textContent();
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

  }
}
