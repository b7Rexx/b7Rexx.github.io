class Sidebar {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.sidebar = undefined;
    this.init();
  }

  init() {
    this.sidebar = document.createElement('div');
    this.sidebar.classList.add('edit-sidebar');
    this.parentElement.appendChild(this.sidebar);
    this.setLayoutComponent();
  }

  setLayoutComponent() {
    let btnDiv = document.createElement('div');
    btnDiv.classList.add('btn-div');
    let listDiv = document.createElement('div');
    listDiv.classList.add('list-div');
    let listDivBlock = document.createElement('div');
    listDivBlock.classList.add('list-div-block');
    let layoutBtn = document.createElement('a');
    layoutBtn.classList.add('layout-btn');
    layoutBtn.innerHTML = 'Layout';
    let componentBtn = document.createElement('a');
    componentBtn.classList.add('component-btn');
    componentBtn.innerHTML = 'Component';
    let layoutCount = 0;
    FileHelper.getFileContent('api/layout.json', 'get', function (value) {

      value.forEach(function (val) {
        let newLayout = document.createElement('img');
        newLayout.src = val.info.image;
        listDivBlock.appendChild(newLayout);
        layoutCount++;
        listDivBlock.style.width = (140 * layoutCount) + 'px';
      });
    });

    btnDiv.appendChild(layoutBtn);
    btnDiv.appendChild(componentBtn);
    this.sidebar.appendChild(btnDiv);
    this.sidebar.appendChild(listDiv);
    listDiv.appendChild(listDivBlock);
  }
}
