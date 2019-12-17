class Body {
  constructor(page, parentElement, appName, appSlogan) {
    this.parentElement = parentElement;
    this.appName = appName || 'Web Builder';
    this.appSlogan = appSlogan || 'Build your website';
    this.previewIntended = 'template';

    this.nav = page;
    this.body = undefined;
    this.splash = undefined;
    this.edit = undefined;
    this.preview = undefined;
    this.previewContent = undefined;
    this.editSidebar = undefined;
    this.editTopbar = undefined;
    this.editEditor = undefined;
    this.template = undefined;
    this.templateListDiv = undefined;
    this.templateList = [];

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
        this.editEditor.updateEditorContent();
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
      `<img src="assets/img/b7-logo.png" alt="logo">` +
      `<h1>${this.appName}</h1>` +
      `<h3>${this.appSlogan}</h3>`;
    let templateButton = document.createElement('a');
    templateButton.classList.add('splash-button');
    templateButton.innerHTML = '<i class="fa fa-list-alt"></i> Check Templates';
    templateButton.setAttribute('data-value', 'template');
    splash.appendChild(templateButton);

    let progessButton = document.createElement('a');
    progessButton.classList.add('splash-button');
    progessButton.innerHTML = '<i class="fa fa-upload"></i>  Upload Progress';
    progessButton.setAttribute('data-value', 'progress');
    splash.appendChild(progessButton);

    let progessInput = document.createElement('input');
    progessInput.setAttribute('id', 'upload-progress');
    progessInput.setAttribute('type', 'file');
    progessInput.style.visibility = 'hidden';
    splash.appendChild(progessInput);

    progessInput.onchange = function () {
      let progessInputFile = this.files[0];
      if (progessInputFile.type.match('application/json.*')) {
        let reader = new FileReader();


        // Closure to capture the file information.
        reader.onload = (function () {
          return function (e) {
            let result = atob(e.target.result.split('base64,')[1]);
            StoreHelper.setEditBackupStorage(StoreHelper.getEditStorage());
            StoreHelper.setEditStorage(JSON.parse(result));
            document.dispatchEvent(EventHelper.customEvent('custom-event-progress-edit'));
          };
        })(progessInputFile);

        // Read in the image file as a data URL.
        reader.readAsDataURL(progessInputFile);
      } else {
        alert('Invalid file!');
      }
    };

    let editButton = document.createElement('a');
    editButton.classList.add('splash-button');
    editButton.innerHTML = '<i class="fa fa-edit"></i> Continue Editing';
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
    edit.setAttribute('id', 'edit-editor');

    // let heading = document.createElement('div');
    // heading.classList.add('page-heading');
    // heading.innerHTML = `<img src="assets/img/b7-logo_50.png" alt="">` + 'Edit';
    // edit.appendChild(heading);

    this.editTopbar = new Topbar(edit);
    this.editEditor = new Editor(edit);
    this.editSidebar = new Sidebar(edit);
    this.body.appendChild(edit);
    return edit;
  }

  getTemplate() {
    var that = this;
    let template = document.createElement('div');
    template.classList.add('template-body');
    template.classList.add('clearfix');
    let heading = document.createElement('div');
    heading.classList.add('page-heading');
    heading.innerHTML = `<img src="assets/img/b7-logo_50.png" alt="">` + 'Templates';
    template.appendChild(heading);

    let templateSearch = document.createElement('div');
    templateSearch.classList.add('template-search');
    templateSearch.innerHTML =
      '<div class="search-input"><input type="search"> <i class="fa fa-search"></i></div>';

    templateSearch.children[0].children[0].onchange = function () {
      let search = (this.value.trim()).toLowerCase();
      that.templateListDiv.innerHTML = '';

      that.templateList.forEach(function (value, index) {
        if (index !== 0) {
          if (search === '') {
            that.templateListDiv.appendChild(value.getTemplateBlock());
          } else if ((value.name).toLowerCase().includes(search)) {
            that.templateListDiv.appendChild(value.getTemplateBlock());
          }
        } else {
          that.templateListDiv.appendChild(value.getTemplateBlock());
        }
      });
    };


    let progressBtn = document.createElement('button');
    progressBtn.innerHTML = '<i class="fa fa-upload"></i> Upload progress';
    progressBtn.onclick = function () {
      //  upload previous progress
      let getUploadFile = document.getElementById('upload-progress');
      getUploadFile.click();
    };

    templateSearch.appendChild(progressBtn);

    this.templateListDiv = document.createElement('div');
    this.templateListDiv.classList.add('template-list');

    //viewport height
    this.templateListDiv.style.height = (ViewportHelper.height() - 60) + 'px';

    template.appendChild(templateSearch);
    template.appendChild(this.templateListDiv);
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

        //all templates
        that.templateListDiv.appendChild(templateObj.getTemplateBlock());
      });
    });
    return template;
  }

  getTemplateList() {
    return this.templateList;
  }
}
