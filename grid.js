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
    this.points = [];
  }

  init(w, h, nWaves) {
    this.width = w;
    this.height = h;

    this.points = [];
    this._distFromWaves = [];

    const cols = Math.floor(this.width / this.gap);
    const rows = Math.floor(this.height / this.gap);

    const offsetX = Math.floor((this.width - cols * this.gap) / 2);
    const offsetY = Math.floor((this.height - rows * this.gap) / 2);

    for (let c of [...Array(cols + 1).keys()]) {
      for (let r of [...Array(rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + offsetX,
          y: r * this.gap + offsetY,
          translateX: null,
          translateY: null,
          scale: null
        });

        this._distFromWaves.push(Array(nWaves).fill(null));
      }
    }
  }

  update(waves) {
    for (let [pIndex, p] of this.points.entries()) {

      p.translateX = p.x;
      p.translateY = p.y;
      p.scale = 1;

      for (let [wIndex, wave] of waves.entries()) {

        if (!this._distFromWaves[pIndex][wIndex]) {
          this._distFromWaves[pIndex][wIndex] =
              utils.getDistance2d(p.x, p.y, wave.x, wave.y);
        }
        const distFromCrest = Math.abs(this._distFromWaves[pIndex][wIndex] -
            wave.getEasedCrestValue());

        if (distFromCrest <= wave.crestAOE) {
          const angle = utils.getAngleBetweenPoints(p.x, p.y, wave.x, wave.y);
          const percDist = (wave.crestAOE - distFromCrest) / wave.crestAOE;
          const easedPercDist = easing.easeInOutQuad(percDist) * wave.crestAOE;

          p.translateX -= easedPercDist * this._posConst * Math.cos(angle);
          p.translateY -= easedPercDist * this._posConst * Math.sin(angle);

          p.scale += this._sizeConst * easing.easeInCubic(1 - distFromCrest / wave.crestAOE);
        }
      }
    }
  }

  addWave() {
    this._distFromWaves.forEach(d => {d.push(null);})
  }

  removeWave(index) {
    this._distFromWaves.forEach(d => {d.splice(index, 1);})
  }
}
