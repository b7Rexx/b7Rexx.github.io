class EditorEvent {
  constructor() {
    this.dropContent = undefined;
    this.dropType = undefined;
    this.column = undefined;
    this.layoutEvent();
    this.componentEvent();
    this.listModal = undefined;
    this.formModal = undefined;
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

  /**
   * copy paste column
   * @param editor /parent element
   */
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

  /**
   * custom context menu
   * copy,paste,remove column events
   */
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
      if (that.column !== undefined && that.copiedColumnHtml !== undefined)
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

  /**
   * List Modal / CRUD Table view
   * Init
   * Set
   * Add
   * Update
   */
  initListModal(parentElement) {
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
    parentElement.appendChild(this.listModalDiv);
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
    //item
    let col2 = document.createElement('td');
    col2.innerHTML = item || '';
    col2.setAttribute('contenteditable', true);
    //label
    let col3 = document.createElement('td');
    col3.innerHTML = dataHref || '';
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
    dropTable.innerHTML = '<tr><td>Item</td><td>Link</td><td>Action</td></tr>';
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

    /**
     * List with dropdown
     */
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

  updateList() {
    let that = this;
    let listPadding = that.listModal.firstChild.firstChild.style.padding || 0;
    let wrapperBg = that.listModal.closest('.b7-wrapper');
    let dropdownBackground = that.listModal.style.background || '#ffffff';
    if (wrapperBg !== undefined)
      dropdownBackground = wrapperBg.style.background || '#ffffff';
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
              dropdownList.style.background = dropdownBackground;
              let dropDownTable = val.querySelector('table');
              for (let i = 1; i < dropDownTable.rows.length; i++) {
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
      listItem.style.padding = listPadding;
      if (dropdown) {
        listItem.innerHTML = `<span>${name}</span>`;
        listItem.appendChild(dropdownList);
        listItem.setAttribute('data-dropdown', 'true');
      } else
        listItem.innerHTML = name;
      listItem.classList.add('b7-item');
      if (dataHref !== '')
        listItem.setAttribute('data-href', dataHref);
      listParent.appendChild(listItem);
    });
    that.listModal.appendChild(listParent);
  }



  /**
   * Form Modal / CRUD Table view
   * Init
   * Set
   * Add
   * Update
   */
  initFormModal(parentElement) {
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
    parentElement.appendChild(this.modalDiv);
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
      let title = value.getAttribute('data-form-title');
      let label = value.getAttribute('data-form-label');
      let type = value.getAttribute('data-form-type');
      let name = value.getAttribute('data-form-name');
      let defaultValue = value.getAttribute('data-form-default');
      that.addFormInput(title, label, type, name, defaultValue);
    });
  }

  addFormInput(title, label, type, name, defaultValue) {
    let that = this;
    let row = document.createElement('tr');
    //title
    let col2 = document.createElement('td');
    col2.innerHTML = title || '';
    col2.setAttribute('contenteditable', true);
    //label
    let col3 = document.createElement('td');
    col3.innerHTML = label || '';
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

    //name
    let col5 = document.createElement('td');
    col5.innerHTML = name || '';
    col5.setAttribute('contenteditable', true);
    //default
    let col6 = document.createElement('td');
    col6.innerHTML = defaultValue || '';
    col6.setAttribute('contenteditable', true);

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

      let randomLabel = 'label-' + DomHelper.getRandom();
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
}
