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
      navItemLink.innerText = value.name;
      navItemLink.setAttribute('data-value', value.value);
      that.navItems.push(navItemLink);
    });
    this.header.appendChild(this.navbar);
    this.parentElement.appendChild(this.header);
    this.setStatus = this.status;
  }

  getNavList() {
    return [
      {name: this.appName, value: 'splash'},
      {name: 'Templates', value: 'template'},
      {name: 'Editing', value: 'edit'},
      {name: 'Preview', value: 'preview'},
    ];
  }

  set setStatus(value) {
    let that = this;
    this.status = value;
    if (this.status !== 'splash' && this.status !== 'preview')
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
