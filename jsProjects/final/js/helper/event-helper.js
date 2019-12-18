class EventHelper {
  /*
  Custom event create
  @param  {string}  event string of event name
  @return Event object
   */
  static customEvent(event) {
    return new Event(event);
  }

  /*
custom event to parse html and send as argument
@param {string} event string of event name
@param  {string} htmlJson json string from storage
@return CustomEvent object
 */
  static customEventparseHtml(event, htmlJson) {
    let parseJson = [];
    parseJson.push(htmlJson);
    let parsedData = FileHelper.parseEditorStorage(parseJson);
    return new CustomEvent(event, {"detail": parsedData});
  }

  /*
custom event with multiple arguments from DOM layer
@param {string} event string of event name
@param  {object} wrapperObj, containerObj, rowObj, colObj, componentObj
@return CustomEvent object
   */
  static customEventStyleTool(event, wrapperObj, containerObj, rowObj, colObj, componentObj) {
    return new CustomEvent(event, {
      "detail": {
        "wrapper": wrapperObj,
        "container": containerObj,
        "row": rowObj,
        "col": colObj,
        "component": componentObj
      }
    });
  }
}
