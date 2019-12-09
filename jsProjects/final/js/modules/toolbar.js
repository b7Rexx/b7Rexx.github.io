class Toolbar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.toolbar = undefined;
    this.init();
  }

  init() {
    this.toolbar = document.createElement('div');
    this.toolbar.classList.add('edit-toolbar');
    this.parentElement.appendChild(this.toolbar);
    // this.toolbar.style.width = (ViewportHelper.width() - 70 - 300-2) + 'px';
  }
}
