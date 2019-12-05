if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET", "file.txt", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseText;
var downloadedHtml = JSON.parse(xmlDoc);

var appWrapper = document.getElementById('app-wrapper1');
var uploadBtn= document.getElementById('upload');
uploadBtn.addEventListener('click',function () {
  parseHtmlFromJson(downloadedHtml, appWrapper);
});

function parseHtmlFromJson(downloadedHtml, parentElem) {
  var domTag = document.createElement(downloadedHtml.tagName);
  Object.values(downloadedHtml.attributes).forEach(function (value) {
    domTag.setAttribute(value.name, value.value);
  });
  Object.values(downloadedHtml.children).forEach(function (value) {
    parseHtmlFromJson(value, domTag);
  });
  if (downloadedHtml.innerText !== '')
  // console.log(downloadedHtml.innerText);
  domTag.innerText = downloadedHtml.innerText;

  parentElem.appendChild(domTag);
}

// console.log(xmlhttp);
