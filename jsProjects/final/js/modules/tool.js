class Tool {
  constructor(parentElement) {
    this.toolBlock = undefined;
    this.parentElement = parentElement;
    this.init();
  }

  init() {
    this.toolBlock = document.createElement('div');
    this.toolBlock.classList.add('tool-block');
    this.parentElement.appendChild(this.toolBlock);
  }
}