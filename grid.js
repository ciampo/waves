import * as utils from './utils.js';
import * as easing from './easing.js';

export default class Grid {
  constructor(gap, baseDotSize) {
    this.gap = gap;
    this.baseDotSize = baseDotSize;

    // Constants that affect how much the position / size of each dot
    // is affected by the distance from a wave.
    this._posConst = 1/ 20;
    this._sizeConst = 3.5;

    this._distFromWaves = [];
    this._angleFromWaves = [];

    this._cols;
    this._rows;

    this.points = [];
  }

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

          p.displayX -= easedPercDist * this._posConst * Math.cos(angle);
          p.displayY -= easedPercDist * this._posConst * Math.sin(angle);

          p.size += this._sizeConst * easing.easeInCubic(1 - distFromCrest / wave.crestAOE);
        }
      });

      p.displayX -= p.size / 2;
      p.displayY -= p.size / 2;
    });
  }

  _getDistFromWave(pIndex, p, wIndex, wave) {
    if (this._distFromWaves[pIndex][wIndex] === null) {
      this._distFromWaves[pIndex][wIndex] =
          utils.getDistance2d(p.x, p.y, wave.x, wave.y);
    }
    return this._distFromWaves[pIndex][wIndex];
  }

  _getAngleFromWave(pIndex, p, wIndex, wave) {
    if (this._angleFromWaves[pIndex][wIndex] === null) {
      this._angleFromWaves[pIndex][wIndex] =
          utils.getAngleBetweenPoints(p.x, p.y, wave.x, wave.y);
    }
    return this._angleFromWaves[pIndex][wIndex];
  }

  addWave() {
    this._distFromWaves.forEach(d => {d.push(null);})
    this._angleFromWaves.forEach(d => {d.push(null);})
  }

  removeWave(index) {
    this._distFromWaves.forEach(d => {d.splice(index, 1);})
    this._angleFromWaves.forEach(d => {d.splice(index, 1);})
  }
}
