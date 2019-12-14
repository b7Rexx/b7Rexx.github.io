class TableTool extends Tool {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.tableTool = undefined;
    this.componentProps = undefined;
    this.componentEditElement = undefined;

    this.init();
  }

  init() {
    this.tableTool = document.createElement('div');
    this.tableTool.classList.add('sidebar-style-block');
    this.tableTool.classList.add('image-style-block');
    this.parentElement.appendChild(this.tableTool);

    this.tableSize();
    this.removeAll();
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
    this.rowBlock.children[1].value = this.componentEditElement.children[0].tBodies[0].rows.length;
    this.columnBlock.children[1].value = this.componentEditElement.children[0].rows[0].cells.length;
  }

  tableSize() {
    let that = this;
    this.rowBlock = document.createElement('div');

    this.rowBlock = document.createElement('div');
    this.rowBlock.classList.add('text-style');
    this.rowBlock.classList.add('imageheight-block-text');
    this.rowBlock.innerHTML =
      '<span>Row</span>' +
      '<input type="number">';
    this.tableTool.appendChild(this.rowBlock);

    this.rowBlock.children[1].onchange = function () {
      let currentRow = that.componentEditElement.children[0].tBodies[0].rows.length;
      let currentColumn = that.componentEditElement.children[0].rows[0].cells.length;

      let diff = Math.abs(this.value - currentRow);
      for (let change = 0; change < diff; change++) {
        if (this.value > currentRow) {
          let row = that.componentEditElement.children[0].tBodies[0].insertRow(-1);
          for (let i = 0; i < currentColumn; i++) {
            let cell = row.insertCell(i);
            cell.innerHTML = 'Table Data';
          }
        } else if (this.value < currentRow) {
          that.componentEditElement.children[0].deleteRow(-1);
        }
      }
    };

    // this.rowBlock.children[1].onkeyup = function () {
    //   that.componentEditElement.style.height = this.value;
    // };

    this.columnBlock = document.createElement('div');
    this.columnBlock.classList.add('text-style');
    this.columnBlock.classList.add('imagewidth-block-text');
    this.columnBlock.innerHTML =
      '<span>Column</span>' +
      '<input type="number">';
    this.tableTool.appendChild(this.columnBlock);
    this.columnBlock.children[1].onchange = function () {
      let currentRow = that.componentEditElement.children[0].rows.length;
      let currentColumn = that.componentEditElement.children[0].rows[0].cells.length;
      let diff = Math.abs(this.value - currentColumn);
      for (let change = 0; change < diff; change++) {

        if (this.value > currentColumn) {
          for (let i = 0; i < currentRow; i++) {
            let cell;
            if (i === 0) {
              let tr = that.componentEditElement.children[0].rows[i];
              cell = document.createElement('th');
              tr.appendChild(cell);
            } else
              cell = that.componentEditElement.children[0].rows[i].insertCell(-1);
            cell.innerHTML = 'Table Data';
          }
        } else if (this.value < currentColumn) {
          for (let i = 0; i < currentRow; i++) {
            that.componentEditElement.children[0].rows[i].deleteCell(-1);
          }
        }
      }

    };
  }

  removeAll() {
    let that = this;
    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-comp');
    removeBtn.innerHTML = '<i class="fa fa-times"></i> remove list';
    removeBtn.onclick = function () {
      that.componentEditElement.remove();
    };
    this.tableTool.appendChild(removeBtn);
  }

}