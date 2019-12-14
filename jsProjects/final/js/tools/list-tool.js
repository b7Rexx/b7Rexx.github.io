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

    this.fontSizeBlock = undefined;
    this.accumulateListBlock = undefined;
    this.fontSizeBlock = undefined;
    this.listStyleBlock = undefined;
    this.paddingBlock = undefined;
    this.listBulletTypeBlock = undefined;
    this.init();
  }

  init() {
    this.listTool = document.createElement('div');
    this.listTool.classList.add('sidebar-style-block');
    this.listTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.listTool);
    let hrLine1 = document.createElement('hr');

    this.fontSizeTool();
    this.paddingTool();
    this.listStyle();
    this.listStyleType();
    this.listTool.appendChild(hrLine1);
    this.listTool.append('List Items');
    this.accumulateList();
  }

  updateStyleTools(component) {
    this.componentEditElement = component;
    if (component.children[0] !== undefined) {
      this.componentEditUl = component.children[0];
      if (component.children[0].children[0] !== undefined) {
        this.componentEditLi = component.children[0].children[0];
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
    this.paddingBlock.children[1].value = this.componentPropsLi.padding || 0;
    // this.listBulletTypeBlock.children[1].value = this.componentProps.listStyleType;

    //  accumulate list
    if (this.componentEditElement !== undefined) {
      this.accumulateListBlock.innerHTML = '';
      Object.values(this.componentEditElement.children[0].children).forEach(function (item, index) {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('list-item-div');
        itemDiv.append((index + 1) + ') ');
        let itemInput = document.createElement('input');
        itemInput.value = item.innerText;

        itemInput.onkeyup = function () {
          item.innerText = this.value;
        };
        itemInput.onchange = function () {
          item.innerText = this.value;
        };

        let itemRemove = document.createElement('button');
        itemRemove.innerHTML = '<i class="fa fa-times"></i>';
        itemRemove.onclick = function () {
          item.remove();
          itemDiv.remove();
        };

        let linkSpan = document.createElement('span');
        linkSpan.innerHTML = '<br>set link:';
        let linkInput = document.createElement('input');
        linkInput.value = item.getAttribute('data-href');
        linkInput.onkeyup = function () {
          item.setAttribute('data-href', this.value);
        };

        that.accumulateListBlock.appendChild(itemDiv);
        itemDiv.appendChild(itemInput);
        itemDiv.appendChild(itemRemove);
        itemDiv.appendChild(linkSpan);
        itemDiv.appendChild(linkInput);
      });

      let addItem = document.createElement('button');
      addItem.innerHTML = '<i class="fa fa-plus"></i>';
      addItem.onclick = function () {
        let newItem = document.createElement('li');
        newItem.classList.add('b7-item');
        newItem.style.padding = that.paddingBlock.children[1].value;
        newItem.innerText = 'List Item';
        that.componentEditElement.children[0].appendChild(newItem);
        that.updateChanges();
      };
      that.accumulateListBlock.appendChild(addItem);

      if (this.componentEditElement.getAttribute('list-style') === 'horizontal-list') {
        document.getElementById('horizontal-liststyle').checked = true;
      } else {
        document.getElementById('vertical-liststyle').checked = true;
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
}