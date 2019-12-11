class EventHelper {
  static customEvent(event) {
    return new Event(event);
  }

  static customEventparseHtml(event, htmlJson) {
    let parseJson = [];
    parseJson.push(htmlJson);
    let parsedData = FileHelper.parseEditorStorage(parseJson);
    return new CustomEvent(event, {"detail": parsedData});
  }

  static customEventStyleTool(event, wrapperObj, containerObj, colObj, componentObj) {

    return new CustomEvent(event, {
      "detail": {
        "wrapper": wrapperObj,
        "container": containerObj,
        "col": colObj,
        "component": componentObj
      }
    });
  }
}
