class Editor {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.editor = undefined;
    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
   }
}
