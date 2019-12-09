class Editor {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.editor = undefined;
    this.editorBlock = undefined;
    this.editorMargin = undefined;
    this.editorContent = undefined;
    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
    this.setEmptyEditor();
  }

  setEmptyEditor() {
    this.editorBlock = document.createElement('div');
    this.editorBlock.classList.add('editor-block');

    this.editorMargin = document.createElement('div');
    this.editorMargin.classList.add('editor-margin');

    this.editorContent = document.createElement('div');
    this.editorContent.classList.add('editor-content');

    this.setHeightWidthByViewPort();
    this.editorMargin.appendChild(this.editorContent);
    this.editorBlock.appendChild(this.editorMargin);
    this.editor.appendChild(this.editorBlock);
    this.contentWrapper();
  }

  contentWrapper() {
    this.containerBtn = document.createElement('div');
    this.containerBtn.classList.add('container-btn');
    this.containerBtn.innerHTML = '<i class="fa fa-plus"></i> New Container';

    this.containerFluidBtn = document.createElement('div');
    this.containerFluidBtn.classList.add('container-fluid-btn');
    this.containerFluidBtn.innerHTML = '<i class="fa fa-plus"></i> New Fluid Container';

    this.editorMargin.appendChild(this.containerBtn);
    this.editorMargin.appendChild(this.containerFluidBtn);
  }


  updateEditorContent() {
    let editStorage = StoreHelper.getEditStorage();
    this.editorContent.innerHTML = '';
    FileHelper.parseEditorStorage(editStorage, this.editorContent);
  }


  setHeightWidthByViewPort() {
    let that = this;
    this.editorBlock.style.width = (ViewportHelper.width() - 200 - 140) + 'px';

    this.editorContent.style.marginTop = '5px';
    this.editorContent.style.height = (ViewportHelper.height() - 140 - 80) + 'px';

    window.addEventListener("resize", function () {
      that.editorBlock.style.width = (ViewportHelper.width() - 200 - 140) + 'px';

      that.editorContent.style.marginTop = '5px';
      that.editorContent.style.height = (ViewportHelper.height() - 140 - 80) + 'px';
    });
  }
}
