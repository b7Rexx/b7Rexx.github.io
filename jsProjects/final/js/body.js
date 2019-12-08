class Body {
  constructor(page, parentElement, appName, appSlogan) {
    this.parentElement = parentElement;
    this.appName = appName || 'Web Builder';
    this.appSlogan = appSlogan || 'Build your website';
    this.nav = page;
    this.body = undefined;
    this.splash = undefined;
    this.edit = undefined;
    this.preview = undefined;
    this.previewContent = undefined;
    this.template = undefined;
    this.templateList = [];
    this.previewIntended = 'template';

    this.init();
  }

  init() {
    this.body = document.createElement('div');
    this.body.classList.add('body');
    this.parentElement.appendChild(this.body);
    this.splash = this.getSplash();
    this.edit = this.getEdit();
    this.preview = this.getPreview();
    this.template = this.getTemplate();
    this.setNav = this.nav;
  }

  set setNav(value) {
    this.splash.style.display = 'none';
    this.edit.style.display = 'none';
    this.preview.style.display = 'none';
    this.template.style.display = 'none';

    this.nav = value;
    switch (this.nav) {
      case 'splash':
        this.splash.style.display = 'block';
        break;
      case 'preview':
        this.preview.style.display = 'block';
        this.previewContent.updateContent(this.previewIntended);
        break;
      case 'edit':
        this.edit.style.display = 'block';
        break;
      default:
        this.template.style.display = 'block';
        break;
    }
  }

  getSplash() {
    let splash = document.createElement('div');
    splash.classList.add('splash-body');
    splash.innerHTML =
      `<h1>${this.appName}</h1>` +
      `<h3>${this.appSlogan}</h3>`;
    let templateButton = document.createElement('a');
    templateButton.classList.add('splash-button');
    templateButton.innerHTML = 'Check Templates';
    templateButton.setAttribute('data-value', 'template');
    splash.appendChild(templateButton);
    let editButton = document.createElement('a');
    editButton.classList.add('splash-button');
    editButton.innerHTML = 'Continue Editing';
    editButton.setAttribute('data-value', 'edit');
    splash.appendChild(editButton);
    this.body.appendChild(splash);
    return splash;
  }

  getPreview() {
    let preview = document.createElement('div');
    preview.classList.add('preview-body');
    this.previewContent = new Preview(preview);
    this.body.appendChild(preview);
    return preview;
  }

  getEdit() {
    let edit = document.createElement('div');
    edit.classList.add('edit-body');
    this.body.appendChild(edit);
    return edit;
  }

  getTemplate() {
    var that = this;
    let template = document.createElement('div');
    template.classList.add('template-body');
    template.classList.add('clearfix');
    this.body.appendChild(template);
    let apiTemplate = [];
    FileHelper.getFileContent('api/template.json', 'get', function (val) {
      apiTemplate = val;
      apiTemplate.forEach(function (value) {
        let name = value.name;
        let image = value.image;
        let data = value.data;
        let date = value.date || Date.now();
        let templateObj = new Template(name, image, data, date);
        that.templateList.push(templateObj);
        template.appendChild(templateObj.getTemplateBlock());
      });
    });
    return template;
  }

  getTemplateList() {
    return this.templateList;
  }
}
