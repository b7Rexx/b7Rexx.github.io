class Preview {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.previewWrapper = undefined;
    this.downloadBtn = undefined;
    this.templateBtn = undefined;
    this.editBtn = undefined;
    this.intended = 'template';

    this.init();
  }

  init() {
    this.previewWrapper = document.createElement('div');
    this.previewWrapper.setAttribute('id', 'preview-wrapper');
    this.parentElement.appendChild(this.previewWrapper);
    // this.previewEvents();
  }

  updateContent() {
    this.previewWrapper.remove();
    let previewData = StoreHelper.getTemplateStorage();
    this.previewWrapper = FileHelper.parseTemplate(previewData);
    this.parentElement.appendChild(this.previewWrapper);

    // if (this.intended === 'template')
    //   this.downloadBtn.style.display = 'none';
    // else
    //   this.downloadBtn.style.display = 'block';

  }

  previewEvents() {
    this.templateBtn = document.createElement('a');
    this.templateBtn.classList.add('back-preview');
    this.templateBtn.innerHTML = '<i class="fa fa-list-alt"></i>';
    this.parentElement.appendChild(this.templateBtn);

    this.editBtn = document.createElement('a');
    this.editBtn.classList.add('edit-preview');
    this.editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    this.parentElement.appendChild(this.editBtn);

    this.downloadBtn = document.createElement('a');
    this.downloadBtn.classList.add('download-preview');
    this.downloadBtn.innerHTML = '<i class="fa fa-download"></i>';
    this.parentElement.appendChild(this.downloadBtn);
  }

}