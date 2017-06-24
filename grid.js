import * as utils from './utils.js';
import * as easing from './easing.js';

/**
 * A grid of points equally spaced, possibly displaced by waves.
 *
 * @export
 * @class Grid
 */
export default class Grid {
  /**
   * Creates an instance of Grid.
   * @param {number} gap Space (in px) between each point.
   * @param {number} baseDotSize Size (in px) of each point when idle.
   * @param {number} maxDotSize Max size (in px) that each point can grow to.
   * @param {number} [posConst=1/20] Affects how much a wave's crest can move a dot.
   * @param {number} [sizeConst=3.5] Affects how much a wave's crest can scale a dot.
   *
   * @memberof Grid
   */
  constructor(gap, baseDotSize, maxDotSize, posConst = 1/20, sizeConst = 3.5) {
    this.gap = gap;
    this.baseDotSize = baseDotSize;
    this.maxDotSize = maxDotSize;
    this.posConst = posConst;
    this.sizeConst = sizeConst

    this._distFromWaves = [];
    this._angleFromWaves = [];

    this._cols;
    this._rows;

    this.points = [];
  }

  /**
   * Called when the grid is resized. Re-computes the position of each point.
   *
   * @param {number} w New width of the grid.
   * @param {number} h New height of the grid.
   * @param {number} nWaves Number of waves currently active in the canvas.
   *
   * @memberof Grid
   */
  resize(w, h, nWaves) {
    this.points = [];
    this._distFromWaves = [];
    this._angleFromWaves = [];

    this._cols = Math.floor(w / this.gap);
    this._rows = Math.floor(h / this.gap);

    for (const c of [...Array(this._cols + 1).keys()]) {
      for (const r of [...Array(this._rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + Math.floor((w - this._cols * this.gap) / 2),
          y: r * this.gap + Math.floor((h - this._rows * this.gap) / 2),
          displayX: null,
          displayY: null,
          size: null
        });

        this._distFromWaves.push(Array(nWaves).fill(null));
        this._angleFromWaves.push(Array(nWaves).fill(null));
      }
    }
  }

  /**
   * Updates position and size of each point based on the proximity to a wave.
   *
   * @param {Array<Wave>} waves
   *
   * @memberof Grid
   */
  update(waves) {
    let distFromCrest, angle, percDist, easedPercDist;

    this.points.forEach((p, pIndex) => {
      p.displayX = p.x;
      p.displayY = p.y;
      p.size = this.baseDotSize;

      waves.forEach((wave, wIndex) => {
        distFromCrest = Math.abs(
            this._getDistFromWave(pIndex, p, wIndex, wave) -
            wave.getEasedCrestValue());

        if (distFromCrest <= wave.crestAOE) {
          angle = this._getAngleFromWave(pIndex, p, wIndex, wave);
          percDist = (wave.crestAOE - distFromCrest) / wave.crestAOE;
          easedPercDist = easing.easeInOutQuad(percDist) * wave.crestAOE;

          p.displayX -= easedPercDist * this.posConst * Math.cos(angle);
          p.displayY -= easedPercDist * this.posConst * Math.sin(angle);

          p.size += this.sizeConst * easing.easeInCubic(1 - distFromCrest / wave.crestAOE);
        }
      });

      p.size = Math.min(p.size, this.maxDotSize);

      p.displayX -= p.size / 2;
      p.displayY -= p.size / 2;
    });
  }

  /**
   * Computes (and stores) the distance from a point and a wave's center.
   *
   * @param {number} pIndex Index of the point
   * @param {Object} p Point object
   * @param {number} wIndex Index of the wave
   * @param {Wave} wave Wave object
   * @returns {number} Disance from a point and a wave's center (in px).
   *
   * @memberof Grid
   */
  _getDistFromWave(pIndex, p, wIndex, wave) {
    if (this._distFromWaves[pIndex][wIndex] === null) {
      this._distFromWaves[pIndex][wIndex] =
          utils.getDistance2d(p.x, p.y, wave.x, wave.y);
    }
    return this._distFromWaves[pIndex][wIndex];
  }

    /**
   * Computes (and stores) the angle from a point and a wave's center.
   *
   * @param {number} pIndex Index of the point
   * @param {Object} p Point object
   * @param {number} wIndex Index of the wave
   * @param {Wave} wave Wave object
   * @returns {number} Angle from a point and a wave's center (in radians).
   *
   * @memberof Grid
   */
  _getAngleFromWave(pIndex, p, wIndex, wave) {
    if (this._angleFromWaves[pIndex][wIndex] === null) {
      this._angleFromWaves[pIndex][wIndex] =
          utils.getAngleBetweenPoints(p.x, p.y, wave.x, wave.y);
    }
    return this._angleFromWaves[pIndex][wIndex];
  }

  /**
   * Adds an entry in the stored distances and angles. Needs to be called
   * every time a wave is added to the scene, in order to keep values in sync.
   *
   * @memberof Grid
   */
  addWave() {
    this._distFromWaves.forEach(d => {d.push(null);})
    this._angleFromWaves.forEach(d => {d.push(null);})
  }

  /**
   * Removes an entry from the stored distances and angles. Needs to be called
   * every time a wave is removed from the scene, in order to keep values in sync.
   *
   * @param {number} index Index of the removed wave.
   *
   * @memberof Grid
   */
  removeWave(index) {
    this._distFromWaves.forEach(d => {d.splice(index, 1);})
    this._angleFromWaves.forEach(d => {d.splice(index, 1);})
  }
}
