class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;

    /*
    Sidebar styling elements
     */
    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.rowEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;


    this.layoutEvent();
    this.componentEvent();
  }

  layoutEvent() {
    let that = this;
    document.addEventListener('custom-event-layout-click', function (val) {
      that.dropContent = val.detail;
      that.dropType = 'layout';
      that.parentElement.style.cursor = 'grabbing';
    })
  }

  componentEvent() {
    let that = this;
    document.addEventListener('custom-event-component-click', function (val) {
      that.dropContent = val.detail;
      that.dropType = 'component';
      that.parentElement.style.cursor = 'grabbing';
    })
  }
}