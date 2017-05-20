import * as utils from './utils.js';
import * as easing from './easing.js';

export default class Grid {
  constructor(w, h, gap, baseDotSize) {
    this.width = w;
    this.height = h;
    this.gap = gap;
    this.baseDotSize = baseDotSize;

    // Constants that affect how much the position / size of each dot
    // is affected by the distance from a wave.
    this._posConst = 1/ 20;
    this._sizeConst = 3.5;

    this._distFromWaves = [];
    this._angleFromWaves = [];
    this.points = [];
  }

  init(w, h, nWaves) {
    this.width = w;
    this.height = h;

    this.points = [];
    this._distFromWaves = [];
    this._angleFromWaves = [];

    const cols = Math.floor(this.width / this.gap);
    const rows = Math.floor(this.height / this.gap);

    const offsetX = Math.floor((this.width - cols * this.gap) / 2);
    const offsetY = Math.floor((this.height - rows * this.gap) / 2);

    for (const c of [...Array(cols + 1).keys()]) {
      for (const r of [...Array(rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + offsetX,
          y: r * this.gap + offsetY,
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
    for (const [pIndex, p] of this.points.entries()) {

      p.displayX = p.x;
      p.displayY = p.y;
      p.size = this.baseDotSize;

      for (const [wIndex, wave] of waves.entries()) {
        const distFromCrest = Math.abs(
            this._getDistFromWave(pIndex, p, wIndex, wave) -
            wave.getEasedCrestValue());

        if (distFromCrest <= wave.crestAOE) {
          const angle = this._getAngleFromWave(pIndex, p, wIndex, wave);
          const percDist = (wave.crestAOE - distFromCrest) / wave.crestAOE;
          const easedPercDist = easing.easeInOutQuad(percDist) * wave.crestAOE;

          p.displayX -= easedPercDist * this._posConst * Math.cos(angle);
          p.displayY -= easedPercDist * this._posConst * Math.sin(angle);

          p.size += this._sizeConst * easing.easeInCubic(1 - distFromCrest / wave.crestAOE);
        }
      }

      p.displayX -= p.size / 2;
      p.displayY -= p.size / 2;
    }
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
