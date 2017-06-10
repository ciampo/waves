import * as utils from './utils.js';

/**
 * A wave, whose crest grows from its center and has a circular shape.
 *
 * @export
 * @class Wave
 */
export default class Wave {
  /**
   * Creates an instance of Wave.
   * @param {number} x
   * @param {number} y
   * @param {number} maxRadius
   * @param {number} easingRadius
   * @param {number} [crestVelocity=10]
   * @param {function} [crestEasingFn=x => x]
   *
   * @memberof Wave
   */
  constructor(x, y, maxRadius, easingRadius, crestVelocity = 10, crestAOE, crestEasingFn = x => x) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.easingRadius = easingRadius;
    this.crestVelocity = crestVelocity;
    this.crestAOE = crestAOE;
    this.crestEasingFn = crestEasingFn;

    this.crestRadius = 0;
  }

  /**
   * Grows the size of the wave (i.e moves the crest by the velocity value).
   *
   * @memberof Wave
   */
  grow() {
    this.crestRadius += this.crestVelocity;
  }

  /**
   * Checks if the crest has passed the maxRadius
   *
   * @returns {boolean}
   *
   * @memberof Wave
   */
  isExpired() {
    return this.crestRadius >= this.maxRadius;
  }

  /**
   * Gets eased value, instead of linear increasing value.
   *
   * @returns {number}
   *
   * @memberof Wave
   */
  getEasedCrestValue() {
    // Ease against easingRadius, it makes all waves grow with the same speed.
    return this.crestEasingFn(this.crestRadius / this.easingRadius) * this.maxRadius;
  }
}