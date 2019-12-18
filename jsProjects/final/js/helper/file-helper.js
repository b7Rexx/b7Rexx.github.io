class FileHelper {
  /*
  asynchronous callback on file load
  @param {string} file - file url
  @param {string} method - get,post
  @param {function} callbackResponse
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
    synchronous callback on file load
    @param {string} file - file url
    @param {string} method - get,post
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
@param {array} webContent - edited web content make ready for download
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
      "  <!--  error image--><script>function errorImage(e) {" +
      "let noImage = 'data:image/png;base64,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';" +
      "e.target.src = noImage;}</script>" +
      "</head>" +
      "<body>" +
      parsedHtmlCss.html.outerHTML +
      "<script src=\"custom.js\"></script>" +
      "</body>" +
      "</html>";
    let resetCss = this.getFileContentSync('css/reset.css', 'GET');
    let layoutCss = this.getFileContentSync('css/layout.css', 'GET');
    let componentCss = this.getFileContentSync('css/component.css', 'GET');
    let downloadCss = resetCss + '\n' + layoutCss + '\n' + componentCss + '\n' + parsedHtmlCss.css;
    let downloadJs = this.getFileContentSync('js/custom.js', 'GET');

    let downloadJson = JSON.stringify(webContent);
    download(downloadHtml, 'b7WebBuilder.html', 'txt');
    download(downloadCss, 'custom.css', 'txt');
    download(downloadJs, 'custom.js', 'txt');
    download(downloadJson, 'progress.json', 'txt');

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
  parse json to html
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
  separate html css from DOM object for download
  @param {array} templateData
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

        if (value.name === 'data-css') {
          //clear data-css
        } else if (value.name === 'style') {
          cssValue = value.value;
        } else {
          domTag.setAttribute(value.name, value.value);
          if (value.name === 'class') {
            cssClass = (value.value.split(' '))[0] || '';
          }
        }
      });

      parentElem.appendChild(domTag);
      if (cssValue !== '' && cssValue !== undefined && cssValue !== null) {
        if (cssClass.trim() == '') {
          cssDoc += `${downloadedHtml.tagName.toLowerCase()}[data-css="${cssCounter}"] { ${cssValue} }`;
        } else {
          cssDoc += `.${cssClass}[data-css="${cssCounter}"] { ${cssValue} }`;
        }
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
  parse json to html for editor preview
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
