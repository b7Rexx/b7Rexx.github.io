class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.header = undefined;
    this.body = undefined;
    this.page = 'preview';
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
    Object.values(this.header.navItems).forEach(function (value) {
      value.onclick = function () {
        that.setPage = value.getAttribute('data-value');
      };
    });
    Object.values(document.getElementsByClassName('splash-button')).forEach(function (value) {
      value.onclick = function () {
        that.setPage = value.getAttribute('data-value');
      };
    });
    document.addEventListener('preview-template', function () {
      that.setPage = 'preview';
      that.body.previewIntended = 'template';
    });
    document.addEventListener('edit-template', function () {

      //backup edit page and load preview to edit
      let backup = StoreHelper.getEditStorage();
      StoreHelper.setEditBackupStorage(backup);
      let template = StoreHelper.getTemplateStorage();
      StoreHelper.setEditStorage(template);
      that.setPage = 'edit';
    });

    this.body.previewContent.downloadBtn.onclick = function () {
      let webContent = StoreHelper.getEditStorage();
      FileHelper.downloadWebContent(webContent);
    };
    this.body.previewContent.editBtn.onclick = function () {
      that.setPage = 'edit';
      //backup edit page and load preview to edit
      let backup = StoreHelper.getEditStorage();
      StoreHelper.setEditBackupStorage(backup);
      let template = StoreHelper.getTemplateStorage();
      StoreHelper.setEditStorage(template);
    };
    this.body.previewContent.templateBtn.onclick = function () {
      that.setPage = 'template';
    };
  }

  /*
  set current page > set header active > set body content
   */
  set setPage(value) {
    this.page = value;
    this.header.setStatus = this.page;
    this.body.setNav = this.page;
  }
}
