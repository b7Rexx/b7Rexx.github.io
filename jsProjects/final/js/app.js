class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.header = undefined;
    this.body = undefined;
    // this.page = 'splash';
    this.page = 'edit';
    this.pageIntendedFrom = 'splash';
    this.editSaveState = true;
    this.init();
  }

  init() {
    /**
     * init header
     * @type {Header}
     */
    this.header = new Header(this.page, this.parentElement, 'b7WebBuilder');

    /**
     * init body
     * @type {Body}
     */
    this.body = new Body(this.page, this.parentElement, 'b7WebBuilder');
    this.changePageEvents();
  }

  /**
   * Event handlers
   * trigger routes
   */
  changePageEvents() {
    var that = this;
    /**
     * header nav click events
     */
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
            that.body.previewIntended = that.page;
            that.setPage = that.pageIntendedFrom;
          };
          break;
        default:
          value1.onclick = function () {
            that.body.previewIntended = that.page;
            that.setPage = pageAttr;
          };
          break;
      }
    });

    /**
     * splash button click events
     */
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

    /**
     * custom event from splash page redirect to edit
     */
    document.addEventListener('custom-event-progress-edit', function () {
      that.body.previewIntended = 'splash';
      that.setPage = 'edit';
    });

    /**
     * custom event from class Template
     * template block preview on click
     */
    document.addEventListener('custom-event-preview-template', function () {
      that.body.previewIntended = 'template';
      that.setPage = 'preview';
    });

    /**
     * custom event from class Template
     * template block edit on click
     */
    document.addEventListener('custom-event-edit-template', function () {
      //backup edit page and load preview to edit
      let backup = StoreHelper.getEditStorage();
      StoreHelper.setEditBackupStorage(backup);
      let template = StoreHelper.getTemplateStorage();
      StoreHelper.setEditStorage(template);
      that.setPage = 'edit';
    });

    /**
     * custom event from class Editor
     * edit state change
     */
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
  set page synchronous
  set intended page -> set current page -> set header active -> set body content
   */
  set setPage(value) {
    this.pageIntendedFrom = this.page;
    this.page = value;
    this.header.setStatus = this.page;
    this.body.setNav = this.page;

    /**
     * disable editor css on preview and download
     */
    if (value === 'preview') {
      if (document.styleSheets.hasOwnProperty(5))
        document.styleSheets[5].disabled = true;
    } else {
      if (document.styleSheets.hasOwnProperty(5))
        document.styleSheets[5].disabled = false;
    }
  }
}
