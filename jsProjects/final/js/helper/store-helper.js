class StoreHelper {

  /*
  @param {object} webData
   */
  static setPreviewStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('preview-b7-web-builder', webString);
  }

  /*
  @return localStorage object
   */
  static getPreviewStorage() {
    return JSON.parse(localStorage.getItem('preview-b7-web-builder'));
  }

  /*
@param {object} webData
 */
  static setTemplateStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('template-b7-web-builder', webString);
  }

  /*
  @return localStorage object
   */
  static getTemplateStorage() {
    return JSON.parse(localStorage.getItem('template-b7-web-builder'));
  }

  /*
@param {object} webData
 */
  static setEditStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('edit-b7-web-builder', webString);
  }

  /*
  @return localStorage object
   */
  static getEditStorage() {
    return JSON.parse(localStorage.getItem('edit-b7-web-builder'));
  }

  /*
  @param {object} webData
   */
  static setEditBackupStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('edit-backup-b7-web-builder', webString);
  }

  /*
  @return localStorage object
   */
  static getEditBackupStorage() {
    return JSON.parse(localStorage.getItem('edit-backup-b7-web-builder'));
  }

  /*
@param {object} webData
 */
  static setDownloadStorage(webData) {
    let webString = JSON.stringify(webData);
    localStorage.setItem('download-b7-web-builder', webString);
  }

  /*
  @return localStorage object
   */
  static getDownloadStorage() {
    return JSON.parse(localStorage.getItem('download-b7-web-builder'));
  }

}
