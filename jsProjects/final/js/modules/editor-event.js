class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;
    this.column = undefined;
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


  copyEvent(editor) {
    let that = this;
    this.column = undefined;
    editor.oncontextmenu = function (event) {
      event.preventDefault();
      that.column = event.target.closest('div[class^="b7-col"]');
      if (that.column !== null) {
        that.rightMenu.style.display = 'block';
        that.rightMenu.style.left = event.x + 'px';
        that.rightMenu.style.top = event.y + 'px';
      }
    };
  }

  rightClickMenu() {
    let that = this;
    this.rightMenu = document.createElement('div');
    this.rightMenu.classList.add('right-context-menu');
    this.rightMenu.style.display = 'none';

    this.copiedColumnHtml = undefined;
    this.copy = document.createElement('a');
    this.copy.classList.add('copy-menu');
    this.copy.innerHTML = 'Copy Column';
    this.copy.onclick = function () {
      if (that.column !== undefined)
        that.copiedColumnHtml = that.column.innerHTML;
      that.rightMenu.style.display = 'none';
    };
    this.paste = document.createElement('a');
    this.paste.classList.add('paste-menu');
    this.paste.innerHTML = 'Paste Column';
    this.paste.onclick = function () {
      if (that.column !== undefined && that.copiedColumnHtml !==undefined)
        that.column.innerHTML += that.copiedColumnHtml;
      that.rightMenu.style.display = 'none';
    };
    this.remove = document.createElement('a');
    this.remove.classList.add('remove-menu');
    this.remove.innerHTML = 'Remove Column';
    this.remove.onclick = function () {
      if (that.column !== undefined)
        that.column.innerHTML = '';
      that.rightMenu.style.display = 'none';
    };
    this.rightMenu.appendChild(this.copy);
    this.rightMenu.appendChild(this.paste);
    this.rightMenu.appendChild(this.remove);
  }
}