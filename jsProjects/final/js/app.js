class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.header = undefined;
    this.body = undefined;
    this.page = 'splash';
    // this.page = 'edit';
    // this.page = 'template';
    this.pageIntendedFrom = 'splash';
    this.editSaveState = true;
    this.init();
  }

  init() {
    this.header = new Header(this.page, this.parentElement, 'b7WebBuilder');
    this.body = new Body(this.page, this.parentElement, 'b7WebBuilder');
    this.changePageEvents();
  }

  /*
  route actions - trigger events
   */
  changePageEvents() {
    var that = this;
    Object.values(this.header.navItems).forEach(function (value1) {

      let pageAttr = value1.getAttribute('data-value');
      switch (pageAttr) {
        case 'save':
          value1.onclick = function () {
            that.body.editEditor.saveEditStorage();

            let editStorage = StoreHelper.getEditStorage();
            StoreHelper.setDownloadStorage(editStorage);
            value1.classList.remove('unsaved-edit');
            value1.classList.add('saved-edit');
          };
          break;
        case'download':
          value1.onclick = function () {
            let webContent = StoreHelper.getDownloadStorage();
            FileHelper.downloadWebContent(webContent);
          };
          break;
        case'back':
          value1.onclick = function () {
            that.setPage = that.pageIntendedFrom;
            that.body.previewIntended = that.page;
          };
          break;
        default:
          value1.onclick = function () {
            that.setPage = pageAttr;
            that.body.previewIntended = that.page;
          };
          break;
      }
    });
    Object.values(document.getElementsByClassName('splash-button')).forEach(function (value) {
      value.onclick = function () {
        let page = value.getAttribute('data-value');
        if (page === 'progress') {
          //  upload previous progress
          let getUploadFile = document.getElementById('upload-progress');
          getUploadFile.click();

        } else
          that.setPage = page;

      };
    });
    document.addEventListener('custom-event-progress-edit', function () {
      that.setPage = 'edit';
      that.body.previewIntended = 'splash';
    });
    document.addEventListener('custom-event-preview-template', function () {
      that.setPage = 'preview';
      that.body.previewIntended = 'template';
    });
    document.addEventListener('custom-event-edit-template', function () {
      //backup edit page and load preview to edit
      let backup = StoreHelper.getEditStorage();
      StoreHelper.setEditBackupStorage(backup);
      let template = StoreHelper.getTemplateStorage();
      StoreHelper.setEditStorage(template);
      that.setPage = 'edit';
    });
    document.addEventListener('custom-event-unsaved-state', function () {
      Object.values(that.header.navItems).forEach(function (value1) {
        if (value1.getAttribute('data-value') === 'save') {
          value1.classList.add('unsaved-edit');
          value1.classList.remove('saved-edit');
        }
      });
    });
  }

  /*
  set current page > set header active > set body content
   */
  set setPage(value) {
    this.pageIntendedFrom = this.page;
    this.page = value;
    this.header.setStatus = this.page;
    this.body.setNav = this.page;

    if (value === 'preview') {
      if (document.styleSheets.hasOwnProperty(5))
        document.styleSheets[5].disabled = true;
    } else {
      if (document.styleSheets.hasOwnProperty(5))
        document.styleSheets[5].disabled = false;
    }
  }
}
