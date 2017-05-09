export default class Wave {
  constructor(x, y, r, v = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = v;
    this.crest = 0;
  }
}