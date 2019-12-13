class ListTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.listTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.listTool = document.createElement('div');
    this.listTool.classList.add('sidebar-style-block');
    this.listTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.listTool);
    let hrLine1 = document.createElement('hr');

    this.fontSizeTool();
    this.listStyle();
    this.listTool.appendChild(hrLine1);
    this.listTool.append('List Items');
    this.accumulateList();
  }

  updateStyleTools(component) {
    this.componentEditElement = component;
    this.getStyleProperty();
  }

  getStyleProperty() {
    this.componentProps = super.getComponentProperty(this.componentEditElement);
    this.updateChanges();
  }

  updateChanges() {
    let that = this;
    this.fontSizeBlock.children[1].value = this.componentProps.fontSize;

    //  accumulate list
    if (this.componentEditElement !== undefined) {
      this.accumulateListBlock.innerHTML = '';
      Object.values(this.componentEditElement.children[0].children).forEach(function (item) {
        let itemDiv = document.createElement('div');
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

        that.accumulateListBlock.appendChild(itemDiv);
        itemDiv.appendChild(itemInput);
        itemDiv.appendChild(itemRemove);
      });

      let addItem = document.createElement('button');
      addItem.innerHTML = '<i class="fa fa-plus"></i>';
      addItem.onclick = function () {
        let newItem = document.createElement('li');
        newItem.classList.add('b7-item');
        newItem.innerText = 'List Item';
        that.componentEditElement.children[0].appendChild(newItem);
        that.updateChanges();
      };
      that.accumulateListBlock.appendChild(addItem);

      if (this.accumulateListBlock.classList.contains('horizontal-list')) {
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
  }

  listStyle() {
    let that = this;
    this.listStyleBlock = document.createElement('div');
    this.listStyleBlock.classList.add('text-style');
    this.listStyleBlock.innerHTML =
      '<span>List style </span><br>' +
      '<input type="radio" name="liststyle" id="vertical-liststyle" value="vertical">' +
      '<label for="vertical-liststyle">Vertical</label>' +
      '<input type="radio" name="liststyle" id="horizontal-liststyle" value="horizontal">' +
      '<label for="horizontal-liststyle">Horizontal</label>';

    this.listTool.appendChild(this.listStyleBlock);
  }
}