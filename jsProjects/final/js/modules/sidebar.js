class Sidebar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.sidebar = undefined;
    this.init();
  }

  init() {
    this.sidebar = document.createElement('div');
    this.sidebar.classList.add('edit-sidebar');
    this.sidebar.innerHTML = 'Styling Tools';
    this.parentElement.appendChild(this.sidebar);
    this.setDisabledTools();
  }

  setDisabledTools() {
    new PaddingTool(this.sidebar);
  }
}
