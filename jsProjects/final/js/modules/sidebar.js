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
    this.rowEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;
    this.toolType = undefined;
    this.toolStatus = undefined;

    /*
    tool variables
     */
    this.layoutTool = undefined;
    this.exampleTool = undefined;
    this.textTool = undefined;
    this.imageTool = undefined;
    this.listTool = undefined;
    this.tableTool = undefined;
    this.iframeTool = undefined;
    this.formTool = undefined;

    this.init();
    this.initTools();
    this.changeToolElement();
  }

  init() {
    let that = this;
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
    this.styleLayout.onclick = function () {
      that.setActiveBtn = 'layout';
      that.updateSidebarTools();
    };

    this.styleComponent = document.createElement('a');
    this.styleComponent.innerHTML = 'Component';
    this.styleComponent.classList.add('style-component-btn');
    this.styleComponent.onclick = function () {
      that.setActiveBtn = 'component';
      that.updateSidebarTools();
    };

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
    this.sidebarToolBlock.style.height = (ViewportHelper.height() - 280) + 'px';
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
    this.layoutTool = new LayoutTool(this.sidebarToolBlock);
    this.exampleTool = new ExampleTool(this.sidebarToolBlock);
    this.textTool = new TextTool(this.sidebarToolBlock);
    this.imageTool = new ImageTool(this.sidebarToolBlock);
    this.listTool = new ListTool(this.sidebarToolBlock);
    this.tableTool = new TableTool(this.sidebarToolBlock);
    this.iframeTool = new IframeTool(this.sidebarToolBlock);
    this.formTool = new FormTool(this.sidebarToolBlock);


    this.updateSidebarTools();
  }

  changeToolElement() {
    let that = this;
    document.addEventListener('custom-event-style-tool', function (event) {
      that.wrapperEditElement = event.detail.wrapper;
      that.containerEditElement = event.detail.container;
      that.rowEditElement = event.detail.row;
      that.colEditElement = event.detail.col;
      that.componentEditElement = event.detail.component;
      if (that.componentEditElement !== undefined) {
        that.toolStatus = 'component';
        that.setActiveBtn = 'component';
        that.toolType = that.componentEditElement.className;
      } else if (that.containerEditElement !== undefined) {
        that.toolStatus = 'container';
        that.setActiveBtn = 'layout';
        that.toolType = undefined;
      } else {
        that.toolStatus = undefined;
        that.toolType = undefined;
      }
      that.updateSidebarTools();
    });
  }

  updateSidebarTools() {
    //display none all
    this.layoutTool.layoutTool.style.display = 'none';
    this.exampleTool.exampleTool.style.display = 'none';
    this.textTool.textTool.style.display = 'none';
    this.imageTool.imageTool.style.display = 'none';
    this.listTool.listTool.style.display = 'none';
    this.tableTool.tableTool.style.display = 'none';
    this.iframeTool.iframeTool.style.display = 'none';
    this.formTool.formTool.style.display = 'none';
    if (this.activeBtn === 'layout') {
      if (this.toolStatus !== undefined) {
        this.layoutTool.layoutTool.style.display = 'block';
        this.layoutTool.updateStyleTools(this.wrapperEditElement, this.containerEditElement, this.rowEditElement, this.colEditElement);
        //    display block
      }
    } else {
      //    display block
      switch (this.toolType) {
        case 'b7-component-text':
          this.textTool.textTool.style.display = 'block';
          this.textTool.updateStyleTools(this.componentEditElement);
          break;
        case 'b7-component-image':
          this.imageTool.imageTool.style.display = 'block';
          this.imageTool.updateStyleTools(this.componentEditElement);
          break;
        case 'b7-component-list':
          this.listTool.listTool.style.display = 'block';
          this.listTool.updateStyleTools(this.componentEditElement);
          break;
        case 'b7-component-table':
          this.tableTool.tableTool.style.display = 'block';
          this.tableTool.updateStyleTools(this.componentEditElement);
          break;
        case 'b7-component-iframe':
          this.iframeTool.iframeTool.style.display = 'block';
          this.iframeTool.updateStyleTools(this.componentEditElement);
          break;
        case 'b7-component-form':
          this.formTool.formTool.style.display = 'block';
          this.formTool.updateStyleTools(this.componentEditElement);
          break;
        default:
          this.exampleTool.exampleTool.style.display = 'block';
          this.exampleTool.updateStyleTools(this.componentEditElement);
          break;
      }
    }
  }
}
