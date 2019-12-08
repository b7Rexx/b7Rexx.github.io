class Template {
  constructor(name, image, data, date) {
    this.name = name;
    this.image = image;
    this.data = data;
    this.date = date || Date.now();

    this.template = undefined;
    this.templateContent = undefined;
    this.nameTemplate = undefined;
    this.imageTemplate = undefined;
    this.previewTemplate = undefined;
    this.editTemplate = undefined;

    this.init();
  }

  init() {
    this.template = document.createElement('div');
    this.template.classList.add('template-block');

    this.templateContent = document.createElement('div');
    this.templateContent.classList.add('template-content');

    this.nameTemplate = document.createElement('h3');
    this.nameTemplate.classList.add('template-name');
    this.nameTemplate.innerHTML = this.name;

    this.imageTemplate = document.createElement('img');
    this.imageTemplate.classList.add('template-image');
    this.imageTemplate.src = this.image;
    this.imageTemplate.alt = this.name;

    this.previewTemplate = document.createElement('a');
    this.previewTemplate.classList.add('template-preview');
    this.previewTemplate.innerHTML = 'preview';
    this.previewClickEvent();

    this.editTemplate = document.createElement('a');
    this.editTemplate.classList.add('template-edit');
    this.editTemplate.innerHTML = 'edit';
    this.editClickEvent();

    this.templateContent.appendChild(this.nameTemplate);
    this.templateContent.appendChild(this.imageTemplate);
    this.templateContent.appendChild(this.previewTemplate);
    this.templateContent.appendChild(this.editTemplate);
    this.template.appendChild(this.templateContent);
  }

  previewClickEvent() {
    let that = this;
    this.previewTemplate.onclick = function () {
      FileHelper.getFileContent(that.data, 'get', function (val) {
        StoreHelper.setTemplateStorage(val);
        document.dispatchEvent(customEventPreviewTemplate);
      });
    };
  }

  editClickEvent() {
    let that = this;
    this.editTemplate.onclick = function () {
      FileHelper.getFileContent(that.data, 'get', function (val) {
        StoreHelper.setTemplateStorage(val);
        document.dispatchEvent(customEventEditTemplate);
      });
    };
  }

  getTemplateBlock() {
    return this.template;
  }
}
