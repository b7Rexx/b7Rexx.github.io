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
      that.dropContentEvent();
    })
  }

  dropContentEvent() {
    let that = this;

    //check layout click
    //check container click
    //display up down button
    //add before / after layout else on container


    // this.getContainers().forEach(function (value) {
    //   console.log(value);
    // });
    // this.editorContent.onmouseover = function () {
    //   that.editorContent.style.cursor = 'no-drop';
    // };
    // setTimeout(function () {
    //   document.onclick = function () {
    //     that.editorContent.style.cursor = 'default';
    //     that.dropContent = undefined;
    //     that.dropType = undefined;
    //     that.editorContent.onmouseover = null;
    //     document.onclick = null;
    //   };
    // }, 10);


  }

  static getContainers() {
    return document.querySelectorAll('div[class^="b7-container"]');
  }
}