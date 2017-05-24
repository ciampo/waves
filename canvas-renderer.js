import * as utils from './utils.js';
import * as easing from './easing.js';

export default class CanvasRenderer {
  constructor(rootNode, colors, colorMode) {
    // Clean root node, append canvas.
    while (rootNode.firstChild) {
      rootNode.removeChild(rootNode.firstChild);
    }
    this._canvas = document.createElement('canvas');
    this._canvas.classList.add('full-screen');
    this._canvas.setAttribute('touch-action', 'none')
    this._ctx = this._canvas.getContext('2d');
    rootNode.appendChild(this._canvas);

    // Device pixel ratio.
    this._DPR = 1;// window.devicePixelRatio;

    this.diagonal = 0;

    this.colors = colors;
    this.colorMode = colorMode;
  }

  resize(width, height) {
    this._canvas.setAttribute('width', `${width * this._DPR}px`);
    this._canvas.setAttribute('height', `${height * this._DPR}px`);

    this.diagonal =
        utils.getDistance2d(0, 0, this._canvas.width, this._canvas.height);
  }

  draw(points, waves) {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._ctx.fillStyle = `rgba(${this.colors[this.colorMode].r},
                                ${this.colors[this.colorMode].g},
                                ${this.colors[this.colorMode].b}, 1)`;

    points.forEach(p => {
      this._ctx.fillRect(p.displayX, p.displayY, p.size, p.size);
    });

    waves.forEach(wave => {
      // Draw wave pulse. Opacity gets lower as the wave grows.
      const crestR = wave.getEasedCrestValue();
      if (crestR <= wave.easingRadius / 2) {
        this._ctx.fillStyle =
          `rgba(${this.colors[this.colorMode].r},
                ${this.colors[this.colorMode].g},
                ${this.colors[this.colorMode].b},
                ${this.colors[this.colorMode].waveMaxOpacity *
                    easing.easeInQuart(1 - crestR / (wave.easingRadius / 2))})`;

        this._ctx.beginPath();
        this._ctx.arc(wave.x, wave.y, crestR, 0, Math.PI * 2, true);
        this._ctx.closePath();
        this._ctx.fill();
      }
    });
  }
}