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
    this.listModalDiv = undefined;
    this.listModal = undefined;
    this.listModalContent = undefined;

    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
    this.setEmptyEditor();
    this.editorContentEvent();
    this.initFormModal();
    this.initListModal();
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
    this.editorBlock.style.width = (ViewportHelper.width() - 280 - 120) + 'px';

    this.editorContent.style.marginTop = '5px';
    this.editorMargin.style.height = (ViewportHelper.height() - 160) + 'px';

    window.addEventListener("resize", function () {
      that.editorBlock.style.width = (ViewportHelper.width() - 280 - 120) + 'px';
      that.editorMargin.style.height = (ViewportHelper.height() - 160) + 'px';
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

    this.editorContent.ondragover = function (event) {
      event.preventDefault();
    };
    this.editorContent.ondrop = function (event) {
      event.preventDefault();
      let eventPath = event.path || (event.composedPath && event.composedPath());
      if (that.contentEditableText !== undefined) {
        that.contentEditableText.onclick = null;
        that.contentEditableText.removeAttribute('contenteditable');
      }

      //save state change
      document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
      // console.log('click pathing ', event.path);
      console.log('TRY DROP >', that.dropType, 'type < < < < <  > > > > content', that.dropContent,);

      if (that.dropType === 'layout') {
        if (eventPath.hasOwnProperty(0)) {
          let eventClickDom = eventPath[0];
          if (eventClickDom.className !== undefined) {
            if (eventClickDom.className.startsWith('b7-container')) {
              eventClickDom.innerHTML += that.dropContent;
              clearDrag = true;
            }
            let pathArray = Object.values(eventPath).map(function (value) {
              return value.className;
            });
            let pathString = JSON.stringify(pathArray);
            if (pathString.indexOf('b7-layout') === pathString.lastIndexOf('b7-layout')) {
              Object.values(eventPath).map(function (valueDom) {
                if (valueDom.className !== undefined) {
                  if (valueDom.className.startsWith('b7-col')) {
                    console.log(that.dropType, 'type < < < < < 2nd gen > > > > content', valueDom);
                    valueDom.innerHTML += that.dropContent;
                    clearDrag = true;
                  }
                }
              });
            } else {
              clearDrag = true;
            }
          }
        }
      }

      if (that.dropType === 'component') {
        if (eventPath.hasOwnProperty(0)) {
          let eventClickDom = eventPath[0];
          if (eventClickDom.className !== undefined) {
            if (eventClickDom.className.startsWith('b7-col')) {
              eventClickDom.innerHTML += that.dropContent;
              clearDrag = true;
              //auto select code here
              //  ...
            } else {
              let flag = true;
              Object.values(eventPath).forEach(function (value) {
                if (flag) {
                  if (value.className !== undefined)
                    if (value.className.startsWith('b7-col')) {
                      flag = false;
                      value.innerHTML += that.dropContent;
                      clearDrag = true;
                      //auto select code here
                      //  ...
                    }
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
      Object.values(eventPath).forEach(function (value) {
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


    this.editorContent.onclick =
      function (event) {
        let eventPath = event.path || (event.composedPath && event.composedPath());

        if (that.contentEditableText !== undefined) {
          that.contentEditableText.onclick = null;
          that.contentEditableText.removeAttribute('contenteditable');
        }

        //save state change
        document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
        // console.log('click pathing ', event.path);
        console.log('TRY DROP >', that.dropType, 'type < < < < <  > > > > content', that.dropContent,);

        if (that.dropType === 'layout') {
          if (eventPath.hasOwnProperty(0)) {
            let eventClickDom = eventPath[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-container')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
              }
              let pathArray = Object.values(eventPath).map(function (value) {
                return value.className;
              });
              let pathString = JSON.stringify(pathArray);
              if (pathString.indexOf('b7-layout') === pathString.lastIndexOf('b7-layout')) {
                Object.values(eventPath).map(function (valueDom) {
                  if (valueDom.className !== undefined) {
                    if (valueDom.className.startsWith('b7-col')) {
                      console.log(that.dropType, 'type < < < < < 2nd gen > > > > content', valueDom);
                      valueDom.innerHTML += that.dropContent;
                      clearDrag = true;
                    }
                  }
                });
              } else {
                clearDrag = true;
              }
            }
          }
        }

        if (that.dropType === 'component') {
          if (eventPath.hasOwnProperty(0)) {
            let eventClickDom = eventPath[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-col')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
                //auto select code here
                //  ...
              } else {
                let flag = true;
                Object.values(eventPath).forEach(function (value) {
                  if (flag) {
                    if (value.className !== undefined)
                      if (value.className.startsWith('b7-col')) {
                        flag = false;
                        value.innerHTML += that.dropContent;
                        clearDrag = true;
                        //auto select code here
                        //  ...
                      }
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
        Object.values(eventPath).forEach(function (value) {
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
      let eventPath = event.path || (event.composedPath && event.composedPath());

      //save state change
      document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));

      if (eventPath.hasOwnProperty(0)) {
        let eventClickDom = eventPath[0];
        let eventClickDom1 = eventPath[1];
        if (eventClickDom.className !== undefined) {
          if (eventClickDom.className.startsWith('b7-component-text') || eventClickDom1.className.startsWith('b7-component-text')) {
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

      Object.values(eventPath).forEach(function (value) {
        if (value.className !== undefined) {
          if (value.className.startsWith('b7-component-form')) {
            that.formModal = value;
            that.setFormModalState();
          }
          if (value.className.startsWith('b7-component-list')) {
            that.listModal = value;
            that.setListModalState();
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


  initListModal() {
    let that = this;
    this.listModalDiv = document.createElement('div');
    this.listModalDiv.classList.add('modal-bg');
    this.listModalDiv.style.display = 'none';
    let modalWrap = document.createElement('div');
    modalWrap.classList.add('modal-form');

    let modalHeading = document.createElement('div');
    modalHeading.classList.add('modal-heading');
    modalHeading.innerHTML = 'Edit list items';

    let tableWrap = document.createElement('div');
    tableWrap.classList.add('form-table-wrapper');

    let addInputBtn = document.createElement('button');
    addInputBtn.classList.add('add-input-btn');
    addInputBtn.innerHTML = '<i class="fa fa-plus"></i> Add item';
    addInputBtn.onclick = function () {
      that.addListInput();
    };

    let saveInputBtn = document.createElement('button');
    saveInputBtn.classList.add('add-input-btn');
    saveInputBtn.innerHTML = '<i class="fa fa-check"></i> update list';
    saveInputBtn.onclick = function () {
      that.updateList();
    };

    modalHeading.appendChild(addInputBtn);
    modalWrap.appendChild(modalHeading);

    let modalTable = document.createElement('table');
    modalTable.innerHTML = '<thead><tr>' +
      '<th style="width: 20%;">Item</th>' +
      '<th style="width: 20%;">Link</th>' +
      '<th style="width: 40%;">Dropdown</th>' +
      '<th style="width: 20%;">Action</th>' +
      '</tr></thead>';

    this.listModalContent = document.createElement('tbody');
    modalTable.appendChild(this.listModalContent);
    tableWrap.appendChild(modalTable);
    modalWrap.appendChild(tableWrap);
    modalWrap.appendChild(saveInputBtn);
    this.listModalDiv.appendChild(modalWrap);
    this.parentElement.appendChild(this.listModalDiv);

    this.listModalDiv.onclick = function (event) {
      let eventPath = event.path || (event.composedPath && event.composedPath());

      if (eventPath[0].className.startsWith('modal-bg'))
        that.listModalDiv.style.display = 'none';
    };
  }

  setListModalState() {
    let that = this;
    this.listModalDiv.style.display = 'block';
    this.listModalContent.innerHTML = '';
    let listItems = this.listModal.getElementsByClassName('b7-item');
    Object.values(listItems).forEach(function (value) {
      let item;
      let dropdown = value.getAttribute('data-dropdown');
      let dataHref = value.getAttribute('data-href');
      if (dropdown) {
        item = value.querySelector('span').innerText;
      } else {
        item = value.innerText;
      }
      that.addListInput(value, item, dataHref, dropdown);
    });
  }

  addListInput(listValue, item, dataHref, dropdown) {
    let that = this;
    let row = document.createElement('tr');

    let col2 = document.createElement('td');
    col2.innerHTML = item || '';
    //item
    col2.setAttribute('contenteditable', true);

    let col3 = document.createElement('td');
    col3.innerHTML = dataHref || '';
    //label
    col3.setAttribute('contenteditable', true);

    //type
    let col4 = document.createElement('td');
    let dropdownCheckbox = document.createElement('input');
    dropdownCheckbox.setAttribute('type', 'checkbox');
    let addItem = document.createElement('button');
    addItem.classList.add('table-btn-item');
    addItem.innerHTML = '<i class="fa fa-plus"></i> dropdown item';
    addItem.style.display = 'none';

    let dropTable = document.createElement('table');
    dropTable.classList.add('drop-table');
    dropTable.style.display = 'none';
    dropdownCheckbox.onchange = function () {
      if (dropdownCheckbox.checked) {
        dropTable.style.display = 'block';
        addItem.style.display = 'block';
      } else {
        dropTable.style.display = 'none';
        addItem.style.display = 'none';
      }
    };
    addItem.onclick = function () {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.setAttribute('contenteditable', true);
      let td2 = document.createElement('td');
      td2.setAttribute('contenteditable', true);
      let td3 = document.createElement('td');
      let removeDropitem = document.createElement('button');
      removeDropitem.classList.add('table-btn');
      removeDropitem.innerHTML = '<i class="fa fa-trash"></i>';
      removeDropitem.onclick = function () {
        dropTable.deleteRow(this.parentNode.parentNode.rowIndex);
      };
      td3.appendChild(removeDropitem);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      dropTable.appendChild(tr);
    };


    if (dropdown) {
      dropdownCheckbox.checked = true;
      dropTable.style.display = 'block';
      addItem.style.display = 'block';

      let dropdownList = listValue.querySelector('ul');
      if (dropdownList !== undefined) {
        Object.values(dropdownList.getElementsByTagName('li')).forEach(function (value) {
          let tr = document.createElement('tr');
          let td1 = document.createElement('td');
          td1.setAttribute('contenteditable', true);
          td1.innerText = value.innerHTML;
          let td2 = document.createElement('td');
          td2.setAttribute('contenteditable', true);
          td2.innerText = value.getAttribute('data-href');
          let td3 = document.createElement('td');
          let removeDropitem = document.createElement('button');
          removeDropitem.classList.add('table-btn');
          removeDropitem.innerHTML = '<i class="fa fa-trash"></i>';
          removeDropitem.onclick = function () {
            dropTable.deleteRow(this.parentNode.parentNode.rowIndex);
          };
          td3.appendChild(removeDropitem);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          dropTable.appendChild(tr);
        });
      }
    }
    col4.appendChild(dropdownCheckbox);
    col4.appendChild(dropTable);
    col4.appendChild(addItem);

    let col8 = document.createElement('td');
    let moveUpBtn = document.createElement('button');
    moveUpBtn.classList.add('btn-form-remove');
    moveUpBtn.innerHTML = '<i class="fa fa-angle-up"></i>';
    moveUpBtn.onclick = function () {
      let row = this.parentNode.parentNode;
      let sibling = row.previousElementSibling;
      let parent = row.parentNode;
      parent.insertBefore(row, sibling);
    };
    col8.appendChild(moveUpBtn);
    let moveDownBtn = document.createElement('button');
    moveDownBtn.classList.add('btn-form-remove');
    moveDownBtn.innerHTML = '<i class="fa fa-angle-down"></i>';
    moveDownBtn.onclick = function () {
      let row = this.parentNode.parentNode;
      let parent = row.parentNode;
      if (row.nextElementSibling !== null) {
        let sibling = row.nextElementSibling.nextElementSibling;
        parent.insertBefore(row, sibling);
      } else {
        parent.insertBefore(row, parent.firstChild);
      }
    };
    col8.appendChild(moveDownBtn);
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn-form-remove');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = function () {
      that.listModalContent.deleteRow((this.parentNode.parentNode.rowIndex - 1));
    };
    col8.appendChild(removeBtn);

    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col8);
    that.listModalContent.appendChild(row);
  }

  initFormModal() {
    let that = this;
    this.modalDiv = document.createElement('div');
    this.modalDiv.classList.add('modal-bg');
    this.modalDiv.style.display = 'none';
    let modalWrap = document.createElement('div');
    modalWrap.classList.add('modal-form');

    let modalHeading = document.createElement('div');
    modalHeading.classList.add('modal-heading');
    modalHeading.innerHTML = 'Edit form inputs';

    let tableWrap = document.createElement('div');
    tableWrap.classList.add('form-table-wrapper');

    let addInputBtn = document.createElement('button');
    addInputBtn.classList.add('add-input-btn');
    addInputBtn.innerHTML = '<i class="fa fa-plus"></i> Add input';
    addInputBtn.onclick = function () {
      that.addFormInput();
    };

    let saveInputBtn = document.createElement('button');
    saveInputBtn.classList.add('add-input-btn');
    saveInputBtn.innerHTML = '<i class="fa fa-check"></i> update input';
    saveInputBtn.onclick = function () {
      that.updateForm();
    };

    modalHeading.appendChild(addInputBtn);
    modalWrap.appendChild(modalHeading);

    let modalTable = document.createElement('table');
    modalTable.innerHTML = '<thead><tr>' +
      '<th>Title</th>' +
      '<th>Label</th>' +
      '<th>Type</th>' +
      '<th>Name</th>' +
      '<th>Value / Default</th>' +
      // '<th>Options</th>' +
      '<th>Action</th>' +
      '</tr></thead>';

    this.modalContent = document.createElement('tbody');
    modalTable.appendChild(this.modalContent);
    tableWrap.appendChild(modalTable);
    modalWrap.appendChild(tableWrap);
    modalWrap.appendChild(saveInputBtn);
    this.modalDiv.appendChild(modalWrap);
    this.parentElement.appendChild(this.modalDiv);

    this.modalDiv.onclick = function (event) {
      let eventPath = event.path || (event.composedPath && event.composedPath());

      if (eventPath[0].className.startsWith('modal-bg'))
        that.modalDiv.style.display = 'none';
    };
  }

  setFormModalState() {
    let that = this;
    this.modalDiv.style.display = 'block';
    this.modalContent.innerHTML = '';
    let fitems = this.formModal.getElementsByClassName('b7-fitem');
    Object.values(fitems).forEach(function (value) {
      let title = value.getAttribute('data-form-head');
      let label = value.getAttribute('data-form-label');
      let type = value.getAttribute('data-form-type');
      let name = value.getAttribute('data-form-name');
      let defaultValue = value.getAttribute('data-form-default');
      // let options = value.getAttribute('data-form-options');

      that.addFormInput(title, label, type, name, defaultValue);
    });
  }

  addFormInput(title, label, type, name, defaultValue) {
    let that = this;
    let row = document.createElement('tr');
    let col2 = document.createElement('td');
    col2.innerHTML = title || '';
    //title
    col2.setAttribute('contenteditable', true);

    let col3 = document.createElement('td');
    col3.innerHTML = label || '';
    //label
    col3.setAttribute('contenteditable', true);

    //type
    let col4 = document.createElement('td');
    let selectType = document.createElement('select');

    let optionType1 = document.createElement('option');
    optionType1.innerText = 'text';
    let optionType2 = document.createElement('option');
    optionType2.innerText = 'email';
    let optionType3 = document.createElement('option');
    optionType3.innerText = 'date';
    let optionType4 = document.createElement('option');
    optionType4.innerText = 'password';
    let optionType5 = document.createElement('option');
    optionType5.innerText = 'button';
    let optionType6 = document.createElement('option');
    optionType6.innerText = 'submit';
    let optionType7 = document.createElement('option');
    optionType7.innerText = 'checkbox';
    let optionType8 = document.createElement('option');
    optionType8.innerText = 'radio';
    let optionType9 = document.createElement('option');
    optionType9.innerText = 'color';
    let optionType10 = document.createElement('option');
    optionType10.innerText = 'file';

    selectType.appendChild(optionType1);
    selectType.appendChild(optionType2);
    selectType.appendChild(optionType3);
    selectType.appendChild(optionType4);
    selectType.appendChild(optionType5);
    selectType.appendChild(optionType6);
    selectType.appendChild(optionType7);
    selectType.appendChild(optionType8);
    selectType.appendChild(optionType9);
    selectType.appendChild(optionType10);

    selectType.value = type || 'text';
    col4.appendChild(selectType);

    let col5 = document.createElement('td');
    col5.innerHTML = name || '';
    //name
    col5.setAttribute('contenteditable', true);

    let col6 = document.createElement('td');
    col6.innerHTML = defaultValue || '';
    //default
    col6.setAttribute('contenteditable', true);
    // let col7 = document.createElement('td');
    // col7.innerHTML = options || '';
    //options
    // col7.setAttribute('contenteditable', true);

    let col8 = document.createElement('td');
    let moveUpBtn = document.createElement('button');
    moveUpBtn.classList.add('btn-form-remove');
    moveUpBtn.innerHTML = '<i class="fa fa-angle-up"></i>';
    moveUpBtn.onclick = function () {
      let row = this.parentNode.parentNode;
      let sibling = row.previousElementSibling;
      let parent = row.parentNode;
      parent.insertBefore(row, sibling);
    };
    col8.appendChild(moveUpBtn);
    let moveDownBtn = document.createElement('button');
    moveDownBtn.classList.add('btn-form-remove');
    moveDownBtn.innerHTML = '<i class="fa fa-angle-down"></i>';
    moveDownBtn.onclick = function () {
      let row = this.parentNode.parentNode;
      let parent = row.parentNode;
      if (row.nextElementSibling !== null) {
        let sibling = row.nextElementSibling.nextElementSibling;
        parent.insertBefore(row, sibling);
      } else {
        parent.insertBefore(row, parent.firstChild);
      }
    };
    col8.appendChild(moveDownBtn);
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn-form-remove');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    removeBtn.onclick = function () {
      that.modalContent.deleteRow(this.parentNode.parentNode.rowIndex);
    };
    col8.appendChild(removeBtn);

    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);
    // row.appendChild(col7);
    row.appendChild(col8);
    that.modalContent.appendChild(row);
  }

  updateForm() {
    let that = this;
    that.formModal.innerHTML = '';
    this.modalDiv.style.display = 'none';

    Object.values(this.modalContent.children).forEach(function (value) {
      let title = '';
      let label = '';
      let type = '';
      let name = '';
      let defaultValue = '';
      let options = '';
      let inputForm = undefined;
      let accumulateFormHtml = undefined;
      Object.values(value.children).forEach(function (val, index) {
        switch (index) {
          case 0:
            title = val.innerText || '';
            break;
          case 1:
            label = val.innerText || '';
            break;
          case 2:
            type = val.children[0].value;
            break;
          case 3:
            name = val.innerText || '';
            break;
          case 4:
            defaultValue = val.innerText || '';
            break;
          case 5:
            options = val.innerText || '';
            break;
          default:
            break;
        }
      });
      accumulateFormHtml = document.createElement('div');
      accumulateFormHtml.classList.add('b7-fitem');
      accumulateFormHtml.setAttribute('data-form-title', title);
      accumulateFormHtml.setAttribute('data-form-label', label);
      accumulateFormHtml.setAttribute('data-form-type', type);
      accumulateFormHtml.setAttribute('data-form-name', name);
      accumulateFormHtml.setAttribute('data-form-default', defaultValue);
      accumulateFormHtml.setAttribute('data-form-options', options);

      let randomLabel = 'label-' + that.getRandom();
      console.log(randomLabel);
      if (type !== '') {
        inputForm = document.createElement('input');
        inputForm.setAttribute('type', type);
      }
      if (title !== '') {
        accumulateFormHtml.innerHTML += `<span>${title}</span>`;
      }
      if (label !== '') {
        accumulateFormHtml.innerHTML += `<label for="${randomLabel}">${label}</label>`;
        inputForm.setAttribute('id', randomLabel);
      }
      if (name !== '') {
        inputForm.setAttribute('name', name);
      }
      if (defaultValue !== '') {
        inputForm.setAttribute('value', defaultValue);
      }
      accumulateFormHtml.appendChild(inputForm);
      that.formModal.appendChild(accumulateFormHtml);
    });
  }

  getRandom() {
    return Math.ceil(Math.random(100000, 999999) * 1000000);
  }


  updateList() {
    let that = this;
    that.listModal.innerHTML = '';
    this.listModalDiv.style.display = 'none';
    let listParent = document.createElement('ul');
    listParent.classList.add('b7-list');
    Object.values(this.listModalContent.children).forEach(function (value) {
      let name = '';
      let dataHref = '';
      let dropdown = false;
      let dropdownList;
      Object.values(value.children).forEach(function (val, index) {
        switch (index) {
          case 0:
            name = val.innerText || '';
            break;
          case 1:
            dataHref = val.innerText || '';
            break;
          case 2:
            let dropdownCheck = val.querySelector('input');
            if (dropdownCheck.checked) {
              dropdown = true;
              dropdownList = document.createElement('ul');
              dropdownList.classList.add('dropdown-content');
              let dropDownTable = val.querySelector('table');
              for (let i = 0; i < dropDownTable.rows.length; i++) {
                let dropdownLi = document.createElement('li');
                dropdownLi.innerHTML = dropDownTable.rows[i].cells[0].innerText;
                dropdownLi.setAttribute('data-href', dropDownTable.rows[i].cells[1].innerText);
                dropdownList.appendChild(dropdownLi);
              }
            }
            break;
          default:
            break;
        }
      });
      let listItem = document.createElement('li');
      if (dropdown){
        listItem.innerHTML = `<span>${name}</span>`;
        listItem.appendChild(dropdownList);
        listItem.setAttribute('data-dropdown', 'true');
      }
      else
        listItem.innerHTML = name;
      listItem.classList.add('b7-item');
      listItem.setAttribute('data-href', dataHref);

      listParent.appendChild(listItem);
    });
    that.listModal.appendChild(listParent);
  }
}
