class Editor extends EditorEvent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.editor = undefined;
    this.editorBlock = undefined;
    this.editorMargin = undefined;
    this.editorContent = undefined;

    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
    this.setEmptyEditor();
    this.editorContentEvent();
  }

  setEmptyEditor() {
    this.editorBlock = document.createElement('div');
    this.editorBlock.classList.add('editor-block');

    this.editorMargin = document.createElement('div');
    this.editorMargin.classList.add('editor-margin');

    this.editorContent = document.createElement('div');
    this.editorContent.classList.add('editor-content');

    this.setHeightWidthByViewPort();
    this.contentWrapper();
    this.editorMargin.appendChild(this.editorContent);
    this.editorBlock.appendChild(this.editorMargin);
    this.editor.appendChild(this.editorBlock);
  }

  contentWrapper() {
    let that = this;
    this.containerBtn = document.createElement('div');
    this.containerBtn.classList.add('container-btn');
    this.containerBtn.innerHTML = '<i class="fa fa-plus"></i> New Container';
    this.containerBtn.onclick = function () {
      let appendWrapper = document.createElement('div');
      appendWrapper.classList.add('b7-wrapper');
      let appendContainer = document.createElement('div');
      appendContainer.classList.add('b7-container');
      appendWrapper.appendChild(appendContainer);
      that.editorContent.appendChild(appendWrapper);
    };

    this.containerFluidBtn = document.createElement('div');
    this.containerFluidBtn.classList.add('container-fluid-btn');
    this.containerFluidBtn.innerHTML = '<i class="fa fa-plus"></i> New Fluid Container';
    this.containerFluidBtn.onclick = function () {
      let appendWrapper = document.createElement('div');
      appendWrapper.classList.add('b7-wrapper');
      let appendContainer = document.createElement('div');
      appendContainer.classList.add('b7-container-fluid');
      appendWrapper.appendChild(appendContainer);
      that.editorContent.appendChild(appendWrapper);
    };

    this.editorBlock.appendChild(this.containerBtn);
    this.editorBlock.appendChild(this.containerFluidBtn);
  }

  updateEditorContent() {
    let editStorage = StoreHelper.getEditStorage();
    this.editorContent.innerHTML = '';
    let newEditContent = FileHelper.parseEditorStorage(editStorage);
    this.editorContent.innerHTML = newEditContent;
  }


  setHeightWidthByViewPort() {
    let that = this;
    this.editorBlock.style.width = (ViewportHelper.width() - 200 - 140) + 'px';

    this.editorContent.style.marginTop = '5px';
    this.editorMargin.style.height = (ViewportHelper.height() - 140 - 80) + 'px';

    window.addEventListener("resize", function () {
      that.editorBlock.style.width = (ViewportHelper.width() - 200 - 140) + 'px';
      that.editorMargin.style.height = (ViewportHelper.height() - 140 - 80) + 'px';
    });
  }

  saveEditStorage() {
    let saveObject = {};
    parseDOM(this.editorContent, saveObject);
    let saveArray = Object.values(saveObject.children).map(function (val) {
      return val;
    });
    StoreHelper.setEditStorage(saveArray);

    /*
    @param {array} parent
    @return {array} arrayReturn
     */
    function parseDOM(parent, arrayReturn) {
      var textAbleDom = parent.cloneNode(true);
      arrayReturn.tagName = parent.tagName;

      if (textAbleDom.children.length > 0) {
        Object.values(textAbleDom.children).forEach(function (value) {
          value.remove();
        });
      }
      arrayReturn.innerText = (textAbleDom.textContent.trim());

      arrayReturn.attributes = [];
      for (let i = 0; i < parent.attributes.length; i++) {
        arrayReturn.attributes[i] = {name: parent.attributes[i].name, value: parent.attributes[i].value};
      }
      arrayReturn.children = [];
      if (parent.children.length > 0) {
        for (let i = 0; i < parent.children.length; i++) {
          arrayReturn.children[i] = {};
          parseDOM(parent.children[i], arrayReturn.children[i]);
        }
      }
    }
  }

  editorContentEvent() {
    let that = this;
    let clearDrag = false;
    document.onkeydown = function (event) {
      if (event.key === 'Escape') {
        let clearDrag = true;
        that.dropType = undefined;
        that.dropContent = undefined;
        that.parentElement.style.cursor = 'default';
      }
    };
    this.editorContent.onclick =
      function (event) {

        // console.log('click pathing ', event.path);
        console.log('TRY DROP >', that.dropType, 'type < < < < <  > > > > content', that.dropContent,);

        if (that.dropType === 'layout') {
          if (event.path.hasOwnProperty(0)) {
            let eventClickDom = event.path[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-container')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
              }
              let pathArray = Object.values(event.path).map(function (value) {
                return value.className;
              });
              let pathString = JSON.stringify(pathArray);
              if (pathString.indexOf('b7-layout') === pathString.lastIndexOf('b7-layout')) {
                if (eventClickDom.className.startsWith('b7-col')) {
                  console.log(that.dropType, 'type < < < < <  > > > > content', eventClickDom);
                  eventClickDom.innerHTML += that.dropContent;
                  clearDrag = true;
                }
              } else {
                clearDrag = true;
              }
            }
          }
        }

        if (that.dropType === 'component') {
          if (event.path.hasOwnProperty(0)) {
            let eventClickDom = event.path[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-col')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
              }
            }
          }

        }

        if (clearDrag) {
          //clear/remove drag
          that.dropType = undefined;
          that.dropContent = undefined;
          that.saveEditStorage();
          that.parentElement.style.cursor = 'default';
        }

        console.log(event);
      };
  }
}
