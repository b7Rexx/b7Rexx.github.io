var downloadBtn= document.getElementById('download');

downloadBtn.addEventListener('click', function () {

  var doc = document.getElementById('app-wrapper');
  var downloadContent = {};
  var array = {};

  downloadContent = parseDOM(doc  , array);
  var json = JSON.stringify(array);
  download(json, 'test', 'txt');
});

function parseDOM(parent, arrayReturn) {
  var textAbleDom = parent;
  arrayReturn.tagName = parent.tagName;
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
  if (textAbleDom.children.length > 0) {
    Object.values(textAbleDom.children).forEach(function (value) {
      value.remove();
    });
  }
  console.log(textAbleDom);
  arrayReturn.innerText = textAbleDom.innerText;
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