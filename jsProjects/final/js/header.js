class Header {
  constructor(page, parentElement, appName) {
    this.status = page;
    this.parentElement = parentElement;
    this.appName = appName || 'Web Builder';

    this.navItems = [];
    this.header = undefined;
    this.navbar = undefined;

    this.init();
  }

  init() {
    let that = this;
    this.header = document.createElement('div');
    this.header.classList.add('header');
    this.navbar = document.createElement('ul');
    this.navbar.classList.add('navbar');
    this.navbar.classList.add('clearfix');
    this.getNavList().forEach(function (value) {
      let navItem = document.createElement('li');
      let navItemLink = document.createElement('a');
      navItem.appendChild(navItemLink);
      that.navbar.appendChild(navItem);
      navItemLink.innerHTML = that.setNavImage(value.value);

      navItemLink.setAttribute('data-value', value.value);
      that.navItems.push(navItemLink);
    });
    this.header.appendChild(this.navbar);
    this.parentElement.appendChild(this.header);
    this.setStatus = this.status;
  }

  getNavList() {
    return [
      // {name: this.appName, value: 'splash'},
      {name: 'Templates', value: 'template'},
      {name: 'Editing', value: 'edit'},
      {name: 'Preview', value: 'preview'},
      {name: 'Save', value: 'save'},
      {name: 'Download', value: 'download'},
      {name: 'Back', value: 'back'},
    ];
  }

  setNavImage(navValue) {
    let navImage = '';
    switch (navValue) {
      // case 'splash':
      // navImage = '<img src="assets/img/b7-logo_50.png">';
      // break;
      case 'template':
        navImage = '<i class="fa fa-list-alt"></i>';
        break;
      case 'edit':
        navImage = '<i class="fa fa-edit"></i>';
        break;
      case 'preview':
        navImage = '<i class="fa fa-eye"></i>';
        break;
      case 'download':
        navImage = '<i class="fa fa-download"></i>';
        break;
      case 'save':
        navImage = '<i class="fa fa-save"></i>';
        break;
     case 'back':
        navImage = '<i class="fa fa-angle-left"></i>';
        break;
      default:
        break;
    }
    return navImage;
  }

  set setStatus(value) {
    let that = this;
    this.status = value;
    that.navItems.forEach(function (value1) {
      let attrStatus = value1.getAttribute('data-value');
      value1.style.display = 'block';
      if (attrStatus === 'save' || attrStatus === 'download')
        value1.style.display = 'none';
      if (attrStatus === 'preview') {
        value1.style.display = 'block';
      }

      if (that.status === 'preview') {
        if (attrStatus === 'download') {
          value1.style.display = 'block';
        }
        if (attrStatus === 'preview') {
          value1.style.display = 'none';
        }
      }
      if (that.status === 'edit') {
        if (attrStatus === 'save' || attrStatus === 'download') {
          value1.style.display = 'block';
        }
        if (attrStatus === 'edit') {
          value1.style.display = 'none';
        }
      }
    });
    if (this.status !== 'splash')
      this.header.style.display = 'block';
    else
      this.header.style.display = 'none';

    this.navItems.forEach(function (value) {
      value.classList.remove('active');
      let dataValue = value.getAttribute('data-value');
      if (dataValue === that.status)
        value.classList.add('active');
    })
  }
}
