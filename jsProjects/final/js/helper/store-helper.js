class StoreHelper {
  static setPreviewStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('preview-b7-web-builder', webString);
  }

  static getPreviewStorage() {
    return localStorage.getItem('preview-b7-web-builder');
  }

  static setTemplateStorage(templateData) {
    let templateString = JSON.stringify(templateData);
    localStorage.setItem('template-b7-web-builder', templateString);
  }

  static getTemplateStorage() {
    return JSON.parse(localStorage.getItem('template-b7-web-builder'));
  }
}
