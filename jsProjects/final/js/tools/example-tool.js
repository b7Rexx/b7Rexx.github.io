class ExampleTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.exampleTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.exampleTool = document.createElement('div');
    this.exampleTool.classList.add('sidebar-style-block');
    this.exampleTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.exampleTool);

    this.exampleTool.append('Select the component');
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