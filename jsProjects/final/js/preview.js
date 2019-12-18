class Preview {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.previewWrapper = undefined;
    this.downloadBtn = undefined;
    this.templateBtn = undefined;
    this.editBtn = undefined;
    this.intended = 'edit';

    this.init();
  }

  init() {
    this.previewWrapper = document.createElement('div');
    this.previewWrapper.setAttribute('id', 'preview-wrapper');
    this.parentElement.appendChild(this.previewWrapper);
    // this.previewEvents();
  }

  updateContent(intended) {
    this.intended = intended;
    this.previewWrapper.remove();
    if (this.intended === 'template') {
      let previewData = StoreHelper.getTemplateStorage();
      this.previewWrapper = FileHelper.parseTemplate(previewData);
      this.parentElement.appendChild(this.previewWrapper);
    } else {
      let previewData = StoreHelper.getEditStorage();
      this.previewWrapper = FileHelper.parseTemplate(previewData);
      this.parentElement.appendChild(this.previewWrapper);
    }
    this.customJsFunctions();
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


  /*
  custom.js export functions
   */
  customJsFunctions() {

    let wrappers = document.getElementsByClassName('b7-wrapper');
    Object.values(wrappers).forEach(function (value) {
      let newPosition = value.getAttribute('data-temp-position');
      if (newPosition !== undefined && newPosition !== null) {
        value.style.position = newPosition;
      }
    });
    let links = document.querySelectorAll('div[class^="b7-"]');
    Object.values(links).forEach(function (value) {
      let linkHref = value.getAttribute('data-href');
      if (linkHref !== undefined && linkHref !== null) {
        value.style.cursor = 'pointer';
        value.onclick = function () {
          window.location.replace(linkHref)
        };
      }
    });

    let listLinkes = document.querySelectorAll('li[class^="b7-"]');
    Object.values(listLinkes).forEach(function (value) {
      let linkHref = value.getAttribute('data-href');
      if (linkHref !== undefined && linkHref !== null) {
        value.style.cursor = 'pointer';
        value.onclick = function () {
          window.location.replace(linkHref)
        };
      }
    });
  }
}