class App {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.header = undefined;
    this.body = undefined;
    this.page = 'template';
    this.init();
  }

  init() {
    this.header = new Header(this.page, this.parentElement, 'b7WebBuilder');
    this.body = new Body(this.page, this.parentElement, 'b7WebBuilder');
    this.changePage();
  }

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
    })
  }

  set setPage(value) {
    this.page = value;
    this.header.setStatus = this.page;
    this.body.setNav = this.page;
  }
}
