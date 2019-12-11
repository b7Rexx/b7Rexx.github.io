class Sidebar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.sidebar = undefined;
    this.activeBtn = 'layout';
    this.styleLayout = undefined;
    this.styleComponent = undefined;
    this.sidebarToolBlock = undefined;

    /*
    style element variables
     */
    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;
    this.toolType = undefined;
    this.toolStatus = undefined;

    /*
    tool variables
     */
    this.textTool = undefined;

    this.init();
    this.initTools();
    this.changeToolElement();
  }

  init() {
    this.sidebar = document.createElement('div');
    this.sidebar.classList.add('edit-sidebar');
    this.sidebar.classList.add('clearfix');
    this.parentElement.appendChild(this.sidebar);

    let styleHeading = document.createElement('div');
    styleHeading.innerHTML = 'Style Tools';
    styleHeading.classList.add('style-heading');

    this.styleLayout = document.createElement('a');
    this.styleLayout.innerHTML = 'Layout';
    this.styleLayout.classList.add('style-layout-btn');

    this.styleComponent = document.createElement('a');
    this.styleComponent.innerHTML = 'Component';
    this.styleComponent.classList.add('style-component-btn');

    this.sidebarToolBlock = document.createElement('div');
    this.sidebarToolBlock.classList.add('sidebar-tool-block');

    this.sidebar.appendChild(styleHeading);
    this.sidebar.appendChild(this.styleLayout);
    this.sidebar.appendChild(this.styleComponent);
    this.sidebar.appendChild(this.sidebarToolBlock);


    this.setActiveBtn = 'component';
    this.setHeightWidthByViewPort();
  }

  setHeightWidthByViewPort() {
    let that = this;

    this.sidebar.style.height = (ViewportHelper.height() - 200) + 'px';
    this.sidebarToolBlock.style.height = (ViewportHelper.height() - 240) + 'px';
    window.addEventListener("resize", function () {
      that.sidebar.style.height = (ViewportHelper.height() - 200) + 'px';
      that.sidebarToolBlock.style.height = (ViewportHelper.height() - 240) + 'px';
    });
  }

  set setActiveBtn(value) {
    this.activeBtn = value;
    this.styleLayout.classList.remove('active');
    this.styleComponent.classList.remove('active');
    if (this.activeBtn === 'layout')
      this.styleLayout.classList.add('active');
    else
      this.styleComponent.classList.add('active');
  }

  initTools() {
    this.textTool = new TextTool(this.sidebarToolBlock);
  }

  changeToolElement() {
    let that = this;
    document.addEventListener('custom-event-style-tool', function (event) {
      that.wrapperEditElement = event.detail.wrapper;
      that.containerEditElement = event.detail.container;
      that.colEditElement = event.detail.col;
      that.componentEditElement = event.detail.component;
      if (that.componentEditElement !== undefined) {
        that.toolStatus = 'component';
        that.toolType = that.componentEditElement.className;
      } else if (that.containerEditElement !== undefined)
        that.toolStatus = 'container';
      else
        that.toolStatus = undefined;

      that.updateSidebarTools();
    });
  }

  updateSidebarTools() {
    switch (this.toolType) {
      case 'b7-component-text':
        this.textTool.updateStyleTools(this.wrapperEditElement, this.containerEditElement, this.colEditElement, this.componentEditElement);
        break;
      default:
        break;

    }
  }
}
