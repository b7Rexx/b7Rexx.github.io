class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;
    this.layoutEvent();
  }

  layoutEvent() {
    let that = this;
    document.addEventListener('custom-event-layout-click', function (val) {
      that.dropContent = val.detail;
      that.dropType = 'layout';
      that.parentElement.style.cursor = 'grabbing';
    })
  }
}