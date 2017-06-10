export default class AbstractRenderer {
  constructor(rootNode, color) {
    if (this.constructor === AbstractRenderer) {
        throw new TypeError(`Abstract class "AbstractRenderer" cannot be
            instantiated directly.`);
    }

    this.rootNode = rootNode;
    this._currentColor = color;

    // Check if all instance methods are implemented.
    if (this.resize === AbstractRenderer.prototype.resize) {
      throw new TypeError('Please implement abstract method "resize".');
    }
    if (this.draw === AbstractRenderer.prototype.draw) {
      throw new TypeError('Please implement abstract method "draw".');
    }
  }

  /**
   * Sets the current color.
   *
   * @param {Object} color New current color.
   *
   * @memberof AbstractRenderer
   */
  set currentColor(color) {
    this._currentColor = color;
  }

  /**
   * Gets the current color
   *
   * @readonly
   *
   * @memberof AbstractRenderer
   */
  get currentColor() {
    return this._currentColor;
  }

  /**
   * Abstract method. Called when the size of the drawing surface has changed.
   *
   * @param {number} width New width of the canvas.
   * @param {number} height New height of the canvas.
   *
   * @memberof AbstractRenderer
   */
  resize(width, height) {}

  /**
   * Abstract method. Called during the rendering loop.
   *
   * @param {Array<Object>} points List of the grid's points.
   * @param {Array<Wave>} waves List of the active waves.
   *
   * @memberof AbstractRenderer
   */
  draw(points, waves) {}
}