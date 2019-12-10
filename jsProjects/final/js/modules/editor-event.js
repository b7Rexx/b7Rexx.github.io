class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;
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