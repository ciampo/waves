import * as utils from './utils.js';

export default class Grid {
  constructor(w, h, gap, dotSize) {
    this.width = w;
    this.height = h;
    this.gap = gap;
    this.dotSize = dotSize;

    this.points = [];
  }

  update() {
    this.points = [];

    const cols = Math.floor(this.width / this.gap);
    const rows = Math.floor(this.height / this.gap);

    const offsetX = Math.floor((this.width - cols * this.gap) / 2);
    const offsetY = Math.floor((this.height - rows * this.gap) / 2);

    for (let c of [...Array(cols + 1).keys()]) {
      for (let r of [...Array(rows + 1).keys()]) {
        this.points.push({
          x: c * this.gap + offsetX,
          y: r * this.gap + offsetY
        });
      }
    }
  }
}
