class Editor extends EditorEvent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.editor = undefined;
    this.editorBlock = undefined;
    this.editorMargin = undefined;
    this.editorContent = undefined;
    this.contentEditableText = undefined;
    this.wrapperEditElement = undefined;
    this.containerEditElement = undefined;
    this.rowEditElement = undefined;
    this.colEditElement = undefined;
    this.componentEditElement = undefined;
    this.currentTabElement = undefined;
    this.init();
  }

  init() {
    this.editor = document.createElement('div');
    this.editor.classList.add('edit-editor');
    this.parentElement.appendChild(this.editor);
    this.setEmptyEditor();
    this.editorContentEvent();
    this.initFormModal(this.parentElement);
    this.initListModal(this.parentElement);

    /**
     * right click copy,paste event halders
     */
    this.rightClickMenu();
    this.editor.appendChild(this.rightMenu);
    this.copyEvent(this.editor);
  }

  /*
  init empty editor with left right tab buttons
   */
  setEmptyEditor() {
    let that = this;
    this.editorBlock = document.createElement('div');
    this.editorBlock.classList.add('editor-block');
    this.editorMargin = document.createElement('div');
    this.editorMargin.classList.add('editor-margin');
    this.editorContent = document.createElement('div');
    this.editorContent.classList.add('editor-content');
    this.leftTabButton = document.createElement('a');
    this.leftTabButton.classList.add('left-tab-btn');
    this.leftTabButton.innerHTML = '<i class="fa fa-angle-left"></i>';
    this.leftTabButton.setAttribute('title', 'prev wrapper');
    this.leftTabButton.onclick = function () {
      that.rowEditElement = undefined;
      that.colEditElement = undefined;
      that.componentEditElement = undefined;
      if (that.currentTabElement !== undefined) {
        let leftElement = that.currentTabElement.closest('div[class^="b7-wrapper"]');
        if (leftElement.previousSibling !== null) {
          that.currentTabElement = leftElement.previousSibling;
          that.wrapperEditElement = leftElement.previousSibling;
        } else {
          that.wrapperEditElement = that.editorContent.lastChild;
          that.currentTabElement = that.editorContent.lastChild;
        }
        that.containerEditElement = that.wrapperEditElement.firstChild;
      } else {
        that.wrapperEditElement = that.editorContent.lastChild;
        if (that.wrapperEditElement) {
          that.containerEditElement = that.wrapperEditElement.firstChild;
          that.currentTabElement = that.editorContent.lastChild;
        }
      }
      document.dispatchEvent(EventHelper.customEventStyleTool('custom-event-style-tool',
        that.wrapperEditElement,
        that.containerEditElement,
        that.rowEditElement,
        that.colEditElement,
        that.componentEditElement
      ));
    };

    this.rightTabButton = document.createElement('a');
    this.rightTabButton.classList.add('right-tab-btn');
    this.rightTabButton.innerHTML = '<i class="fa fa-angle-right"></i>';
    this.rightTabButton.setAttribute('title', 'next wrapper');
    this.rightTabButton.onclick = function () {
      if (that.currentTabElement !== undefined) {
        let rightElement = that.currentTabElement.closest('div[class^="b7-wrapper"]');
        if (rightElement.nextSibling !== null) {
          that.currentTabElement = rightElement.nextSibling;
          that.wrapperEditElement = rightElement.nextSibling;
        } else {
          that.wrapperEditElement = that.editorContent.firstChild;
          that.currentTabElement = that.editorContent.firstChild;
        }
        that.containerEditElement = that.wrapperEditElement.firstChild;
      } else {
        that.wrapperEditElement = that.editorContent.firstChild;
        if (that.wrapperEditElement) {
          that.containerEditElement = that.wrapperEditElement.firstChild;
          that.currentTabElement = that.editorContent.firstChild;
        }
      }
      document.dispatchEvent(EventHelper.customEventStyleTool('custom-event-style-tool',
        that.wrapperEditElement,
        that.containerEditElement,
        that.rowEditElement,
        that.colEditElement,
        that.componentEditElement
      ));
    };

    this.setHeightWidthByViewPort();
    this.contentWrapper();
    this.editorMargin.appendChild(this.editorContent);
    this.editorBlock.appendChild(this.editorMargin);
    this.editorBlock.appendChild(this.leftTabButton);
    this.editorBlock.appendChild(this.rightTabButton);
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
    this.editorContent.innerHTML = FileHelper.parseEditorStorage(editStorage);
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

  /**
   * Editor click / dblclick event handler
   * Editor drag and drop event handler
   * Editor save state change handler
   */
  editorContentEvent() {
    let that = this;
    let clearDrag = false;
    /**
     *Clear drag, click layout/component on esc key/outer document click
     */
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
    /**
     * layout,component on drag
     * @param event
     */
    this.editorContent.ondragover = function (event) {
      event.preventDefault();
    };
    /**
     * layout,component on drop
     * @param event
     */
    this.editorContent.ondrop = function (event) {
      event.preventDefault();
      let eventPath = event.path || (event.composedPath && event.composedPath());
      if (that.contentEditableText !== undefined) {
        that.contentEditableText.onclick = null;
        that.contentEditableText.removeAttribute('contenteditable');
      }
      //save state change
      document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
      /**
       * drop type layout case
       */
      if (that.dropType === 'layout') {
        if (eventPath.hasOwnProperty(0)) {
          let eventClickDom = eventPath[0];
          if (eventClickDom.className !== undefined) {
            if (eventClickDom.className.startsWith('b7-container')) {
              eventClickDom.innerHTML += that.dropContent;
              clearDrag = true;
              that.clearStylingTools();
            }
            let pathArray = Object.values(eventPath).map(function (value) {
              return value.className;
            });
            let pathString = JSON.stringify(pathArray);
            if (pathString.indexOf('b7-layout') === pathString.lastIndexOf('b7-layout')) {
              Object.values(eventPath).map(function (valueDom) {
                if (valueDom.className !== undefined) {
                  if (valueDom.className.startsWith('b7-col')) {
                    // console.log(that.dropType, 'type < < < < < 2nd gen > > > > content', valueDom);
                    valueDom.innerHTML += that.dropContent;
                    clearDrag = true;
                    that.clearStylingTools();
                  }
                }
              });
            } else {
              clearDrag = true;
              that.clearStylingTools();
            }
          }
        }
      }
      /**
       * drop type component case
       */
      if (that.dropType === 'component') {
        if (eventPath.hasOwnProperty(0)) {
          let eventClickDom = eventPath[0];
          if (eventClickDom.className !== undefined) {
            if (eventClickDom.className.startsWith('b7-col')) {
              eventClickDom.innerHTML += that.dropContent;
              clearDrag = true;
              that.clearStylingTools();
            } else {
              let flag = true;
              Object.values(eventPath).forEach(function (value) {
                if (flag) {
                  if (value.className !== undefined) {
                    if (value.className.startsWith('b7-col')) {
                      flag = false;
                      value.innerHTML += that.dropContent;
                      clearDrag = true;
                      that.clearStylingTools();
                    }
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
    };

    /**
     * Editor on click event
     * @param event
     */
    this.editorContent.onclick =
      function (event) {
        that.rightMenu.style.display = 'none';
        let eventStyle = true;
        let eventPath = event.path || (event.composedPath && event.composedPath());
        if (that.contentEditableText !== undefined) {
          that.contentEditableText.onclick = null;
          that.contentEditableText.removeAttribute('contenteditable');
        }
        //save state change
        document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
        /**
         * click with layout case
         */
        if (that.dropType === 'layout') {
          if (eventPath.hasOwnProperty(0)) {
            let eventClickDom = eventPath[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-container')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
                that.clearStylingTools();
                eventStyle = false;
              }
              let pathArray = Object.values(eventPath).map(function (value) {
                return value.className;
              });
              let pathString = JSON.stringify(pathArray);
              if (pathString.indexOf('b7-layout') === pathString.lastIndexOf('b7-layout')) {
                Object.values(eventPath).map(function (valueDom) {
                  if (valueDom.className !== undefined) {
                    if (valueDom.className.startsWith('b7-col')) {
                      // console.log(that.dropType, 'type < < < < < 2nd gen > > > > content', valueDom);
                      valueDom.innerHTML += that.dropContent;
                      clearDrag = true;
                      that.clearStylingTools();
                      eventStyle = false;
                    }
                  }
                });
              } else {
                clearDrag = true;
                eventStyle = false;
              }
            }
          }
        }
        /**
         * click with component case
         */
        if (that.dropType === 'component') {
          if (eventPath.hasOwnProperty(0)) {
            let eventClickDom = eventPath[0];
            if (eventClickDom.className !== undefined) {
              if (eventClickDom.className.startsWith('b7-col')) {
                eventClickDom.innerHTML += that.dropContent;
                clearDrag = true;
                that.clearStylingTools();
                eventStyle = false;
              } else {
                let flag = true;
                Object.values(eventPath).forEach(function (value) {
                  if (flag) {
                    if (value.className !== undefined)
                      if (value.className.startsWith('b7-col')) {
                        flag = false;
                        value.innerHTML += that.dropContent;
                        clearDrag = true;
                        that.clearStylingTools();
                        eventStyle = false;
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
        if (eventStyle) {
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
          /*
          left right tab button | assign current element
           */
          if (that.componentEditElement !== undefined) {
            that.currentTabElement = that.componentEditElement;
          } else if (that.colEditElement !== undefined) {
            that.currentTabElement = that.colEditElement;
          } else if (that.containerEditElement !== undefined) {
            that.currentTabElement = that.containerEditElement;
          } else {
            that.currentTabElement = undefined;
          }
          document.dispatchEvent(EventHelper.customEventStyleTool('custom-event-style-tool',
            that.wrapperEditElement,
            that.containerEditElement,
            that.rowEditElement,
            that.colEditElement,
            that.componentEditElement
          ));
        }
      };
    /**
     * Editor component on double click
     * @param event
     */
    this.editorContent.ondblclick =
      function (event) {
        that.rightMenu.style.display = 'none';
        let eventPath = event.path || (event.composedPath && event.composedPath());
        //save state change
        document.dispatchEvent(EventHelper.customEvent('custom-event-unsaved-state'));
        if (eventPath.hasOwnProperty(0)) {
          let eventClickDom = eventPath[0];
          let eventClickDom1 = eventPath[1];
          if (eventClickDom.className !== undefined) {
            if (eventClickDom.className.startsWith('b7-component-text') || eventClickDom1.className.startsWith('b7-component-text')) {
              that.contentEditableText = eventClickDom;
              if (window.getSelection)
                window.getSelection().removeAllRanges();
              else if (document.selection)
                document.selection.empty();
              that.contentEditableText.onclick = function (eventPrevent) {
                eventPrevent.stopPropagation();
              };
              eventClickDom.setAttribute('contenteditable', 'true');
            }
            if (eventClickDom.className.startsWith('b7-item')) {
              that.contentEditableText = eventClickDom;
              if (window.getSelection)
                window.getSelection().removeAllRanges();
              else if (document.selection)
                document.selection.empty();
              that.contentEditableText.onclick = function (eventPrevent) {
                eventPrevent.stopPropagation();
              };
              eventClickDom.setAttribute('contenteditable', 'true');
            }
            if (eventClickDom.tagName === 'TH' || eventClickDom.tagName === 'TD') {
              that.contentEditableText = eventClickDom;
              if (window.getSelection)
                window.getSelection().removeAllRanges();
              else if (document.selection)
                document.selection.empty();
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
              if (window.getSelection)
                window.getSelection().removeAllRanges();
              else if (document.selection)
                document.selection.empty();
              that.setFormModalState();
            }
            if (value.className.startsWith('b7-component-list')) {
              that.listModal = value;
              if (window.getSelection)
                window.getSelection().removeAllRanges();
              else if (document.selection)
                document.selection.empty();
              that.setListModalState();
            }
          }
        });
      };
  }

  /**
   * clear/reset styling tools
   */
  clearStylingTools() {
    this.rightMenu.style.display = 'none';

    this.dropType = undefined;
    this.dropContent = undefined;
    this.currentTabElement = undefined;
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
}
