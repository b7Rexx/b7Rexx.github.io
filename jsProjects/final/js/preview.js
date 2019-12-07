class Preview {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.previewWrapper = undefined;
    this.init();
  }

  init() {
    this.previewWrapper = document.createElement('div');
    this.previewWrapper.setAttribute('id', 'preview-wrapper');
    this.parentElement.appendChild(this.previewWrapper);
  }

  updateContent() {
    this.previewWrapper.remove();
    let previewData = StoreHelper.getTemplateStorage();
    this.previewWrapper = FileHelper.parseTemplate(previewData);
    this.parentElement.appendChild(this.previewWrapper);
  }
}