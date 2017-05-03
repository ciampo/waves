class Utils {
  static getMouseCoordinates(evt, canvasBCR) {
    var toReturn = {};

    toReturn.x = Math.round((evt.clientX - canvasBCR.left) /
        (canvasBCR.right - canvasBCR.left) * canvasBCR.width);
    toReturn.y = Math.round((evt.clientY - canvasBCR.top) /
      (canvasBCR.bottom - canvasBCR.top) * canvasBCR.height);

    return toReturn;
  }
}