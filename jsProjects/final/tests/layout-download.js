let downloadBtn = document.getElementById('download');
downloadBtn.addEventListener('click', function () {

  let previewWrapper = document.getElementById('preview-wrapper');
  let layoutList = [];

  //extract wrapper+container+layouts
  Object.values(previewWrapper.children).forEach(function (value) {
    // Object.values(value.children).forEach(function (value1) {
    //   Object.values(value1.children).forEach(function (value2) {
    let layoutItem = {};
    parseDOM(value, layoutItem);
    layoutList.push(layoutItem);
    // });
    // });
  });
  // //extract layouts from wrapper+container
  // Object.values(previewWrapper.children).forEach(function (value) {
  //   Object.values(value.children).forEach(function (value1) {
  //     Object.values(value1.children).forEach(function (value2) {
  //       let layoutItem = {};
  //       parseDOM(value2, layoutItem);
  //       layoutList.push(layoutItem);
  //     });
  //   });
  // });
  let json = JSON.stringify(layoutList);
  download(json, 'layout.json', 'txt');
});

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
    if (parent.attributes[i].name === 'data-css')
      arrayReturn.attributes[i] = {name: parent.attributes[i].name, value: 1};
    else
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

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}