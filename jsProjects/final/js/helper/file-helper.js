class FileHelper {
  /*
  @param {string} file - file url
  @param {string} method - get,post
  @param {function} callbackResponse - asynchronous call back on file load
   */
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

  /*
    @param {string} file - file url
    @param {string} method - get,post
    @param {function} callbackResponse - asynchronous call back on file load
     */
  static getFileContentSync(file, method) {
    let fileName = file || 'nofile';
    let xmlhttp = undefined;
    let xmlDoc = undefined;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open(method, fileName, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
      xmlDoc = xmlhttp.responseText;
      return xmlDoc;
    }
  }

  /*
@param {array} webContent - edited web content for download
 */
  static downloadWebContent(webContent) {
    let parsedHtmlCss = this.parseTemplateWithCss(webContent);
    let downloadHtml =
      "<!doctype html>" +
      "<html lang=\"en\">" +
      "<head>" +
      "  <meta charset=\"UTF-8\">" +
      "  <meta name=\"viewport\" content=\"width=device-width\">" +
      "  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">" +
      "  <title>b7 Web Builder</title>" +
      "  <link rel=\"stylesheet\" href=\"custom.css\">" +
      "</head>" +
      "<body>" +
      parsedHtmlCss.html.outerHTML +
      "</body>" +
      "</html>";
    let resetCss = this.getFileContentSync('css/reset.css', 'GET');
    let layoutCss = this.getFileContentSync('css/layout.css', 'GET');
    let componentCss = this.getFileContentSync('css/component.css', 'GET');
    let downloadCss = resetCss + '\n' + layoutCss + '\n' + componentCss + '\n' + parsedHtmlCss.css;

    download(downloadHtml, 'b7WebBuilder.html', 'txt');
    download(downloadCss, 'custom.css', 'txt');

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
  }


  /*
  @param {array} templateData - preview template object
   */
  static parseTemplate(templateData) {
    let cssCounter = 1;
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
        if (value.name === 'data-css')
          domTag.setAttribute(value.name, cssCounter++);
        else
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

  /*
  @param {array} templateData - download object
   */
  static parseTemplateWithCss(templateData) {
    let cssCounter = 1;
    let wrapper = document.createElement('div');
    let cssDoc = '';
    wrapper.setAttribute('id', 'preview-wrapper');
    if (Array.isArray(templateData) && templateData.length) {
      for (let templateDataKey in templateData) {
        if (templateData.hasOwnProperty(templateDataKey)) {
          parseHtmlFromJson(templateData[templateDataKey], wrapper);
        }
      }
    }
    return {html: wrapper, css: cssDoc};

    function parseHtmlFromJson(downloadedHtml, parentElem) {
      let cssClass = '';
      let cssValue = undefined;
      let domTag = document.createElement(downloadedHtml.tagName);
      domTag.setAttribute('data-css', cssCounter);
      Object.values(downloadedHtml.attributes).forEach(function (value) {

        if (value.name === 'data-css'){
        //clear data-css
        }
        else if (value.name === 'style') {
          cssValue = value.value;
        } else {
          domTag.setAttribute(value.name, value.value);
          if (value.name === 'class') {
            cssClass = (value.value.split(' '))[0] || 'noclass';
          }
        }
      });

      parentElem.appendChild(domTag);
      if (cssValue !== '' && cssValue !== undefined && cssValue !== null) {
        cssDoc += `.${cssClass}[data-css="${cssCounter}"] { ${cssValue} }`;
      }
      cssCounter++;

      Object.values(downloadedHtml.children).forEach(function (value) {
        parseHtmlFromJson(value, domTag);
      });
      if (downloadedHtml.innerText !== '')
      // console.log(downloadedHtml.innerText);
        domTag.innerText = downloadedHtml.innerText;
    }
  }


  /*
  @param {array} editorData - preview template object
   */
  static parseEditorStorage(editorData) {
    let cssCounter = 1;
    let wrapper = document.createElement('div');
    if (Array.isArray(editorData) && editorData.length) {
      for (let editorDataKey in editorData) {
        if (editorData.hasOwnProperty(editorDataKey)) {
          parseHtmlFromJson(editorData[editorDataKey], wrapper);
        }
      }
    }
    return wrapper.innerHTML;

    function parseHtmlFromJson(downloadedHtml, parentElem) {
      var domTag = document.createElement(downloadedHtml.tagName);
      Object.values(downloadedHtml.attributes).forEach(function (value) {
        if (value.name === 'data-css')
          domTag.setAttribute(value.name, cssCounter++);
        else
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
