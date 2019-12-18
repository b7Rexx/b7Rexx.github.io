class ListTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.listTool = undefined;
    this.componentProps = undefined;
    this.componentPropsUl = undefined;
    this.componentPropsLi = undefined;
    this.componentEditElement = undefined;
    this.componentEditUl = undefined;
    this.componentEditLi = undefined;

    this.init();
  }

  init() {
    this.listTool = document.createElement('div');
    this.listTool.classList.add('sidebar-style-block');
    this.listTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.listTool);
    let hrLine1 = document.createElement('hr');
    this.moveComponentTool();
    this.fontSizeTool();
    this.textColorTool();
    this.paddingTool();
    this.listStyle();
    this.listStyleType();
    this.displayTool();
    this.floatTool();
    // this.listTool.appendChild(hrLine1);
    // this.listTool.append('List Items');
    // this.accumulateList();
    this.removeAll();
  }

  updateStyleTools(component) {
    this.componentEditElement = component;
    if (component.firstChild !== undefined) {
      this.componentEditUl = component.firstChild;
      if (component.firstChild.firstChild !== undefined) {
        this.componentEditLi = component.firstChild.firstChild;
      }
    }

    this.getStyleProperty();
  }

  getStyleProperty() {
    this.componentProps = super.getComponentProperty(this.componentEditElement);
    this.componentPropsUl = super.getComponentProperty(this.componentEditUl);
    this.componentPropsLi = super.getComponentProperty(this.componentEditLi);
    this.updateChanges();
  }

  updateChanges() {
    let that = this;
    this.fontSizeBlock.children[1].value = this.componentProps.fontSize;

    if (this.componentEditLi)
    this.paddingBlock.children[1].value = this.componentEditLi.style.padding || 0;
    this.listBulletTypeBlock.children[1].value = this.componentPropsUl.listStyleType;
    this.displaySelect.value = this.componentProps.display;
    this.fontColorBlock.children[1].value = this.componentProps.color;

    if (this.componentEditElement.firstChild.style.float)
      this.floatSelect.value = this.componentEditElement.firstChild.style.float;
    else
      this.floatSelect.value = 'none';
    //  accumulate list
    // if (this.componentEditElement !== undefined) {
    // this.accumulateListBlock.innerHTML = '';
    // Object.values(this.componentEditElement.children[0].children).forEach(function (item, index) {
    //   let itemDiv = document.createElement('div');
    //   itemDiv.classList.add('list-item-div');
    //   itemDiv.append((index + 1) + ') ');
    //   let itemInput = document.createElement('input');
    //   itemInput.value = item.innerText;
    //
    //   itemInput.onkeyup = function () {
    //     item.innerText = this.value;
    //   };
    //   itemInput.onchange = function () {
    //     item.innerText = this.value;
    //   };
    //
    //   let itemRemove = document.createElement('button');
    //   itemRemove.innerHTML = '<i class="fa fa-times"></i>';
    //   itemRemove.onclick = function () {
    //     item.remove();
    //     itemDiv.remove();
    //   };

    //   let linkSpan = document.createElement('span');
    //   linkSpan.innerHTML = '<br>set link:';
    //   let linkInput = document.createElement('input');
    //   linkInput.value = item.getAttribute('data-href');
    //   linkInput.onkeyup = function () {
    //     item.setAttribute('data-href', this.value);
    //   };
    //
    //   that.accumulateListBlock.appendChild(itemDiv);
    //   itemDiv.appendChild(itemInput);
    //   itemDiv.appendChild(itemRemove);
    //   itemDiv.appendChild(linkSpan);
    //   itemDiv.appendChild(linkInput);
    // });
    //
    // let addItem = document.createElement('button');
    // addItem.innerHTML = '<i class="fa fa-plus"></i>';
    // addItem.onclick = function () {
    //   let newItem = document.createElement('li');
    //   newItem.classList.add('b7-item');
    //   newItem.style.padding = that.paddingBlock.children[1].value;
    //   newItem.innerText = 'List Item';
    //   that.componentEditElement.children[0].appendChild(newItem);
    //   that.updateChanges();
    // };
    // that.accumulateListBlock.appendChild(addItem);

      if (this.componentEditElement.getAttribute('list-style') === 'horizontal-list') {
        document.getElementById('horizontal-liststyle').checked = true;
      } else {
        document.getElementById('vertical-liststyle').checked = true;
      }
    // }

    //move component
    if (this.componentEditElement !== undefined) {
      let rowIndex = DomHelper.getIndexOfElement(this.componentEditElement);
      if (rowIndex !== 'parentNodeEmpty') {
        let childrenLength = this.componentEditElement.parentNode.childNodes.length;
        this.moveComponentUp = undefined;
        this.moveComponentDown = undefined;
        if (this.componentEditElement.parentNode.childNodes.hasOwnProperty(rowIndex - 1))
          this.moveComponentUp = this.componentEditElement.parentNode.childNodes[rowIndex - 1];
        if (this.componentEditElement.parentNode.childNodes.hasOwnProperty(rowIndex + 2))
          this.moveComponentDown = this.componentEditElement.parentNode.childNodes[rowIndex + 2];
        if (rowIndex === 0) {
          this.moveComponentUp = undefined;
        }
        if (rowIndex === (childrenLength - 1)) {
          this.moveComponentDown = undefined;
        }
        if (rowIndex === (childrenLength - 2)) {
          this.moveComponentDown = 'last';
        }

        Object.values(this.moveComponentBlock.children[1].children).forEach(function (val) {
          val.style.pointerEvents = 'none';
          switch (val.getAttribute('data-move')) {
            case 'top':
              if (that.moveComponentUp !== undefined) {
                val.style.pointerEvents = 'auto';
              }
              break;
            case 'bottom':
              if (that.moveComponentDown !== undefined) {
                val.style.pointerEvents = 'auto';
              }
              break;
          }
        });
      }
    }
  }

  accumulateList() {
    let that = this;
    this.accumulateListBlock = document.createElement('div');
    this.accumulateListBlock.classList.add('text-style');
    this.accumulateListBlock.classList.add('accumulate-style-list');
    this.listTool.appendChild(this.accumulateListBlock);
  }

  fontSizeTool() {
    let that = this;
    this.fontSizeBlock = document.createElement('div');
    this.fontSizeBlock.classList.add('text-style');
    this.fontSizeBlock.classList.add('fontsize-block-text');
    this.fontSizeBlock.innerHTML =
      '<span>Font size </span>' +
      '<input type="text">';
    this.listTool.appendChild(this.fontSizeBlock);
    this.fontSizeBlock.children[1].onchange = function () {
      that.componentEditElement.style.fontSize = this.value;
    };
    this.fontSizeBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.fontSize = this.value;
    };
  }

  textColorTool() {
    let that = this;
    this.fontColorBlock = document.createElement('div');
    this.fontColorBlock.classList.add('text-style');
    this.fontColorBlock.classList.add('fontcolor-block-text');
    this.fontColorBlock.innerHTML =
      '<span>Font color </span>' +
      '<input type="color">';
    this.listTool.appendChild(this.fontColorBlock);
    this.fontColorBlock.children[1].onchange = function () {
      that.componentEditElement.style.color = this.value;
    };
  }

  listStyle() {
    let that = this;
    this.listStyleBlock = document.createElement('div');
    this.listStyleBlock.classList.add('text-style');
    this.listStyleBlock.classList.add('list-style-tool');
    this.listStyleBlock.innerHTML =
      '<span>List style </span><br>' +
      '<input type="radio" name="liststyle" id="vertical-liststyle" value="vertical">' +
      '<label for="vertical-liststyle">Vertical</label>' +
      '<input type="radio" name="liststyle" id="horizontal-liststyle" value="horizontal">' +
      '<label for="horizontal-liststyle">Horizontal</label>';


    Object.values(this.listStyleBlock.querySelectorAll('input[name="liststyle"]')).forEach(function (value) {
      value.onchange = function () {
        if (this.value === 'horizontal') {
          that.componentEditElement.setAttribute('list-style', 'horizontal-list');
        } else {
          that.componentEditElement.removeAttribute('list-style');
        }
      };
    });
    this.listTool.appendChild(this.listStyleBlock);
  }

  paddingTool() {
    let that = this;
    this.paddingBlock = document.createElement('div');
    this.paddingBlock.classList.add('text-style');
    this.paddingBlock.classList.add('padding-block-text');
    this.paddingBlock.innerHTML =
      '<span>Padding </span>' +
      '<input type="text">';
    this.listTool.appendChild(this.paddingBlock);
    this.paddingBlock.children[1].onchange = function (event) {
      Object.values(that.componentEditElement.children[0].children).forEach(function (val) {
        val.style.padding = event.target.value;
      });
    };
    this.paddingBlock.children[1].onkeyup = function (event) {
      Object.values(that.componentEditElement.children[0].children).forEach(function (val) {
        val.style.padding = event.target.value;
      });
    };
  }


  displayTool() {
    let that = this;
    this.displayBlock = document.createElement('div');
    this.displayBlock.classList.add('text-style');

    let displaySpan = document.createElement('span');
    displaySpan.innerHTML = 'Display : ';
    this.displaySelect = document.createElement('select');
    this.displaySelect.innerHTML =
      '<option value="block">block</option>' +
      '<option value="inline-block">inline-block</option>' +
      '<option value="inline">inline</option>' +
      '<option value="inherit">inherit</option>';

    this.displaySelect.onchange = function () {
      that.componentEditElement.style.display = this.value;
    };
    this.displayBlock.appendChild(displaySpan);
    this.displayBlock.appendChild(this.displaySelect);
    this.listTool.appendChild(this.displayBlock);
  }

  floatTool() {
    let that = this;
    this.floatBlock = document.createElement('div');
    this.floatBlock.classList.add('text-style');

    let floatSpan = document.createElement('span');
    floatSpan.innerHTML = 'Float : ';
    this.floatSelect = document.createElement('select');
    this.floatSelect.innerHTML =
      '<option value="none">none</option>' +
      '<option value="left">left</option>' +
      '<option value="right">right</option>';

    this.floatSelect.onchange = function () {
      that.componentEditElement.firstChild.style.float = this.value;
    };
    this.floatBlock.appendChild(floatSpan);
    this.floatBlock.appendChild(this.floatSelect);
    this.listTool.appendChild(this.floatBlock);
  }

  listStyleType() {
    let that = this;
    this.listBulletTypeBlock = document.createElement('div');
    this.listBulletTypeBlock.classList.add('text-style');
    this.listBulletTypeBlock.classList.add('bullet-block-list');
    this.listBulletTypeBlock.innerHTML =
      '<span>Style Type </span>' +
      '<select name="bullet-block-list">' +
      '<option value="none">none</option>' +
      '<option value="circle">circle</option>' +
      '<option value="square">square</option>' +
      '</select>';

    this.listBulletTypeBlock.children[1].onchange = function (event) {
      that.componentEditElement.children[0].style.listStyle = event.target.value;
    };
    this.listTool.appendChild(this.listBulletTypeBlock);
  }

  moveComponentTool() {
    let that = this;
    this.moveComponentBlock = document.createElement('div');
    this.moveComponentBlock.classList.add('text-style');
    this.moveComponentBlock.classList.add('moverow-block-layout');
    this.moveComponentBlock.innerHTML =
      '<span>Move</span>' +
      '<div class="move-button-row">' +
      '<button data-move="top"><i class="fa fa-angle-up"></i></button>' +
      '<button data-move="bottom"><i class="fa fa-angle-down"></i></button>' +
      '</div>';
    this.listTool.appendChild(this.moveComponentBlock);

    Object.values(this.moveComponentBlock.children[1].children).forEach(function (val) {
      val.onclick = function () {
        if (that.componentEditElement !== undefined) {
          switch (val.getAttribute('data-move')) {
            case 'top':
              if (that.moveComponentUp !== undefined) {
                that.componentEditElement.parentNode.insertBefore(that.componentEditElement, that.moveComponentUp);
                that.updateChanges();
              }
              break;
            case 'bottom':
              if (that.moveComponentDown === 'last') {
                that.componentEditElement.parentNode.appendChild(that.componentEditElement);
                that.updateChanges();
              } else {
                if (that.moveComponentDown !== undefined) {
                  that.componentEditElement.parentNode.insertBefore(that.componentEditElement, that.moveComponentDown);
                  that.updateChanges();
                }
              }
              break;
          }

        }
      }
    });
  }

  removeAll() {
    let that = this;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-comp');
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove list';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.listTool.appendChild(removeBtn);
  }

}