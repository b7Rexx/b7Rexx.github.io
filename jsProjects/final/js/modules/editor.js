class Editor extends EditorEvent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.editor = undefined;
    this.editorBlock = undefined;
    this.editorMargin = undefined;
    this.editorContent = undefined;
    this.contentEditableText = undefined;
    this.modalDiv = undefined;
    this.formModal = undefined;
    this.modalContent = undefined;

    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
    this.setEmptyEditor();
    this.editorContentEvent();
    this.initFormModal();
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
    this.editorBlock.style.minWidth = '900px';
    this.editorBlock.style.maxWidth = (ViewportHelper.width() - 280 - 120) + 'px';

    this.editorContent.style.marginTop = '5px';
    this.editorMargin.style.height = (ViewportHelper.height() - 140 - 80) + 'px';

    window.addEventListener("resize", function () {
      that.editorBlock.style.width = (ViewportHelper.width() - 280 - 120) + 'px';
      that.editorMargin.style.height = (ViewportHelper.height() - 140 - 80) + 'px';
    });
  }

  saveEditStorage() {
    if (this.contentEditableText !== undefined) {
      this.contentEditableText.onclick = null;
      this.contentEditableText.removeAttribute('contenteditable');
    }

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
        clearDrag = true;
        that.clearStylingTools();
      }
    };
    document.onclick = function (event) {
      if (event.target.id === 'app-wrapper') {
        clearDrag = true;
        that.clearStylingTools();
      }
    };

    this.editorContent.onclick =
      function (event) {

        if (that.contentEditableText !== undefined) {
          that.contentEditableText.onclick = null;
          that.contentEditableText.removeAttribute('contenteditable');
        }

        //save state change
        document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
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
                //auto select code here
                //  ...
              } else {
                Object.values(event.path).forEach(function (value) {
                  if (value.className !== undefined)
                    if (value.className.startsWith('b7-col')) {
                      value.innerHTML += that.dropContent;
                      clearDrag = true;
                      //auto select code here
                      //  ...
                    }
                });
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


        /*
        styling tools trigger
         */

        that.wrapperEditElement = undefined;
        that.containerEditElement = undefined;
        that.rowEditElement = undefined;
        that.colEditElement = undefined;
        that.componentEditElement = undefined;
        Object.values(event.path).forEach(function (value) {
          if (value.className !== undefined) {
            if (value.className.startsWith('b7-wrapper'))
              that.wrapperEditElement = value;
            if (value.className.startsWith('b7-container'))
              that.containerEditElement = value;
            if (value.className.startsWith('b7-layout'))
              that.rowEditElement = value;
            if (value.className.startsWith('b7-col'))
              that.colEditElement = value;
            if (value.className.startsWith('b7-component'))
              that.componentEditElement = value;
          }
        });

        document.dispatchEvent(EventHelper.customEventStyleTool('custom-event-style-tool',
          that.wrapperEditElement,
          that.containerEditElement,
          that.rowEditElement,
          that.colEditElement,
          that.componentEditElement
        ));

      };

    // this.editorContent.oncontextmenu = function (event) {
    this.editorContent.ondblclick = function (event) {
      //save state change
      document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));

      if (event.path.hasOwnProperty(0)) {
        let eventClickDom = event.path[0];
        if (eventClickDom.className !== undefined) {
          if (eventClickDom.className.startsWith('b7-component-text')) {
            that.contentEditableText = eventClickDom;
            that.contentEditableText.onclick = function (eventPrevent) {
              eventPrevent.stopPropagation();
            };

            eventClickDom.setAttribute('contenteditable', 'true');
          }
          if (eventClickDom.className.startsWith('b7-item')) {
            that.contentEditableText = eventClickDom;
            that.contentEditableText.onclick = function (eventPrevent) {
              eventPrevent.stopPropagation();
            };

            eventClickDom.setAttribute('contenteditable', 'true');
          }
          if (eventClickDom.tagName === 'TH' || eventClickDom.tagName === 'TD') {
            that.contentEditableText = eventClickDom;
            that.contentEditableText.onclick = function (eventPrevent) {
              eventPrevent.stopPropagation();
            };

            eventClickDom.setAttribute('contenteditable', 'true');
          }
        }
      }

      Object.values(event.path).forEach(function (value) {
        if (value.className !== undefined) {
          if (value.className.startsWith('b7-form')) {
            that.formModal = value;
            that.setFormModalState();
          }
        }
      });
    };
  }

  clearStylingTools() {
    this.dropType = undefined;
    this.dropContent = undefined;
    this.parentElement.style.cursor = 'default';
    if (this.contentEditableText !== undefined) {
      this.contentEditableText.onclick = null;
      this.contentEditableText.removeAttribute('contenteditable');
    }

    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.rowEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;

    document.dispatchEvent(EventHelper.customEventStyleTool('custom-event-style-tool',
      this.wrapperEditElement,
      this.containerEditElement,
      this.rowEditElement,
      this.colEditElement,
      this.componentEditElement
    ));
  }

  initFormModal() {
    let that = this;
    this.modalDiv = document.createElement('div');
    this.modalDiv.classList.add('modal-bg');
    this.modalDiv.style.display = 'none';
    let modalWrap = document.createElement('div');
    modalWrap.classList.add('modal-form');

    let modalHeading = document.createElement('div');
    modalHeading.innerHTML = '<h3>Edit form inputs</h3>';
    modalWrap.appendChild(modalHeading);

    this.modalContent = document.createElement('table');
    modalWrap.appendChild(this.modalContent);
    this.modalDiv.appendChild(modalWrap);
    this.parentElement.appendChild(this.modalDiv);

    this.modalDiv.onclick = function (event) {
      if (event.path[0].className.startsWith('modal-bg'))
        that.modalDiv.style.display = 'none';
    };
  }

  setFormModalState() {
    let that = this;
    this.modalDiv.style.display = 'block';
    this.modalContent.innerHTML = '<tr>' +
      '<th>SN</th>' +
      '<th>Title</th>' +
      '<th>Label</th>' +
      '<th>Type</th>' +
      '<th>Name</th>' +
      '<th>Default</th>' +
      '<th>Options</th>' +
      '</tr>';
    let fitems = this.formModal.getElementsByClassName('b7-fitem');
    Object.values(fitems).forEach(function (value, index) {
      let row = document.createElement('tr');
      let col1 = document.createElement('td');
      col1.innerHTML = index + 1;
      let col2 = document.createElement('td');
      col2.innerHTML = value.getAttribute('form-head');
      let col3 = document.createElement('td');
      col3.innerHTML = value.getAttribute('form-label');

      //type
      let col4 = document.createElement('td');
      let selectType = document.createElement('select');
      let optionType1 = document.createElement('option');
      optionType1.innerText = 'text';
      let optionType5 = document.createElement('option');
      optionType5.innerText = 'button';

      selectType.appendChild(optionType1);
      selectType.appendChild(optionType5);
      selectType.value = value.getAttribute('form-type');
      col4.appendChild(selectType);

      let col5 = document.createElement('td');
      col5.innerHTML = value.getAttribute('form-name');
      let col6 = document.createElement('td');
      col6.innerHTML = value.getAttribute('form-default');
      let col7 = document.createElement('td');
      col7.innerHTML = value.getAttribute('form-options');

      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.appendChild(col6);
      row.appendChild(col7);
      that.modalContent.appendChild(row);
    });
  }
}
