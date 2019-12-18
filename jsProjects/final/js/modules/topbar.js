class Topbar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.topbar = undefined;
    this.active = undefined;

    this.btnDiv = undefined;
    this.listDiv = undefined;
    this.layoutBtn = undefined;
    this.componentBtn = undefined;
    this.listLayoutBlock = undefined;
    this.listComponentBlock = undefined;

    this.layouts = [];
    this.components = [];
    this.init();
  }

  init() {
    this.topbar = document.createElement('div');
    this.topbar.classList.add('edit-topbar');
    this.parentElement.appendChild(this.topbar);
    this.setLayoutComponent();
  }

  /**
   * set Layout from layout.json
   * set Component from component.json
   */
  setLayoutComponent() {
    let that = this;
    this.btnDiv = document.createElement('div');
    this.btnDiv.classList.add('btn-div');

    this.listDiv = document.createElement('div');
    this.listDiv.classList.add('list-div');

    this.listLayoutBlock = document.createElement('div');
    this.listLayoutBlock.classList.add('list-layout-block');

    this.listComponentBlock = document.createElement('div');
    this.listComponentBlock.classList.add('list-component-block');

    this.layoutBtn = document.createElement('a');
    this.layoutBtn.classList.add('layout-btn');
    this.layoutBtn.innerHTML = 'Layout';
    this.layoutBtn.onclick = function () {
      that.setActive = 'layout';
    };
    this.componentBtn = document.createElement('a');
    this.componentBtn.classList.add('component-btn');
    this.componentBtn.innerHTML = 'Component';
    this.componentBtn.onclick = function () {
      that.setActive = 'component';
    };

    let layoutCount = 0;
    /**
     * load layout list
     * dispatch click, drag event
     */
    FileHelper.getFileContent('api/layout.json', 'get', function (value) {
      if (Array.isArray(value))
        value.forEach(function (val) {
          that.layouts.push(val);
          let newLayout = document.createElement('img');
          newLayout.src = val.image;
          newLayout.onclick = function () {
            document.dispatchEvent(EventHelper.customEventparseHtml('custom-event-layout-click', val.layout));
          };

          newLayout.draggable = true;
          newLayout.ondragstart = function () {
            document.dispatchEvent(EventHelper.customEventparseHtml('custom-event-layout-click', val.layout));
          };

          that.listLayoutBlock.appendChild(newLayout);
          layoutCount++;
          that.listLayoutBlock.style.width = (120 * layoutCount) + 'px';
        });
    });

    let componentCount = 0;
    /**
     * load layout list
     * dispatch click, drag event
     */
    FileHelper.getFileContent('api/component.json', 'get', function (value) {
      if (Array.isArray(value))
        value.forEach(function (val) {
          that.components.push(val);
          let newComponent = document.createElement('img');
          // newComponent.src = 'assets/img/white.png';
          newComponent.src = val.image;
          newComponent.onclick = function () {
            document.dispatchEvent(EventHelper.customEventparseHtml('custom-event-component-click', val.component));
          };
          newComponent.draggable = true;
          newComponent.ondragstart = function () {
            document.dispatchEvent(EventHelper.customEventparseHtml('custom-event-component-click', val.component));
          };

          that.listComponentBlock.appendChild(newComponent);
          componentCount++;
          that.listComponentBlock.style.width = (120 * componentCount) + 'px';
        });
    });
    this.setActive = 'layout';
    // this.setActive = 'component';
    this.btnDiv.appendChild(this.layoutBtn);
    this.btnDiv.appendChild(this.componentBtn);
    this.topbar.appendChild(this.btnDiv);
    this.topbar.appendChild(this.listDiv);
    this.listDiv.appendChild(this.listLayoutBlock);
    this.listDiv.appendChild(this.listComponentBlock);
  }

  /**
   * set layout,component tab on topbar
   * @param value
   */
  set setActive(value) {
    let that = this;
    if (this.active !== value) {
      this.active = value;
      this.layoutBtn.classList.remove('active');
      this.componentBtn.classList.remove('active');

      if (this.active === 'layout') {
        this.layoutBtn.classList.add('active');
        this.listComponentBlock.classList.add('hide');
        this.listLayoutBlock.classList.remove('hide');
      } else if (this.active === 'component') {
        this.componentBtn.classList.add('active');
        this.listLayoutBlock.classList.add('hide');
        this.listComponentBlock.classList.remove('hide');
      }
    }
  }
}
