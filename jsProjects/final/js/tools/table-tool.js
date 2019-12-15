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
    let hrline1 = document.createElement('hr');

    this.tableSize();
    this.tableTool.appendChild(hrline1);
    this.imageSize();
    this.paddingTool();
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
    this.paddingBlock.children[1].value = this.componentEditElement.children[0].rows[0].cells[0].style.padding || 0;
    this.tableHeightBlock.children[1].value = this.componentProps.height;
    this.tableWidthBlock.children[1].value = this.componentProps.width;
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

  imageSize() {
    let that = this;
    this.tableHeightBlock = document.createElement('div');
    this.tableHeightBlock.classList.add('text-style');
    this.tableHeightBlock.classList.add('imageheight-block-text');
    this.tableHeightBlock.innerHTML =
      '<span>Height</span>' +
      '<input type="text">';
    this.tableTool.appendChild(this.tableHeightBlock);
    this.tableHeightBlock.children[1].onchange = function () {
      that.componentEditElement.style.height = this.value;
    };
    this.tableHeightBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.height = this.value;
    };

    this.tableWidthBlock = document.createElement('div');
    this.tableWidthBlock.classList.add('text-style');
    this.tableWidthBlock.classList.add('imagewidth-block-text');
    this.tableWidthBlock.innerHTML =
      '<span>Width</span>' +
      '<input type="text">';
    this.tableTool.appendChild(this.tableWidthBlock);
    this.tableWidthBlock.children[1].onchange = function () {
      that.componentEditElement.style.width = this.value;
    };
    this.tableWidthBlock.children[1].onkeyup = function () {
      that.componentEditElement.style.width = this.value;
    };
  }

  paddingTool() {
    let that = this;
    this.paddingBlock = document.createElement('div');
    this.paddingBlock.classList.add('text-style');
    this.paddingBlock.classList.add('padding-block-text');
    this.paddingBlock.innerHTML =
      '<span>Padding </span>' +
      '<input type="text">';
    this.tableTool.appendChild(this.paddingBlock);
    this.paddingBlock.children[1].onchange = function (event) {

      let rowCount = that.componentEditElement.children[0].rows.length;
      let colCount = that.componentEditElement.children[0].rows[0].cells.length;
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          that.componentEditElement.children[0].rows[i].cells[j].style.padding = event.target.value;
        }
      }
    };
    this.paddingBlock.children[1].onkeyup = function (event) {
      let rowCount = that.componentEditElement.children[0].rows.length;
      let colCount = that.componentEditElement.children[0].rows[0].cells.length;
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          that.componentEditElement.children[0].rows[i].cells[j].style.padding = event.target.value;
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