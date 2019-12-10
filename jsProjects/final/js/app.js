class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.header = undefined;
    this.body = undefined;
    // this.page = 'splash';
    this.page = 'edit';
    // this.page = 'template';
    this.pageIntendedFrom = 'splash';
    this.init();
  }

  init() {
    this.header = new Header(this.page, this.parentElement, 'b7WebBuilder');
    this.body = new Body(this.page, this.parentElement, 'b7WebBuilder');
    this.changePage();
  }

  /*
  route actions - trigger events
   */
  changePage() {
    var that = this;
    Object.values(this.header.navItems).forEach(function (value1) {

      let pageAttr = value1.getAttribute('data-value');
      switch (pageAttr) {
        case 'save':
          value1.onclick = function () {
            let editStorage = StoreHelper.getEditStorage();
            StoreHelper.setDownloadStorage(editStorage);

            value1.childNodes[0].classList.remove('fa-save');

            setTimeout(function () {
              value1.childNodes[0].classList.add('fa-check');
              setTimeout(function () {
                value1.childNodes[0].classList.remove('fa-check');
                value1.childNodes[0].classList.add('fa-save');
              }, 1000);
            }, 500);
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
          };
          break;
        default:
          value1.onclick = function () {
            that.setPage = pageAttr;
          };
          break;
      }
    });
    Object.values(document.getElementsByClassName('splash-button')).forEach(function (value) {
      value.onclick = function () {
        that.setPage = value.getAttribute('data-value');
      };
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
  }

  /*
  set current page > set header active > set body content
   */
  set setPage(value) {
    this.pageIntendedFrom = this.page;
    this.page = value;
    this.header.setStatus = this.page;
    this.body.setNav = this.page;
  }
}
