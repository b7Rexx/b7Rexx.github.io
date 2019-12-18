class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;

    this.layoutEvent();
    this.componentEvent();
  }

  /**
   * throw layout click event
   */
  layoutEvent() {
    let that = this;
    document.addEventListener('custom-event-layout-click', function (val) {
      that.dropContent = val.detail;
      that.dropType = 'layout';
      that.parentElement.style.cursor = 'grabbing';
    })
  }

  /**
   * throw component click event
   */
  componentEvent() {
    let that = this;
    document.addEventListener('custom-event-component-click', function (val) {
      that.dropContent = val.detail;
      that.dropType = 'component';
      that.parentElement.style.cursor = 'grabbing';
    })
  }
}