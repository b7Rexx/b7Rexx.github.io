class PaddingTool extends Tool {
  constructor(parentElement) {
    super(parentElement);
    this.parentElement = parentElement;
    this.padding = undefined;
    this.toolInit();
  }

  toolInit() {
    this.padding = document.createElement('input');
    this.toolBlock.appendChild(this.padding);
  }
}