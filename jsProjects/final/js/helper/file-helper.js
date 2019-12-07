class FileHelper {
  static getFileContent(file, method, callbackResponse) {
    let fileName = file || 'nofile';
    let xmlhttp = undefined;
    let xmlDoc = undefined;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open(method, fileName, true);
    xmlhttp.send();
    xmlhttp.onload = function () {
      if (xmlhttp.status === 200) {
        xmlDoc = xmlhttp.responseText;
        callbackResponse(JSON.parse(xmlDoc));
      } else {
        callbackResponse("[]");
      }
    };
  }

  static parseTemplate(templateData) {
    let wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'preview-wrapper');
    if (Array.isArray(templateData) && templateData.length) {
      for (let templateDataKey in templateData) {
        if (templateData.hasOwnProperty(templateDataKey)) {
          parseHtmlFromJson(templateData[templateDataKey], wrapper);
        }
      }
    }
    return wrapper;

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
  }


}